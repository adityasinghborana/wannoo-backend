const userModel = require("../model/usermodel");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  

  async createUser(req, res) {
    try {
      const newUser = await userModel.createUser(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },

  async updateUserProfileImage(req, res) {
    try {
      const newImage = await userModel.updateUserProfileImage(req.body);
      res.status(200).json(newImage);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },

  async deleteUser(req, res) {
    try {
      const { uid } = req.body;
      console.log({"uid":uid});
      const result = await userModel.deleteUser(uid);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },

  async checkUser(req, res) {
    try {
      console.log(req.query)
      const { uid } = req.query;
      const users = await userModel.checkUser(uid);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userModel.updateUser(req.body);
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },
};

module.exports = userController;
