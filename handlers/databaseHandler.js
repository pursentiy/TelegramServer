const mongoose = require('mongoose');
const ClientPostModel = require('../models/ClientModel.js')

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to db')
    });

module.exports = {
    SaveClientToDB: function (clientSchema) {
        return clientSchema.save();
    },
    CreatePostModel: function (data) {
        return new ClientPostModel({
            name: data.name ? data.name : "no data",
            email: data.email ? data.email : "no data",
            phone: data.phone ? data.phone : "no data",
            ip: data.ip ? data.ip : "no data",
            country: data.country ? data.country : "no data",
            city: data.city ? data.city : "no data",
            animal: data.animal ? data.animal : "no data",
            date: data.date ? data.date : new Date()
        });
    }
}