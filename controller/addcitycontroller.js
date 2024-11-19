const model = require("../model/createcity");

const addCityController = {
  async addCity(req, res) {
    const body = req.body;

    try {
      const data = await model.createCity(body);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
module.exports = addCityController;
