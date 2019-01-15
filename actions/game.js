"use strict";
const ActionHero = require("actionhero");
const api = ActionHero.api;
const game = require("../helper/rolldice");

exports.joinGame = class MyAction extends ActionHero.Action {
  constructor() {
    super();
    this.name = "joinGame";
    this.description = "players will join open game sessions";
    this.outputExample = {};

    this.inputs = {
      playerid: {
        required: true
      },
      sessionId: {
        required: true
      },
      playerName: {
        required: false
      }
    };
  }

  async run(data) {
    try {
      const sessionModel = api["session"];
      let updateObj = {
        sessionId: data.connection.params.sessionId,
        sessionAttendees: {
          playerName: data.connection.params.playerName
            ? data.connection.params.playerName
            : "Anonymous Player",
          player_id: data.connection.params.playerid
        }
      };
      //update the game session with give attendees

      let updateSession = await sessionModel.update(updateObj);

      data.response.result = {
        result: "success",
        updateSession
      };
    } catch (err) {
      data.response.error = err;
    }
  }
};

exports.rollDice = class MyAction extends ActionHero.Action {
  constructor() {
    super();
    this.name = "rollDice";
    this.description = "will roll dice and get the latest position";
    this.outputExample = {};

    this.inputs = {
      playerid: {
        required: true
      },
      sessionId: {
        required: true
      }
    };
  }

  async run(data) {
    try {
      let outcome;
      //will call helper function to get the dice outcome
      outcome = await game.generateNumber(data.connection.params.playerid);
      if (outcome.currentposition === 100) {
        data.response = {
          result: "success",
          message: `*** Hurray player ${outcome.fullname} wins **** `
        };
      } else {
        this.generateNumber(data.connection.params.playerid);
      }
    } catch (err) {
      data.response.error = err;
    }
  }
};
