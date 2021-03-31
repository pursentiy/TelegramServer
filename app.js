const express = require('express');
const cors = require('cors');
require('dotenv/config');

const TelegramBotHandler = require('./handlers/TelegramBotHandler');
const DatabaseHandler = require('./handlers/DatabaseHandler.js');
const RequestHandler = require('./handlers/RequestHandler.js');
const SessionType = require('./handlers/UserSessionHandler.js');

const ClientModelRef = require('./models/ClientModel.js');
const ClientModel = ClientModelRef.ClientModel;

const DatabaseService = require('./services/DatabaseService.js');

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

app.post('/login', async (req, res) => {
  try {
    var domainCheck = RequestHandler.CheckIfDomainAllowed(req.header('Origin'));
    var ipIsNotBlocked = RequestHandler.CheckIfIpBlocked(req.ip);

    console.log(`REQ.IP is: ${req.ip}, HEADER is: ${req.header('Origin')}`);
    if (domainCheck && ipIsNotBlocked) {
      let clientModel = new ClientModel(req.body);
      DatabaseService.IfCooldownOff(clientModel.ip, clientModel.dateFull)
          .then(()=>
          {
            HandleTelegramService(clientModel);
            HandleDBService(clientModel);
            res.send(`${req.body.name}, ваша заявка принята, спасибо.`);
          })
          .catch((result)=>{
            res.send(`${req.body.name}, вы превысили число обращений. Вы сможете повторно оставить заявку менее через минуту, либо же позвоните нам по телефону.`);
            console.log("Cooldown is not over");
          });

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