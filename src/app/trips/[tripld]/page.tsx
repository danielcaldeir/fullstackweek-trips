import React from "react";
import { prisma } from "@/lib/prisma";
import TripHeader from "@/app/trips/[tripld]/components/TripHeader";
// import TripDescription from "@/app/trips/[tripld]/components/TripDescription";
// import TripHighlights from "@/app/trips/[tripld]/components/TripHighlights";
// import TripLocation from "@/app/trips/[tripld]/components/TripLocation";
// import TripReservation from "@/app/trips/[tripld]/components/TripReservation";

const getTripDetails = async (tripId: string) => {
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
        // id: "tripIda47daf55-9ff3-47b2-8ab5-6731df13f91b",
      },
    });
    return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
    console.log(params);
    const trip = await getTripDetails(params.tripId);
  
    if (!trip) return null;
  
    return (
      <div className="container mx-auto lg:px-40 lg:pt-10">
        <TripHeader trip={trip} />
        {/* <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
          <div className="lg:order-2">
            <TripReservation
              tripId={trip.id}
              pricePerDay={trip.pricePerDay as any}
              tripStartDate={trip.startDate}
              tripEndDate={trip.endDate}
              maxGuests={trip.maxGuests}
            />
          </div>
          <div className="lg:order-1">
            <TripDescription description={trip.description} />
            <TripHighlights highlights={trip.highlights} />
          </div>
        </div> */}
        {/* <TripLocation locationDescription={trip.locationDescription} location={trip.location} /> */}
      </div>
    );
};
  
export default TripDetails;