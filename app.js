const express = require('express');
const cors = require('cors');
require('dotenv/config');

const SessionEnvironmentHandler = require('./handlers/SessionEnvironmentHandler.js');
const SessionType = require('./handlers/UserSessionHandler.js');
const RequestHandler = require('./handlers/RequestHandler.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PrepareEnvironment = () => {
    SessionEnvironmentHandler.SetCurrentSessionType(SessionType.UserSession.Debug);
    SessionEnvironmentHandler.SetupHandlers();
}

PrepareEnvironment();

app.post('/login', async (req, res) => {
    RequestHandler.HandleRequest(req, res);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

