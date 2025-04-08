const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userModel = {
  async getAllUsers() {
    return await prisma.user.findMany({
     
    });
  },

  async createUser({ email, username, uid, isUser, address, age, dob }) {
    const existingUser = await prisma.user.findFirst({
      where: {
        uid,
      },
    });

    if (existingUser) {
      throw new Error("User with this UID already exists");
    }

    return await prisma.user.create({
      data: {
        email,
        username,
        uid,
        isUser,
        address,
        age,
        dob,
      },
    });
  },


  async deleteUser(Uid) {
    

    await prisma.user.delete({
      where: {
        uid:Uid,
      },
    });

    return { message: "User deleted successfully" };
  },

  async checkUser(Uid) {
    const user = await prisma.User.findUnique({
        where: { uid: Uid }
    });

    if (!user) return []; // Return an empty array if user not found

    return await prisma.User.findUnique({
        where: { id: user.id }
    });
},

  async updateUser(data) {
    const existingUser = await prisma.user.findFirst({
      where: {
        uid : data.uid,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await prisma.user.update({
      where: {
        uid:data.uid,
      },
      data: {
        username:data.username,
        address:data.address,

        
      },
    });
  },

  async updateUserProfileImage(data) {
    const existingUser = await prisma.user.findFirst({
      where: {
        uid : data.uid,
      },
    });
console.log(data)
    if (!existingUser) {
      throw new Error("User not found");
    }

   try{
    return await prisma.user.update({
      where: {
        uid:data.uid,
      },
      data: {
        profileImage:data.profileImageUrl
        
      },
    
    });

   }catch(e){
return e;
   }
  },

};

module.exports = userModel;
