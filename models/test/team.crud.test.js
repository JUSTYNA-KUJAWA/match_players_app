const Team = require('../team.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Team', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb+srv://JUSTI:test123@cluster0.epgpr.mongodb.net/PlayerDB?retryWrites=true&w=majority', 
      { useNewUrlParser: true, 
        useUnifiedTopology: true
      });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testTeamOne = new Team ({ 
            teamName: 'TeamName #1', 
            country: 'Country #1', 
            playerName: 'PlayerName #1'
      });
      await testTeamOne.save();
  
      const testTeamTwo = new Team ({ 
            teamName: 'TeamName #2',  
            country: 'Country #2',
            playerName: 'PlayerName #2'});
      await testTeamTwo.save();
    });

    after(async () => {
      await Team.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const teams = await Team.find();
      expect(teams.length).to.be.equal(2);
    });

    it('should return a proper document by various params with "findOne" method', async () => {
      const team = await Team.findOne({ 
        teamName: 'TeamName #1', 
        country: 'Country #1', 
        playerName: 'PlayerName #1',
      });
      const expectedTeamName = 'TeamName #1';
      expect(team.teamName).to.be.equal(expectedTeamName);
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const team = new Team ({ 
        teamName: 'TeamName #1',
        country: 'Country #1',
        playerName: 'PlayerName #1'
      });
      await team.save();
      expect(team.isNew).to.be.false;
    });
  
    after(async () => {
      await Team.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
        const testTeamOne = new Team ({ 
              teamName: 'TeamName #1', 
              country: 'Country #1', 
              playerName: 'PlayerName #1'
        });
        await testTeamOne.save();
    
        const testTeamTwo = new Team ({ 
              teamName: 'TeamName #2',
              country: 'Country #2',
              playerName: 'PlayerName #2'
        });
        await testTeamTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Team.updateOne({ teamName: 'TeamName #1' }, { $set: { teamName: '=TeamName #1=' }});
      const updatedTeam = await Team.findOne({ teamName: '=TeamName #1=' });
      expect(updatedTeam).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const team = await Team.findOne({ teamName: 'TeamName #1', country: 'Country #1', playerName: 'PlayerName #1'});
      team.teamName = '=TeamName #1=';
      team.country = '=Country #1=';
      team.playerName = '=PlayerName #1=';
      await team.save();

      const updatedTeam = await Team.findOne({ 
            teamName: '=TeamName #1=', 
            country:'=Country #1=', 
            playerName: '=PlayerName #1='
      });
      expect(updatedTeam).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Team.updateMany(
        {},
        { 
          $set: { 
            teamName: 'Updated TeamName!', 
            country: 'Updated Country!', 
            playerName: 'Updated PlayerName!'
          }
        }
      );
      const teams = await Team.find();
      expect(teams[0].teamName).to.be.equal('Updated TeamName!');
      expect(teams[0].country).to.be.equal('Updated Country!');
      expect(teams[0].playerName).to.be.equal('Updated PlayerName!');

      expect(teams[1].teamName).to.be.equal('Updated TeamName!');
      expect(teams[1].country).to.be.equal('Updated Country!');
      expect(teams[1].playerName).to.be.equal('Updated PlayerName!');
    });

    afterEach(async () => {
      await Team.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testTeamOne = new Team ({ 
            teamName: 'TeamName #1',
            country: 'Country #1', 
            playerName: 'PlayerName #1'
      });
      await testTeamOne.save();
    
      const testTeamTwo = new Team ({
             teamName: 'TeamName #2',
             country: 'Country #2',
             playerName: 'PlayerName #2'
      });
      await testTeamTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Team.deleteOne({ teamName: 'TeamName #1' });
      const deletedTeam = await Team.findOne({ teamName: 'TeamName #1', country: 'Country #1', playerName: 'PlayerName #1'});
      expect(deletedTeam).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const team = await Team.findOne({ teamName: 'TeamName #1', country: 'Country #1', playerName: 'PlayerName #1'});
      await team.remove();
      const removedTeam = await Team.findOne({ teamName: 'TeamName #1', country: 'Country #1', playerName: 'PlayerName #1'});
      expect(removedTeam).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Team.deleteMany();
      const teams = await Team.find();
      expect(teams.length).to.be.equal(0);
    });
  
    afterEach(async () => {
      await Team.deleteMany();
    });
  });
});

