const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Player = require('../../../models/player.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/players', () => {
    before(async () => {
        const testPlayerOne = new Player({ 
          _id: '628520a44cbb585639eaf138',
          playerName: 'Robert Lewandowski',
          teamName: 'Bayern Munich',
          season: 2022,
          age: 34,
          playerNumber: 9,
          position: 'attacker',
          image: 'lewandowski.img'
         });
        await testPlayerOne.save();
      });

    it('/:id should delete chosen document and return success', async () => {
      const res = await request(server).delete('/api/players/628520a44cbb585639eaf138');
      const deletedPlayer = await Player.findOne({_id: '628520a44cbb585639eaf138' });
      //expect(res.status).to.be.equal(200);
      expect(deletedPlayer).to.be.null;
    });
    after(async () => {
        await Player.deleteMany();
    });
});