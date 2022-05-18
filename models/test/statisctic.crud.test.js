const Statistic = require('../statistic.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Statistic', () => {
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
      const testStatOne = new Statistic({
        playerName: 'PlayerName #1',
        position: 'Position #1',
        matches: 50,
        goals: 30,
        assists: 20,
        stops: 10,
        penalities: 5,
      });
      await testStatOne.save();

      const testStatTwo = new Statistic({
        playerName: 'PlayerName #2',
        position: 'Position #2',
        matches: 80,
        goals: 40,
        assists: 30,
        stops: 20,
        penalities: 10,
      });
      await testStatTwo.save();
    });

    after(async () => {
      await Statistic.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const statistics = await Statistic.find();
      expect(statistics.length).to.be.equal(2);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const statistic = await Statistic.findOne({
        playerName: 'PlayerName #1',
        position: 'Position #1',
        matches: 50,
        goals: 30,
        assists: 20,
        stops: 10,
        penalities: 5,
      });
      expect(statistic.playerName).to.be.equal('PlayerName #1');
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const statistic = new Statistic({
        playerName: 'PlayerName #1',
        position: 'Position #1',
        matches: 50,
        goals: 30,
        assists: 20,
        stops: 10,
        penalities: 5
      });
      await statistic.save();
      expect(statistic.isNew).to.be.false;
    });

    after(async () => {
      await Statistic.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testStatOne = new Statistic({
        playerName: 'PlayerName #1',
        position: 'Position #1',
        matches: 50,
        goals: 30,
        assists: 20,
        stops: 10,
        penalities: 5,
      });
      await testStatOne.save();

      const testStatTwo = new Statistic({
        playerName: 'PlayerName #2',
        position: 'Position #2',
        matches: 80,
        goals: 40,
        assists: 30,
        stops: 20,
        penalities: 10,
      });
      await testStatTwo.save();
    });

    afterEach(async () => {
      await Statistic.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Statistic.updateOne(
        { playerName: 'PlayerName #1' },
        { $set: { playerName: '=PlayerName #1=' } }
      );
      const updatedStatistic = await Statistic.findOne({
        playerName: '=PlayerName #1=',
      });
      expect(updatedStatistic).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const statistic = await Statistic.findOne({
        playerName: 'PlayerName #2',
        position: 'Position #2',
        matches: 80,
        goals: 40,
        assists: 30,
        stops: 20,
        penalities: 10,
      });
      statistic.playerName = '=PlayerName #2=';
      statistic.position = '=Position #2=';
      statistic.matches= 80;
      statistic.goals = 40;
      statistic.assists = 30;
      statistic.stops = 20;
      statistic.penalities = 10;
      
      await statistic.save();

      const updatedStatistic = await Statistic.findOne({
        playerName: '=PlayerName #2=',
        position: '=Position #2=',
        matches: 80,
        goals: 40,
        assists: 30,
        stops: 20,
        penalities: 10,
      });
      expect(updatedStatistic).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Statistic.updateMany(
        {},
        {
          $set: {
            playerName: 'Updated playerName!',
            position: 'Updated position!',
          },
        }
      );
      const statistics = await Statistic.find();
      expect(statistics[0].playerName).to.be.equal('Updated playerName!');
      expect(statistics[0].position).to.be.equal('Updated position!');
      expect(statistics[0].matches).to.be.equal(50);
      expect(statistics[0].goals).to.be.equal(30);
      expect(statistics[0].assists).to.be.equal(20);
      expect(statistics[0].stops).to.be.equal(10);
      expect(statistics[0].penalities).to.be.equal(5);

      expect(statistics[1].playerName).to.be.equal('Updated playerName!');
      expect(statistics[1].position).to.be.equal('Updated position!');
      expect(statistics[1].matches).to.be.equal(80);
      expect(statistics[1].goals).to.be.equal(40);
      expect(statistics[1].assists).to.be.equal(30);
      expect(statistics[1].stops).to.be.equal(20);
      expect(statistics[1].penalities).to.be.equal(10);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
        const testStatOne = new Statistic({
            playerName: 'PlayerName #1',
            position: 'Position #1',
            matches: 50,
            goals: 30,
            assists: 20,
            stops: 10,
            penalities: 5,
          });
          await testStatOne.save();
    
          const testStatTwo = new Statistic({
            playerName: 'PlayerName #2',
            position: 'Position #2',
            matches: 80,
            goals: 40,
            assists: 30,
            stops: 20,
            penalities: 10,
          });
          await testStatTwo.save();
        });

    afterEach(async () => {
      await Statistic.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      await Statistic.deleteOne({ playerName: 'PlayerName #1' });
      const deletedStatistic = await Statistic.findOne({
            playerName: 'PlayerName #1',
            position: 'Position #1',
            matches: 50,
            goals: 30,
            assists: 20,
            stops: 10,
            penalities: 5,
      });
      expect(deletedStatistic).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const statistic = await Statistic.findOne({
            playerName: 'PlayerName #1',
            position: 'Position #1',
            matches: 50,
            goals: 30,
            assists: 20,
            stops: 10,
            penalities: 5,
      });
      await statistic.remove();

      const removedStatistic = await Statistic.findOne({
            playerName: 'PlayerName #1',
            position: 'Position #1',
            matches: 50,
            goals: 30,
            assists: 20,
            stops: 10,
            penalities: 5,
      });
      expect(removedStatistic).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Statistic.deleteMany({});
      const statistics = await Statistic.find();
      expect(statistics.length).to.be.equal(0);
    });
  });
});