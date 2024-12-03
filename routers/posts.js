const express = require("express");
const router = express.Router();

const posts = require("../data/database.js");

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
})


// Mid point
module.exports = router;