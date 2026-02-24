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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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

