const express = require("express");
const router = express.Router();
const storyData = {
    "storyTitle": "My Ramp Walk Experience",
    "story": "I am a girl who does not have the permission to wear western dresses. While working in TEKsystems, I have had an opportunity to explore many things. In the 2016 fest, I became a member of a ramp walk group. The theme of the ramp walk is Angels and Demons. I was part of demons team, for this I had to wear a single piece of black dress. I never had a dress like that, so I went shopping and bought a nice dress and sandals. In the 2016 fest, I was also part of the Fun Awards hosting. So, unfortunately, these two events became continuously and I really did not have the time to change my dress and makeup. I had decided to wear my demon dress with makeup for the fun awards too. And I covered it up by saying to the crowd as Now, we are going to have Fun Awards, So we thought why not we look funny to give these awards and every person in the auditorium went on laughing. As soon as I finished the fun awards I went for ramp walk and I really had a great experience by doing this."
};

router.get("/", (req,res) => {
    try {
        res.json(storyData);
    } catch (error) {
        //not found
        res.status(500).send();
    }
});

module.exports = router;