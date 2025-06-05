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
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUser } from "@/services/AuthService";
import { toast } from "sonner";
import Link from "next/link";
import { registrationSchema } from "./RegisterValidation";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

    const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const handleRegisterData: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await RegisterUser(data);
      if (res.success) {
        toast.success(res?.message || "User register successfully");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message || "Failed to register user");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to register user");
    }
  };
  return (
    <section className="mx-auto w-full max-w-lg border-2 border-white rounded-3xl py-10 px-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Register now</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegisterData)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password Confirm"
                    className="border border-[#0F0E0E1A]"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                {passwordConfirm && passwordConfirm !== password ? (
                  <FormMessage className="text-left">
                    Password does n&apos;t match
                  </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              disabled={
                (passwordConfirm && passwordConfirm !== password) as boolean
              }
              type="submit"
            >
              {isSubmitting ? "registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-sm text-gray-600 my-3 text-center">
        Do not have any account ?
        <Link href='/login'>login</Link>
      </p>
    </section>
  );
};

export default RegisterForm;
