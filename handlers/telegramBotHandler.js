const SessionType = require('./UserSessionHandler.js');
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
let bot, chatId;

const LaunchBot = () => {
    let botToken = SessionType.UserSession.CurrentType == SessionType.UserSession.Debug ? process.env.TG_TOKEN_DEBUG : process.env.TG_TOKEN;
    chatId =  SessionType.UserSession.CurrentType == SessionType.UserSession.Debug ? process.env.TG_CHAT_ID_DEBUG : process.env.TG_CHAT_ID;
    bot = new TelegramBot(botToken, { polling: true });
};

var FormMessageToSend = (clientModel) => {
    return `Данные клиента: \nИмя: ${clientModel.name} \nEmail: ${clientModel.email} \nТелефон: ${clientModel.phone} \nСайт: ${clientModel.site} \nIP адрес: ${clientModel.ip} \nСтрана: ${clientModel.country} \nГород: ${clientModel.city} \nРайон: ${clientModel.district} \nЖивотное: ${clientModel.animal} \nСообщение: ${clientModel.message} \nОжидаемая цена: от ${clientModel.priceFrom} до ${clientModel.priceTo}\nВремя запроса: ${clientModel.dateFull}`
};

var SendMessageToTelegram = (message) => {
    bot.sendMessage(chatId, message);
};

module.exports = {LaunchBot, FormMessageToSend, SendMessageToTelegram};