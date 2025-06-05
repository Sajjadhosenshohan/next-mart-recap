"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const RegisterUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const LoginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    let decodeData = null;
    const token = (await cookies()).get("accessToken")?.value;

    if (token) {
      decodeData = await jwtDecode(token);
      return decodeData;
    } else {
      return null;
    }
  } catch (error: any) {
    return Error(error);
  }
};
export const logout = async()=> {
  (await cookies()).delete("accessToken");
}

export const recaptchaVerification  = async (token:string) => {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify',{
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
        response: token
      })
    })
    return res.json()
  } catch (error: any) {
    return Error(error);
  }
};
