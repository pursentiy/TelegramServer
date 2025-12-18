const TelegramMessageHandler = require('./TelegramMessageHandler.js');
const DatabaseHandler = require('./DatabaseHandler.js');
const SessionType = require('./UserSessionHandler.js');

const SetupHandlers = () =>{
    TelegramMessageHandler.LaunchBot();
    DatabaseHandler.ConnectToDB();
}

const SetCurrentSessionType = (sessionType) => {
    SessionType.SetCurrentSessionType(sessionType);
}

module.exports = { SetupHandlers, SetCurrentSessionType };