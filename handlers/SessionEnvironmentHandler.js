const TelegramBotHandler = require('./TelegramBotHandler');
const DatabaseHandler = require('./databaseHandler.js');
const SessionType = require('./UserSessionHandler.js');

const SetupHandlers = () =>{
    TelegramBotHandler.LaunchBot();
    DatabaseHandler.ConnectToDB();
}

const SetCurrentSessionType = (sessionType) => {
    SessionType.SetCurrentSessionType(sessionType);
}

module.exports = { SetupHandlers, SetCurrentSessionType };