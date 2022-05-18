const Team = require('../models/team.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Team.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const seat = await Team.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
};

exports.postTeam = async (req, res) => {
    try {
      const { teamName, country, playerName } = req.body;
      const newTeam = new Team({
        teamName: teamName,
        country: country, 
        playerName: playerName
       });
      await newTeam.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.putTeam = async (req, res) => {
  const { teamName, country, playerName } = req.body;

    try {
      const teams = await Team.findById(req.params.id);
      if(teams) {
        await Team.updateOne(
          { _id: req.params.id }, 
          { $set: { 
            teamName: teamName, 
            country: country, 
            playerName: playerName
        }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
}

exports.deleteTeam = async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if(team) {
        await Team.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }