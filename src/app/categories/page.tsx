"use client";
import getAllCategories from "@/api/AllCategories";
import React, { useEffect, useState } from "react";
import {
  Card,
  MegaMenu,
  MegaMenuDropdown,
  MegaMenuDropdownToggle,
} from "flowbite-react";
import Image from "next/image";
import getSubCategories from "@/api/getSubCategories";
import { CategoryType } from "@/types/category.type";

export default function Categories() {
  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isSubLoading, setisSubLoading] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  async function getCategories() {
    const res = await getAllCategories();
    if (res) {
      console.log(res);
      setcategories(res.data);
      setisLoading(false);
    }
  }

  async function getSubCateg(id: string) {
    const res = await getSubCategories(id);
    if (res) {
      console.log(res);
      setsubcategories(res.data);
      setisSubLoading(false);
    }
  }

  async function handleCategoryClick(categoryId: string) {
    if (activeCategoryId === categoryId) {
      setActiveCategoryId(null);
      return;
    }

    setActiveCategoryId(categoryId);
    setsubcategories([]);
    setisSubLoading(true);

    const res = await getSubCategories(categoryId);
    if (res) {
      setsubcategories(res.data);
    }
    setisSubLoading(false);
  }
  useEffect(() => {
    getCategories();
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
          <div className="container mx-auto my-12">
            <div className="row  ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category: CategoryType) => (
                  <>
                    <MegaMenu>
                      <MegaMenuDropdownToggle>
                        <Card
                          key={category._id}
                          onClick={() => {
                            getSubCateg(category._id);
                            handleCategoryClick(category._id);
                          }}
                          className="h-[500px] cursor-pointer transition duration-300 hover:shadow-2xl hover:shadow-emerald-300"
                        >
                          <div className="h-[500px] overflow-hidden ">
                            <Image
                              src={category.image}
                              alt={category.name}
                              className="h-full w-full object-cover"
                              width={500}
                              height={500}
                            />
                          </div>
                          <h5 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                            {category.name}
                          </h5>
                        </Card>
                      </MegaMenuDropdownToggle>
                      {activeCategoryId === category._id && (
                        <MegaMenuDropdown>
                          <ul className="mx-auto mt-6 grid max-w-screen-xl border-y border-gray-200 px-2 py-5 shadow-sm sm:grid-cols-2">
                            {isSubLoading ? (
                              <li className="text-center col-span-2 text-gray-500">
                                <span className="loader"></span>
                              </li>
                            ) : subcategories.length > 0 ? (
                              subcategories.map((subcategory: CategoryType) => (
                                <li key={subcategory._id}>
                                  <a
                                    href="#"
                                    className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                                  >
                                    <div className="font-semibold">
                                      {subcategory.name}
                                    </div>
                                  </a>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-500">
                                No subcategories
                              </li>
                            )}
                          </ul>
                        </MegaMenuDropdown>
                      )}
                    </MegaMenu>
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

{
  /* <Card
      className="max-w-sm"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc="/images/products/apple-watch.png"
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
        </h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center">
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className="h-5 w-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          5.0
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
    </Card> */
}
