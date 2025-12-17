require('dotenv/config');

const express = require('express');
const cors = require('cors');

const SessionEnvironmentHandler = require('./handlers/SessionEnvironmentHandler.js');
const SessionType = require('./handlers/UserSessionHandler.js');
const RequestHandler = require('./handlers/RequestHandler.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PrepareEnvironment = () => {
    SessionEnvironmentHandler.SetCurrentSessionType(SessionType.UserSession.Debug);
    SessionEnvironmentHandler.SetupHandlers();
}

PrepareEnvironment();

app.post('/proxy-login', async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.error("Ошибка: Тело запроса пустое или не является JSON");
        return res.status(400).json({ error: "Empty JSON body" });
    }
    RequestHandler.HandleRequest(req, res);
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
});

