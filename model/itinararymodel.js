const {PrismaClient} = require("@prisma/client");


const prisma = new PrismaClient();

const ItinararyModel = {
    async getUserItinarary(req) {
        console.log(req.uid)
        try {
            const user = await prisma.User.findUnique({
                where: { uid: req.uid }
            });
            return await prisma.userItinarary.findMany({
                where: {
                    userId: user.id,
                },
            });
        } catch (error) {
            console.error("Error fetching itineraries:", error);
            throw error;
        }
    },
    async createUserItinarary(req) {
        try {
            const user = await prisma.User.findUnique({
                where: { uid: req.uid }
            });
            return await prisma.userItinarary.create({
                data: {
                    userId: user.id,  // Add userId directly in the data
                    name: req.name,
                }
            });
        } catch (error) {
            console.error("Error creating itinerary:", error);
            throw error;
        }
    },


    async deleteUserItinerary(req) {
        try {
            const userItinerary = await prisma.userItinarary.delete({
                where: { id: req.id },
            });
    
            return userItinerary;
        } catch (error) {
            console.error("Error deleting itinerary:", error);
            
            
            }
            
            throw error;
        
    
}
    
    

};


module.exports = ItinararyModel;
