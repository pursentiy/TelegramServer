const express = require('express');
const cors = require('cors')
require('dotenv/config');

const TelegramBotHandler = require('./handlers/telegramBotHandler');
const DatabaseHandler = require('./handlers/databaseHandler.js');
const RequestHandler = require('./handlers/requestHandler.js');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("TEST");
});

app.post('/login', async (req, res) => {
  try{ 
    var test = RequestHandler.CheckIfIpAllowed(req.ip);
    console.log(`CheckIfIpAllowed: ${test}}`);
    console.log(`REQ.IP is: ${req.ip}, HEADER is: ${req.header('Origin')}`);
    TelegramBotHandler.SendMessageToTelegram(TelegramBotHandler.FormMessageToSend(req.body));
    const savedPost = await DatabaseHandler.SaveClientToDB(DatabaseHandler.CreatePostModel(req.body));
    res.send(`${req.body.name}, ваша заявка принята, спасибо`);
  }
  catch (err) {
    res.send(`Произошла ошибка. Попробуйте позже или позвоните нам по телефону`);
    console.log(`Unexpected LOGIN error: ${err}`)
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});