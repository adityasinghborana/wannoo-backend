const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const TourTypeModel = {
  async saveTourType(type) {
    try {
      const savedData = await prisma.Tourtypes.create({
        data: {
          cityTourType: type.name,
          image: type.image ?? "",
        },
      });
      return savedData;
    } catch (error) {
      console.error("Error saving tour type:", error);
      return { error: "An error occurred while saving the tour type" };
    } finally {
      await prisma.$disconnect();
    }
  },
};
module.exports = TourTypeModel;
