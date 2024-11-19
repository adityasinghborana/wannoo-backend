const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SearchToursModel = {
  async searchTours(req) {
    console.log(req);
    try {
      return await prisma.tourstaticdata.findMany({
        where: {
          cityName: req.city,
          countryName: req.country,
          cityTourType: req.tourtype,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = SearchToursModel;
