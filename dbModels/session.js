exports.init = function(mongoose, con) {
  let Schema = mongoose.Schema;
  let snakesLadderSchema = new Schema(
    {
      sessionAttendees: {
        type: String
      },

      sessionName: {
        type: String
      },
      sessionTime: { type: Date, default: Date.now }
    },
    {
      timestamps: true
    }
  );

  snakesLadderSchema.statics.create = async function(object) {
    let session = new sessionModel(object);
    return await session.save();
  };

  snakesLadderSchema.statics.get = async function(query) {
    return await sessionModel.find(query);
  };

  snakesLadderSchema.statics.update = async function(object) {
    let session = await sessionModel.findOne({ _id: object.sessionId });

    console.log(object);

    return await session.save();
  };

  var sessionModel = mongoose.model("session", snakesLadderSchema);
  return sessionModel;
};
