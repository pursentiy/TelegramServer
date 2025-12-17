const TelegramBotHandler = require('./TelegramBotHandler.js');
const DatabaseHandler = require('./DatabaseHandler.js');
const SessionType = require('./UserSessionHandler.js');

const SetupHandlers = () =>{
    TelegramBotHandler.LaunchBot();
    DatabaseHandler.ConnectToDB();
}

const SetCurrentSessionType = (sessionType) => {
    SessionType.SetCurrentSessionType(sessionType);
}

module.exports = { SetupHandlers, SetCurrentSessionType };