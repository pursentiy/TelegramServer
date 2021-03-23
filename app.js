const express = require('express');
const ipFilter = require('express-ipfilter').IpFilter
const cors = require('cors')
require('dotenv/config');


const whitelist = ['http://127.0.1.1:5500', 'http://127.0.1.1:5500/gosuslugi.html'];
const ips = ['227.2.0.1']

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

  if (isDomainAllowed) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}


const TelegramBotHandler = require('./handlers/telegramBotHandler');
const DatabaseHandler = require('./handlers/databaseHandler.js');

const app = express();

app.use(cors(corsOptionsDelegate));
app.use(ipFilter(ips, { mode: 'allow' }));

app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("TEST");
});

app.get('/test', (req, res) => {
  res.send("TEST PAGE");
});

app.post('/login', async (req, res) => {
  try{ 
    console.log(`REQ.IP is: ${req.ip}, HEADER is: ${req.header('Origin')}`);
    TelegramBotHandler.SendMessageToTelegram(TelegramBotHandler.FormMessageToSend(req.body));
    const savedPost = await DatabaseHandler.SaveClientToDB(DatabaseHandler.CreatePostModel(req.body));
    res.send(`${req.body.name}, ваша заявка принята, спасибо`);
  }
  catch (err) {
    res.send(`Произошла ошибка. Попробуйте позже или позвоните нам по телефону`);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});