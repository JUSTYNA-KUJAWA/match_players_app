const db = {
    teams: [
        { teamName: 'Manchester United', country: 'England', playerName: 'Cristiano Ronaldo' },
        { teamName: 'Bayern Munich', country: 'Germany', playerName: 'Robert Lewandowski'},
    ],
    players: [
        { id: 1, playerName: 'Cristiano Ronaldo', teamName: 'Manchester United', season: 2022, age: 37, playerNumber: 7, position: 'attacker', image: 'ronaldo.img' },
        { id: 2, playerName: 'Robert Lewandowski', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 3, playerName: 'Mr1', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 4, playerName: 'MR2', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 5, playerName: 'MR3', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 6, playerName: 'MR4', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 7, playerName: 'MR5', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 8, playerName: 'MR6', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 9, playerName: 'MR7', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 10, playerName: 'MR8', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 11, playerName: 'MR9', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 12, playerName: 'MR10', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 13, playerName: 'MR11', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 14, playerName: 'MR12', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 15, playerName: 'MR13', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },
        { id: 16, playerName: 'MR14', teamName: 'Bayern Munich', season: 2022, age: 34, playerNumber: 9, position: 'attacker', image: 'lewandowski.img' },

        
    ],
    statistics: [
        { playerName: 'Christiano Ronaldo', position: 'attacker', matches:30 , goals:18 , assists:3 , stops:7 , penalities:3  },
        { playerName: 'Robert Lewandowski', position: 'attacker', matches:48 , goals:40 , assists:10 , stops:10 , penalities:2  },
        
    ]
};

module.exports = db;