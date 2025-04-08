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
  async deleteTourType(id) {
    try {
      const deletedData = await prisma.Tourtypes.delete({
        where: { id: parseInt(id) },
      });
      return deletedData;
    } catch (error) {
      console.error("Error deleting tour type:", error);
      return { error: "An error occurred while deleting the tour type" };
    }
  },

  async updateTourType(id, type) {
    try {
      const updatedData = await prisma.Tourtypes.update({
        where: { id: parseInt(id) },
        data: {
          cityTourType: type.name,
          image: type.image ?? "",
        },
      });
      return updatedData;
    } catch (error) {
      console.error("Error updating tour type:", error);
      return { error: "An error occurred while updating the tour type" };
    }
  },
};
module.exports = TourTypeModel;
