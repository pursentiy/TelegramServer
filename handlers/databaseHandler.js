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

const ClientModel = mongoose.model('Clients', ClientDBSchema);

const ConnectToDB = () => {
    let dbLink = SessionType.UserSession.CurrentType == SessionType.UserSession.Production 
        ? process.env.DB_CONNECTION 
        : process.env.DB_CONNECTION;

    // Добавляем обработку ошибок через .then/.catch или параметры
    mongoose.connect(dbLink, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Не ждать больше 5 секунд
    })
    .then(() => console.log('УСПЕХ: Подключено к MongoDB Atlas'))
    .catch(err => console.error('ОШИБКА МОНГО:', err.message));
};

const SaveClientToDB = (clientPostModel) => {
    return clientPostModel.save();
};

const CreatePostModel = (clientModel) => {
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