import getLoggedUserAddress from "@/app/Addressactions/getUserAddress";
import RemoveAddress from "@/app/Addressactions/removeAddress";
import { AddressType } from "@/types/address.type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserAddress() {
  const [isLoading, setisLoading] = useState(true);
  const [addresses, setaddresses] = useState([]);
  const [removeDisable, setremoveDisable] = useState(false);

  async function getuserAddress() {
    try {
      const res = await getLoggedUserAddress();
      if (res.status === "success") {
        setisLoading(false);
        setaddresses(res.data);

        console.log(res);
      }
    } catch (err) {
      console.log(err);
      setisLoading(false);
    }
  }

  async function deleteAddress(id: string) {
    setremoveDisable(true);
    const res = await RemoveAddress(id);
    console.log(res);
    if (res.status === "success") {
      setaddresses(res.data);
      toast.success("Product Deleted Successfully", {
        position: "top-center",
        duration: 2000,
      });
      setremoveDisable(false);
      getuserAddress();
    } else {
      setaddresses(res.data);
      setremoveDisable(false);
      toast.error("Failed to delete product", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    getuserAddress();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex  my-12 justify-center items-center">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {addresses.length > 0 ? (
            <div className=" mx-auto my-12">
              <div className="justify-end flex my-4"></div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Details
                      </th>
                      <th scope="col" className="px-6 py-3">
                        City
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {addresses.map((address: AddressType) => (
                      <tr
                        key={address._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {address.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {address.details}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {address.city}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {address.phone}
                        </td>

                        <td className="px-6 py-4">
                          <button
                            disabled={removeDisable}
                            onClick={() => {
                              deleteAddress(address._id);
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
              </div>
            </div>
          ) : (
            <h1 className="text-center text-3xl font-bold my-12 text-red-600">
              No Addresses
            </h1>
          )}
        </>
      )}
    </>
  );
}
