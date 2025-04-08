const createTourtypes = require("../model/tourtypes");

const createTourTypeController = {
  async tourtype(req, res) {
    const type = req.body;
    try {
      const data = await createTourtypes.saveTourType(type); // Ensure the function name matches
      return res.json({ result: data });
    } catch (error) {
      console.error("Error creating tour type:", error);
      return res
        .status(500)
        .json({
          "error message": "An error occurred while creating the tour type",
        });
    }
  },
  async deleteTourtype(req, res) {
    const id = req.params.id;
    try {
      const data = await createTourtypes.deleteTourType(id);
      return res.json({ result: data });
    } catch (error) {
      console.error("Error deleting tour type:", error);
      return res
        .status(500)
        .json({ "error message": "An error occurred while deleting the tour type" });
    }
  },

  async updateTourtype(req, res) {
    const id = req.params.id;
    const type = req.body;
    try {
      const data = await createTourtypes.updateTourType(id, type);
      return res.json({ result: data });
    } catch (error) {
      console.error("Error updating tour type:", error);
      return res
        .status(500)
        .json({ "error message": "An error occurred while updating the tour type" });
    }
  },


};

module.exports = createTourTypeController;
