const model = require('../model/favtourmodel')
const favTourController = {
  async getAllFavTour (req, res) {
    try {
      const query = req.query
      const data = await model.getUserFavTour(query)
      return res.json(data)
    } catch (error) {
      return res.json(error)
    }
  },

  async addFavTour (req, res) {
    try {
      const data = req.body
     const result= await model.addFavTour(data);
     return res.json(result);
    } catch (error) {
      return res.json(error)
    }
  }
}
module.exports = favTourController
