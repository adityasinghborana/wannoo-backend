const model = require('../model/favtourmodel')
const favTourController = {
  async getAllFavTour (req, res) {
    try {
      const data = await model.getUserFavTour();
      return res.json(data)
    } catch (error) {
      return res.json(error)
    }
  }
}
module.exports= favTourController;
