const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Player = require('../../../models/player.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/players', () => {
    before(async () => {
        const testPlayerOne = new Player({ 
		  _id: '628410918720b5c574208abc',
		  playerName: 'PlayerName #1',
		  teamName: 'Bayern Munich',
		  season: 2022, 
		  age: 34,
		  playerNumber: 9,
		  position: 'attacker',
		  image: 'lewandowski.img'
		});
        await testPlayerOne.save();

        const testPlayerTwo = new Player({
		  _id: '628410918720b5c574208def',
		  playerName: 'PlayerName #2',
		  teamName: 'Manchester United',
		  season: 2022, 
		  age: 37,
		  playerNumber: 7,
		  position: 'attacker',
		  image: 'ronaldo.img' 
		});
        await testPlayerTwo.save();
    });

    it('/ should return all players', async () => {
        const res = await request(server).get('/api/players');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return one player by :id ', async () => {
        const res = await request(server).get('/api/players/628410918720b5c574208def');
        //expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/playerName/:playerName should return an array with players filtered by playerName', async () => {
		const res = await request(server).get('/api/players/playerName/PlayerName #1');
		//expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length)
	});
	
	it('/age/:age_min/:age_max should return an array with players filtered by age', async () => {
		const res = await request(server).get('/api/players/age/20/35');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(1);
	});

    after(async () => {
        await Player.deleteMany();
    });
});