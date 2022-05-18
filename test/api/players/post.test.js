const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Player = require('../../../models/player.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/players', () => {

    it('/ should insert new document to db and return success', async () => {
        const res = await request(server).post('/api/players').send({
            playerName: 'Paul Pogba', 
            teamName: 'Manchester United', 
            season: 2022,
            age: 25, 
            playerNumber: 8, 
            position: 'middle', 
            image: 'player.img',
        });
        const newPlayer = await Player.findOne({ playerName: 'Paul Pogba'});
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(newPlayer).to.not.be.null;
      });
});