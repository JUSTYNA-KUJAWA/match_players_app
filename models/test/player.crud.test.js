const Player = require('../player.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Player', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb+srv://JUSTI:test123@cluster0.epgpr.mongodb.net/PlayerDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testPlayerOne = new Player({
        playerName: 'PlayerName #1',
        teamName: 'TeamName #1',
        season: 2021,
        age: 30,
        playerNumber: 2,
        position: 'Position #1',
        image: 'Image #1',
      });
      await testPlayerOne.save();

      const testPlayerTwo = new Player({
        playerName: 'PlayerName #2',
        teamName: 'TeamName #2',
        season: 2022,
        age: 32,
        playerNumber: 3,
        position: 'Position #2',
        image: 'Image #2',
      });
      await testPlayerTwo.save();
    });

    after(async () => {
      await Player.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const players = await Player.find();
      expect(players.length).to.be.equal(2);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const player = await Player.findOne({
        playerName: 'PlayerName #1',
        teamName: 'TeamName #1',
        season: 2021,
        age: 30,
        playerNumber: 2,
        position: 'Position #1',
        image: 'Image #1',
      });
      expect(player.playerName).to.be.equal('PlayerName #1');
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const player = new Player({
        playerName: 'PlayerName #1',
        teamName: 'TeamName #1',
        season: 2021,
        age: 30,
        playerNumber: 2,
        position: 'Position #1',
        image: 'Image #1',
      });
      await player.save();
      expect(player.isNew).to.be.false;
    });

    after(async () => {
      await Player.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
        const testPlayerOne = new Player({
            playerName: 'PlayerName #1',
            teamName: 'TeamName #1',
            season: 2021,
            age: 30,
            playerNumber: 2,
            position: 'Position #1',
            image: 'Image #1',
          });
          await testPlayerOne.save();
    
          const testPlayerTwo = new Player({
            playerName: 'PlayerName #2',
            teamName: 'TeamName #2',
            season: 2022,
            age: 32,
            playerNumber: 3,
            position: 'Position #2',
            image: 'Image #2',
          });
          await testPlayerTwo.save();
        });

    afterEach(async () => {
      await Player.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Player.updateOne(
        { playerName: 'PlayerName #1' },
        { $set: { playerName: '=PlayerName #1=' } }
      );
      const updatedPlayer = await Player.findOne({
        playerName: '=PlayerName #1=',
      });
      expect(updatedPlayer).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const player = await Player.findOne({
            playerName: 'PlayerName #2',
            teamName: 'TeamName #2',
            season: 2022,
            age: 32,
            playerNumber: 3,
            position: 'Position #2',
            image: 'Image #2',
          });
      player.playerName = '=PlayerName #2=';
      player.teamName = '=TeamName #2=';
      player.season = 2022;
      player.age = 32;
      player.playerNumber= 3;
      player.position = '=Position #2=';
      player.image = '=Image #2=';
      await player.save();

      const updatedPlayer = await Player.findOne({
            playerName: '=PlayerName #2=',
            teamName: '=TeamName #2=',
            season: 2022,
            age: 32,
            playerNumber: 3,
            position: '=Position #2=',
            image: '=Image #2=',
          });
      expect(updatedPlayer).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Player.updateMany(
        {},
        {
          $set: {
            playerName: 'Updated playerName!',
            teamName: 'Updated teamName!',
            position: 'Updated position!',
            image: 'Updated image!',
          },
        }
      );
      const players = await Player.find();
      expect(players[0].playerName).to.be.equal('Updated playerName!');
      expect(players[0].teamName).to.be.equal('Updated teamName!');
      expect(players[0].season).to.be.equal(2021);
      expect(players[0].age).to.be.equal(30);
      expect(players[0].playerNumber).to.be.equal(2);
      expect(players[0].position).to.be.equal('Updated position!');
      expect(players[0].image).to.be.equal('Updated image!');

      expect(players[1].playerName).to.be.equal('Updated playerName!');
      expect(players[1].teamName).to.be.equal('Updated teamName!');
      expect(players[1].season).to.be.equal(2022);
      expect(players[1].age).to.be.equal(32);
      expect(players[1].playerNumber).to.be.equal(3);
      expect(players[1].position).to.be.equal('Updated position!');
      expect(players[1].image).to.be.equal('Updated image!');
    });
    afterEach(async () => {
      await Player.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
        const testPlayerOne = new Player({
            playerName: 'PlayerName #1',
            teamName: 'TeamName #1',
            season: 2021,
            age: 30,
            playerNumber: 2,
            position: 'Position #1',
            image: 'Image #1',
          });
          await testPlayerOne.save();
    
          const testPlayerTwo = new Player({
            playerName: 'PlayerName #2',
            teamName: 'TeamName #2',
            season: 2022,
            age: 32,
            playerNumber: 3,
            position: 'Position #2',
            image: 'Image #2',
          });
          await testPlayerTwo.save();
        });

    afterEach(async () => {
      await Player.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      await Player.deleteOne({ playerName: 'PlayerName #1' });
      const deletedPlayer = await Player.findOne({
            playerName: 'PlayerName #1',
            teamName: 'TeamName #1',
            season: 2021,
            age: 30,
            playerNumber: 2,
            position: 'Position #1',
            image: 'Image #1',
          });
      expect(deletedPlayer).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const player = await Player.findOne({
            playerName: 'PlayerName #1',
            teamName: 'TeamName #1',
            season: 2021,
            age: 30,
            playerNumber: 2,
            position: 'Position #1',
            image: 'Image #1',
      });
      await player.remove();

      const removedPlayer = await Player.findOne({
            playerName: 'PlayerName #1',
            teamName: 'TeamName #1',
            season: 2021,
            age: 30,
            playerNumber: 2,
            position: 'Position #1',
            image: 'Image #1',
      });
      expect(removedPlayer).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Player.deleteMany({});
      const players = await Player.find();
      expect(players.length).to.be.equal(0);
    });
  });
});