const Player = require('../player.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Player', () => {

  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no " playerName", "teamName", "position", "image" arg', () => {

    const cases = [
        {
          playerName: 'Robert Lewandowski',
        },
        {
          teamName: 'Bayern Munich',
        },
        {
          position: 'Attacker',
        },
        {
          image: 'lewandowski.img',
        },
        {
          playerName: 'Robert Lewandowski',
          teamName: 'Bayern Munich',
          position: 'Attacker',
        },
        {
          playerName: 'Robert Lewandowski',
          teamName: 'Bayern Munich',
          image: 'lewandowski.img',
        },
        {
          playerName: 'Robert Lewandowski',
          teamName: 'Bayern Munich',
        },

      ];

      for (let players of cases) {
        const play = new Player(players);
        play.validate(err => {
        expect(err.errors).to.exist;
        });
      }
  });

  it('should throw an error if "playerName" is not a string', () => {

    const cases = [{}, []];
    for(let  playerName of cases) {
      const play = new Player({  playerName });
  
      play.validate(err => {
        expect(err.errors.playerName).to.exist;
      });
    }
  });

  it('should throw an error if "teamName" is not a string', () => {

    const cases = [{}, []];
    for(let teamName of cases) {
      const play = new Player({ teamName });
  
      play.validate(err => {
        expect(err.errors.teamName).to.exist;
      });
    }
  });
  it('should throw an error if "position" is not a string', () => {

    const cases = [{}, []];
    for(let position of cases) {
      const play = new Player({ position });
  
      play.validate(err => {
        expect(err.errors.position).to.exist;
      });
    }
  });
  it('should throw an error if "image" is not a string', () => {

    const cases = [{}, []];
    for(let image of cases) {
      const play = new Player({ image });
  
      play.validate(err => {
        expect(err.errors.image).to.exist;
      });
    }
  });
  it('should throw an error if "season" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let season of cases) {
      const play = new Player({ season });
  
      play.validate(err => {
        expect(err.errors.season).to.exist;
      });
    }
  });
  it('should throw an error if "age" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let age of cases) {
      const play = new Player({ age });
  
      play.validate(err => {
        expect(err.errors.age).to.exist;
      });
    }
  });
  it('should throw an error if "playerNumber" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let playerNumber of cases) {
      const play = new Player({ playerNumber });
  
      play.validate(err => {
        expect(err.errors.playerNumber).to.exist;
      });
    }
  });


  it('should not throw an error if data is okay', () => {

    const play = new Player({playerName: 'Robert Lewandowski', teamName: 'Bayern Munich', position: 'attacker', season: '2022', age: '34', playerNumber: '9', image: 'lewandowski.img'});
      play.validate(err => {
      expect(err).to.not.exist;
      });
    });
  });