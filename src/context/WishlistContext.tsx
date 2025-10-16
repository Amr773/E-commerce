"use client";
import getLoggedUserWishtlist from "@/app/WishlistActions/getUserWishlistaction";
import { createContext, useEffect, useState, ReactNode } from "react";

interface WishlistContextType {
  numberOfWishlist: number;
  setnumberOfWishlist: React.Dispatch<React.SetStateAction<number>>;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistContextProviderProps {
  children: ReactNode;
}

export default function WishlistContextProvider({
  children,
}: WishlistContextProviderProps) {
  const [numberOfWishlist, setnumberOfWishlist] = useState<number>(0);


  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishtlist();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfWishlist(sum);
      
      }
    } catch (err) {
      
    }
  }


  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ numberOfWishlist, setnumberOfWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
