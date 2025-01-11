"use client";

import { CardContent, CardHeader } from "@/components/ui/card";
import { IFlight } from "@/types/interfaces";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type FlightModalProps = {
  flight: IFlight;
  onClose: () => void;
};

function FlightDetailsModal({ flight, onClose }: FlightModalProps) {
  const { _id: id } = flight || {};
  const [selectedFlight, setSelectedFlight] = useState<IFlight | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(`/api/v1/flight/${id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch flight details.");
        }
        setSelectedFlight(data?.data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlight();
    }
  }, [id]);

  // Error handling display
  if (error) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]'>
        <div className='w-full max-w-2xl h-full min-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-lg'>
          <div className='text-center'>
            <p className='text-red-600'>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state display
  if (loading) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]'>
        <div className='w-full max-w-2xl min-h-[calc(100vh-70px)] bg-white rounded-lg shadow-xl p-8 relative'>
          <div className='text-center text-gray-600'>
            Loading flight details...
          </div>
        </div>
      </div>
    );
  }

  // If flight data is available
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]'>
      <div className='w-full max-w-2xl min-h-[calc(100vh-70px)] bg-white rounded-lg shadow-xl p-8 relative'>
        {/* Close Button */}
        <div
          className='absolute top-6 right-6 w-12 h-12 rounded-full flex justify-center items-center bg-white text-gray-800 shadow-lg hover:bg-gray-200 cursor-pointer'
          onClick={onClose}
        >
          <X size={20} />
        </div>

        {/* Flight Image */}
        {selectedFlight && (
          <div className='overflow-hidden rounded-lg shadow-xl mb-8'>
            <Image
              src='/assets/airline.jpg'
              alt='Flight Image'
              width={600}
              height={350}
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
        )}

        {/* Flight Details */}
        {selectedFlight && (
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <CardHeader className='text-center mb-6'>
              <h2 className='text-3xl font-extrabold text-gray-800 tracking-tight'>
                {selectedFlight.airline} - {selectedFlight.flightNumber}
              </h2>
            </CardHeader>

            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                {/* Left Column: Flight Info */}
                <div className='space-y-4'>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>Origin:</strong>
                    </p>
                    <p className='text-lg text-gray-600'>
                      {selectedFlight.origin}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>Destination:</strong>
                    </p>
                    <p className='text-lg text-gray-600'>
                      {selectedFlight.destination}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>Price:</strong>
                    </p>
                    <p className='text-lg font-semibold text-gray-800'>
                      ${selectedFlight.price}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>Available Seats:</strong>
                    </p>
                    <p className='text-lg text-gray-600'>
                      {selectedFlight.availableSeats}
                    </p>
                  </div>
                </div>

                {/* Right Column: Departure Time */}
                <div className='space-y-4'>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>Departure Date:</strong>
                    </p>
                    <p className='text-lg text-gray-600'>
                      {selectedFlight.date}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>Start Time:</strong>
                    </p>
                    <p className='text-lg text-gray-600'>
                      {selectedFlight.startTime}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-medium text-gray-700'>
                      <strong>End Time:</strong>
                    </p>
                    <p className='text-lg text-gray-600'>
                      {selectedFlight.endTime}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightDetailsModal;
