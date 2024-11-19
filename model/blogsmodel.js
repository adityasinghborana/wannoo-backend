const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const BlogsModel = {
  async postBlog(params) {
    try {
      const data = await prisma.blogs.create({
        data: {
          title: params.title,
          content: params.content,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  async getallBlogs() {
    try {
      return await prisma.blogs.findMany();
    } catch (error) {
      return error;
    }
  },

  async getSingleBlog(params) {
    try {
      return await prisma.blogs.findFirst({
        where: {
          id: parseInt(params.id, 10),
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = BlogsModel;
