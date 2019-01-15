const { api } = require("actionhero");
const getLadderDetails = require("../helper/gameConfig/ladder.json");
const getSnakeDetails = require("../helper/gameConfig/snakes.json");

/**
 * will generate a random number here as the dice rolled
 */

exports.generateNumber = async function(playerid) {
  try {
    const rolledNumber = Math.floor(Math.random() * 6) + 1;
    this.calculatePosition(rolledNumber, playerid);
  } catch (error) {
    console.log(error);
  }
};

/**
 * will calculate the position by considering the snakes and ladders position
 */

exports.calculatePosition = async function(rolledNumber, playerid) {
  try {
    const ladders = getLadderDetails;
    const snake = getSnakeDetails;

    //get the latest player object
    const playerModel = api.player;
    const player = await playerModel.get({
      _id: playerid
    });

    let newPosition = 0;
    newPosition = player[0].currentposition + rolledNumber;

    //update the player's dice rolled count and new position
    let updatedPosition = await playerModel.update({
      playerId: playerid,
      currentposition: newPosition,
      dicerolledcount: player[0].dicerolledcount + 1
    });

    for (var i = 0; i < ladders.length; i++) {
      if (ladders[i].start === updatedPosition.currentposition) {
        newPosition = ladders[i].end;
        console.log("position ladder", newPosition);
      } else if (snake[i].start == updatedPosition.currentposition) {
        newPosition = snake[i].end;
        console.log("position snake", newPosition);
      } else {
        console.log("position not changed");
      }
    }
    //update the latest position to Db
    let updatedPlayer = await playerModel.update({
      playerid,
      currentposition: newPosition
    });
    return updatedPlayer;
  } catch (error) {
    console.log(error);
  }
};
