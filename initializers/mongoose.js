"use strict";
const ActionHero = require("actionhero");
const mongoose = require("mongoose");
const mysql = require("mysql");
//load all the Schema files

let playerSchema = require("../dbModels/player");
let sessionSchema = require("../dbModels/session");

module.exports = class MyInitializer extends ActionHero.Initializer {
  constructor() {
    super();
    this.name = "mongoose";
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    mongoose.connect(
      ActionHero.api.config.mongodb.connectionstring,
      { useNewUrlParser: true }
    );
    mongoose.Promise = require("bluebird");
    ActionHero.api["mongoose"] = mongoose;
    console.log(
      "Connected to - ",
      ActionHero.api.config.mongodb.connectionstring
    );
  }

  async start() {
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      ActionHero.api["player"] = playerSchema.init(mongoose, "");
      ActionHero.api["session"] = sessionSchema.init(mongoose, "");
    });
  }
  async stop() {}
};
