const mongoose = require('mongoose');

const streamPlatforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];

const streamerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        enum: streamPlatforms,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
});

const Streamer = mongoose.model('Streamer', streamerSchema);

module.exports = Streamer;
