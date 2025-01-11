// // app/dashboard/components/FlightDashboard.tsx (Client Component)
// "use client";

// import { IFlightQueryParams, IFlightsResponse } from "@/types/interfaces";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import FlightDashboardTable from "./flight-dashboard-table"; // Your table component

// // Fetch function for flight data (client-side)
// async function fetchFlights(queryParams: Partial<IFlightQueryParams>) {
//   const params = new URLSearchParams();
//   Object.entries(queryParams).forEach(([key, value]) => {
//     if (value) params.append(key, value.toString());
//   });

//   const apiUrl = `http://localhost:3000/api/v1/flight?${params.toString()}`;
//   const response = await fetch(apiUrl);

//   if (!response.ok) {
//     throw new Error("Failed to fetch flight data");
//   }

//   return response.json();
// }

// interface FlightDashboardProps {
//   initialFlights: IFlightsResponse;
// }

// export default function FlightDashboard({
//   initialFlights,
// }: FlightDashboardProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [flights, setFlights] = useState<IFlightsResponse>(initialFlights);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const params: IFlightQueryParams = {
//       page: Number(searchParams.get("page")) || 1,
//       limit: Number(searchParams.get("limit")) || 10,
//       searchTerm: searchParams.get("searchTerm") | "",
//       destination: searchParams.get("destination") | "",
//       origin: searchParams.get("origin") | "",
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null); // Reset error before fetch
//       try {
//         const data = await fetchFlights(params);
//         setFlights(data);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to load flights. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [searchParams]);

//   const handleSearch = (newParams: Partial<IFlightQueryParams>) => {
//     const params = new URLSearchParams(searchParams);
//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value) {
//         params.set(key, value.toString());
//       } else {
//         params.delete(key);
//       }
//     });
//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <div className='w-full'>
//       {/* Handle loading, error, and successful data rendering */}
//       {loading ? (
//         <p>Loading flights...</p>
//       ) : error ? (
//         <div className='text-red-600'>{error}</div>
//       ) : flights?.data ? (
//         <FlightDashboardTable data={flights?.data} onSearch={handleSearch} />
//       ) : (
//         <p>No flights found. Please try different search criteria.</p>
//       )}
//     </div>
//   );
// }
