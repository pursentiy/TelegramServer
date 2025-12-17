const RequestCheckHandler = require('./RequestCheckHandler.js');
const TelegramBotHandler = require('./TelegramBotHandler.js');
const DatabaseHandler = require('./DatabaseHandler.js');
const ClientsService = require('../services/ClientsService.js');
const ClientModelRef = require('../models/ClientModel.js');

const ClientModel = ClientModelRef.ClientModel;

const HandleRequest = (req, res) => {
    try {
        TryHandleRequest(req, res);
    }
    catch (err) {
        HandleRequestWithError(res, err);
    }
}

const TryHandleRequest = (req, res) => {

    if (!CanUserProceed(req.header('Origin'), req.ip)) {
        res.send(`Не получилось оформить заявку. Позвоните нам по телефону.`);
        return;
    }

    console.log(`REQ.IP is: ${req.ip}, HEADER is: ${req.header('Origin')}`);
    let clientModel = new ClientModel(req.body);
    ClientsService.UpdateClientsList();

    if (!ClientsService.IfClientCoolDownTimeOver(clientModel)) {
        HandleRequestWhenCoolDownIsNotOver(res, clientModel);
        return;
    }

    FinishRequestProcessing(clientModel, res, req);
}

const PrecessMessageInTelegram = (clientModel) => {
    TelegramBotHandler.SendMessageToTelegram(TelegramBotHandler.FormMessageToSend(clientModel));
};

const SaveClientToDB = (clientModel) => {
    DatabaseHandler.SaveClientToDB(DatabaseHandler.CreatePostModel(clientModel));
};

const HandleRequestWithError = (res, err) => {
    res.send(`Произошла ошибка. Попробуйте позже или позвоните нам по телефону`);
    console.log(`Unexpected LOGIN error: ${err}`)
};

const CanUserProceed = (requestDomain, requestIp) => {
    return true;
    //return RequestCheckHandler.CheckIfDomainAllowed(requestDomain) && RequestCheckHandler.CheckIfIpBlocked(requestIp);
}

const HandleRequestWhenCoolDownIsNotOver = (res, clientModel) => {
    res.send(`${clientModel.name}, вы превысили число обращений. Вы сможете повторно оставить заявку менее через минуту, либо же позвоните нам по телефону.`);
    console.log(`Cooldown for ${clientModel.ip}is not over`);
}


const FinishRequestProcessing = (clientModel, res, req) => {
    ClientsService.AddNewClient(clientModel);
    PrecessMessageInTelegram(clientModel);
    SaveClientToDB(clientModel);
    res.send(`${req.body.name}, ваша заявка принята, спасибо.`);
}

module.exports = { HandleRequest };
