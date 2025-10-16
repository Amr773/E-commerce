"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { WishlistContext } from "@/context/WishlistContext";
import getLoggedUserWishtlist from "../WishlistActions/getUserWishlistaction";
import { WishlistItem } from "@/types/product.type";
import RemoveItemFromWishtlist from "../WishlistActions/removeWishlistitemaction";
import AddBtn from "../_components/AddBtn/AddBtn";

export default function Cart() {
  const wishContext = useContext(WishlistContext);
  if (!wishContext) {
    throw new Error("AddBtn must be used within a CartContextProvider");
  }
  const {setnumberOfWishlist } = wishContext;
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  async function getuserWishlist() {
    try {
      const res = await getLoggedUserWishtlist();
      if (res.status === "success") {
        const stored = localStorage.getItem("wishlistIds");
        let filteredProducts = res.data;

        if (stored) {
          const storedIds: string[] = JSON.parse(stored);

          // ✅ Only include products whose IDs are in localStorage
          filteredProducts = res.data.filter((product: WishlistItem) =>
            storedIds.includes(product.id)
          );
        }

        setproducts(filteredProducts);
        setisLoading(false);
      }
    } catch (err) {
      setisLoading(false);
    }
  }

  async function deleteWishlistProduct(id: string, count: number) {
    setremoveDisable(true);

    const res = await RemoveItemFromWishtlist(id);

    if (res.status === "success") {
      toast.success("Product Deleted Successfully", {
        position: "top-center",
        duration: 2000,
      });

      const stored = localStorage.getItem("wishlistIds");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const updated = ids.filter((itemId) => itemId !== id);
        localStorage.setItem("wishlistIds", JSON.stringify(updated));
      }

      setnumberOfWishlist((prev) => Math.max(0, prev - count));
      setremoveDisable(false);
      getuserWishlist();
    } else {
      setproducts(res.data.products);
      setremoveDisable(false);
      toast.error("Failed to delete product", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    getuserWishlist();
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
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: WishlistItem) => (
                      <tr
                        key={product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <Image
                            src={product.imageCover || ""}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                            width={100}
                            height={100}
                            priority
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <div className=" text-center">
                            <div className="mb-4">
                              <AddBtn id={product.id} />
                            </div>
                            <div>
                              <button
                                disabled={removeDisable}
                                onClick={() => {
                                  deleteWishlistProduct(
                                    product.id,
                                    product.count
                                  );
                                }}
                                className="cursor-pointer font-semibold text-red-500 disabled:hidden"
                              >
                                Remove
                              </button>
                              {removeDisable && (
                                <i className="fa fa-spinner animate-spin"></i>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-3xl font-bold my-12 text-red-600">
              Wishlist is Empty
            </h1>
          )}
        </>
      )}
    </>
  );
}
