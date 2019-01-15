"use strict";

const request = require("request-promise-native");
const ActionHero = require("actionhero");
const configVal = require("../config/actionTestConfig");

const envFile = `${process.env.PWD}/${
  process.env.NODE_ENV === "production" ? "" : ".dev"
}.env`;

const exist = require("fs").existsSync(envFile);

if (!exist) {
  console.log(".env file doesn't exist");

  throw new Error(".env file doesn't exist");
}
require("dotenv").config({
  path: `${process.env.PWD}/${
    process.env.NODE_ENV === "production" ? "" : ".dev"
  }.env`
});

const actionhero = new ActionHero.Process();

var sleep = require("sleep-promise");

let api;
let url;
let token;

const toJson = async string => {
  try {
    return JSON.parse(string);
  } catch (error) {
    return error;
  }
};

describe("create account Test Suite", function() {
  beforeAll(async () => {
    jest.setTimeout(30000);
    url = await configVal.configURLData();
    api = await actionhero.start();
    url = url + api.config.servers.web.port;

    console.log("Started Action Hero Server");
  });

  describe("should create account ", function() {
    beforeAll(async () => {
      jest.setTimeout(30000);
      api.actions.versions.paramTestAction = [1];
      api.actions.actions.paramTestAction = {
        "1": {
          name: "paramTestAction",
          description: "I return connection.rawConnection.params",
          version: 1,
          run: data => {
            data.response = data.connection.rawConnection.params;
            if (data.connection.rawConnection.params.rawBody) {
              data.response.rawBody = data.connection.rawConnection.params.rawBody.toString();
            }
          }
        }
      };

      api.routes.loadRoutes();
    });
    /* afterAll(async () => {
            let AccountModel = api['account'];
            console.log('will delete the created accounts') 
            await AccountModel.delete('5b31b7a7db4dc017fe457acd')  
            }) */

    test("getting config data will wait for 4sec ....", function(done) {
      //will wait for 4 sec let action hero initilizers get start
      jest.setTimeout(30000);
      sleep(4000).then(async function() {
        done();
      });
    });

    test("will create account based on payload", async () => {
      jest.setTimeout(30000);
      token = await configVal.tokenInit(url);
      token = "token" + " " + token;

      let requestBody = JSON.stringify({
        fullname: "Deepak Kumar",
        email: "deepakkumar123@gmail.com",
        password: "test12345"
      });
      let body = await request
        .post(url + "/api/createplayer", {
          body: requestBody,
          headers: {
            "Content-type": "application/json",
            authorization: token
          }
        })
        .then(toJson);
      await sleep(7000);

      expect(body.data.result).toEqual("success");
    });

    //should fail because mail is required parametre
    test("will create account with invalid payload", async () => {
      jest.setTimeout(30000);
      token = await configVal.tokenInit(url);
      token = "token" + " " + token;
      try {
        let requestBody = JSON.stringify({
          fullname: "Deepak Kumar",
          password: "test12345"
        });
        let body = await request
          .post(url + "/api/createplayer", {
            body: requestBody,
            headers: {
              "Content-type": "application/json",
              authorization: token
            }
          })
          .then(toJson);
      } catch (error) {
        expect(error.toString()).toMatch(/400/);
      }
    });
  });
});
