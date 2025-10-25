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
      genre
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
      original_artist: [],
      rating: ""
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
    original_artist: [],
    rating: ""
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

    const favoriteRegex = new RegExp(
      `\\s*,?\\s*\\{[^}]*id:\\s*"${id}"[^}]*\\}\\s*,?`,
      "g"
    );

    const beforeDelete = mainJsContent;
    mainJsContent = mainJsContent.replace(favoriteRegex, "");

    if (mainJsContent === beforeDelete) {
      return res.status(404).json({ error: "找不到要刪除的收藏" });
    }

    // 清理格式問題
    mainJsContent = mainJsContent.replace(/,(\s*),+/g, ",");
    mainJsContent = mainJsContent.replace(/\[\s*,/g, "[");
    mainJsContent = mainJsContent.replace(/,(\s*)\]/g, "$1]");

    await fs.writeFile(mainJsPath, mainJsContent, "utf8");

    console.log("✅ 收藏刪除成功");

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
