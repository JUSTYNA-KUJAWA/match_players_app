const Player = require('../models/player.model');


exports.getAll = async (req, res) => {
    try {
        
      res.json(await Player.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
exports.getRandom = async (req, res) => {

  try {
    const count = await Player.countDocuments();
    const rand = Math.floor(Math.random() *count);
    const player = await Player.findOne().skip(rand);
    if(!player) res.status(404).json({ message: 'Not found'});
    else res.json(dep);
  }
  catch(err) {
      res.status(500).json({ message: err });
  }
  };

exports.getById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if(!player) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postAll = async (req, res) => {
  try {
    const { playerName,
            teamName,
            season,
            age,
            playerNumber,
            position,
            image} = req.body;
console.log(playerName);
console.log(req.body);
    const newPlayer = new Player({ 
          playerName: playerName,
          teamName: teamName,
          season: season,
          age: age,
          playerNumber: playerNumber,
          position: position,
          image: image,
    });
    await newPlayer.save();
    res.json({ message: 'OK' });

    } catch(err) {
      res.status(500).json({ message: err });
    }
};
exports.putById = async (req, res) => {
  const { playerName,
          teamName,
          season,
          age,
          playerNumber,
          position,
          image } = req.body;

  try {
    const playerAfterChange = await(Player.findById(req.params.id));
    if(playerAfterChange) {
        playerAfterChange.playerName = playerName;
        playerAfterChange.teamName = teamName;
        playerAfterChange.season = season;
        playerAfterChange.age = age;
        playerAfterChange.playerNumber = playerNumber;
        playerAfterChange.position = position;
        playerAfterChange.image = image;
    await playerAfterChange.save();
    res.json({ message: 'OK', playerAfterChange });
    }
    else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};
exports.deleteById = async (req, res) => {
  try {
    const delatedPlayer = await(Player.findById(req.params.id));
if(delatedPlayer){
  await Player.deleteOne({ _id: req.params.id,});
  res.json({ message: 'OK', delatedDepartment });
}
   else res.status(404).json({ message: 'Not found...' });
   }

  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPlayerName = async (req, res) => {
  try {
    const playerName = req.params.playerName;
    console.log(playerName);
    const getPlayerName = await Player.find({ playerName: playerName });
    if (!getPlayerName) res.status(404).json({ message: 'Not found' });
    else {
      res.json(getPlayerName);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAge = async (req, res) => {
  try {
    const ageMin = req.params.age_min;
    const ageMax = req.params.age_max;
    const player = await Player.find({
      age: { $gte: ageMin, $lte: ageMax },
    });
    if (!player) res.status(404).json({ message: 'Not found' });
    else {
      res.json(player);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPlayersPerPage = async (req, res) => {
  try {
    const perPage = 3
    const page = 1

  Player
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, players) {
          Player.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('player.routes/players', {
                  players: players,
                  current: page,
                  pages: Math.ceil(count / perPage)
                })
              })
          })
  } catch (err) {
  res.status(500).json({ message: err });
}
};



