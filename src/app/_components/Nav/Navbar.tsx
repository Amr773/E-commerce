"use client";
import React, { useContext } from "react";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";

export default function Nav() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("AddBtn must be used within a CartContextProvider");
  }
  const { numberOfCartItem } = cartContext;

  const { data: session } = useSession();

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }


  return (
    <>
      <Navbar className="bg-emerald-600 text-white">
        <div className="flex items-center gap-8">
          <Link href="/" className="gap-2 cursor-pointer">
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
              FreshCart
            </span>
          </Link>
          <NavbarCollapse>
            <Link href="/">Home</Link>

            {session && (
              <>
                <Link href="/allorders">Orders</Link>
                <Link href="/wishlist">Wishlist</Link>
              </>
            )}
            <Link className="text-white" href="/products">
              Products
            </Link>
            <Link className="text-white" href="/categories">
              Categories
            </Link>
            <Link className="text-white" href="/brands">
              Brands
            </Link>
            {session && (
              <>
                <Link className="text-white relative" href="/cart">
                  <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  {numberOfCartItem > 0 && (
                    <span className="absolute top-[-10px] end-[-10px] size-5 text-emerald-600 flex rounded-full justify-center items-center bg-white">
                      {numberOfCartItem}
                    </span>
                  )}
                </Link>
              </>
            )}
          </NavbarCollapse>
        </div>
        <NavbarToggle />
        <div className="flex md:order-2 text-white text-xl">
          <ul className="flex gap-4">
            {!session ? (
              <>
                <li>
                  <i className="fa-brands fa-facebook"></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li>
                  <i className="fa-brands fa-tiktok"></i>
                </li>
                <li>
                  <i className="fa-brands fa-linkedin"></i>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <div className="cursor-pointer rounded-xl p-1 px-2 border-2 border-white hover:text-slate-900  hover:bg-white">
                      {" "}
                      <h2 className="font-bold ">
                        <span className="font-semibold">Hello</span>{" "}
                        {session.user.name}
                      </h2>
                    </div>
                  }
                >
                  <DropdownHeader>
                    <span className="block text-sm">{session.user.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {session.user.email}
                    </span>
                  </DropdownHeader>
                  <DropdownItem>
                    <Link href="/cart">Cart</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/address">Addresses</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/updatePassword">Update Password</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/updatedata">Update My Profile</Link>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem>
                    <span onClick={logout}>Signout</span>
                  </DropdownItem>
                </Dropdown>
              </>
            )}
          </ul>
        </div>
      </Navbar>
    </>
  );
}
