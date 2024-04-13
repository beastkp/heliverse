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

const updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedTeam);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTeam);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {createTeam,getTeam,getAllTeams, updateTeam, deleteTeam};