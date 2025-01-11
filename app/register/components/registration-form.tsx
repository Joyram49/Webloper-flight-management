"use client";
import { isValidUser } from "@/actions/isvalidUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().optional(),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email({ message: "This is not a valid email." })
      .refine(
        async (email) => {
          const userExists = await isValidUser(email);
          return !userExists;
        },
        { message: "User already exists" }
      ),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),

    agreement: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function RegistrationForm() {
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { firstName, lastName, email, password } = data;
    const name = firstName + lastName;

    setGeneralError("");
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (response.status === 500) {
        throw new Error("Internal server error");
      }
      if (response.status === 201) {
        form.reset();
        router.push("/login");
      }
    } catch (error: unknown) {
      console.log(error.message);
      setGeneralError(error.message);
      form.reset();
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>SignUp</CardTitle>
          <CardDescription>
            Enter your name, email and password below to signup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-6 w-full flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4'
            >
              <div className=' grid sm:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter first name'
                          className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter last name'
                          className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        type='email'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='type password'
                        type='password'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='re-type password'
                        type='password'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='agreement'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0  '>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Agree to terms and condition</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className='w-full'>
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

              {generalError && (
                <p className='text-red-500 text-sm -mt-2 text-center'>
                  {generalError}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
