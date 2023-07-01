const express = require("express");
const router = express.Router();
let Streamer = require("../models/streamer.model");

router.get("/", (req, res) => {
  Streamer.find()
    .then((streamers) => res.json(streamers))
    .catch((err) => res.status(400).json(`Failed to get streamers : ${err}`));
});

router.get("/:id", (req, res) => {
  Streamer.findById(req.params.id)
    .then((streamer) => res.json(streamer))
    .catch((err) => res.status(400).json(`Failed to get streamer : ${err}`));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, description, platform } = req.body;

  const existingStreamer = await Streamer.findOne({ name, platform });

  if (existingStreamer) {
    return res.status(409).json({ error: "Streamer already exists" });
  }

  const streamer = new Streamer({
    name,
    description,
    platform,
  });

  console.log(streamer);

  streamer
    .save()
    .then(() => res.status(201).json(streamer))
    .catch((err) =>
      res.status(400).json({ error: `Failed to create streamer : ${err}` })
    );
});

router.put("/:id/vote", (req, res) => {
  const voteType = req.body.voteType;
  console.log(req.body);
  Streamer.findById(req.params.id)
    .then((streamer) => {
      streamer.votes =
        voteType === "upvote" ? streamer.votes + 1 : streamer.votes - 1;
      streamer
        .save()
        .then(() => res.json(streamer))
        .catch((err) =>
          res.status(400).json(`Failed to update streamer : ${err}`)
        );
    })
    .catch((err) => res.status(400).json(`Failed to update streamer : ${err}`));
});

module.exports = router;
