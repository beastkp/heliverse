const Team = require("../models/Team");

const createTeam = async (req, res) => {
    const { name,members } = req.body;
    try {
        const team = await Team.create({name,members});
        res.status(201).json(team);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getTeam = async (req,res)=>{
    try {
        const teams = await Team.findById(req.params.id);
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {createTeam,getTeam,getAllTeams};