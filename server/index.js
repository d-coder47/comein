const express = require("express");
const path = require("path");
const fs = require("fs");
const getPostById = require("./stubs/posts");
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, "..", "dist", "index.html");

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);
// here we serve the index.html page
app.get("/*", async (req, res, next) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    const post = await getPostById(postId);

    if (!post) return res.status(404).send("Post not found");

    const imagePath = `https://comein.cv/comeincv/server/src/${post.tipo}Img/${post.imagem}`;

    // inject meta tags
    htmlData = htmlData
      .replace("<title>React App</title>", `<title>${post.nome}</title>`)
      .replace("__META_OG_TITLE__", post.nome)
      .replace("__META_OG_DESCRIPTION__", post.descricao)
      .replace("__META_DESCRIPTION__", post.descricao)
      .replace("__META_OG_IMAGE__", imagePath);
    return res.send(htmlData);
  });
});
// listening on por 3000...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
