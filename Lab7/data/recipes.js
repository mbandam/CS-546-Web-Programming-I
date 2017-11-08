const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const comments = require("./comments");
const uuid = require('uuid');

const exportedMethods = {
    async getAllRecipes() {
        const recipeCollection = await recipes();
        const allRecipes = await recipeCollection.find({}).toArray();
        let recipeArray = [];
        for (let i = 0; i < allRecipes.length; i++) {
            let content = {
                _id: allRecipes[i]._id,
                title: allRecipes[i].title
            }
            recipeArray.push(content);
        }
        return recipeArray;
    },

    async getRecipeById(id) {
        const recipeCollection = await recipes();
        const recipe = await recipeCollection.findOne({_id: id});
        if (!recipe) throw "Recipe not found";
        return recipe;
    },

    async addRecipe(title, ingredient, steps, comments) {
        if (typeof title !== "string") throw "No title provided";
        const recipeCollection = await recipes();
        const newRecipe = {
            _id: uuid.v4(),
            title: title,
            ingredient: ingredient,
            steps: steps,
            comments: comments
        }
        const newInsertInformation = await recipeCollection.insertOne(newRecipe);
        const newId = newInsertInformation.insertedId;
        return await this.getRecipeById(newId);
    },

    async updateRecipe(id, updatedRecipe) {
        const recipeCollection = await recipes();
        const updatedRecipeData = {};

        if (updatedRecipe.title) {
            updatedRecipeData.title = updatedRecipe.title; 
        }

        if (updatedRecipe.ingredient) {
            updatedRecipeData.ingredient = updatedRecipe.ingredient;
        }

        if (updatedRecipe.steps) {
            updatedRecipeData.steps = updatedRecipe.steps;
        }

        if (updatedRecipe.comments) {
            updatedRecipeData.comments = updatedRecipe.comments;
        }

        let updateCommand = {
            $set: updatedRecipeData
        };
        const query = {
            _id: id
        };
        await recipeCollection.updateOne(query, updateCommand);
        return await this.getRecipeById(id);
    },

    async removeRecipe(id) {
        const recipeCollection = await recipes();
        const deletionInfo = await recipeCollection.removeOne({_id: id});
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete recipe with id of ${id}`;
        }
    },
}

module.exports = exportedMethods;