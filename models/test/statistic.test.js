const Statistic = require('../statistic.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Statistic', () => {

  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "playerName", "position", "matches", "goals", "assists", "stops", "penalities" arg', () => {

    const cases = [
        {
          playerName: 'Robert Lewandowski',
        },
        {
          playerName: 'Robert Lewandowski',
          position: 'Attacker',
          matches: '100',
        },
        {
          playerName: 'Robert Lewandowski',
          position: 'Attacker',
          matches: '100',
          goals: '50',
        },
        {
          playerName: 'Robert Lewandowski',
          position: 'Attacker',
          matches: '100',
          goals: '50',
          assists: '32',
        },
        {
          playerName: 'Robert Lewandowski',
          position: 'Attacker',
          matches: '100',
          goals: '50',
          assists: '32',
          stops: '24',
        }
      ];

      for (let statisctics of cases) {
        const stat = new Statistic(statisctics);
        stat.validate(err => {
        expect(err.errors).to.exist;
        });
      }
  });

  it('should throw an error if "playerName" is not a string', () => {

    const cases = [{}, []];
    for(let playerName of cases) {
      const stat = new Statistic({ playerName });
  
      stat.validate(err => {
        expect(err.errors.playerName).to.exist;
      });
    }
  });

  it('should throw an error if "position" is not a string', () => {

    const cases = [{}, []];
    for(let position of cases) {
      const stat = new Statistic({ position });
  
      stat.validate(err => {
        expect(err.errors.position).to.exist;
      });
    }
  });
  it('should throw an error if "matches" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let matches of cases) {
      const stat = new Statistic({ matches });
  
      stat.validate(err => {
        expect(err.errors.matches).to.exist;
      });
    }
  });
  it('should throw an error if "goals" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let goals of cases) {
      const stat = new Statistic({ goals });
  
      stat.validate(err => {
        expect(err.errors.goals).to.exist;
      });
    }
  });
  it('should throw an error if "assists" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let assists of cases) {
      const stat = new Statistic({ assists });
  
      stat.validate(err => {
        expect(err.errors.assists).to.exist;
      });
    }
  });
  it('should throw an error if "stops" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let stops of cases) {
      const stat = new Statistic({ stops });
  
      stat.validate(err => {
        expect(err.errors.stops).to.exist;
      });
    }
  });
  it('should throw an error if "penalities" is not a number', () => {

    const cases = [{}, 'mama',[],'1k3', () => {}];
    for(let penalities of cases) {
      const stat = new Statistic({ penalities});
  
      stat.validate(err => {
        expect(err.errors.penalities).to.exist;
      });
    }
  });

  it('should not throw an error if data is okay', () => {

    const stat = new Statistic({playerName: 'Robert Lewandowski', position: 'attacker', matches: '100', goals:'150', stops:'40', assists:'56', penalities:'25' });
      stat.validate(err => {
      expect(err).to.not.exist;
      });
    });
  });