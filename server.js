const express = require('express');
const multer = require('multer');
const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const collections = ['songs', 'poems', 'classical', 'favorites'];
class InputError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
function text(value, label, { required = false, max = 1000, preserve = false } = {}) {
  if (value == null) value = '';
  if (typeof value !== 'string') throw new InputError(`${label}必須是文字`);
  if (!preserve) value = value.trim();
  if (required && !value.trim()) throw new InputError(`請填寫${label}`);
  if (value.length > max) throw new InputError(`${label}超過 ${max} 字元`);
  return value;
}
function names(value, label, required = false) {
  const parts = Array.isArray(value) ? value : text(value, label).split(',');
  if (parts.length > 50) throw new InputError(`${label}項目過多`);
  const result = parts.map(part => text(part, label, { max: 200 })).filter(Boolean);
  if (required && !result.length) throw new InputError(`請填寫${label}`);
  return result;
}
function id(value, prefix) {
  if (!value) return `${prefix}${Date.now()}_${randomUUID()}`;
  value = text(value, 'ID', { required: true, max: 120 });
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new InputError('ID 格式錯誤');
  return value;
}
function image(value) {
  value = text(value, '圖片路徑', { max: 300 });
  if (value && !/^images\/[A-Za-z0-9_.()-]+\.(?:jpe?g|png|gif|webp)$/i.test(value)) throw new InputError('圖片必須是 images 目錄內的檔案');
  return value;
}
function date(value, label = '日期') {
  value = text(value, label, { max: 10 });
  if (value && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) throw new InputError(`${label}格式錯誤`);
  return value;
}
function normalize(row, kind) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) throw new InputError('資料項目必須是物件');
  if (kind === 'favorites') {
    const createdAt = text(row.createdAt, '收藏日期', { max: 40 }) || new Date().toISOString();
    if (Number.isNaN(Date.parse(createdAt))) throw new InputError('收藏日期格式錯誤');
    return { id: id(row.id, 'fav'), lyrics: text(row.lyrics, '收藏片段', { required: true, max: 100000, preserve: true }), note: text(row.note, '筆記', { max: 10000, preserve: true }), songId: row.songId ? id(row.songId, 'song') : '', songTitle: text(row.songTitle, '來源名稱', { required: true }), songCreators: Array.isArray(row.songCreators) ? names(row.songCreators, '創作者').join(', ') : text(row.songCreators, '創作者'), createdAt };
  }
  const base = { id: id(row.id, kind === 'songs' ? 'song' : kind === 'poems' ? 'poem' : 'cls'), title: text(row.title, '名稱', { required: true, max: 300 }), image: image(row.image) };
  if (kind === 'classical') return { ...base, composer: names(row.composer, '作曲家', true), othername: text(row.othername, '別稱'), albums: text(row.albums, '專輯'), releasedate: date(row.releasedate || row.release_date), notes: text(row.notes, '筆記', { max: 100000, preserve: true }) };
  const common = { ...base, creators: names(row.creators, '創作者', true), lyrics: text(row.lyrics, '內容', { required: true, max: 100000, preserve: true }), language: text(row.language, '語言', { max: 100 }) };
  if (kind === 'poems') return { ...common, translation: text(row.translation, '翻譯', { max: 100000, preserve: true }), poem_type: text(row.poem_type, '類型', { max: 100 }) };
  const rating = text(row.rating, '評分', { max: 10 });
  if (rating && (!Number.isFinite(Number(rating)) || Number(rating) < 0 || Number(rating) > 5)) throw new InputError('評分必須介於 0 到 5');
  return { ...common, lyricist: names(row.lyricist, '作詞'), composer: names(row.composer, '作曲'), albums: text(row.albums, '專輯'), release_date: date(row.release_date), genre: Array.isArray(row.genre) ? names(row.genre, '風格').join(', ') : text(row.genre, '風格', { max: 100 }), original_artist: names(row.original_artist, '原唱'), rating };
}
function key(row, kind) {
  if (kind === 'favorites') return `${row.songId || row.songTitle}\u0000${row.lyrics}`;
  return `${row.title}\u0000${(kind === 'classical' ? row.composer : row.creators).join(',')}`.toLocaleLowerCase();
}
function imageExtension(file) {
  const b = file.buffer;
  if (b.length >= 8 && b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && file.mimetype === 'image/png') return '.png';
  if (b.length >= 3 && b[0] === 255 && b[1] === 216 && b[2] === 255 && file.mimetype === 'image/jpeg') return '.jpg';
  if (b.length >= 6 && ['GIF87a','GIF89a'].includes(b.toString('ascii',0,6)) && file.mimetype === 'image/gif') return '.gif';
  if (b.length >= 12 && b.toString('ascii',0,4) === 'RIFF' && b.toString('ascii',8,12) === 'WEBP' && file.mimetype === 'image/webp') return '.webp';
  throw new InputError('僅支援有效的 JPEG、PNG、GIF、WebP 圖片（10MB）');
}

function createApp({ rootDir = __dirname, dataPath = path.join(rootDir, 'data.json'), allowedOrigins = process.env.ALLOWED_ORIGINS || '' } = {}) {
  const app = express();
  const origins = new Set(allowedOrigins.split(',').map(value => value.trim()).filter(Boolean));
  let writeQueue = Promise.resolve();
  const parseData = bytes => {
    const data = JSON.parse(bytes.toString('utf8'));
    if (collections.some(name => !Array.isArray(data[name]))) throw new Error('資料檔案缺少 collection');
    return data;
  };
  const readData = async () => parseData(await fs.readFile(dataPath));
  const atomicWrite = async (filename, bytes) => {
    const temporary = `${filename}.${randomUUID()}.tmp`;
    try {
      await fs.writeFile(temporary, bytes, { flag: 'wx', mode: 0o600 });
      await fs.rename(temporary, filename);
    } finally { await fs.unlink(temporary).catch(() => {}); }
  };
  const mutate = task => {
    const operation = writeQueue.then(async () => {
      const previousBytes = await fs.readFile(dataPath);
      const data = parseData(previousBytes);
      const result = await task(data);
      const updatedBytes = Buffer.from(JSON.stringify(data, null, 2) + '\n', 'utf8');
      // Preserve the exact previous file before replacing it; failed validation never reaches this step.
      await atomicWrite(`${dataPath}.backup`, previousBytes);
      await atomicWrite(dataPath, updatedBytes);
      return result;
    });
    writeQueue = operation.catch(() => {});
    return operation;
  };
  const route = handler => (req, res, next) => Promise.resolve(handler(req, res)).catch(next);
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', 'X-Frame-Options': 'DENY', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'" });
    // Explicit origins also cover HTTPS terminated by an authenticated reverse proxy.
    const currentOrigin = [...origins].find(origin => {
      try { return new URL(origin).host === req.get('host'); } catch { return false; }
    }) || `${req.protocol}://${req.get('host')}`;
    const localOrigin = new Set([`http://localhost:${req.socket.localPort}`, `http://127.0.0.1:${req.socket.localPort}`, `http://[::1]:${req.socket.localPort}`]);
    if (!localOrigin.has(currentOrigin) && !origins.has(currentOrigin)) return res.status(403).json({ error: '此網址未列入 ALLOWED_ORIGINS' });
    if (req.get('origin') && req.get('origin') !== currentOrigin) return res.status(403).json({ error: '禁止跨來源請求' });
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && (req.get('x-verse-request') !== '1' || ['cross-site','same-site'].includes(req.get('sec-fetch-site')))) return res.status(403).json({ error: '請從本站頁面操作' });
    next();
  });
  app.use('/api', (req,res,next) => { res.set('Cache-Control', 'no-store'); next(); });
  app.use(express.json({ limit: '10mb', strict: true }));
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1, fields: 30, parts: 31, fieldSize: 100000 } });
  app.get('/api/songs', route(async (req,res) => res.json({ success: true, ...await readData() })));
  app.get('/api/export/songs', route(async (req,res) => {
    const data = await readData();
    res.attachment('songs-export.json').json({ exportTime: new Date().toISOString(), source: 'Song Collection System', version: '3.0', totalSongs: data.songs.length, totalPoems: data.poems.length, totalClassical: data.classical.length, totalFavorites: data.favorites.length, ...data });
  }));
  app.get('/api/debug/data', route(async (req,res) => {
    const data = await readData();
    res.json({ success: true, dataTime: new Date().toISOString(), summary: { totalSongs: data.songs.length, totalPoems: data.poems.length, totalClassical: data.classical.length, totalFavorites: data.favorites.length, lastSong: data.songs.at(-1)?.title || '無', lastFavorite: data.favorites.at(-1)?.lyrics.slice(0,50) || '無' } });
  }));
  for (const [kind, endpoint, label] of [['songs','song','歌曲'],['poems','poem','文章'],['classical','classical','古典音樂']]) {
    app.post(`/api/upload-${endpoint}`, upload.single('image'), route(async (req,res) => {
      const row = normalize({ ...req.body, id: undefined }, kind);
      const extension = req.file ? imageExtension(req.file) : '';
      let uploadedPath;
      try {
        await mutate(async data => {
          if (data[kind].some(existing => key(existing,kind) === key(row,kind))) throw new InputError(`${label}已存在`,409);
          if (req.file) {
            await fs.mkdir(path.join(rootDir,'images'), { recursive: true });
            row.image = `images/${randomUUID()}${extension}`;
            uploadedPath = path.join(rootDir,row.image);
            await fs.writeFile(uploadedPath,req.file.buffer,{ flag:'wx' });
          }
          data[kind].push(row);
        });
      } catch (error) { if (uploadedPath) await fs.unlink(uploadedPath).catch(() => {}); throw error; }
      res.status(201).json({ success:true, message:`${label}新增成功！`, [endpoint]:row });
    }));
  }
  app.post('/api/add-favorite', route(async (req,res) => {
    const row = normalize({ ...req.body, id: undefined },'favorites');
    await mutate(data => {
      const source = [...data.songs,...data.poems].find(item => item.id === row.songId);
      if (!source) throw new InputError('收藏來源不存在',404);
      row.songTitle = source.title; row.songCreators = source.creators.join(', ');
      if (data.favorites.some(existing => key(existing,'favorites') === key(row,'favorites'))) throw new InputError('此片段已收藏',409);
      data.favorites.push(row);
    });
    res.status(201).json({ success:true, message:'收藏成功！', favorite:row });
  }));
  app.post('/api/delete-favorite', route(async (req,res) => {
    const favoriteId = text(req.body?.id,'收藏 ID',{required:true,max:120});
    await mutate(data => {
      const index = data.favorites.findIndex(row => row.id === favoriteId);
      if (index < 0) throw new InputError('找不到收藏',404);
      data.favorites.splice(index,1);
    });
    res.json({success:true,message:'刪除成功！'});
  }));
  app.post('/api/delete-song', route(async (req,res) => {
    const songId = text(req.body?.id,'歌曲 ID',{required:true,max:120});
    await mutate(data => {
      const index = data.songs.findIndex(row => row.id === songId);
      if (index < 0) throw new InputError('找不到歌曲',404);
      data.songs.splice(index,1);
      data.favorites = data.favorites.filter(row => row.songId !== songId);
    });
    res.json({success:true,message:'歌曲及相關收藏刪除成功！'});
  }));
  app.post('/api/import/songs', route(async (req,res) => {
    const incoming = Array.isArray(req.body) ? {songs:req.body} : req.body;
    if (!incoming || typeof incoming !== 'object') throw new InputError('匯入格式錯誤');
    const rows = {};
    for (const kind of collections) {
      if (incoming[kind] != null && !Array.isArray(incoming[kind])) throw new InputError(`${kind} 必須是陣列`);
      if ((incoming[kind]?.length || 0) > 5000) throw new InputError('單次匯入項目過多');
      rows[kind] = (incoming[kind] || []).map(row => normalize(row,kind));
    }
    if (!collections.some(kind => rows[kind].length)) throw new InputError('沒有找到可匯入的資料');
    const incomingIds = collections.flatMap(kind => rows[kind].map(row => row.id));
    if (new Set(incomingIds).size !== incomingIds.length) throw new InputError('匯入資料包含重複 ID，無法判斷收藏來源');
    const imported = {songs:0,poems:0,classical:0,favorites:0,songDuplicates:0,poemDuplicates:0,classicalDuplicates:0,favoriteDuplicates:0,errors:0};
    const duplicateNames = {songs:'songDuplicates',poems:'poemDuplicates',classical:'classicalDuplicates',favorites:'favoriteDuplicates'};
    await mutate(data => {
      const usedIds = new Set(collections.flatMap(kind => data[kind].map(row => row.id)));
      const remap = new Map();
      for (const kind of collections) {
        const keys = new Map(data[kind].map(row => [key(row,kind),row.id]));
        for (const row of rows[kind]) {
          if (kind === 'favorites') {
            if (remap.has(row.songId)) row.songId = remap.get(row.songId);
            const source = [...data.songs, ...data.poems].find(item => item.id === row.songId);
            if (!source) throw new InputError('收藏來源不存在');
            row.songTitle = source.title; row.songCreators = source.creators.join(', ');
          }
          const rowKey = key(row,kind);
          if (keys.has(rowKey)) { imported[duplicateNames[kind]]++; if (kind !== 'favorites') remap.set(row.id,keys.get(rowKey)); continue; }
          const previousId = row.id;
          if (usedIds.has(row.id)) row.id = id(null,kind === 'songs' ? 'song' : kind === 'poems' ? 'poem' : kind === 'classical' ? 'cls' : 'fav');
          if (kind !== 'favorites') remap.set(previousId,row.id);
          usedIds.add(row.id); keys.set(rowKey,row.id); data[kind].push(row); imported[kind]++;
        }
      }
    });
    res.json({success:true,message:`匯入完成！新增 ${imported.songs} 首歌曲、${imported.poems} 篇文章、${imported.classical} 首古典音樂、${imported.favorites} 個收藏；重複項目已跳過。`,imported});
  }));
  for (const file of ['index.html','main.js','style.css','verse.png']) app.get(file === 'index.html' ? ['/', '/index.html'] : `/${file}`, (req,res) => res.sendFile(path.join(rootDir,file)));
  app.use('/images',express.static(path.join(rootDir,'images'),{dotfiles:'deny',index:false}));
  app.use((req,res) => res.status(404).json({error:'找不到頁面'}));
  app.use((error,req,res,next) => {
    if (res.headersSent) return next(error);
    const status = error instanceof multer.MulterError ? 400 : error.status >= 400 && error.status < 500 ? error.status : 500;
    if (status === 500) console.error('資料操作失敗:',error.message);
    const message = error instanceof multer.MulterError ? '圖片超過限制或表單格式錯誤' : status === 500 ? '伺服器無法完成操作，請稍後再試' : error.type === 'entity.parse.failed' ? 'JSON 格式錯誤' : error.type === 'entity.too.large' ? '資料超過 10MB 限制' : error.message;
    res.status(status).json({success:false,error:message});
  });
  return { app, readData };
}
async function startServer() {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || '127.0.0.1';
  const {app,readData} = createApp();
  await readData();
  const server = app.listen(port,host,() => console.log(`Verse: http://${host}:${port}`));
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
  for (const signal of ['SIGINT','SIGTERM']) process.once(signal,() => server.close(() => process.exit(0)));
}
if (require.main === module) startServer().catch(error => { console.error('啟動失敗:',error.message); process.exitCode = 1; });
module.exports = { createApp, normalize };
