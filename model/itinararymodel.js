const {PrismaClient} = require("@prisma/client");


const prisma = new PrismaClient();

const ItinararyModel = {
    async getUserItinarary() {
        try {
            return await prisma.userItinarary.findMany({
                where: {
                    userId: 1,
                },
            });
        } catch (error) {
            console.error("Error fetching itineraries:", error);
            throw error;
        }
    },
    async createUserItinarary(req) {
        try {
            return await prisma.userItinarary.create({
                data: {
                    userId: 1,  // Add userId directly in the data
                    name: req.name,
                }
            });
        } catch (error) {
            console.error("Error creating itinerary:", error);
            throw error;
        }
    }
    

};


module.exports = ItinararyModel;
