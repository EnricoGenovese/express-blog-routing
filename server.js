const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

const postsRouter = require("./routers/posts.js");

// At localhost:3000
app.get("/", (req, res) => {
    res.send("<h1>Server del mio blog</h1>")
})


// Routes

app.use("/posts", postsRouter);


// At address not found
app.all("*", (req, res) => {
    res.status(404).send("<h1>Error 404 - Not found</h1>");
})

// Listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})