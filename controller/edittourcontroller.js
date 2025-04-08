const model = require('../model/edittourmodel');

const EditTourController = {
    async editTour(req, res) {
        const reqData = req.body;

        try {
           const data = await model.updateTourUser(reqData);
            return res.json({ "result": data });
        } catch (error) {
           return res.json({ "error": error });
        }
    }
}
module.exports = EditTourController;