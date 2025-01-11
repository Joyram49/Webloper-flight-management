"use client";

import { IFlightQueryParams, IFlightsResponse } from "@/types/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlightDashboardTable from "./components/flight-dashboard-table";

const url = process.env.HOST_URL;

async function fetchFlights(queryParams: Partial<IFlightQueryParams>) {
  const params = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });

  const apiUrl = `${url}/api/v1/flight?${params.toString()}`;
  const response = await fetch(apiUrl);
  return response.json();
}

export default function DashboardPage() {
  // const searched = React.use(searchParams);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resolvedSearchParams, setResolvedSearchParams] = useState<
    Partial<IFlightQueryParams>
  >({});
  const [flights, setFlights] = useState<Partial<IFlightsResponse> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const params: IFlightQueryParams = {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      searchTerm: (searchParams.get("searchTerm") as string) || "",
      destination: (searchParams.get("destination") as string) || "",
      origin: (searchParams.get("origin") as string) || "",
    };
    searchParams.forEach((value, key) => {
      if (typeof value !== undefined) {
        params[key as keyof IFlightQueryParams] = value as unknown as never;
      }
    });
    setResolvedSearchParams(params);
  }, [searchParams]);

  useEffect(() => {
    // Fetch data whenever resolvedSearchParams changes
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFlights(resolvedSearchParams);
        setFlights(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred");
        }
        setFlights(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedSearchParams]);

  const handleSearch = (newParams: Partial<IFlightQueryParams>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <main className=' min-h-screen h-auto overflow-auto'>
      <div className='container h-full mx-auto'>
        <div className='w-full flex flex-col items-center space-y-10'>
          <div className='flex flex-col space-y-2 pt-10 text-center'>
            <h1 className='text-3xl font-medium text-gray-600'>
              Flight Dashboard Table
            </h1>
            <h2 className='text-xl font-medium text-gray-600'>
              An overview of flight booking shows below table
            </h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : flights?.data ? (
            <FlightDashboardTable
              data={flights?.data}
              onSearch={handleSearch}
            />
          ) : (
            <p>No flights found. Please try different search criteria.</p>
          )}
        </div>
      </div>
    </main>
  );
}
