const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const EditTourModel = {
//   async editTour (data) {
//     try {
//       const tour = await prisma.tourstaticdata.findUnique({
//         where: {
//           id: data.id
//         },
//         include:{
//             tourpricing:true,
//             tourdetails:{
//                 include:{
//                     tourImages:true,
//                     faq:true,
//                 }
//             },
//         }
//       })
//       return tour
//     } catch (error) {
//       return {
//         'message ': error
//       }
//     }
//   },
  
  async updateTourUser(params) {
    try {
      const { id} = params;

      const tourIdInt = parseInt(id);
     const findTourId= await prisma.tourstaticdata.findUnique({
        where:{
            id:tourIdInt
        }
     })

     const tourId =findTourId.tourId;
  
      // Update tourstaticdata
      await prisma.tourstaticdata.update({
        where: { tourId},
        data: {
          countryId: params.countryid,
          countryName: params.countryname,
          cityId: params.cityid,
          cityName: params.cityname,
          tourName: params.tourname,
          duration: params.duration,
          imagePath: params.imagepath,
          cityTourTypeId: params.citytourtypeid,
          cityTourType: params.citytourtype,
          continent: params.continent,
          vendorUid: params.vendoruid,
          isVendorTour: params.isvendortour,
          recommended: params.isrecommended,
        },
      });
  
      // Update tourPricing
      await prisma.tourPricing.update({
        where: { tourId },
        data: {
          amount: params.amount,
        },
      });
  
      // Update tourstaticdatabyid
      await prisma.tourstaticdatabyid.update({
        where: { TourId: tourId },
        data: {
          countryId: params.countryid,
          countryName: params.countryname,
          continent: params.continent,
          cityId: params.cityid,
          cityName: params.cityname,
          tourName: params.tourname,
          duration: params.duration,
          imagePath: params.imagepath,
           cityTourTypeId: params.citytourtypeid,
          cityTourType: params.citytourtype,
          Bookable: params.Bookable,
          tourDescription: params.tourdescription || "none",
          tourInclusion: params.tourinclusion || "none",
          tourShortDescription: params.shortdescription || "none",
          importantInformation: params.importantinformation || "none",
          itenararyDescription: params.itenararydescription || "none",
          usefulInformation: params.usefulinformation || "none",
          isVendorTour: params.isvendortour,
          startTime: params.starttime || "",
          googleMapUrl: params.googlemapurl,
          tourExclusion: params.tourexclusion,
          
        },
      });
  
      
    

      if(params.imagepaths===null){
        await prisma.tourImagess.deleteMany({ where: { tourId } });
        await Promise.all(

        
            params.imagepaths.map((ImagePath) =>
              prisma.tourImagess.create({
                data: { tourId, imagePath: ImagePath },
              })
            )
          );
      }
     
  
      // Delete and recreate FAQs
      await prisma.faq.deleteMany({ where: { tourid: tourId } });
      await Promise.all(
        params.faqs.map((faq) =>
          prisma.faq.create({
            data: {
              tourid: tourId,
              question: faq.question,
              answer: faq.answer,
            },
          })
        )
      );
  
      return {
        status: 200,
        message: "Tour updated successfully",
        tourId: tourId,
      };
    } catch (error) {
      console.error("Error in updateTourUser:", error);
      throw new Error("Failed to update tour user");
    }
  }
  
}

module.exports = EditTourModel
