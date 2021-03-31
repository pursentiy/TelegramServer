const DatabaseHandler = require('../handlers/DatabaseHandler.js');
const GlobalParamsService = require('./GlobalParamsService');

var IfCooldownOver = (ipAdress, date) => {
    return new Promise((resolve, reject) => {
        DatabaseHandler.ClientModel.find({ip: ipAdress}, null, {sort: {date: -1}}, (err, result) => {
            var deltaTime;
            if (err) {
                console.log(err);
                reject();
            }
            if (result && result.length > 0) {
                deltaTime = (Date.parse(date) - Date.parse(result[0].date)) / 1000;
                if (GlobalParamsService.GlobalParams.MessageReceiveCooldownSeconds < deltaTime) {
                    resolve();
                }
                else{
                    reject(GlobalParamsService.GlobalParams.MessageReceiveCooldownSeconds - deltaTime);
                }
            }
            else{
                resolve();
            }
        });
    });
}

module.exports = {IfCooldownOff: IfCooldownOver};