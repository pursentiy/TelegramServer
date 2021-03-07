const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true });

module.exports = {
    FormMessageToSend: function (reqBody) {
        var user_name = reqBody.name ? reqBody.name : "no data";
        var user_email = reqBody.email ? reqBody.email : "no data";
        var user_phone = reqBody.phone ? reqBody.phone : "no data";
        var user_ip = reqBody.ip ? reqBody.ip : "no data";
        var user_country = reqBody.country ? reqBody.country : "no data";
        var user_city = reqBody.city ? reqBody.city : "no data";
        var user_animal = reqBody.animal ? reqBody.animal : "no data";
        var user_message = reqBody.message ? reqBody.message : "no data";
        var user_priceFrom = reqBody.priceFrom ? reqBody.priceFrom : "no data";
        var user_priceTo = reqBody.priceTo ? reqBody.priceTo : "no data";
        var user_date = reqBody.date ? reqBody.date : new Date(Date.now);

        return `Данные клиента: \nИмя: ${user_name} \nEmail: ${user_email} \nТелефон: ${user_phone} \nIP адрес: ${user_ip} \nСтрана: ${user_country} \nГород: ${user_city} \nЖивотное: ${user_animal} \nСообщение: ${user_message} \nОжидаемая клиентом цена: от ${user_priceFrom} до ${user_priceTo}\nВремя запроса: ${user_date}`
    },
    SendMessageToTelegram: function (message) {
        bot.sendMessage(process.env.TG_CHAT_ID, message);
    }
}