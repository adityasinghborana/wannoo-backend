const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetContinents = {
  async getAllContinents() {
    try {
      return await prisma.continent.findMany();
    } catch (error) {
      console.log("hello");
      return error;
    }
  },

  async getAllCountries(nameC) {
    // console.log(req);
    try {
      const continentid = await prisma.continent.findFirst({
        where: {
          name: nameC,
        },
      });
      console.log(continentid);
      // console.log(continentid);
      return await prisma.country.findMany({
        where: {
          continentId: parseInt(continentid.id, 10),
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async createCountries(nameC, imagepath, countryName) {
    // console.log(req);
    try {
      const continentid = await prisma.continent.findFirst({
        where: {
          name: nameC,
        },
      });
      console.log(continentid);
      // console.log(continentid);
      return await prisma.country.create({
        data: {
          name: countryName,
          image: imagepath,
          continentId: continentid.id,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
module.exports = GetContinents;
