const mongoose = require('mongoose');

const ClientDBSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    ip: String,
    country: String,
    city: String,
    district: String,
    animal: String,
    message: String,
    date: Date
});

var Client = mongoose.model('Clients', ClientDBSchema);
