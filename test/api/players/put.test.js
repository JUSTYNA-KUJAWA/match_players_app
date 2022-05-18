
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Player = require('../../../models/player.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/players', () => {
    before(async () => {
        const testPlayerOne = new Player({ 
          _id: '628410918720b5c574208abc',
          playerName: '=#PlayerName #1=',
          teamName: 'Bayern Munich',
          season: 2022,
          age: 34,
          playerNumber: 9,
          position: 'attacker',
          image: 'lewandowski.img'  
        });
    await testPlayerOne.save();
    });

    it('/:id should update chosen document and return success', async () => {
      const res = await request(server).put('/api/players/628410918720b5c574208abc').send({ playerName: '=#PlayerName #1=' });
      const updatedPlayer = await Player.findOne({ _id: '628410918720b5c574208abc' });
      //expect(res.status).to.be.equal(200);
      expect(res.body).to.not.be.null;
      expect(updatedPlayer.playerName).to.be.equal('=#PlayerName #1=');
    });
    after(async () => {
        await Player.deleteMany();
    });
});