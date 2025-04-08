const express = require("express");
const { PrismaClient } = require("@prisma/client");
// Adjust the path as needed

const prismaClient = new PrismaClient();

// Tour User Module
const AddTourUser = {
  async generateUniqueTourId() {
    const existingIds = await prismaClient.tourstaticdata.findMany({
      select: { tourId: true },
    });

    const existingIdSet = new Set(existingIds.map((idObj) => idObj.tourId));

    let newTourId;
    do {
      newTourId = Math.floor(Math.random() * 10000); // Adjust the range as needed
    } while (existingIdSet.has(newTourId));

    return newTourId;
  },

  async generateUniqueTourOptionId() {
    const existingIds = await prismaClient.tourOption.findMany({
      select: { tourOptionId: true },
    });

    const existingOptionIdSet = new Set(
      existingIds.map((idObj) => idObj.tourOptionId)
    );

    let newTourOptionId;
    do {
      newTourOptionId = Math.floor(Math.random() * 10000); // Adjust the range as needed
    } while (existingOptionIdSet.has(newTourOptionId));

    return newTourOptionId;
  },

  async generateUniqueTimeSlotId() {
    const existingIds = await prismaClient.timeSlot.findMany({
      select: { id: true },
    });

    const existingTimeSlotIdSet = new Set(existingIds.map((idObj) => idObj.id));

    let newTimeSlotId;
    do {
      newTimeSlotId = Math.floor(Math.random() * 10000); // Adjust the range as needed
    } while (existingTimeSlotIdSet.has(newTimeSlotId));

    return newTimeSlotId;
  },

  async createTourUser(params) {
    try {
      const gtourId = await this.generateUniqueTourId();

      await prismaClient.tourstaticdata.create({
        data: {
          tourId: gtourId,
          countryId: params.countryid,
          countryName: params.countryname,
          cityId: params.cityid,
          cityName: params.cityname,
          tourName: params.tourname,
          duration: params.duration,
          imagePath: params.imagepath,
          cityTourTypeId: params.citytourtypeid.toString(),
          cityTourType: params.citytourtype,
          continent: params.continent,
          vendorUid: params.vendoruid,
          isVendorTour: params.isvendortour,
          recommended: params.isrecommended,
      
        },
      });

      // Add TourPricing
      await prismaClient.tourPricing.create({
        data: {
          tourId: gtourId,
          amount: params.amount,
        },
      });

      await prismaClient.tourstaticdatabyid.create({
        data: {
          TourId: gtourId,
          countryId: params.countryid,
          countryName: params.countryname,
          continent: params.continent,
          cityId: params.cityid,
          cityName: params.cityname,
          tourName: params.tourname,
          duration: params.duration,
          imagePath: params.imagepath,
          cityTourTypeId: params.citytourtypeid.toString(),
          cityTourType: params.citytourtype,
      Bookable:params.Bookable,
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
          vendorUid: params.vendoruid,
        },
      });

      // Iterate over optionlist to create TourOption and related entities
    

      // Save tour images
      await Promise.all(
        params.imagepaths.map(async (ImagePath) => {
          try {
            await prismaClient.tourImagess.create({
              data: {
                tourId: gtourId,
                imagePath: ImagePath,
              },
            });
          } catch (error) {
            console.error(`Error creating TourImagess: ${error}`);
          }
        })
      );
      await Promise.all(
        params.faqs.map(async (faq) => {
          try {
            await prismaClient.faq.create({
              data: {
                tourid: gtourId,
                question: faq.question,
                answer: faq.answer,
              },
            });
          } catch (error) {
            console.error(`Error creating TourImagess: ${error}`);
          }
        })
      );

      return {
        status: 200,
        message: "Tour user created successfully",
        tourId: gtourId,
      };
    } catch (error) {
      console.error("Error in createTourUser:", error);
      throw new Error("Failed to create tour user");
    }
  },
};

module.exports = AddTourUser;
