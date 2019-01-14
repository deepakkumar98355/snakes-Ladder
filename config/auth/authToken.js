exports.default = {
  ciphers: _api => ({
    key: process.env.SESSION_SECRET
  })
};
