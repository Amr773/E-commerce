"use client";
import React, { useEffect, useState } from "react";
import getUserOrders from "../OrdersActions/getAllOrdersaction";
import Image from "next/image";
import { CartItem, Order } from "@/types/product.type";

export default function Allorders() {
  const [isLoading, setisLoading] = useState(true);
  const [orders, setorders] = useState([]);

  async function getLoggedUserOrders() {
    try {
      const res = await getUserOrders();
      console.log(res);
      setorders(res);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
    }
  }

  useEffect(() => {
    getLoggedUserOrders();
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
          {orders.length > 0 ? (
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
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: Order) => (
                      <React.Fragment key={order._id}>
                        {order.cartItems.map((item: CartItem) => (
                          <tr
                            key={item._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="p-4">
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={200}
                                height={200}
                                priority
                                className="rounded-lg"
                              />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {item.product.title}
                            </td>
                            <td className="px-6 py-4">{item.count}</td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              EGP {item.price}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-right font-bold"
                          >
                            Order Total: EGP {order.totalOrderPrice}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
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
