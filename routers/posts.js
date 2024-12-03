/*
### Esercizio
Usando l'array dei post con le relative immagini, creare un file di routing (routers/posts.js) che conterrà le rotte necessarie per l'entità post.
All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)
Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST.
Ad esempio:
Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;
Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
e via dicendo… 
Registrare il router dentro app.js con il prefisso /posts.
### Bonus
- Provare a restituire la lista dei post dalla rotta index, in formato json
- Provare a restituire un singolo post dalla rotta show, sempre in formato json
*/

const express = require("express");
const router = express.Router();

const posts = require("../data/database.js");

// Index - Get all posts: localhost:3000/posts
router.get("/", (req, res) => {
    const postName = req.query.name;
    //
    let response = {
        totalPosts: posts.length,
        data: [...posts]
    };
    //
    if (postName) {
        response.data = posts.myPosts.filter((item) => {
            item.name.toLowerCase().includes(postName.toLowerCase())
        });
        //    
        if (response.data.length < 1) {
            res.status(404);
            response = {
                error: 404,
                message: "Post not found",
            };
        }
    }
    res.json(response);
});

// Show - Get one post by id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    //
    if (post) {
        res.json({
            success: true,
            post,
        });
    } else {
        res.json({
            success: false,
            messegge: "Post not found!"
        });
    }
});

// Store - Create a new item

router.post("/", (req, res) => {
    res.send("New post created!");
});

// Update - Change an item fully

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send("Item fully modified");
    } else {
        res.send("Cannot update what doe not exist")
    }
});

// Modify - Modify partially an item

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send("Item patched")
    } else {
        res.send("Cannot patch what does not exist")
    }

})

// Destroy - Deletes an element

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send(`Item ${id} destroyed`)
    } else {
        res.send("Cannot destroy what does not exist")
    }

})

// Mid point
module.exports = router;