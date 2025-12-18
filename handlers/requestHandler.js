const RequestCheckHandler = require('./RequestCheckHandler.js');
const TelegramMessageHandler = require('./TelegramMessageHandler.js');
const DatabaseHandler = require('./DatabaseHandler.js');
const ClientsService = require('../services/ClientsService.js');
const ClientModelRef = require('../models/ClientModel.js');

const ClientModel = ClientModelRef.ClientModel;

const HandleRequest = async (req, res) => {
    try {
        await TryHandleRequest(req, res);
    }
    catch (err) {
        HandleRequestWithError(res, err);
    }
}

const TryHandleRequest = async (req, res) => {
    if (!CanUserProceed(req.header('Origin'), req.ip)) {
        res.json({
            success: false,
            message: `Ошибка в отправке заявки. Позвоните, пожалуйста, нам по телефону.`
        });
        return;
    }

    let clientModel = new ClientModel(req.body);
    ClientsService.UpdateClientsList();

    if (!ClientsService.IfClientCoolDownTimeOver(clientModel)) {
        HandleRequestWhenCoolDownIsNotOver(res, clientModel);
        return;
    }

    await FinishRequestProcessing(clientModel, res, req);
}

const PrecessMessageInTelegram = async (clientModel) => {
    const message = TelegramMessageHandler.FormMessageToSend(clientModel);
    return await TelegramMessageHandler.SendMessageToTelegram(message);
};

const SaveClientToDB = (clientModel) => {
    DatabaseHandler.SaveClientToDB(DatabaseHandler.CreatePostModel(clientModel));
};

const HandleRequestWithError = (res, err) => {
    res.json({
        success: false,
        message: `Произошла ошибка. Попробуйте позже или позвоните нам по телефону`
    });

    console.log(`Unexpected LOGIN error: ${err}`)
};

const CanUserProceed = (requestDomain, requestIp) => {
    return RequestCheckHandler.CheckIfDomainAllowed(requestDomain) && RequestCheckHandler.CheckIfIpBlocked(requestIp);
}

const HandleRequestWhenCoolDownIsNotOver = (res, clientModel) => {

    res.json({
        success: false,
        message: `${clientModel.name}, вы превысили число обращений. Вы сможете повторно оставить заявку менее через минуту, либо же позвоните нам по телефону.`
    });

    console.log(`Cooldown for ${clientModel.ip}is not over`);
}

const FinishRequestProcessing = async (clientModel, res, req) => {
    ClientsService.AddNewClient(clientModel);
    
    const isTelegramSent = await PrecessMessageInTelegram(clientModel);
    
    SaveClientToDB(clientModel);

    if (isTelegramSent) {
        res.json({
            success: true,
            message: `${req.body.name}, ваша заявка принята, спасибо!`
        });
    } else {
        res.json({
            success: false,
            message: `К сожалению, сервис уведомлений временно недоступен. Пожалуйста, свяжитесь с нами по телефону.`
        });
    }
}

module.exports = { HandleRequest };
