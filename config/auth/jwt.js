exports.default = {
  jwt: _api => ({
    secret: process.env.SESSION_SECRET,
    algorithm: "HS256"
  })
};
