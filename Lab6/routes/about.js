const express = require("express");
const router = express.Router();
const aboutData = {
    "name": "Mounika Bandam",
    "biography": "I have done my Bachelor’s in Computer Science in 2014 and I love to code. After completion of Bachelors, I started working for TEKsystems Global Services for two years. I worked as an ETL Developer and I have a great experience on ETL Tools Informatica, DAC, ODI, and database Oracle. I have experience in various EBS modules Procurement, MRP, Manufacturing, Sales, Finance, and Quality. Interest on coding dragged me to learn new programming languages Python and R.",
    "favoriteShows": ["Shark Tank", "Silicon Valley", "Friends","Prision Break","Ozark"],
    "hobbies": ["Drawing", "Singing", "Collecting Coins and Stamps","Dancing","Treking"]
};

router.get("/", (req,res) => {
    try {
        return res.json(aboutData);
    } catch (error) {
        //not found
        return res.status(500).send();
    }
});

// router.post();

module.exports = router;