const { api } = require("actionhero");

/**
 * will generate a random number here as the dice rolled
 */

exports.generateNumber = async function(currentPosition, playerid) {
  try {
    const rolledNumber = Math.floor(Math.random() * 6) + 1;

    this.calculatePosition(currentPosition, rolledNumber, playerid);
  } catch (error) {
    console.log(error);
  }
};

/**
 * will calculate the position by considering the snakes and ladders position
 */

exports.calculatePosition = async function(
  currentPosition,
  rolledNumber,
  playerid
) {
  try {
    let newPosition = 0;
    newPosition = currentPosition + rolledNumber;
    const ladders = [
      {
        start: 2,
        end: 22
      },
      {
        start: 50,
        end: 34
      },
      {
        start: 10,
        end: 44
      },
      {
        start: 61,
        end: 19
      },
      {
        start: 70,
        end: 83
      },
      {
        start: 78,
        end: 4
      }
    ];

    const snake = [
      {
        start: 12,
        end: 2
      },
      {
        start: 48,
        end: 32
      },
      {
        start: 35,
        end: 31
      },
      {
        start: 60,
        end: 18
      },
      {
        start: 72,
        end: 65
      },
      {
        start: 80,
        end: 9
      }
    ];

    for (var i = 0; i < ladders.length; i++) {
      if (ladders[i].start == newPosition) {
        newPosition = newPosition + ladders[i].start;
        console.log("position", newPosition);
      } else if (snake[i].start == newPosition) {
        newPosition = newPosition + snake[i].end;
        console.log("position", newPosition);
      } else {
        console.log("position not changed");
      }
    }
    const playerModel = api.player;
    //update the latest position to Db
    await playerModel.update({
      playerid,
      currentposition: newPosition
    });

    //now will verify if the games is ended or not
    this.isGameEnded(newPosition, playerid);
  } catch (error) {
    console.log(error);
  }
};

/**
 * will check here if the games is ended or not by checking the nth dimension of game
 */
exports.isGameEnded = async function(newPosition, playerid) {
  let result;
  const playerModel = api.player;
  const player = await playerModel.get({
    _id: playerid
  });
  //will do a db operation to check if the score and position is latest or not
  if (player.currentposition === 100) {
    result = `Hurray player ${player.fullname} wins **** `;
    return result;
  } else {
    //no will call again generateNumber but in real scenario will call api rollDice
  }
};
