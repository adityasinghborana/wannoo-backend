const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addCity = {
  async createCity(body) {
    try {
      const data = await prisma.city.create({
        data: {
          CityName: body.name,
          countryId: body.id,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = addCity;
