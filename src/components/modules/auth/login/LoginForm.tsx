/* eslint-disable @typescript-eslint/no-explicit-any */
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
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser, recaptchaVerification } from "@/services/AuthService";
import { toast } from "sonner";
import Link from "next/link";
import { loginSchema } from "./LoginValidation";
import {
  GoogleReCaptchaCheckbox,
  GoogleReCaptchaProvider,
} from "@google-recaptcha/react";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [recaptchaStatus, setRecaptchaStatus] = useState(false)

  const {
    formState: { isSubmitting },
  } = form;

  const handleLoginData: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await LoginUser(data);
      if (res.success) {
        toast.success(res?.message || "User login successfully");
      } else {
        toast.error(res?.message || "Failed to login user");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to login user");
    }
  };


  const handleCaptcha = async(value:string | null)=> {
   try {
    const res = await recaptchaVerification(value!)
    console.log(res)
    if(res?.success){
setRecaptchaStatus(true)
    }
   } catch (error) {
    console.error(error)
   }
  }
  return (
    <section className="mx-auto w-full max-w-lg border-2 border-white rounded-3xl py-10 px-12">
      <h1 className="text-4xl font-bold mb-4 text-center">login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLoginData)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    className="border border-[#0F0E0E1A]"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    className="border border-[#0F0E0E1A]"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex my-3 items-center justify-center">
            <GoogleReCaptchaProvider
              type="v2-checkbox"
              siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
            >
              <GoogleReCaptchaCheckbox
                onChange={handleCaptcha}
              />
            </GoogleReCaptchaProvider>
          </div>

          <div className="flex justify-center">
            <Button disabled={recaptchaStatus ? false : true} type="submit">
              {isSubmitting ? "Logging..." : "login"}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-sm text-gray-600 my-3 text-center">
        Already have an account ?<Link href="/register">register</Link>
      </p>
    </section>
  );
};

export default LoginForm;
