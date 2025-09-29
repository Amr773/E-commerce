"use client";
import React, { useContext, useEffect, useState } from "react";
import getLoggedUserCart from "../CartActions/getUserCartaction";
import Image from "next/image";
import RemoveItemFromCart from "../CartActions/removeCartItemaction";
import { toast } from "sonner";
import UpdateCartQuantity from "../CartActions/updateCartQuantityaction";
import { Button } from "@/components/ui/button";
import ClearCart from "../CartActions/clearCartaction";
import { CartItem } from "@/types/product.type";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("AddBtn must be used within a CartContextProvider");
  }
  const { numberOfCartItem, setnumberOfCartItem } = cartContext;
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  const [updateDisable, setupdateDisable] = useState(false);
  const [clearDisable, setclearDisable] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [total, settotal] = useState(0);
  const [cartId, setcartId] = useState("");
  async function getuserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        console.log(res);
        settotal(res.data.totalCartPrice);
        setproducts(res.data.products);
        setcartId(res.cartId);
        setisLoading(false);
      }
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  }


  async function deleteProduct(id: string, count: number) {
    setremoveDisable(true);
    setupdateDisable(true);
    const res = await RemoveItemFromCart(id);
    console.log(res);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product Deleted Successfully", {
        position: "top-center",
        duration: 2000,
      });
      setremoveDisable(false);
      setupdateDisable(false);
      setnumberOfCartItem(numberOfCartItem - count);
      getuserCart();
    } else {
      setproducts(res.data.products);
      setremoveDisable(false);
      setupdateDisable(false);
      toast.error("Failed to delete product", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function updateProduct(id: string, count: number, term: number) {
    setcurrentId(id);
    setupdateDisable(true);
    setremoveDisable(true);
    const res = await UpdateCartQuantity(id, count);
    console.log(res);
    if (res.status === "success") {
      setproducts(res.data.products);
      setupdateDisable(false);
      setremoveDisable(false);
      setnumberOfCartItem(numberOfCartItem + term);
      getuserCart();
    } else {
      setproducts(res.data.products);
      setupdateDisable(false);
      setremoveDisable(false);
      toast.error("Failed to edit quanitiy", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function clearProducts() {
    setclearDisable(true);
    const res = await ClearCart();
    if (res.message === "success") {
      setproducts([]);
      toast.success("Cart Cleared Successfully", {
        position: "top-center",
        duration: 2000,
      });
      setclearDisable(false);
      setnumberOfCartItem(0);
    } else {
      setclearDisable(false);
      toast.error("Failed to clear cart", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    getuserCart();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="h-screen flex justify-center items-center">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="w-2/3 mx-auto my-12">
              <div className="justify-end flex my-4"></div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: CartItem) => (
                      <tr
                        key={product.product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                            width={100}
                            height={100}
                            priority
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center ">
                            <button
                              onClick={() => {
                                updateProduct(
                                  product.product.id,
                                  product.count - 1,
                                  -1
                                );
                              }}
                              disabled={
                                product.product.id === currentId &&
                                updateDisable
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-white bg-slate-900 border disabled:bg-white disabled:text-gray-500 border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <i className="fa fa-minus"></i>
                            </button>
                            <div className="ms-3">
                              {updateDisable &&
                              product.product.id === currentId ? (
                                <i className="fa fa-spinner animate-spin"></i>
                              ) : (
                                <span className="">{product.count}</span>
                              )}
                            </div>
                            <button
                              disabled={
                                product.product.id === currentId &&
                                updateDisable
                              }
                              onClick={() => {
                                updateProduct(
                                  product.product.id,
                                  product.count + 1,
                                  1
                                );
                              }}
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-white bg-slate-900 border disabled:bg-white disabled:text-gray-500 border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price * product.count} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            disabled={removeDisable}
                            onClick={() => {
                              deleteProduct(product.product.id, product.count);
                            }}
                            className="cursor-pointer font-semibold text-red-500 disabled:hidden"
                          >
                            Remove
                          </button>
                          {removeDisable && (
                            <i className="fa fa-spinner animate-spin"></i>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between m-4">
                  <h1 className="font-semibold text-emerald-600">
                    Total Cart Price:{" "}
                    <span className="font-bold text-black">{total} EGP</span>{" "}
                  </h1>
                  <Button
                    onClick={() => {
                      clearProducts();
                    }}
                    className="cursor-pointer bg-red-600 hover:bg-white hover:text-red-600 hover:border hover:border-red-600 "
                  >
                    {clearDisable ? (
                      <i className="fa fa-spinner animate-spin"></i>
                    ) : (
                      <span>Clear Cart</span>
                    )}
                  </Button>
                </div>
                <Link href={`/checkout/${cartId}`}>
                  <Button className="w-full  cursor-pointer p-5  bg-emerald-500 hover:bg-emerald-700">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-3xl font-bold my-12 text-red-600">
              Cart is Empty
            </h1>
          )}
        </>
      )}
    </>
  );
}
