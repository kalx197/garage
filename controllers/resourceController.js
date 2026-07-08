const Resource = require('../models/resourceModel');

exports.createResource = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required.' });

        const resourceId = await Resource.create(req.user.id, title, description);
        res.status(201).json({ message: 'Resource created successfully.', resourceId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.getUserResources = async (req, res) => {
    try {
        const resources = await Resource.findByUserId(req.user.id);
        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
