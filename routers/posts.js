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


// Mid point
module.exports = router;