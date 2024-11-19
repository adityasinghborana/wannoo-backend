const model = require("../model/blogsmodel");

const BlogsModelController = {
  async postBlog(req, res) {
    const bodyData = req.body;

    try {
      const data = await model.postBlog(bodyData);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error });
    }
  },
  async getBlogs(req, res) {
    try {
      const data = await model.getallBlogs();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },

  async getBlog(req, res) {
    const reqData = req.query;
    try {
      const data = await model.getSingleBlog(reqData);
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
module.exports = BlogsModelController;
