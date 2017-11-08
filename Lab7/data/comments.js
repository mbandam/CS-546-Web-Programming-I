const mongoCollections = require("../config/mongoCollections");
const recipeC = mongoCollections.recipes;
const recipes = require("./recipes");
const uuid = require('uuid');

let exportedMethods = {
    
    async getCommentByRecipeId(id) {
        const recipe = await recipes.getRecipeById(id);
        const comments = recipe.comments;
        let allComments = [];
        for (let i = 0; i < comments.length; i++) {
            allComments.push({_id: comments[i]._id, recipeId: recipe._id, recipeTitle: recipe.title, poster: comments[i].poster, comment: comments[i].comment});
        }
        if (!allComments) throw "There is no comment found for the provided recipe id";
        return allComments;
    },

    async getCommentByCommentId(id) {
        const allRecipes = await recipes.getAllRecipes();
        let theRecipe = 0;
        let theComment = 0;
        for (let i = 0; i < allRecipes.length; i++) {
            for (let j = 0; j < allRecipes[i].comments.length; j++) {
                if (allRecipes[i].comments[j]._id === id) {
                    theRecipe = allRecipes[i];
                    theComment = allRecipes[i].comments[j].comment;
                }
            }
        }
        const comment = {_id: id, recipeId: theRecipe._id, recipeTitle: theRecipe.title, poster: theRecipe.poster, comment: theComment};
        if (!id) throw "There is no comment found for the provided comment id";
        return comment;
    },

    async addComment(recipeId, poster, comment) {
        const recipeCollection = await recipeC();
        const theRecipe = await recipeCollection.findOne({_id: recipeId});
        
        const theComment = {
            _id: uuid.v4,
            poster: poster,
            comment: comment
        };

        let newComment = {
            $push: {comments: theComment}
        };

        if(!comment) throw "You must provide a comment";

        await recipeCollection.updateOne({_id: recipeId}, newComment);
        return theComment;
    },

    async updateComment(recipeId, commentId, updatedComment) {
        const recipeCollection = await recipeC();
        const theRecipe = await recipeCollection.findOne({_id: recipeId});

        const updatedCommentData = {};

        if (updatedComment.poster) {
            recipeCollection.update({'comments._id': commentId}, {$set: {'comments.$.poster': updatedComment.poster}});
        }

        if (updatedComment.comment) {
            recipeCollection.update({'comments._id': commentId}, {$set: {'comments.$comment': updatedComment.comment}});
        }
        return await this.getCommentByCommentId(commentId);
    },

    async removeComment(id) {
        if (!id) throw "You must provide an id";
        
        const recipeCollection = await recipeC();
        const allRecipes = recipes.getAllRecipes();
        for (let i = 0; i < allRecipes.length; i++) {
            const allComments = await this.getCommentByRecipeId(allRecipes[i]._id);
            for (let j = 0; j < allComments.length; j++) {
                if (allComments[j]._id === id) {
                    let commentDeletion = await recipeCollection.update(
                        {_id: allRecipes[i]._id},
                        {$pull: {'comments': {_id: id}}}
                    )
                }
            }
        }
        return "{delete comment: true}";
    },
}

module.exports = exportedMethods;