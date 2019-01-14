"use strict";
const ActionHero = require("actionhero");
const api = ActionHero.api;
const bcrypt = require("bcrypt");

exports.createplayer = class MyAction extends ActionHero.Action {
  constructor() {
    super();
    this.name = "createplayer";
    this.description = "Create player";
    this.outputExample = {};

    this.inputs = {
      fullname: {
        required: true
      },
      email: {
        required: true
      },
      password: {
        required: true
      }
    };
  }

  async run(data) {
    try {
      const playerModel = api["player"];
      let newplayer = await playerModel.create(data.connection.params);

      data.response.result = {
        result: "success",
        player: newplayer
      };
    } catch (err) {
      data.response.error = err;
    }
  }
};

exports.playerSignIn = class MyAction extends ActionHero.Action {
  constructor() {
    super();
    this.name = "playerSignIn";
    this.description = "playerSignIn";
    this.outputExample = {};
    this.inputs = {
      email: {
        required: true
      },
      password: {
        required: true
      }
    };
  }

  async run(data) {
    try {
      const playerModel = api.player;
      const jwt = api.jwt;
      const players = await playerModel.get({
        email: data.connection.params.email
      });
      if (players && players.length > 0) {
        const player = players[0];

        const result = await bcrypt.compare(
          data.connection.params.password,
          player.password
        );

        if (result) {
          // generate tokenData
          jwt.generateToken(
            {
              _id: player._id,
              type: player.type
            },
            // { expiresIn: '4h' },
            (err, token) => {
              if (token) {
                const playerDetail = {
                  fullname: player.fullname,
                  _id: player._id,
                  email: player.email,
                  type: player.type
                };

                data.response.result = {
                  status: "success",
                  token,
                  playerDetails: playerDetail
                };
              } else
                data.response.result = {
                  status: "fail",
                  message: "Invalid Auth"
                };
            }
          );
        } else
          data.response.result = {
            status: "fail",
            message: "Wrong Credentials"
          };
      } else {
        data.response.result = {
          status: "fail",
          message: "No such user found"
        };
      }
    } catch (err) {
      console.log(err);
      data.response.error = err;
    }
  }
};

exports.updatePlayer = class MyAction extends ActionHero.Action {
  constructor() {
    super();
    this.name = "updateplayer";
    this.description = "Update player";
    this.outputExample = {};
    this.inputs = {
      playerId: {
        required: true
      }
    };
  }

  async run(data) {
    try {
      const playerModel = api.player;
      const updatedplayer = await playerModel.update(data.connection.params);
      console.log(updatedplayer);
      data.response.data = {
        result: "Retrieval successful",
        player: updatedplayer
      };
    } catch (err) {
      data.response.error = err;
    }
  }
};
