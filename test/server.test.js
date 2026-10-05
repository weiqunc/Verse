const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const http = require('node:http');
const { createApp } = require('../server');

async function fixture(t, data = {songs:[],poems:[],classical:[],favorites:[]}) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(),'verse-test-'));
  const dataPath = path.join(directory,'data.json');
  await fs.writeFile(dataPath,JSON.stringify(data));
  for (const file of ['index.html','main.js','style.css','verse.png']) await fs.writeFile(path.join(directory,file),'fixture');
  const {app} = createApp({rootDir:directory});
  const server = app.listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await fs.rm(directory,{recursive:true,force:true}); });
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (route,body,headers = {}) => fetch(url + route,{method:'POST',headers:{'X-Verse-Request':'1','Content-Type':'application/json',...headers},body:JSON.stringify(body)});
  const read = async () => JSON.parse(await fs.readFile(dataPath,'utf8'));
  return {url,post,read,directory,dataPath};
}
const song = (title = '測試歌曲', overrides = {}) => ({title,creators:['作者'],lyrics:'第一行\n第二行',...overrides});

test('serves public assets and hides source/config/data files',async t => {
  const {url} = await fixture(t);
  const policy = (await fetch(url)).headers.get('content-security-policy');
  assert(policy.includes("script-src 'self';"));
  assert(policy.includes("style-src 'self' 'unsafe-inline';"));
  for (const route of ['/','/index.html','/main.js','/style.css','/verse.png']) assert.equal((await fetch(url + route)).status,200);
  for (const route of ['/server.js','/package.json','/package-lock.json','/data.json','/data.json.backup','/.git/config','/node_modules/express/package.json']) assert.equal((await fetch(url + route)).status,404,route);
});
test('blocks cross-origin writes, forged Host and missing request header',async t => {
  const {url,post} = await fixture(t);
  assert.equal((await post('/api/import/songs',{songs:[song()]},{Origin:'https://attacker.test'})).status,403);
  const hostStatus = await new Promise((resolve,reject) => {
    http.get(url + '/api/songs',{headers:{Host:'attacker.test'}},response => {response.resume(); resolve(response.statusCode);}).on('error',reject);
  });
  assert.equal(hostStatus,403);
  assert.equal((await fetch(url + '/api/import/songs',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,403);
});
test('quotes, interpolation, brackets and HTML remain literal data; source is unchanged',async t => {
  const {url,post,read,directory} = await fixture(t);
  const content = song('"; process.exit(); // <img src=x onerror=alert(1)>',{lyrics:'` ${process.exit()} ]; }\\\n literal'});
  assert.equal((await post('/api/upload-song',content)).status,201);
  const saved = (await read()).songs[0];
  assert.equal(saved.title,content.title); assert.equal(saved.lyrics,content.lyrics);
  assert.equal(await fs.readFile(path.join(directory,'main.js'),'utf8'),'fixture');
  const exported = await (await fetch(url + '/api/export/songs')).json();
  assert.equal(exported.songs[0].lyrics,content.lyrics);
});
test('classical upload works before any song upload; creator is required but album is optional',async t => {
  const {post,read} = await fixture(t);
  assert.equal((await post('/api/upload-classical',{title:'交響曲',composer:'作曲家',releasedate:'2025-01-01'})).status,201);
  assert.equal((await read()).classical.length,1);
  assert.equal((await post('/api/upload-classical',{title:'其他',composer:'   '})).status,400);
});
test('validates shapes, dates, IDs and image paths without partial imports',async t => {
  const {post,read} = await fixture(t);
  for (const body of [{songs:[song('A'),song('B',{creators:{bad:true}})]},{songs:[song('A',{release_date:'2025-02-31'})]},{songs:[song('A',{id:'x\" onclick=alert(1)'})]},{songs:[song('A',{image:'../server.js'})]},{favorites:{}},{poems:[{title:'A',lyrics:'B'}]}]) assert.equal((await post('/api/import/songs',body)).status,400);
  assert.equal((await read()).songs.length,0);
});
test('parallel writes retain every item and reject duplicate title/creator pairs',async t => {
  const {post,read} = await fixture(t);
  const responses = await Promise.all(Array.from({length:12},(_,index) => post('/api/upload-song',song(`歌曲${index}`))));
  assert(responses.every(response => response.status === 201));
  assert.equal((await read()).songs.length,12);
  assert.equal((await post('/api/upload-song',song('歌曲0'))).status,409);
  assert.equal((await post('/api/upload-song',song('歌曲0',{creators:['其他作者']}))).status,201);
});
test('deleting one song preserves adjacent records and removes only its favorites',async t => {
  const {post,read} = await fixture(t);
  for (const title of ['A','B','C']) await post('/api/upload-song',song(title,{lyrics:'closing } bracket ]; literal'}));
  const records = (await read()).songs;
  for (const row of records) await post('/api/add-favorite',{songId:row.id,songTitle:row.title,songCreators:'作者',lyrics:`${row.title} }; ]`,note:'quote " and slash \\'});
  assert.equal((await post('/api/delete-song',{id:records[1].id})).status,200);
  const saved = await read();
  assert.deepEqual(saved.songs.map(row=>row.title),['A','C']);
  assert.equal(saved.favorites.length,2);
  assert(saved.favorites.every(row=>row.songId!==records[1].id));
});
test('poem-only/classical-only imports and exports preserve all collection types',async t => {
  const {url,post,read} = await fixture(t);
  assert.equal((await post('/api/import/songs',{poems:[{title:'文章',creators:['作者'],lyrics:'原文',translation:'翻譯'}]})).status,200);
  assert.equal((await post('/api/import/songs',{classical:[{title:'作品',composer:['作曲家'],releasedate:'2024-01-01'}]})).status,200);
  const exported = await (await fetch(url + '/api/export/songs')).json();
  assert.equal(exported.totalPoems,1); assert.equal(exported.totalClassical,1);
  assert.equal((await post('/api/import/songs',exported)).status,200);
  assert.equal((await read()).poems.length,1); assert.equal((await read()).classical.length,1);
});
test('import collisions remap favorites to the corresponding new song',async t => {
  const {post,read} = await fixture(t,{songs:[{...song('原歌'),id:'shared'}],poems:[],classical:[],favorites:[]});
  assert.equal((await post('/api/import/songs',{songs:[song('新歌',{id:'shared'})],favorites:[{id:'newfav',songId:'shared',songTitle:'新歌',songCreators:'作者',lyrics:'新片段'}]})).status,200);
  const saved = await read();
  assert.notEqual(saved.songs[1].id,'shared'); assert.equal(saved.favorites[0].songId,saved.songs[1].id);
});
test('rejects forged image MIME types and does not leave uploaded files',async t => {
  const {url,directory,read} = await fixture(t);
  const form = new FormData();
  form.set('title','圖片歌曲'); form.set('creators','作者'); form.set('lyrics','內容');
  form.set('image',new Blob(['<script>alert(1)</script>'],{type:'image/png'}),'fake.png');
  const response = await fetch(url + '/api/upload-song',{method:'POST',headers:{'X-Verse-Request':'1'},body:form});
  assert.equal(response.status,400); assert.equal((await read()).songs.length,0);
  assert(!(await fs.readdir(directory)).includes('images'));
});
test('rejects orphan favorites and duplicate incoming source IDs atomically',async t => {
  const {post,read} = await fixture(t);
  const orphan = {id:'fav1',songId:'missing',songTitle:'不存在',lyrics:'片段'};
  assert.equal((await post('/api/import/songs',{songs:[song('A')],favorites:[orphan]})).status,400);
  assert.equal((await read()).songs.length,0);
  assert.equal((await post('/api/import/songs',{songs:[song('A',{id:'shared'})],poems:[{id:'shared',title:'B',creators:['作者'],lyrics:'內容'}]})).status,400);
});
test('retains leading and trailing whitespace in original content and notes',async t => {
  const {post,read} = await fixture(t);
  const lyrics = '\n  line one\nline two  \n';
  assert.equal((await post('/api/import/songs',{poems:[{id:'poem1',title:'文章',creators:['作者'],lyrics,translation:'\n translation\n'}]})).status,200);
  const saved = (await read()).poems[0];
  assert.equal(saved.lyrics,lyrics); assert.equal(saved.translation,'\n translation\n');
});
test('uploads cannot overwrite IDs and imported favorite metadata follows its source',async t => {
  const {post,read} = await fixture(t);
  for (const title of ['A','B']) await post('/api/upload-song',song(title,{id:'same'}));
  const rows = (await read()).songs;
  assert.notEqual(rows[0].id,rows[1].id);
  assert.equal((await post('/api/import/songs',{favorites:[{songId:rows[0].id,songTitle:'偽造標題',songCreators:'偽造作者',lyrics:'片段'}]})).status,200);
  const favorite = (await read()).favorites[0];
  assert.equal(favorite.songTitle,'A'); assert.equal(favorite.songCreators,'作者');
});
test('the migrated existing library can be exported and reimported without losing records',async t => {
  const data = JSON.parse(await fs.readFile(path.join(__dirname,'../data.json'),'utf8'));
  const {post,read} = await fixture(t);
  const response = await post('/api/import/songs',data);
  assert.equal(response.status,200,JSON.stringify(await response.json()));
  const saved = await read();
  for (const kind of ['songs','poems','classical','favorites']) assert.equal(saved[kind].length,data[kind].length,kind);
});

test('a successful mutation privately backs up the exact previous bytes',async t => {
  const {url,post,dataPath} = await fixture(t);
  const original = Buffer.from('  {"songs": [], "poems": [], "classical": [], "favorites": []}\r\n');
  await fs.writeFile(dataPath,original);
  assert.equal((await post('/api/upload-song',song('新增'))).status,201);
  assert.deepEqual(await fs.readFile(`${dataPath}.backup`),original);
  assert.equal((await fs.stat(`${dataPath}.backup`)).mode & 0o777,0o600);
  assert.equal((await fetch(url + '/data.json.backup')).status,404);
});
test('successive mutations retain only the immediately preceding successful version',async t => {
  const {post,dataPath} = await fixture(t);
  await post('/api/upload-song',song('A'));
  const firstVersion = await fs.readFile(dataPath);
  await post('/api/upload-song',song('B'));
  assert.deepEqual(await fs.readFile(`${dataPath}.backup`),firstVersion);
  const secondVersion = await fs.readFile(dataPath);
  await post('/api/upload-song',song('C'));
  assert.deepEqual(await fs.readFile(`${dataPath}.backup`),secondVersion);
  assert.deepEqual(JSON.parse((await fs.readFile(`${dataPath}.backup`)).toString()).songs.map(row=>row.title),['A','B']);
});
test('validation and duplicate failures leave both data and its backup unchanged',async t => {
  const {post,dataPath} = await fixture(t);
  await post('/api/upload-song',song('A'));
  const original = await fs.readFile(dataPath), backup = await fs.readFile(`${dataPath}.backup`);
  assert.equal((await post('/api/upload-song',song('A'))).status,409);
  assert.equal((await post('/api/import/songs',{songs:[song('B')],favorites:[{songId:'missing',songTitle:'缺少來源',lyrics:'片段'}]})).status,400);
  assert.deepEqual(await fs.readFile(dataPath),original);
  assert.deepEqual(await fs.readFile(`${dataPath}.backup`),backup);
  assert.equal((await post('/api/upload-song',song('B'))).status,201);
});
test('corrupt current data reports failure without replacing it or the backup',async t => {
  const {url,post,dataPath} = await fixture(t);
  await post('/api/upload-song',song('A'));
  const current = await fs.readFile(dataPath), backup = await fs.readFile(`${dataPath}.backup`);
  const corrupt = Buffer.from('{"songs": invalid');
  await fs.writeFile(dataPath,corrupt);
  assert.equal((await fetch(url + '/api/songs')).status,500);
  assert.equal((await post('/api/upload-song',song('B'))).status,500);
  assert.deepEqual(await fs.readFile(dataPath),corrupt);
  assert.deepEqual(await fs.readFile(`${dataPath}.backup`),backup);
  await fs.writeFile(dataPath,current);
  assert.equal((await post('/api/upload-song',song('B'))).status,201);
});
test('a backup write failure leaves current data intact and the queue can recover',async t => {
  const {post,directory,dataPath} = await fixture(t);
  const original = await fs.readFile(dataPath);
  await fs.mkdir(`${dataPath}.backup`);
  assert.equal((await post('/api/upload-song',song('A'))).status,500);
  assert.deepEqual(await fs.readFile(dataPath),original);
  assert.equal((await fs.readdir(directory)).filter(name=>name.endsWith('.tmp')).length,0);
  await fs.rmdir(`${dataPath}.backup`);
  assert.equal((await post('/api/upload-song',song('A'))).status,201);
  assert.deepEqual(await fs.readFile(`${dataPath}.backup`),original);
});
