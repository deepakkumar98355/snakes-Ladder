exports.init = function(mongoose, con) {
  let Schema = mongoose.Schema;
  const sessionAttendeesSchema = new Schema({
    playerName: String,
    player_id: String
  });
  let snakesLadderSchema = new Schema(
    {
      sessionAttendees: sessionAttendeesSchema,
      sessionName: {
        type: String
      }
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
