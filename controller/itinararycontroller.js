const model = require("../model/itinararymodel");


const ItinararyController = {

    async getUserItinarary(req, res) {

        const body = req.body;
        const data = await model.getUserItinarary();
        return res.json(data);

    },

    async createUserItinarary(req, res) {

       try {
        const body = req.body;
        console.log(body);
        const data = await model.createUserItinarary(body);
        return res.json(data);

       } catch (error) {
        return res.json(error);
       }
    }
}

module.exports = ItinararyController;