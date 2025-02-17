const Profile = require('./model');

exports.getAllProfiles = async (req, res) => {
    try {
        const { skills, location } = req.query;
        let filter = {};

        if (skills) {
            filter.skills = { $in: skills.split(',') };
        }
        if (location) {
            filter['information.location'] = location;
        }

        const profiles = await Profile.find(filter);
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProfile = async (req, res) => {
    const { name, email } = req.body;
    const profile = new Profile({ name, email });
    try {
        const newProfile = await profile.save();
        res.status(201).json(newProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json({ message: 'Profile deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addExperience = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        profile.experience.push(req.body);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        profile.experience = profile.experience.filter(exp => exp._id.toString() !== req.params.expId);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addSkill = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        profile.skills.push(req.body.skill);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        profile.skills = profile.skills.filter(skill => skill !== req.params.skill);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateInformation = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        profile.information = req.body;
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
