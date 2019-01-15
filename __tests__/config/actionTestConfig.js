"use strict";

const request = require("request-promise-native");
const ActionHero = require("actionhero");

//will genrate token for calling api
exports.tokenInit = async function(url) {
  try {
    const toJson = async string => {
      try {
        return JSON.parse(string);
      } catch (error) {
        return error;
      }
    };
    let requestBody = JSON.stringify({
      email: "test@snakes.com",
      password: "test@123"
    });
    let body = await request
      .post(url + "/api/playerSignIn", {
        body: requestBody,
        headers: { "Content-type": "application/json" }
      })
      .then(toJson);

    token = body.result.token;
  } catch (error) {
    console.log(error);
  }

  return token;
};

exports.configURLData = async function() {
  let url = "http://localhost:";
  return url;
};
