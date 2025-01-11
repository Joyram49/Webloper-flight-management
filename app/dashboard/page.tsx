"use client";
import { IFlightQueryParams, IFlightsResponse } from "@/types/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FlightDashboardTable from "./components/flight-dashboard-table";

// Fetch function (no changes here)
async function fetchFlights(queryParams: Partial<IFlightQueryParams>) {
  const params = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });

  const apiUrl = `http://localhost:3000/api/v1/flight?${params.toString()}`;
  const response = await fetch(apiUrl);
  return response.json();
}

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resolvedSearchParams, setResolvedSearchParams] = useState<
    Partial<IFlightQueryParams>
  >({});
  const [flights, setFlights] = useState<Partial<IFlightsResponse> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Effect for search param updates
  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    const limit = searchParams.get("limit") ?? 10;
    const params: IFlightQueryParams = {
      page: Number(page),
      limit: Number(limit),
      searchTerm: "",
      destination: "",
      origin: "",
    };
    searchParams.forEach((value, key) => {
      if (value !== undefined && value !== null) {
        if (key in params) {
          params[key as keyof IFlightQueryParams] = value as unknown as never;
        }
      }
    });
    setResolvedSearchParams(params);
  }, [searchParams]);

  // Data fetching based on resolved search params
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFlights(resolvedSearchParams);
        setFlights(data);
      } catch (err) {
        console.error(err);
        setFlights(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedSearchParams]);

  // Handle search updates
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
    <main className='min-h-screen h-auto overflow-auto'>
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

          {/* Suspense wrapping the table rendering, not the entire component */}
          <Suspense fallback={<p>Loading...</p>}>
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
          </Suspense>
        </div>
      </div>
    </main>
  );
}
