const mongoose = require('mongoose');
const SessionType = require('./UserSessionHandler.js');

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

var ClientModel = mongoose.model('Clients', ClientDBSchema);

var ConnectToDB = () => {
    let dbLink = SessionType.UserSession.CurrentType == SessionType.UserSession.Debug ? process.env.DB_CONNECTION_DEBUG : process.env.DB_CONNECTION;
    mongoose.connect(dbLink,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log('connected to db');
        });
};

var SaveClientToDB = (clientPostModel) => {
    return clientPostModel.save();
};

var CreatePostModel = (clientModel) => {
    return new ClientModel({
        name: clientModel.name,
        email: clientModel.email,
        phone: clientModel.phone,
        ip: clientModel.ip,
        country: clientModel.country,
        city: clientModel.city,
        animal: clientModel.animal,
        date: clientModel.dateRaw
    });
};

module.exports = { ConnectToDB, SaveClientToDB, CreatePostModel, ClientModel };