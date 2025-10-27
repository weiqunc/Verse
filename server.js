const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== 確保目錄存在 =====
async function ensureDirectories() {
  try {
    await fs.mkdir("images", { recursive: true });
    console.log("✅ 圖片目錄已就緒");
  } catch (error) {
    console.log("📁 圖片目錄已存在");
  }
}

// ===== 中介軟體設定 =====
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// ===== 圖片上傳設定 =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("只接受圖片檔案（JPEG, PNG, GIF, WebP）！"));
    }
  }
});

// ===== API 路由 =====
app.post("/api/upload-song", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      creators,
      lyricist,
      composer,
      albums,
      release_date,
      lyrics,
      language,
      genre,
      original_artist,
      rating
    } = req.body;

    if (!title || !creators || !lyrics) {
      return res.status(400).json({
        error: "請填寫所有必填欄位（歌曲名稱、創作者、歌詞）"
      });
    }

    const newSong = {
      id: `song${Date.now()}`,
      title: title.trim(),
      creators: creators.split(",").map((c) => c.trim()),
      lyricist: lyricist ? lyricist.split(",").map((l) => l.trim()) : [],
      composer: composer ? composer.split(",").map((c) => c.trim()) : [],
      albums: albums ? albums.trim() : "",
      release_date: release_date || "",
      lyrics: lyrics.trim(),
      image: req.file ? `images/${req.file.filename}` : "",
      language: language || "",
      genre: genre || "",
      original_artist: original_artist
        ? original_artist.split(",").map((oa) => oa.trim())
        : [],
      rating: rating || ""
    };

    console.log("📝 準備新增歌曲:", newSong.title);

    // 讀取 main.js 並更新
    const mainJsPath = path.join(__dirname, "main.js");
    let mainJsContent = await fs.readFile(mainJsPath, "utf8");

    // 檢查重複歌曲
    const songsArrayMatch = mainJsContent.match(
      /const songs = \[([\s\S]*?)\];/
    );

    if (songsArrayMatch) {
      const songsArrayContent = songsArrayMatch[1];
      const duplicatePattern = new RegExp(
        `title:\\s*["'\`]${newSong.title.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}["'\`]`,
        "i"
      );

      if (duplicatePattern.test(songsArrayContent)) {
        const creatorPattern = new RegExp(
          `creators:\\s*\\[[^\\]]*${newSong.creators[0].replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          )}[^\\]]*\\]`,
          "i"
        );

        if (creatorPattern.test(songsArrayContent)) {
          // 刪除已上傳的圖片（如果有）
          if (req.file) {
            try {
              await fs.unlink(req.file.path);
            } catch (unlinkError) {
              console.error("刪除圖片失敗:", unlinkError);
            }
          }

          return res.status(400).json({
            error: `歌曲「${newSong.title}」by ${newSong.creators.join(
              ", "
            )} 已經存在，無法重複新增。`
          });
        }
      }
    }

    // 找到 songs 陣列位置
    const songsArrayStart = mainJsContent.indexOf("const songs = [");
    if (songsArrayStart === -1) {
      throw new Error("找不到 songs 陣列");
    }

    const searchFrom = songsArrayStart + "const songs = [".length;
    let songsArrayEnd = mainJsContent.indexOf("];", searchFrom);
    if (songsArrayEnd === -1) {
      throw new Error("找不到 songs 陣列結束位置");
    }

    // 取得現有歌曲內容
    const songsContent = mainJsContent.slice(
      songsArrayStart + "const songs = [".length,
      songsArrayEnd
    );

    const hasExistingSongs = songsContent.trim().length > 0;
    const newSongCode = `${hasExistingSongs ? "," : ""}
{
    id: "${newSong.id}",
    title: "${newSong.title}",
    creators: ${JSON.stringify(newSong.creators)},
    lyricist: ${JSON.stringify(newSong.lyricist)},
    composer: ${JSON.stringify(newSong.composer)},
    albums: "${newSong.albums}",
    release_date: "${newSong.release_date}",
    language: "${newSong.language}",
    genre: "${newSong.genre}",
    lyrics: \`${newSong.lyrics.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    image: "${newSong.image}",
    original_artist: ${JSON.stringify(newSong.original_artist)},
    rating: "${newSong.rating}"
}`;

    mainJsContent =
      mainJsContent.slice(0, songsArrayEnd) +
      newSongCode +
      mainJsContent.slice(songsArrayEnd);

    await fs.writeFile(mainJsPath, mainJsContent, "utf8");

    console.log("✅ 歌曲新增成功:", newSong.title);

    res.json({
      success: true,
      message: "歌曲上傳成功！頁面將自動重新整理。",
      song: newSong
    });
  } catch (error) {
    console.error("❌ 上傳錯誤:", error);
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("刪除圖片失敗:", unlinkError);
      }
    }

    res.status(500).json({
      error: "伺服器錯誤：" + error.message
    });
  }
});

app.get("/api/songs", async (req, res) => {
  try {
    const mainJsPath = path.join(__dirname, "main.js");
    const mainJsContent = await fs.readFile(mainJsPath, "utf8");

    res.json({
      success: true,
      message: "歌曲資料在 main.js 中"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 收藏句子 API
app.post("/api/add-favorite", async (req, res) => {
  try {
    const { lyrics, note, songId, songTitle, songCreators } = req.body;

    if (!lyrics || !songTitle) {
      return res.status(400).json({
        error: "請填寫歌詞片段和歌曲名稱"
      });
    }

    const newFavorite = {
      id: `fav${Date.now()}`,
      lyrics: lyrics.trim(),
      note: note ? note.trim() : "",
      songId: songId,
      songTitle: songTitle,
      songCreators: songCreators,
      createdAt: new Date().toISOString()
    };

    console.log("📝 準備新增收藏句子");

    const mainJsPath = path.join(__dirname, "main.js");
    let mainJsContent = await fs.readFile(mainJsPath, "utf8");

    // 找到 favorites 陣列
    const favoritesArrayStart = mainJsContent.indexOf("const favorites = [");
    if (favoritesArrayStart === -1) {
      throw new Error("找不到 favorites 陣列");
    }

    const searchFrom = favoritesArrayStart + "const favorites = [".length;
    let favoritesArrayEnd = mainJsContent.indexOf("];", searchFrom);
    if (favoritesArrayEnd === -1) {
      throw new Error("找不到 favorites 陣列結束位置");
    }

    const favoritesContent = mainJsContent.slice(
      favoritesArrayStart + "const favorites = [".length,
      favoritesArrayEnd
    );

    const hasExistingFavorites = favoritesContent.trim().length > 0;
    const newFavoriteCode = `${hasExistingFavorites ? "," : ""}
{
    id: "${newFavorite.id}",
    lyrics: \`${newFavorite.lyrics
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$")}\`,
    note: "${newFavorite.note.replace(/"/g, '\\"')}",
    songId: "${newFavorite.songId}",
    songTitle: "${newFavorite.songTitle.replace(/"/g, '\\"')}",
    songCreators: "${newFavorite.songCreators.replace(/"/g, '\\"')}",
    createdAt: "${newFavorite.createdAt}"
}`;

    mainJsContent =
      mainJsContent.slice(0, favoritesArrayEnd) +
      newFavoriteCode +
      mainJsContent.slice(favoritesArrayEnd);

    await fs.writeFile(mainJsPath, mainJsContent, "utf8");

    console.log("✅ 收藏句子新增成功");

    res.json({
      success: true,
      message: "收藏成功！頁面將自動重新整理。",
      favorite: newFavorite
    });
  } catch (error) {
    console.error("❌ 收藏錯誤:", error);
    res.status(500).json({
      error: "伺服器錯誤：" + error.message
    });
  }
});

// 刪除收藏 API
app.post("/api/delete-favorite", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "缺少 ID" });
    }

    console.log("📝 準備刪除收藏:", id);

    const mainJsPath = path.join(__dirname, "main.js");
    let mainJsContent = await fs.readFile(mainJsPath, "utf8");

    // ===== 改進的刪除邏輯 =====

    // 1. 找到 favorites 陣列的範圍
    const favoritesStart = mainJsContent.indexOf("const favorites = [");
    if (favoritesStart === -1) {
      return res.status(404).json({ error: "找不到 favorites 陣列" });
    }

    const arrayContentStart = favoritesStart + "const favorites = [".length;
    const arrayEnd = mainJsContent.indexOf("];", arrayContentStart);

    if (arrayEnd === -1) {
      return res.status(404).json({ error: "找不到 favorites 陣列結束" });
    }

    // 2. 提取陣列內容
    const arrayContent = mainJsContent.slice(arrayContentStart, arrayEnd);

    // 3. 更精確的 ID 匹配模式
    const favoritePattern = new RegExp(
      `\\s*,?\\s*\\{[^}]*?id:\\s*["'\`]${id.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}["'\`][^}]*?\\}\\s*,?`,
      "gs"
    );

    const beforeDelete = arrayContent;
    let newArrayContent = arrayContent.replace(favoritePattern, "");

    if (newArrayContent === beforeDelete) {
      return res.status(404).json({ error: `找不到 ID 為 ${id} 的收藏項目` });
    }

    // 4. 清理格式問題
    // 清理多餘的逗號
    newArrayContent = newArrayContent
      .replace(/,\s*,+/g, ",") // 多個連續逗號
      .replace(/^\s*,+/g, "") // 開頭的逗號
      .replace(/,+\s*$/g, "") // 結尾的逗號
      .replace(/,(\s*,)+/g, ","); // 重複的逗號

    // 5. 重建檔案內容
    const newMainJsContent =
      mainJsContent.slice(0, arrayContentStart) +
      newArrayContent +
      mainJsContent.slice(arrayEnd);

    await fs.writeFile(mainJsPath, newMainJsContent, "utf8");

    console.log("✅ 收藏刪除成功，ID:", id);

    res.json({
      success: true,
      message: "刪除成功！"
    });
  } catch (error) {
    console.error("❌ 刪除錯誤:", error);
    res.status(500).json({
      error: "伺服器錯誤：" + error.message
    });
  }
});

// ===== 啟動伺服器 =====
async function startServer() {
  await ensureDirectories();

  app.listen(PORT, "0.0.0.0", () => {
    console.log("");
    console.log("🎵 ===== 詩詞歌曲收藏系統 =====");
    console.log(`🚀 伺服器運行於: http://localhost:${PORT}`);
    console.log("📂 靜態檔案目錄: 當前資料夾");
    console.log("📸 圖片儲存目錄: images/");
    console.log("");
    console.log("✅ 伺服器已啟動，請開啟瀏覽器訪問上述網址");
    console.log("❌ 按 Ctrl+C 停止伺服器");
    console.log("=====================================");
    console.log("");
  });
}

// 啟動應用
startServer().catch(console.error);

// 優雅關閉
process.on("SIGTERM", () => {
  console.log("收到 SIGTERM 信號，正在關閉伺服器...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n收到中斷信號，正在關閉伺服器...");
  process.exit(0);
});

// ===== 匯出功能 =====
app.get("/api/export/songs", async (req, res) => {
  try {
    const mainJsPath = path.join(__dirname, "main.js");
    const mainJsContent = await fs.readFile(mainJsPath, "utf8");

    // 提取歌曲資料
    const songsMatch = mainJsContent.match(/const songs = (\[[\s\S]*?\]);/);
    const favoritesMatch = mainJsContent.match(
      /const favorites = (\[[\s\S]*?\]);/
    );

    let songsData = [];
    let favoritesData = [];

    if (songsMatch) {
      try {
        songsData = eval(songsMatch[1]);
      } catch (evalError) {
        console.error("解析歌曲資料失敗:", evalError);
      }
    }

    if (favoritesMatch) {
      try {
        favoritesData = eval(favoritesMatch[1]);
      } catch (evalError) {
        console.error("解析收藏資料失敗:", evalError);
      }
    }

    const exportData = {
      exportTime: new Date().toISOString(),
      source: "Song Collection System",
      version: "1.0",
      totalSongs: songsData.length,
      totalFavorites: favoritesData.length,
      songs: songsData,
      favorites: favoritesData
    };

    // 設定下載檔頭
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="songs-export.json"'
    );
    res.setHeader("Content-Type", "application/json");

    console.log(
      `✅ 匯出資料：${songsData.length} 首歌曲，${favoritesData.length} 個收藏`
    );

    res.json(exportData);
  } catch (error) {
    console.error("❌ 匯出失敗:", error);
    res.status(500).json({
      error: "匯出失敗：" + error.message
    });
  }
});

// ===== 查看資料功能 =====
app.get("/api/debug/data", async (req, res) => {
  try {
    const mainJsPath = path.join(__dirname, "main.js");
    const mainJsContent = await fs.readFile(mainJsPath, "utf8");

    // 提取歌曲和收藏資料
    const songsMatch = mainJsContent.match(/const songs = (\[[\s\S]*?\]);/);
    const favoritesMatch = mainJsContent.match(
      /const favorites = (\[[\s\S]*?\]);/
    );

    let songsData = [];
    let favoritesData = [];

    if (songsMatch) {
      try {
        songsData = eval(songsMatch[1]);
      } catch (evalError) {
        console.error("解析歌曲資料失敗:", evalError);
      }
    }

    if (favoritesMatch) {
      try {
        favoritesData = eval(favoritesMatch[1]);
      } catch (evalError) {
        console.error("解析收藏資料失敗:", evalError);
      }
    }

    res.json({
      success: true,
      server: "Local Development",
      dataTime: new Date().toISOString(),
      filePath: mainJsPath,
      summary: {
        totalSongs: songsData.length,
        totalFavorites: favoritesData.length,
        lastSong:
          songsData.length > 0 ? songsData[songsData.length - 1].title : "無",
        lastFavorite:
          favoritesData.length > 0
            ? favoritesData[favoritesData.length - 1].lyrics.substring(0, 50) +
              "..."
            : "無"
      },
      songs: songsData.map((song, index) => ({
        index: index + 1,
        id: song.id,
        title: song.title,
        creators: song.creators,
        albums: song.albums,
        release_date: song.release_date
      })),
      favorites: favoritesData.map((fav, index) => ({
        index: index + 1,
        id: fav.id,
        lyrics:
          fav.lyrics.substring(0, 100) + (fav.lyrics.length > 100 ? "..." : ""),
        songTitle: fav.songTitle
      }))
    });
  } catch (error) {
    console.error("❌ 查看資料失敗:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== 匯入功能 (防止收藏重複) =====
app.post("/api/import/songs", async (req, res) => {
  try {
    console.log("📥 收到匯入請求");

    if (!req.body) {
      return res.status(400).json({
        error: "請求體為空"
      });
    }

    let importData = req.body;
    let importSongs = [];
    let importFavorites = [];

    // 處理不同的資料格式
    if (importData.songs && Array.isArray(importData.songs)) {
      importSongs = importData.songs;
      importFavorites = importData.favorites || [];
      console.log("📊 標準格式匯入");
    } else if (Array.isArray(importData)) {
      importSongs = importData;
      console.log("📊 陣列格式匯入");
    } else if (importData.exportTime) {
      importSongs = importData.songs || [];
      importFavorites = importData.favorites || [];
      console.log("📊 匯出檔案格式匯入");
    } else {
      return res.status(400).json({
        error: "無法識別的資料格式。請確認 JSON 檔案包含 songs 陣列。",
        received: Object.keys(importData)
      });
    }

    console.log(
      `📊 準備匯入：${importSongs.length} 首歌曲，${importFavorites.length} 個收藏`
    );

    if (importSongs.length === 0 && importFavorites.length === 0) {
      return res.status(400).json({
        error: "沒有找到可匯入的資料"
      });
    }

    const mainJsPath = path.join(__dirname, "main.js");
    let mainJsContent = await fs.readFile(mainJsPath, "utf8");

    let importedSongsCount = 0;
    let importedFavoritesCount = 0;
    let duplicatesCount = 0;
    let favoritesDuplicatesCount = 0;
    let errors = [];

    // ===== 匯入歌曲 =====
    if (importSongs.length > 0) {
      for (let i = 0; i < importSongs.length; i++) {
        const song = importSongs[i];

        try {
          if (!song.title) {
            errors.push(`歌曲 ${i + 1}: 缺少標題`);
            continue;
          }

          if (!song.lyrics) {
            errors.push(`歌曲 ${i + 1}: 缺少歌詞`);
            continue;
          }

          // 檢查重複（簡化版）
          const titleCheck = mainJsContent.includes(`title: "${song.title}"`);

          if (!titleCheck) {
            const songsArrayStart = mainJsContent.indexOf("const songs = [");
            const searchFrom = songsArrayStart + "const songs = [".length;
            const songsArrayEnd = mainJsContent.indexOf("];", searchFrom);

            const songsContent = mainJsContent.slice(searchFrom, songsArrayEnd);
            const hasExistingSongs = songsContent.trim().length > 0;

            // 清理和驗證資料
            const cleanTitle = (song.title || "").replace(/"/g, '\\"');
            const cleanLyrics = (song.lyrics || "")
              .replace(/`/g, "\\`")
              .replace(/\$/g, "\\$")
              .replace(/\\/g, "\\\\");
            const cleanAlbums = (song.albums || "").replace(/"/g, '\\"');

            // 確保 creators 是陣列
            let creators = [];
            if (Array.isArray(song.creators)) {
              creators = song.creators;
            } else if (typeof song.creators === "string") {
              creators = [song.creators];
            }

            const newSongCode = `${hasExistingSongs ? "," : ""}
{
    id: "${
      song.id ||
      `imported_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }",
    title: "${cleanTitle}",
    creators: ${JSON.stringify(creators)},
    lyricist: ${JSON.stringify(song.lyricist || [])},
    composer: ${JSON.stringify(song.composer || [])},
    albums: "${cleanAlbums}",
    release_date: "${song.release_date || ""}",
    language: "${song.language || ""}",
    genre: "${song.genre || ""}",
    lyrics: \`${cleanLyrics}\`,
    image: "${song.image || ""}",
    original_artist: [],
    rating: ""
}`;

            mainJsContent =
              mainJsContent.slice(0, songsArrayEnd) +
              newSongCode +
              mainJsContent.slice(songsArrayEnd);

            importedSongsCount++;
            console.log(`✅ 匯入歌曲 ${i + 1}: ${song.title}`);
          } else {
            duplicatesCount++;
            console.log(`⚠️ 跳過重複歌曲 ${i + 1}: ${song.title}`);
          }
        } catch (songError) {
          errors.push(`歌曲 ${i + 1} (${song.title}): ${songError.message}`);
          console.error(`❌ 歌曲 ${i + 1} 匯入失敗:`, songError);
        }
      }
    }

    // ===== 匯入收藏 (防重複版本) =====
    if (importFavorites.length > 0) {
      console.log(`🔍 開始匯入收藏，檢查重複`);

      // 用 Set 來追蹤已處理的收藏（避免同一批匯入中的重複）
      const processedFavorites = new Set();

      for (let i = 0; i < importFavorites.length; i++) {
        const favorite = importFavorites[i];

        try {
          if (!favorite.lyrics) {
            errors.push(`收藏 ${i + 1}: 缺少歌詞內容`);
            continue;
          }

          // ===== 簡單的重複檢查 =====
          const lyricsKey = favorite.lyrics
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "");

          // 1. 檢查在當前匯入批次中是否重複
          if (processedFavorites.has(lyricsKey)) {
            favoritesDuplicatesCount++;
            console.log(
              `⚠️ 跳過批次內重複收藏 ${i + 1}: ${favorite.lyrics.substring(
                0,
                30
              )}...`
            );
            continue;
          }

          // 2. 檢查在現有檔案中是否已存在（簡單字串搜尋）
          const lyricsSearchPattern = favorite.lyrics.substring(0, 20); // 取前20字符搜尋
          if (mainJsContent.includes(lyricsSearchPattern)) {
            favoritesDuplicatesCount++;
            console.log(
              `⚠️ 跳過檔案中重複收藏 ${i + 1}: ${favorite.lyrics.substring(
                0,
                30
              )}...`
            );
            continue;
          }

          // ===== 新增收藏 =====
          const favoritesArrayStart = mainJsContent.indexOf(
            "const favorites = ["
          );
          if (favoritesArrayStart !== -1) {
            const searchFrom =
              favoritesArrayStart + "const favorites = [".length;
            const favoritesArrayEnd = mainJsContent.indexOf("];", searchFrom);

            const favoritesContent = mainJsContent.slice(
              searchFrom,
              favoritesArrayEnd
            );
            const hasExistingFavorites = favoritesContent.trim().length > 0;

            const cleanFavLyrics = (favorite.lyrics || "")
              .replace(/`/g, "\\`")
              .replace(/\$/g, "\\$")
              .replace(/\\/g, "\\\\");

            const newFavoriteCode = `${hasExistingFavorites ? "," : ""}
{
    id: "${
      favorite.id ||
      `imported_fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }",
    lyrics: \`${cleanFavLyrics}\`,
    note: "${(favorite.note || "").replace(/"/g, '\\"')}",
    songId: "${favorite.songId || ""}",
    songTitle: "${(favorite.songTitle || "").replace(/"/g, '\\"')}",
    songCreators: "${(favorite.songCreators || "").replace(/"/g, '\\"')}",
    createdAt: "${favorite.createdAt || new Date().toISOString()}"
}`;

            mainJsContent =
              mainJsContent.slice(0, favoritesArrayEnd) +
              newFavoriteCode +
              mainJsContent.slice(favoritesArrayEnd);

            // 記錄已處理的收藏
            processedFavorites.add(lyricsKey);

            importedFavoritesCount++;
            console.log(
              `✅ 匯入收藏 ${i + 1}: ${favorite.lyrics.substring(0, 30)}...`
            );
          }
        } catch (favError) {
          errors.push(`收藏 ${i + 1}: ${favError.message}`);
          console.error(`❌ 收藏 ${i + 1} 匯入失敗:`, favError);
        }
      }
    }

    // 儲存更新後的檔案
    await fs.writeFile(mainJsPath, mainJsContent, "utf8");

    const totalDuplicates = duplicatesCount + favoritesDuplicatesCount;
    const resultMessage = `匯入完成！新增了 ${importedSongsCount} 首歌曲和 ${importedFavoritesCount} 個收藏。${
      totalDuplicates > 0
        ? `跳過 ${duplicatesCount} 個重複歌曲和 ${favoritesDuplicatesCount} 個重複收藏。`
        : ""
    }${errors.length > 0 ? `有 ${errors.length} 個錯誤。` : ""}`;

    console.log(`✅ ${resultMessage}`);

    res.json({
      success: true,
      message: resultMessage,
      imported: {
        songs: importedSongsCount,
        favorites: importedFavoritesCount,
        songDuplicates: duplicatesCount,
        favoriteDuplicates: favoritesDuplicatesCount,
        errors: errors.length
      },
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error("❌ 匯入失敗:", error);
    res.status(500).json({
      error: "匯入失敗：" + error.message,
      stack: error.stack
    });
  }
});

// ===== 刪除歌曲 API =====
app.post("/api/delete-song", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "缺少歌曲 ID" });
    }

    console.log("準備刪除歌曲:", id);

    const mainJsPath = path.join(__dirname, "main.js");
    let mainJsContent = await fs.readFile(mainJsPath, "utf8");

    // ===== 找到並刪除歌曲 =====

    // 1. 找到 songs 陣列的範圍
    const songsStart = mainJsContent.indexOf("const songs = [");
    if (songsStart === -1) {
      return res.status(404).json({ error: "找不到 songs 陣列" });
    }

    const arrayContentStart = songsStart + "const songs = [".length;
    const arrayEnd = mainJsContent.indexOf("];", arrayContentStart);

    if (arrayEnd === -1) {
      return res.status(404).json({ error: "找不到 songs 陣列結束" });
    }

    // 2. 提取陣列內容
    const arrayContent = mainJsContent.slice(arrayContentStart, arrayEnd);

    // 3. 精確的 ID 匹配模式
    const songPattern = new RegExp(
      `\\s*,?\\s*\\{[^}]*?id:\\s*["'\`]${id.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}["'\`][^}]*?\\}\\s*,?`,
      "gs"
    );

    const beforeDelete = arrayContent;
    let newArrayContent = arrayContent.replace(songPattern, "");

    if (newArrayContent === beforeDelete) {
      return res.status(404).json({ error: `找不到 ID 為 ${id} 的歌曲` });
    }

    // 4. 清理格式問題
    newArrayContent = newArrayContent
      .replace(/,\s*,+/g, ",") // 多個連續逗號
      .replace(/^\s*,+/g, "") // 開頭的逗號
      .replace(/,+\s*$/g, "") // 結尾的逗號
      .replace(/,(\s*,)+/g, ","); // 重複的逗號

    // 5. 重建檔案內容
    const newMainJsContent =
      mainJsContent.slice(0, arrayContentStart) +
      newArrayContent +
      mainJsContent.slice(arrayEnd);

    // ===== 同時刪除相關的圖片檔案 =====
    try {
      // 提取要刪除的歌曲資料以獲取圖片路徑
      const songMatch = beforeDelete.match(songPattern);
      if (songMatch) {
        const songData = songMatch[0];
        const imageMatch = songData.match(/image:\s*["']([^"']+)["']/);
        if (
          imageMatch &&
          imageMatch[1] &&
          imageMatch[1] !== "images/gray.jpg"
        ) {
          const imagePath = path.join(__dirname, imageMatch[1]);
          await fs.unlink(imagePath);
          console.log("🖼️ 已刪除相關圖片:", imageMatch[1]);
        }
      }
    } catch (imageError) {
      console.warn("⚠️ 刪除圖片時發生錯誤:", imageError.message);
      // 圖片刪除失敗不影響歌曲刪除
    }

    // ===== 刪除相關的收藏 =====
    try {
      let updatedContent = newMainJsContent;

      // 找到 favorites 陣列並刪除相關收藏
      const favoritesStart = updatedContent.indexOf("const favorites = [");
      if (favoritesStart !== -1) {
        const favArrayContentStart =
          favoritesStart + "const favorites = [".length;
        const favArrayEnd = updatedContent.indexOf("];", favArrayContentStart);

        if (favArrayEnd !== -1) {
          const favArrayContent = updatedContent.slice(
            favArrayContentStart,
            favArrayEnd
          );

          // 刪除與此歌曲相關的收藏
          const relatedFavoritePattern = new RegExp(
            `\\s*,?\\s*\\{[^}]*?songId:\\s*["'\`]${id.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            )}["'\`][^}]*?\\}\\s*,?`,
            "gs"
          );

          let newFavContent = favArrayContent.replace(
            relatedFavoritePattern,
            ""
          );
          newFavContent = newFavContent
            .replace(/,\s*,+/g, ",")
            .replace(/^\s*,+/g, "")
            .replace(/,+\s*$/g, "")
            .replace(/,(\s*,)+/g, ",");

          updatedContent =
            updatedContent.slice(0, favArrayContentStart) +
            newFavContent +
            updatedContent.slice(favArrayEnd);
        }
      }

      newMainJsContent = updatedContent;
    } catch (favError) {
      console.warn("⚠️ 刪除相關收藏時發生錯誤:", favError.message);
    }

    await fs.writeFile(mainJsPath, newMainJsContent, "utf8");

    console.log("✅ 歌曲刪除成功，ID:", id);

    res.json({
      success: true,
      message: "歌曲及相關資料刪除成功！"
    });
  } catch (error) {
    console.error("❌ 刪除歌曲錯誤:", error);
    res.status(500).json({
      error: "伺服器錯誤：" + error.message
    });
  }
});
