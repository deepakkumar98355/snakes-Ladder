const ActionHero = require("actionhero");
const jsonwebtoken = require("jsonwebtoken");

const api = ActionHero.api;
const CryptoJS = require("crypto-js");

module.exports = class MyInitializer extends ActionHero.Initializer {
  constructor() {
    super();
    this.name = "jwt";
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    ActionHero.api.jwt = {
      processToken(token, callback) {
        jsonwebtoken.verify(token, api.config.jwt.secret, {}, (err, data) => {
          callback(err, data);
        });
      },
      generateToken(data, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else {
          options = options || {};
        }
        if (!options.algorithm) {
          options.algorithm = api.config.jwt.algorithm;
        }

        try {
          const token = jsonwebtoken.sign(data, api.config.jwt.secret, options);
          if (token) {
            callback(null, token);
          }
        } catch (err) {
          callback(err, null);
        }
      }
    };

    ActionHero.api.cipher = {
      encryptText(text) {
        console.log(text);
        return CryptoJS.AES.encrypt(text, api.config.ciphers.key);
      },
      decryptText(text) {
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(text, api.config.ciphers.key);
        return bytes.toString(CryptoJS.enc.Utf8);
      }
    };
  }
};
