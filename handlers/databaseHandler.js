const mongoose = require('mongoose');
const ClientPostModel = require('../models/ClientDBModel.js');
const SessionType = require('./userSessionHandler.js');

var ConnectToDB = () => {
    let dbLink =  SessionType.UserSession.CurrentType == SessionType.UserSession.Debug ? process.env.DB_CONNECTION_DEBUG : process.env.DB_CONNECTION;
    mongoose.connect(dbLink,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log('connected to db')
        });
};

var SaveClientToDB = (clientPostModel) => {
    return clientPostModel.save();
};

var CreatePostModel = (clientModel) => {
    return new ClientPostModel({
        name: clientModel.name,
        email: clientModel.email,
        phone: clientModel.phone,
        ip: clientModel.ip,
        country: clientModel.country,
        city: clientModel.city,
        animal: clientModel.animal,
        date: clientModel.dateFull
    });
};

module.exports = {ConnectToDB, SaveClientToDB, CreatePostModel};