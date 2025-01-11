/* eslint-disable react-hooks/exhaustive-deps */
import { useDebounce } from "@/app/hooks/useDebounce";
import Portal from "@/components/portal";
import {
  IFlight,
  IFlightQueryParams,
  IFlightsResponse,
} from "@/types/interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddFlightFormModal from "./add-flight-form-modal";
import FlightDetailsModal from "./flight-modal";
import Pagination from "./pagination";

type FlightDashboardTableProps = {
  data: IFlightsResponse;
  onSearch: (params: Partial<IFlightQueryParams>) => void;
};

export default function FlightDashboardTable({
  data,
  onSearch,
}: FlightDashboardTableProps) {
  const {
    data: filteredFlights,
    meta: { total, page, limit },
  } = data?.data || [];

  const searchParams = useSearchParams();
  const preSearchTerm = searchParams.get("searchTerm");
  const preOrigin = searchParams.get("origin");
  const preDestinantion = searchParams.get("destination");

  // Initialize state from URL query params or default values
  const [searchTerm, setSearchTerm] = useState<string>(preSearchTerm || "");
  const [origin, setOrigin] = useState<string>(preOrigin || "");
  const [destination, setDestination] = useState<string>(preDestinantion || "");
  const [itemsPerPage, setItemsPerPage] = useState<string>(
    limit.toString() || "10"
  );
  const [currentPage, setCurrentPage] = useState<number>(page);

  // handle modal state
  const [selectedFlight, setSelectedFlight] = useState<IFlight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // handler for row data click open flight details modal
  const handleFlightClick = (flight: IFlight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  // handler for close the fight details modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedOrigin = useDebounce(origin, 300);
  const debouncedDestination = useDebounce(destination, 300);
  const debouncedItemsPerPage = useDebounce(itemsPerPage, 300);

  const handleSearch = () => {
    onSearch({
      searchTerm: debouncedSearchTerm,
      origin: debouncedOrigin,
      destination: debouncedDestination,
      page: currentPage,
      limit: Number(debouncedItemsPerPage),
    });
  };

  // Update URL and fetch data when search parameters change
  useEffect(() => {
    const queryParams: Partial<IFlightQueryParams> = {
      searchTerm: debouncedSearchTerm,
      origin: debouncedOrigin,
      destination: debouncedDestination,
      page: currentPage,
      limit: Number(debouncedItemsPerPage),
    };

    // Trigger the search function
    onSearch(queryParams);
  }, [
    debouncedSearchTerm,
    debouncedOrigin,
    debouncedDestination,
    debouncedItemsPerPage,
    currentPage,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(total / Number(itemsPerPage));
  const handleItemsPerPage = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setItemsPerPage(parsedValue);
    } else if (value === "") {
      setItemsPerPage("");
    }
    setCurrentPage(1);
  };

  return (
    <div className='w-full flex flex-col items-center space-y-6'>
      {/* Search/Filter Form */}
      <div className='w-full flex flex-col space-y-4 lg:flex-row lg:space-y-0 justify-between items-center max-w-sm lg:max-w-full lg:space-x-2'>
        <input
          type='text'
          placeholder='Search Term'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full border p-2 rounded'
        />
        <input
          type='text'
          placeholder='Origin'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className='w-full border p-2 rounded'
        />
        <input
          type='text'
          placeholder='Destination'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className='w-full border p-2 rounded'
        />
        <div className='w-full flex items-center justify-between'>
          <button
            onClick={handleSearch}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Search
          </button>
          <button
            onClick={() => setIsFormModalOpen(true)}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Add New Flights
          </button>
        </div>
      </div>

      {/* Table */}

      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>Flight Number</th>
            <th className='border border-gray-300 px-4 py-2'>Airline</th>
            <th className='border border-gray-300 px-4 py-2'>Origin</th>
            <th className='border border-gray-300 px-4 py-2'>Destination</th>
            <th className='border border-gray-300 px-4 py-2'>Price</th>
            <th className='border border-gray-300 px-4 py-2'>
              Available Seats
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights.length === 0 ? (
            <tr className='text-center  '>
              <td colSpan={6} className='px-4 py-10 font-medium font-mono'>
                No flights found!
              </td>
            </tr>
          ) : (
            filteredFlights?.map((flight: IFlight) => (
              <tr
                key={flight._id}
                onClick={() => handleFlightClick(flight)}
                className='cursor-pointer hover:bg-[#dde0e0]'
              >
                <td className='border border-gray-300 px-4 py-2'>
                  {flight.flightNumber}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {flight.airline}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {flight.origin}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {flight.destination}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {flight.price}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {flight.availableSeats}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        handleItemsPerPage={handleItemsPerPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {isModalOpen && selectedFlight && (
        <Portal>
          <FlightDetailsModal
            flight={selectedFlight}
            onClose={handleCloseModal}
          />
        </Portal>
      )}

      {isFormModalOpen && (
        <Portal>
          <AddFlightFormModal onClose={() => setIsFormModalOpen(false)} />
        </Portal>
      )}
    </div>
  );
}
