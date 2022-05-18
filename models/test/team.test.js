const Team = require('../team.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Team', () => {

  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "teamName", "country", "playerName" arg', () => {

    const cases = [
        {
          teamName: 'Manchester United',
        },
        {
          country: 'England',
        },
        {
          playerName: 'Cristiano Ronaldo',
        },
        {
          teamName: 'Manchester United',
          country: 'England',
        },
        {
          teamName: 'Manchester United',
          playerName: 'Cristiano Ronaldo',
        },
        {
          country: 'England',
          playerName: 'Cristiano Ronaldo',
        },
      ];

      for (let teams of cases) {
        const team = new Team(teams);
        team.validate(err => {
        expect(err.errors).to.exist;
        });
      }
  });

  it('should throw an error if "teamName" is not a string', () => {

    const cases = [{}, []];
    for(let teamName of cases) {
      const team = new Team({ teamName });
  
      team.validate(err => {
        expect(err.errors.teamName).to.exist;
      });
    }
  });

  it('should throw an error if "country" is not a string', () => {

    const cases = [{}, []];
    for(let country of cases) {
      const team = new Team({ country });
  
      team.validate(err => {
        expect(err.errors.country).to.exist;
      });
    }
  });

  it('should throw an error if "playerName" is not a string', () => {

    const cases = [{}, []];
    for(let playerName of cases) {
      const team = new Team({ playerName });
  
      team.validate(err => {
        expect(err.errors.playerName).to.exist;
      });
    }
  });

  it('should not throw an error if data is okay', () => {

    const team = new Team({teamName: 'Manchester United', country: 'England', playerName:'Robert Lewandowski'});
      team.validate(err => {
      expect(err).to.not.exist;
      });
    });
  });

