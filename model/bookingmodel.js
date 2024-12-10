const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const BookingModel = {
  async bookTours (body) {
    const data = await prisma.bookingDetail.create({
      data: {
        fullName: body.fullName,
        status:body.status,
        email: body.email,
        passengers: body.passengers,
        tourDate: body.tourDate,
        serviceTotal: body.serviceTotal,
        userId: body.userId,
        roleId: body.vendorUID,
        tourId: body.tourId
      }
    })

    return data
  },

  /// other apis models
  async getAllBookings () {
    const bookings = await prisma.bookingDetail.findMany()
    return bookings
  },

  async getBookingsDetails (bookingid) {
    try {
      const bookings = await prisma.bookingDetail.findUnique({
        where: {
          bookingId: bookingid
        }
      })
      return bookings
    } catch (error) {
      console.log(error)
      return error
    }
  },

  async getBookingResultsByUser (userId) {
    try {
      const bookingResults = await prisma.bookingDetail.findMany({
        where: {
          userId: userId
        },
        include: {
          user: true,
  
        }
      })
      return bookingResults
    } catch (error) {
      console.error('Error fetching booking results:', error)
      throw new Error('Error fetching booking results')
    }
  }
}

module.exports = BookingModel
