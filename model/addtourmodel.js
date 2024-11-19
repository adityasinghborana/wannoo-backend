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
          isSlot: params.isslot,
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
          isSlot: params.isslot,
          tourDescription: params.tourdescription || "none",
          tourInclusion: params.tourinclusion || "none",
          tourShortDescription: params.shortdescription || "none",
          importantInformation: params.importantinformation || "none",
          itenararyDescription: params.itenararydescription || "none",
          usefulInformation: params.usefulinformation || "none",
          childAge: params.childage || "0",
          infantAge: params.infantage || "0",
          isVendorTour: params.isvendortour,
          infantCount: params.infantcount || 0,
          onlyChild: params.isonlychild || false,
          startTime: params.starttime || "",
          meal: params.meal,
          googleMapUrl: params.googlemapurl,
          tourExclusion: params.tourexclusion,
          vendorUid: params.vendoruid,
        },
      });

      // Iterate over optionlist to create TourOption and related entities
      await Promise.all(
        params.optionlist.map(async (option) => {
          const gtourOptionId = await this.generateUniqueTourOptionId();
          const createdTourOption = await prismaClient.tourOption.create({
            data: {
              tourId: gtourId,
              tourOptionId: gtourOptionId,
              optionName: option.optionname,
              childAge: option.childage || "",
              infantAge: option.infantage || "",
              optionDescription: option.optiondescription || "",
              minPax: option.minpax,
              maxPax: option.maxpax,
            },
          });
          const touroptionid = createdTourOption.tourOptionId;

          await prismaClient.operationDay.create({
            data: {
              tourId: gtourId,
              tourOptionId: touroptionid,
              monday: option.operationDays.monday,
              tuesday: option.operationDays.tuesday,
              wednesday: option.operationDays.wednesday,
              thursday: option.operationDays.thursday,
              friday: option.operationDays.friday,
              saturday: option.operationDays.saturday,
              sunday: option.operationDays.sunday,
            },
          });

          // Create TimeSlot for each TourOption
          await Promise.all(
            (option.timeSlots || []).map(async (timeSlot) => {
              const gtimeSlotId = await this.generateUniqueTimeSlotId();
              return prismaClient.timeSlot.create({
                data: {
                  tourOptionId: createdTourOption.tourOptionId,
                  timeSlotId: gtimeSlotId.toString(),
                  timeSlot: timeSlot.timeSlot,
                  available: timeSlot.available,
                  adultPrice: timeSlot.adultPrice,
                  childPrice: timeSlot.childPrice,
                },
              });
            })
          );
        })
      );

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
