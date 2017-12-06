const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;

router.get("/recipe/:recipeId", async (req, res) => {
    try {
        const comment = await commentData.getCommentByRecipeId(req.params.recipeId);
        res.json(comment);
    } catch (e) {
        res.status(404).json({error: "Comment not found for the given recipe id"});
    }
});

router.get("/:commentId", async (req,res) => {
    try {
        const comment = await commentData.getCommentByCommentId(req.params.commentId);
        res.json(comment);
    } catch (e) {
        res.status(404).json({error: "Comment not found for the given comment id"});
    }
});

router.post("/:recipeId", async (req,res)=>{
    let commentInfo = req.body;
    if (!commentInfo) {
        res.status(400).json({error: "You must provide data to create a comment."});
        return;
    }
    if (!commentInfo.poster) {
        res.status(400).json({error: "You must provide a poster."});
        return;
    }
    if (!commentInfo.comment) {
        res.status(400).json({error: "You must provide comment."});
        return;
    }
    try {
        const result = await commentsData.addComment(req.params.recipeId, commentInfo.poster, commentInfo.comment);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e});
    }
});


router.put("/:recipeId/:commentId", async (req,res)=>{
    let commentInfo = req.body;
    if (!commentInfo) {
        res.status(400).json({error: "You must provide data to update a comment."});
        return;
    }
    if (!req.params.recipeId) {
        res.status(400).json({error: "You must provide a recipeId."});
        return;
    }
    if (!req.params.commentId) {
        res.status(400).json({error: "You must provide a commentId."});
        return;
    }
    try{
        const getData = await commentsData.getCommentByCommentId(req.params.commentId);
        try {
            const result = await commentsData.updateComment(req.params.recipeId,req.params.commentId,commentInfo);
            res.json(result);
        } catch(e) {
            console.log(e);
            res.status(500).json({error: e});
        }
    } catch(e) {
        console.log(e);
        res.status(404).json({error: "Comment not found for the given comment id."});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await commentData.getCommentByCommentId(req.params.id);
    } catch (e) {
        res.status(404).json({error: "Comment not found for the given comment id"});
        return;
    }

    try {
        await commentData.removeComment(res.params.id);
        res,sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
        return;
    }
});

module.exports = router;