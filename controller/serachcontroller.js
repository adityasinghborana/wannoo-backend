const model = require("../model/searchmodel.js");

const searchController = {
  async search(req, res) {
    const reqquery = req.query;

    try {
      const data = await model.searchTours(reqquery);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
module.exports = searchController;
