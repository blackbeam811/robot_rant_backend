const Player = require('../models/Player');

// Get all players
exports.getPlayers = async (req, res, next) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
};

// Get a single player by ID
exports.getPlayerById = async (req, res, next) => {
    try {
        const player = await Player.findOne({ 'userInfo.wallet': req.params.id });
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
};

// Create a new player
exports.createPlayer = async (req, res, next) => {
    try {
        const { wallet, userName } = req.body;

        // Validate input
        if (!wallet || !userName) {
            return res.status(400).json({ message: 'Wallet and Username are required' });
        }
        const existingPlayer = await Player.findOne({ 'userInfo.wallet': wallet });
        if(existingPlayer) {
            return res.status(401).json({message: 'Oops, You already registered in RobotAnt World !'})
        }

        // Create a new player with default values
        const newPlayer = new Player({
            userInfo: { wallet, userName },
        });

        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        next(error);
    }
};

// Update player data
exports.updatePlayer = async (req, res, next) => {
    try {
        const updatedPlayer = await Player.findOneAndUpdate(
            { 'userInfo.wallet': req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(updatedPlayer);
    } catch (error) {
        next(error);
    }
};

exports.updateStartTime = async (req, res, next) => {
    const { wallet, category, item, newStartTime, progress } = req.body;

    try {
        const updateTime = `categories.${category}.${item}.startTime`;
        const updateProgress = `categories.${category}.${item}.progress`;
        const player = await Player.findOneAndUpdate(
            { "userInfo.wallet": wallet }, // Find player by wallet
            {
                $set: {
                    [updateTime]: newStartTime,
                    [updateProgress]: progress
                }
            },
            { new: true } // Return the updated document
        );

        if (!player) return res.status(404).json({ message: 'Player not found' });

        res.status(200).json({ message: 'Start time updated successfully', player });
    } catch (error) {
        next(error);
    }
};

exports.updateAfterBuilding = async (req, res, next) => {
    const { wallet, resourceUpdates, category, item, itemUpdates } = req.body;
    try {
        const player = await Player.findOneAndUpdate(
            { "userInfo.wallet": wallet }, // Find user by wallet
            {
                $set: {
                    ...resourceUpdates, // Update resources
                    [`categories.${category}.${item}`]: itemUpdates, // Update specific item's properties
                },
            },
            { new: true } // Return the updated document
        );

        if (!player) return res.status(404).json({ message: 'Player not found' });

        res.status(200).json({ message: 'data after building updated successfully', player });
    } catch (error) {
        next(error);
    }
};

exports.updateFarming = async (req, res, next) => {
    const { wallet, resourceUpdates, item, itemUpdates } = req.body;
    try {
        const player = await Player.findOneAndUpdate(
            { "userInfo.wallet": wallet }, // Find user by wallet
            {
                $set: {
                    'resources':{
                        ...resourceUpdates, // Update resources
                    },
                    [`categories.Farming.${item}`]: itemUpdates,
                },
            },
            { new: true } // Return the updated document
        );

        if (!player) return res.status(404).json({ message: 'Player not found' });

        res.status(200).json({ message: 'farming updated successfully', player });
    } catch (error) {
        next(error);
    }
};


// Delete a player
exports.deletePlayer = async (req, res, next) => {
    try {
        const deletedPlayer = await Player.findOneAndDelete({ 'userInfo.wallet': req.params.id });
        if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        next(error);
    }
};
