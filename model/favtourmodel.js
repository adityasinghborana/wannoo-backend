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
          tour: true
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
      const addedTour = await prisma.FavoriteTour.create({
        data: {
          userId: datainput.userId,
          tourId: datainput.tourId,
          itineraryId: datainput.itineraryId
        }
      })
      console.log(addedTour)
      return addedTour
    } catch (error) {
      return error
    }
  }
}
module.exports = FavTourModel
