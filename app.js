const express = require('express');
const cors = require('cors');
require('dotenv/config');

const TelegramBotHandler = require('./handlers/telegramBotHandler');
const DatabaseHandler = require('./handlers/databaseHandler.js');
const RequestHandler = require('./handlers/requestHandler.js');
const SessionType = require('./handlers/userSessionHandler.js');

const ClientModelRef = require('./models/ClientModel.js');
const ClientModel = ClientModelRef.ClientModel;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var SetUpHandlers = () => {
  SessionType.SetCurrentSessionType(SessionType.UserSession.Debug);
  TelegramBotHandler.LaunchBot();
  DatabaseHandler.ConnectToDB();
};
SetUpHandlers();

app.get('/', (req, res) => {
  res.send("TEST");
});

app.post('/login', async (req, res) => {
  try {
    var domainCheck = RequestHandler.CheckIfDomainAllowed(req.header('Origin'));
    var ipIsNotBlocked = RequestHandler.CheckIfIpBlocked(req.ip);

    console.log(`REQ.IP is: ${req.ip}, HEADER is: ${req.header('Origin')}`);
    if (domainCheck && ipIsNotBlocked) {
      let clientModel = new ClientModel(req.body);
      HandleTelegramService(clientModel);
      HandleDBService(clientModel);
      res.send(`${req.body.name}, ваша заявка принята, спасибо`);
    }
    else {
      res.send(`Не получилось оформить заявку. Позвоните нам по телефону.`);
    }
  }
  catch (err) {
    HandleErrorRequest(res, err);
  }
});

var HandleTelegramService = (clientModel) => {
  TelegramBotHandler.SendMessageToTelegram(TelegramBotHandler.FormMessageToSend(clientModel));
};

var HandleDBService = (clientModel) => {
  DatabaseHandler.SaveClientToDB(DatabaseHandler.CreatePostModel(clientModel));
};

var HandleErrorRequest = (res, err) => {
  res.send(`Произошла ошибка. Попробуйте позже или позвоните нам по телефону`);
  console.log(`Unexpected LOGIN error: ${err}`)
};

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});