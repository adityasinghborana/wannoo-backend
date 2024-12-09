const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const FavTourModel = {
  async getUserFavTour () {
    try {
      const data= await prisma.FavoriteTour.findMany({
        where: {
            itineraryId: 1
        },
        include:{
            tour:true
        }
      });

      const tourList = data.map(favTour => favTour.tour);

      return tourList;
    } catch (e) {
      return e
    }
  }
}
module.exports= FavTourModel;