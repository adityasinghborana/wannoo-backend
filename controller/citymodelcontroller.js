const model = require("../model/citymodel.js");

const ContinentController = {
  async getContinent(req, res) {
    try {
      const data = await model.getAllContinents();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },

  async getAllCountries(req, res) {
    const name = req.query.name; // Access 'name' directly

    try {
      const data = await model.getAllCountries(name);
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },
  async createCountries(req, res) {
    try {
      const continentName = req.body.ContinentName; // Access 'name' directly
      const CountryName = req.body.countryName; // Access 'name' directly
      const imagePath = req.body.image; // Access 'name' directly

      const data = await model.createCountries(
        continentName,
        imagePath,
        CountryName
      );
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
module.exports = ContinentController;
