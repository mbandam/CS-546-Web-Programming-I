const express = require("express");
const router = express.Router();
const educationData = [
    {
      "schoolName": "Sri Sharadha Shishu Mandir",
      "degree": "LKG to 8th Standard",
      "favoriteClass": "Mathematics",
      "favoriteMemory": "My memory about the school is when i was become the school leader and continued for five years."
    },
    {
      "schoolName": "Kakatiya High School",
      "degree": "9th and 10th standard",
      "favoriteClass": "English",
      "favoriteMemory": "The best memory of Kaktiya school is when I won the medal for the best essay writing in english even though i was studying in the telugu medium."
    },
    {
        "schoolName": "Gnanadeep Junior College",
        "degree": "11th and 12th standard",
        "favoriteClass": "Physics",
        "favoriteMemory": "The best memory of this college is when I become a second topper of the college." ,
    },
    {
        "schoolName": "CMR College of Engineering and Technology",
        "degree": "Bachelor's in Computer Science",
        "favoriteClass": "C and C++",
        "favoriteMemory": "The best memory of the college is that I was the topper for all the eight semesters and when I got a full time job in TEKsystems.",
    },
    {
        "schoolName": "Stevens Institute of Technology",
        "degree": "Masters in Computer Science",
        "favoriteClass": "Multivariate Data Analytics",
        "favoriteMemory": "The best memory of the college is when I took Data Warehouse and Business Intelligence course, because this will help alot in my career.",
    }
];

router.get("/",async (req,res) => {
    try {
        res.json(educationData);
    } catch (error) {
        //not found
        res.status(500).send();
    }
});

module.exports = router;