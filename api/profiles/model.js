const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience: [
        {
            titre: {type: String},
            entreprise: {type: String},
            dates: {type: String},
            description: {type: String},
        },
    ],
    skills: [String],
    information: {
        bio: String,
        localisation: String,
        siteWeb: String,
    },
});

module.exports = mongoose.model('Profile', profileSchema);