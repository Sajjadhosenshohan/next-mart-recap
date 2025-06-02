'use client'
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import {  createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProviderValues {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    user: IUser | null;
    setUser: (user:IUser | null) => void;
}
const UserContext = createContext<IUserProviderValues | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleUser = async () => {
    const res = await getCurrentUser();
    setUser(res);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  const userValue = {
    user,
    setUser,
    isLoading,
    setIsLoading
  }
  return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
};

export const useUser = ()=> {
    const userData = useContext(UserContext)

    if(userData === undefined){
        throw new Error('some issue with context')
    }

    return userData;
}
