const DatabaseHandler = require('../handlers/DatabaseHandler.js');
const GlobalParamsService = require('./GlobalParamsService');

const IfCooldownOver = (dateNow, ipAdress) => {
    return new Promise((resolve, reject) => {
        DatabaseHandler.ClientModel.find(null, null, {sort: {date: -1}}, (err, result) => {
            if (err) {
                console.log(err);
                reject();
            }
            if (result && result.length > 0) {
                let parsedClientTime = Date.parse(dateNow);
                let timeCheckIndex = result.findIndex((elem, index) =>{
                    let deltaTime = (parsedClientTime - Date.parse(elem.date)) / 1000;
                    if (deltaTime <= GlobalParamsService.GlobalParams.MessageReceiveCoolDownSeconds) {
                        return true;
                    }
                    else if(index === 0){
                    }
                })
                let timeSortedResult = result.filter(elem => {
                    let deltaTime = (parsedClientTime - Date.parse(elem.date)) / 1000;
                    if (deltaTime <= GlobalParamsService.GlobalParams.MessageReceiveCoolDownSeconds) {
                        return elem;
                    }
                });

                if (timeSortedResult.length === 0) {
                    resolve();
                }

                let isIpIncluded = timeSortedResult.some(elem => elem.ip === ipAdress);

                if (isIpIncluded) {
                    reject();
                }
                else {
                    resolve();
                }
            }
            else {
                resolve();
            }
        });
    });
}

module.exports = {IfCooldownOff: IfCooldownOver};