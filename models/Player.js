const mongoose = require('mongoose');

// Define the schema for categories
const categoryItemSchema = new mongoose.Schema({
    level: { type: Number, default: 0 },
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 0 },
    progress: { type: Boolean, default: false },
});

// Define the schema for categories (Chambers, ResearchLab, etc.)
const categoriesSchema = new mongoose.Schema({
    Chambers: {
        TunnelSystem: { type: categoryItemSchema, default: () => ({}) },
        BreedingChambers: { type: categoryItemSchema, default: () => ({}) },
        EntranceExitCorridors: { type: categoryItemSchema, default: () => ({}) },
        EnergyCenter: { type: categoryItemSchema, default: () => ({}) },
        MineralProcessingPlants: { type: categoryItemSchema, default: () => ({}) },
        DeuteriumExtractor: { type: categoryItemSchema, default: () => ({}) },
        ProductFactories: { type: categoryItemSchema, default: () => ({}) },
        ResearchLaboratories: { type: categoryItemSchema, default: () => ({}) },
        SatelliteStations: { type: categoryItemSchema, default: () => ({}) },
    },
    ResearchLab: {
        EnergySystem: { type: categoryItemSchema, default: () => ({}) },
        NavigationSystem: { type: categoryItemSchema, default: () => ({}) },
        Spaceshipyard: { type: categoryItemSchema, default: () => ({}) },
    },
    SpaceshipYard: {
        ColonizationShip: { type: categoryItemSchema, default: () => ({}) },
        ScoutSatellites: { type: categoryItemSchema, default: () => ({}) },
        ExplorationDrones: { type: categoryItemSchema, default: () => ({}) },
        Battleship: { type: categoryItemSchema, default: () => ({}) },
        DefenseShips: { type: categoryItemSchema, default: () => ({}) },
        ProcessingShips: { type: categoryItemSchema, default: () => ({}) },
    },
    Farming: {
        IronMine: { type: categoryItemSchema, default: () => ({}) },
        Substrate: { type: categoryItemSchema, default: () => ({}) },
        Moisture: { type: categoryItemSchema, default: () => ({}) },
        WaterPipelines: { type: categoryItemSchema, default: () => ({}) },
    },
});

// Define the player schema
const playerSchema = new mongoose.Schema({
    userInfo: {
        wallet: { type: String, required: true },
        userName: { type: String, required: true },
    },
    planet: {
        map: {
            coordinates: { type: String, default: '' },
            radius: { type: String, default: 'default' },
        },
        size: { type: String, default: 'small' },
    },
    resources: {
        Metal: { type: Number, default: 5000 },
        Substrate: { type: Number, default: 5000 },
        Moisture: { type: Number, default: 5000 },
        Deuterium: { type: Number, default: 5000 },
        Energy: {
            consumed: { type: Number, default: 0 },
            total: { type: Number, default: 20 },
        },
    },
    categories: { type: categoriesSchema, default: () => ({}) },
});

// Export the model
module.exports = mongoose.model('Player', playerSchema);
