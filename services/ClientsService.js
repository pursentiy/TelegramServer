const GlobalParamsService = require('./GlobalParamsService.js');
const ClientModelRef = require('../models/ClientModel.js');
const ClientModel = ClientModelRef.ClientModel;
let ClientsList = [];

const AddNewClient = (client => ClientsList.push(client));

const UpdateClientsList = (() =>{
    if(ClientsList.length === 0){
        return;
    }
    let currentTime = Date.now();
    let newClientsList = ClientsList.filter(client => {
        let deltaTime = (currentTime - client.dateRaw) / 1000;
        if(deltaTime <= GlobalParamsService.GlobalParams.MessageReceiveCoolDownSeconds){
            return client;
        }
    });
    ClientsList.length = 0;
    ClientsList = newClientsList.slice();
});

const IfClientCoolDownTimeOver = (newClient => {
    if(ClientsList.length === 0){
        return true;
    }
    return checkCooldownResult = !ClientsList.some(client => {
        if (client.ip === newClient.ip) {
            return true;
        }
    });
})

module.exports = {IfClientCoolDownTimeOver: IfClientCoolDownTimeOver, UpdateClientsList, AddNewClient};