const SessionType = require('./UserSessionHandler.js');
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
let bot, chatId;

const LaunchBot = () => {
    let botToken = SessionType.UserSession.CurrentType == SessionType.UserSession.Production ? process.env.TG_TOKEN : process.env.TG_TOKEN_DEBUG;
    chatId =  SessionType.UserSession.CurrentType == SessionType.UserSession.Production ? process.env.TG_CHAT_ID : process.env.TG_CHAT_ID_DEBUG;
    bot = new TelegramBot(botToken, { polling: true });
};

var FormMessageToSend = (clientModel) => {
    return `Данные клиента: \nИмя: ${clientModel.name} \nEmail: ${clientModel.email} \nТелефон: ${clientModel.phone} \nСайт: ${clientModel.site} \nIP адрес: ${clientModel.ip} \nСтрана: ${clientModel.country} \nГород: ${clientModel.city} \nРайон: ${clientModel.district} \nЖивотное: ${clientModel.animal} \nСообщение: ${clientModel.message} \nОжидаемая цена: от ${clientModel.priceFrom} до ${clientModel.priceTo}\nВремя запроса: ${clientModel.dateFull}`
};

var SendMessageToTelegram = async (message) => {
    try {
        await bot.sendMessage(chatId, message);
        return true;
    } catch (error) {
        console.error('Ошибка отправки в Telegram API:', error.message);
        return false;
    }
};

module.exports = { LaunchBot, FormMessageToSend, SendMessageToTelegram };