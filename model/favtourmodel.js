const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const FavTourModel = {
  async getUserFavTour (req) {
    try {
      const data = await prisma.FavoriteTour.findMany({
        where: {
          itineraryId: parseInt(req.id)
        },
        include: {
          tour: {
            include: {
              tourpricing: true, // Include tourpricing inside tour
            },
          },
        }
      })

      const tourList = data.map(favTour => favTour.tour)

      return tourList
    } catch (e) {
      return e
    }
  },

  async addFavTour (datainput) {

    try {
      console.log(datainput)
      const user = await prisma.User.findUnique({
        where: { uid: datainput.userId }
    });
      const addedTour = await prisma.FavoriteTour.create({
        data: {
          userId: user.id,
          tourId: datainput.tourId,
          itineraryId: datainput.itineraryId
        }
      })
      console.log(addedTour)
      return addedTour
    } catch (error) {
      console.log(error);
      return error
    }
  }
,

async deleteFavTour(datainput) {

  try {
    console.log(datainput);

      // Find user first
      const user = await prisma.User.findUnique({
          where: { uid: datainput.id }
      });

      if (!user) {
          throw new Error("User not found");
      }
      const tour = await prisma.tourstaticdata.findUnique({
        where: { tourId: datainput.tourId }
    });

    if (!tour) {
        throw new Error("Tour not found");
    }
      // Delete the favorite tour
      const deletedTour = await prisma.FavoriteTour.delete({
          where: {
            userId_tourId_itineraryId: {   // Use composite key
              userId: user.id,
              tourId: tour.id,
              itineraryId: datainput.itineraryId
            }
          }
      });

      console.log(deletedTour);
      return deletedTour;
  } catch (error) {
      console.error("Error deleting favorite tour:", error);
      return { error: error.message };
  }
}


}
module.exports = FavTourModel
