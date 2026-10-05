# Verse

Node.js 20 以上。安裝後啟動：

```sh
npm ci
npm start
```

預設網址為 http://127.0.0.1:3000。可以用 `PORT=8763 npm start` 更改 port；`npm run dev` 使用 Node.js 內建 watch mode，`npm test` 在 temporary directory 驗證 API，不修改現有收藏。

收藏資料保存在 `data.json`。這次 migration 完整保留 132 首歌曲、5 篇文章、2 首古典音樂、24 個收藏，原先資料從 `main.js` 的 literal arrays 抽出，沒有執行其中的 JavaScript。前端透過 `/api/songs` 讀取，新增、刪除、匯入採 queue 和 atomic file replacement，不再改寫程式原始碼。匯出包含所有四種資料，文章或古典音樂也可以單獨匯入。先在資料管理面板匯出，再做大量修改。

`npm start` 預設只接受本機連線；API write 要求 same-origin 與 `X-Verse-Request: 1`，網頁已自動帶入。static files 僅提供網頁、styles、前端 JavaScript、logo、images；server、package、data 和 Git 檔案不公開。刪除歌曲會移除相關收藏，圖片保留以免誤刪其他項目共用的檔案。

若需要從另一台裝置使用，可明確設定接收介面和站點網址，例如：

```sh
HOST=0.0.0.0 ALLOWED_ORIGINS=http://192.168.1.10:3000 npm start
```

`ALLOWED_ORIGINS` 可以用逗號分隔；每個 origin 需包含 protocol、host、port（若有）。透過 HTTPS reverse proxy 時，設定公開 origin（例如 `https://verse.example.com`），並由 proxy 保留 `Host`。此專案是個人收藏工具，沒有 account authentication；公開網路部署需由 reverse proxy 保護使用者存取。

單個圖片上限 10MB，僅接受 JPEG、PNG、GIF、WebP，並核對 MIME 和 file signature；單次 JSON 匯入上限 10MB。API 拒絕無效欄位、路徑、日期和 IDs；同名但創作者不同的歌曲可以共存。匯入的重複內容會跳過，與既有資料的 ID collision 會產生新 ID 並同步調整相關收藏來源。單個匯入檔中的重複 ID 或沒有來源的收藏會拒絕整次匯入；收藏標題與創作者取自對應來源。歌詞、文章、翻譯與筆記保留原有換行和前後空白。

歌曲、文章、古典音樂和收藏各自支援搜尋名稱、創作者或內容，多個關鍵字可以用空白分隔。搜尋使用 Unicode NFKC 和 case folding，支援全形字、大小寫和組合字元；歌曲與文章也可以篩選語言。結果數量、空白結果提示和清除篩選會即時更新。

新增表單與收藏在儲存期間鎖定控制項，防止重複送出。失敗時保留輸入，可直接重試；成功後更新畫面和統計，不必重新整理。手機選單和收藏表單支援 keyboard、Escape、focus trap 與關閉後的 focus restoration。

## GitHub Pages 或其他 static hosting

可以將 `index.html`、`main.js`、`style.css`、`verse.png`、`images/` 和 `data.json` 放在同一個 static directory（也支援子目錄網址）。僅當 `/api/songs` 回傳 404 時，網頁改讀同目錄的 `data.json`，並明確顯示唯讀預覽；新增、刪除與匯入會停用，瀏覽、搜尋與本地 JSON 匯出仍可用。server 的 500/503 或連線錯誤會顯示讀取失敗，不會掩蓋成 static 預覽。

static hosting 會公開 `data.json` 中的全部收藏，和原本把資料 embedded 在 `main.js` 的公開效果相同。個人資料若不應公開，使用 Node.js server 和受保護的存取方式；Node.js server 不直接公開 `data.json`。


## Automatic backup 與復原

同一個資料夾請只運行一個 Verse server process；寫入 queue 的保護範圍是單個 process。每次 mutation 通過 validation 後，在更新 `data.json` 前，會用 atomic file replacement 將原檔的 exact bytes 保存到 `data.json.backup`。備份只保留上一個成功的資料版本，權限為 0600，Node.js server 不公開它；不要將 backup 或 temporary files 放到 public static hosting。validation 失敗或目前的資料檔損壞時，不會覆寫 data 或 backup。

若 `data.json` 無法讀取，server 會明確報錯，不會自動用 backup 覆蓋原檔。復原時先停止 server，將目前的 `data.json` 另存一個新檔（若存在），檢查 `data.json.backup` 中的四個 collection 與內容完整，再把 backup 複製回 `data.json`，最後重新啟動。此備份只提供上一版復原；重要收藏仍請定期匯出到另一個位置。

## 匯入預覽與閱讀工具

資料管理面板在桌面與手機都可開啟。JSON 選檔後先顯示各類別數量、預估重複數及部分內容；確認前不寫入。取消會清除選檔，失敗會保留檔案供重試。若 server 已接受匯入但清單重新讀取失敗，改用「重新讀取清單」，不重新送出匯入。完成摘要包含全部四類與跳過的重複數；新語言會同步出現在篩選選單。

歌曲、文章與古典音樂詳情提供「複製連結」與「複製內容」。Clipboard 不可用時會顯示已選取的 readonly 文字；切換內容後，舊的非同步回應不會改動新頁面。閱讀頁更新 browser title 與 current navigation，列印會隱藏控制項；skip link 保留目前 route。圖片上傳在預覽前檢查 JPEG、PNG、GIF、WebP MIME 與 10MB 上限；server 仍會驗證 file signature。清除或重新選圖會釋放 object URL。

## 封面預覽

列表使用 `images/previews/` 的小型 WebP 和 lazy loading；詳情仍使用原圖。預覽載入失敗會嘗試原圖，再退回 gray cover。新上傳且沒有 mapping 的圖片直接使用原圖，功能不受影響。

手動替換現有封面或希望為新增圖片建立 previews 時，可用裝有 Pillow 的 Python 執行：

```sh
python3 scripts/generate-previews.py
```

此 optional maintenance script 依目前 `data.json` 的合法 image paths 建立 max168×168、quality80 的 previews，以原檔 SHA256 命名並更新 `main.js` 的 `coverPreviews` mapping。保留原 data 與 images，不刪除舊 previews；animated images 的列表預覽取第一個 frame，詳情保留原格式。static hosting 時須一併上傳 `images/previews/`（包含在完整 images 目錄中）。

API requests 設有 30 秒 deadline，包含完整 response body；連線停住會解鎖表單並保留輸入。request 逾時無法單憑 browser 判斷 server 是否已完成修改，因此提示先重新整理確認結果，再決定是否重試；不自動重送修改。
