const Statistic = require('../models/statistic.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Statistic.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const stat = await Statistic.findById(req.params.id);
      if(!stat) res.status(404).json({ message: 'Not found' });
      else res.json(stat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
};

exports.postStatistic = async (req, res) => {
    try {
      const { playerName, position, matches, goals, assists, stops, penalities } = req.body;
      const newStatistic = new Statistic({
        playerName: playerName,
        position: position, 
        matches: matches, 
        goals: goals, 
        assists: assists, 
        stops: stops, 
        penalities: penalities 
      });
      await newStatistic.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.putStatistic = async (req, res) => {
    const { playerName, position, matches, goals, assists, stops, penalities }= req.body;

    try {
      const stat= await Statistic.findById(req.params.id);
      if(stat) {
        await Statistic.updateOne(
          { _id: req.params.id },
          { $set: {
            playerName: playerName, 
            position: position,
            matches: matches,
            goals: goals, 
            assists: assists, 
            stops: stops, 
            penalities: penalities
          }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
}

exports.deleteStatistic = async (req, res) => {
    try {
      const stat = await Statistic.findById(req.params.id);
      if(stat) {
        await Statistic.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

 