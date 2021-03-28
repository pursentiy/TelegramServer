class ClientModel {
    constructor(reqBody){
       this.name = reqBody.name ? reqBody.name : "no data";
       this.email = reqBody.email ? reqBody.email : "no data";
       this.phone = reqBody.phone ? reqBody.phone : "no data";
       this.site = reqBody.site ? reqBody.site : "no data";
       this.ip = reqBody.ip ? reqBody.ip : "no data";
       this.country = reqBody.country ? reqBody.country : "no data";
       this.city = reqBody.city ? reqBody.city : "no data";
       this.district = reqBody.district ? reqBody.district : "no data";
       this.animal = reqBody.animal ? reqBody.animal : "no data";
       this.message = reqBody.message ? reqBody.message : "no data";
       this.priceFrom = reqBody.priceFrom ? reqBody.priceFrom : "no data";
       this.priceTo = reqBody.priceTo ? reqBody.priceTo : "no data";
       this.dateFull = reqBody.date ? reqBody.date : new Date(Date.now);
       this.dateRaw = reqBody.date ? reqBody.dateRaw : Date.now;
    }
};

module.exports = {
    ClientModel
}