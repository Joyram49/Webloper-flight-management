"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

type FlightFormProps = {
  onClose: () => void;
};

// Zod Schema for validation
const flightSchema = z
  .object({
    flightNumber: z
      .string()
      .min(1, "Flight number is required")
      .max(10, "Maximum 10 characters"),
    airline: z.string().min(1, "Airline name is required"),
    origin: z.string().min(1, "Origin is required"),
    destination: z.string().min(1, "Destination is required"),
    price: z
      .string()
      .regex(/^\d+$/, "Price must be a valid number")
      .transform((val) => Number(val)),
    availableSeats: z
      .string()
      .regex(/^\d+$/, "Available seats must be a valid number")
      .transform((val) => Number(val)),
    date: z
      .string()
      .refine(
        (value) => !isNaN(new Date(value).getTime()),
        "Invalid date format."
      ),
    startTime: z.string(),
    endTime: z.string(),
  })
  .refine(
    (data) => {
      const date = new Date(data.date);
      const startTime = new Date(data.startTime);
      const endTime = new Date(data.endTime);

      if (
        isNaN(date.getTime()) ||
        isNaN(startTime.getTime()) ||
        isNaN(endTime.getTime())
      ) {
        return false; // Invalid date formats
      }

      if (startTime < date || endTime < startTime) {
        return false; // Start time must be after date, and end time must be after start time
      }

      return true;
    },
    {
      message:
        "Start time must be after the date, and end time must be after start time.",
      path: ["global"], // Attach the error to `startTime`
    }
  );

// Define the form data type
type FlightFormData = z.infer<typeof flightSchema>;

export default function AddNewFlghtForm({ onClose }: FlightFormProps) {
  // Initialize react-hook-form with Zod resolver
  const form = useForm<FlightFormData>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      flightNumber: "",
      airline: "",
      origin: "",
      destination: "",
      price: 0,
      date: "",
      startTime: "",
      endTime: "",
      availableSeats: 0,
    },
  });

  // Handle form submission
  const onSubmit = async (data: FlightFormData) => {
    try {
      // Replace with your API call to save flight
      const response = await fetch(`/api/v1/flight/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      if (!newData.succes) {
        throw new Error(newData.message ?? "failed to add new flight");
      }
      form.reset();
      onClose();
    } catch (error: any) {
      console.error("Error submitting flight: ", error);
      form.setError("global", {
        type: "manual",
        message: error?.message || "failed to add new flight",
      });
    }
  };

  const { isSubmitting, errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Flight Number */}
        <FormField
          control={form.control}
          name='flightNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flight Number</FormLabel>
              <FormControl>
                <Input placeholder='Enter flight number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Airline */}
        <FormField
          control={form.control}
          name='airline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Airline</FormLabel>
              <FormControl>
                <Input placeholder='Enter airline name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Origin and destination */}
        <div className='flex justify-between items-center gap-x-4'>
          <FormField
            control={form.control}
            name='origin'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Origin</FormLabel>
                <FormControl>
                  <Input placeholder='Enter origin location' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='destination'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder='Enter destination location' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Price  & available seats*/}
        <div className='flex justify-between items-center gap-x-4'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type='text' // Use text type to allow string input
                    placeholder='Enter ticket price'
                    value={field.value.toString()} // Convert value to string
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        field.onChange(value); // Keep value as string
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='availableSeats'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Available Seats</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter number of seats'
                    value={field.value.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date */}
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type='datetime-local' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* start time and end time */}
        <div className='flex justify-between items-center gap-x-4'>
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type='datetime-local' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type='datetime-local' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='w-full max-w-40 '>
          {isSubmitting ? (
            <Button type='submit' className='w-full'>
              <svg
                aria-hidden='true'
                role='status'
                className='inline w-4 h-4 me-3 text-white animate-spin'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='#E5E7EB'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentColor'
                />
              </svg>
              Submitting...
            </Button>
          ) : (
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          )}
        </div>

        {errors?.global && (
          <p className='text-red-500 font-robotoSlab font-medium text-sm'>
            *{errors?.global?.message}
          </p>
        )}
      </form>
    </Form>
  );
}
