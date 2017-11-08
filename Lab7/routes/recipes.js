const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/", async (req, res) => {
    try {
        const recipeList = await recipeData.getAllRecipes();
        res.json(recipeList);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const recipe = await recipeData.getRecipeById(req.params.id);
        res.json(recipe);
    } catch (e) {
        res.status(404).json({error: "Recipe not found for the given recipe id"});
    }
});

router.post("/", async (req, res) => {
    const recipePostData = req.body;
    try {
        const {title, ingredients, steps, comments} = recipePostData;
        const newRecipe = await recipeData.addRecipe(title, ingredients, steps, comments);

        res.json(newRecipe);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    try {
        await recipeData.getRecipeById(req.params.id);
    } catch (e) {
        res.status(404).json({error: "Recipe not found for the given recipe id"});
    }

    try {
        const updatedRecipe = await recipeData.updateRecipe(req.params.id, updatedData);
        res.json(updatedRecipe);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await recipeData.getRecipeById(req.params.id);
    } catch (e) {
        res.status(404).json({error: "Recipe not found for the given recipe id"});
    }
    try {
        await recipeData.removeRecipe(req.params.id);
    } catch (e) {
        res.status.json({error: e});
    }
});

module.exports = router;