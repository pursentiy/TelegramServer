const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    ip: String,
    country: String,
    city: String,
    animal: String,
    message: String,
    date: Date
});

module.exports = mongoose.model('Clients', ClientSchema);