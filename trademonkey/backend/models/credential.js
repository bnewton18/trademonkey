const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema({
  name: String,
  value: String,
  expiration: Date
})

module.exports = mongoose.model('Credential', credentialSchema);
