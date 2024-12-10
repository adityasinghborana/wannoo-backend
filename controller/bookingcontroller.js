const BookingModel = require('../model/bookingmodel')

const Bookingcontroller = {
  async book (req, res) {
    try {
      const query = req.body

      const bookingdata = await BookingModel.bookTours(query);

      res.status(200).json(bookingdata)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'An error occurred while booking' })
    }
  },

  async getAllBookings (req, res) {
    try {
      const allbookings = await BookingModel.getAllBookings()
      res.json(allbookings)
    } catch (error) {
      console.error(error)
    }
  },
  async getBookingDetails (req, res) {
    const id = req.body
    console.log(id, 'hello')
    try {
      const bookingDetails = await BookingModel.getBookingsDetails(req.body.id)
      res.json(bookingDetails)
    } catch (error) {
      console.error(error)
    }
  },
  async getUserBookings (req, res) {
    try {
      const user = req.body
      const bookings = await BookingModel.getBookingResultsByUser(user.id)
      res.json(bookings)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Bookingcontroller
