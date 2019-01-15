"use strict";
const ActionHero = require("actionhero");
const api = ActionHero.api;

exports.createSession = class MyAction extends ActionHero.Action {
  constructor() {
    super();
    this.name = "createSession";
    this.description =
      "will Create a game session and players can join this session";
    this.outputExample = {};

    this.inputs = {
      sessionName: {
        required: true
      }
    };
  }

  async run(data) {
    try {
      const sessionModel = api["session"];
      let newSession = await sessionModel.create(data.connection.params);

      data.response.result = {
        result: "success",
        player: newSession
      };
    } catch (err) {
      data.response.error = err;
    }
  }
};
