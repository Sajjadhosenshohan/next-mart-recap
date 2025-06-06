"use client";
import { useUser } from "@/context/UserContext";
import { Button } from "../ui/button";
import { Heart, LogOutIcon, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/const";
export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname()
  const router = useRouter()
  // console.log("user from navbar", user);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if(protectedRoutes.some((r)=> pathname.match(r))){
      router.push('/')
    }
  };
  return (
    <header className="border-b w-full bg-white">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <h1 className="text-2xl font-black flex items-center">Next Mart</h1>
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Button variant="outline" className="rounded-full p-0 size-10">
            <ShoppingBag />
          </Button>
          {user ? (
            <>
              <Link href="/create-shop">
                <Button variant="outline" className="rounded-full px-2 h-10 cursor-pointer">
                  Create Shop
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="flex items-center justify-center  h-10 w-10"
                >
                  <Avatar className="">
                    <AvatarImage
                      className="w-full h-full"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>user</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-center">
                    {user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>
                    <Link href={`/${user?.role}/dashboard`}>
                    Dashboard
                    </Link>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Profile</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>My Shop</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    My Account
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    className="cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOutIcon /> Logout
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-full px-2 h-10">
                login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
