const bcrypt = require("bcrypt");

exports.init = function(mongoose, con) {
  let Schema = mongoose.Schema;
  let snakesLadderSchema = new Schema(
    {
      fullname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        index: true
      },
      password: {
        type: String,
        required: true
      },
      gender: {
        type: String
      },
      phone: {
        type: String
      },

      address: {
        type: String
      },

      photoURL: {
        type: String
      },
      updatedDate: { type: Date, default: Date.now }
    },
    {
      timestamps: true
    }
  );

  snakesLadderSchema.statics.create = async function(object) {
    let player = new playerModel(object);
    if (object.password) {
      const salt = await bcrypt.genSalt(10);
      // hash the password along with our new salt
      player.password = await bcrypt.hash(object.password, salt);
    }
    return await player.save();
  };

  snakesLadderSchema.statics.get = async function(query) {
    return await playerModel.find(query);
  };

  snakesLadderSchema.statics.update = async function(object) {
    let player = await playerModel.findOne({ _id: object.playerId });

    console.log(object);
    if (object.name) player.name = object.name;
    if (object.phone) player.phone = object.phone;
    if (object.email) player.email = object.email;
    if (object.type) player.type = object.type;

    if (object.password) {
      const salt = await bcrypt.genSalt(10);
      // hash the password along with our new salt
      player.password = await bcrypt.hash(object.password, salt);
    }
    return await player.save();
  };

  var playerModel = mongoose.model("player", snakesLadderSchema);
  return playerModel;
};
