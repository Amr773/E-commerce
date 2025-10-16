"use client";
import AddToWishlist from "@/app/WishlistActions/AddToWishlistaction";
import { WishlistContext } from "@/context/WishlistContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function AddWishlist({ id }: { id: string }) {
  const wishContext = useContext(WishlistContext);
  if (!wishContext) {
    throw new Error(
      "AddWishlist must be used within a WishlistContextProvider"
    );
  }

  const {setnumberOfWishlist } = wishContext;

  const wishlistRef = useRef<string[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wishlistIds");
    if (stored) {
      const parsed: string[] = JSON.parse(stored);
      wishlistRef.current = parsed;

      if (parsed.includes(id)) {
        setIsInWishlist(true);
      }
    }
  }, [id]);

  const handleWishlistToggle = async (id: string) => {
    const stored = localStorage.getItem("wishlistIds");
    wishlistRef.current = stored ? JSON.parse(stored) : [];

    if (wishlistRef.current.includes(id)) {
      wishlistRef.current = wishlistRef.current.filter((itemId) => itemId !== id);
      localStorage.setItem("wishlistIds", JSON.stringify(wishlistRef.current));
      setIsInWishlist(false);
      setnumberOfWishlist((prev) => Math.max(0, prev - 1)); 
      toast.info("Product removed from your wishlist", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      const res = await AddToWishlist(id);

      if (res.status === "success") {
        wishlistRef.current.push(id);
        localStorage.setItem("wishlistIds", JSON.stringify(wishlistRef.current));
        setIsInWishlist(true);
        setnumberOfWishlist((prev) => prev + 1);
        toast.success("Product added to your wishlist", {
          position: "top-center",
          duration: 2000,
        });
      } else {
        toast.error(res.message, {
          position: "top-center",
          duration: 2000,
        });
      }
    }
  };

  return (
    <span
      className="block text-end text-xl cursor-pointer"
      onClick={() => handleWishlistToggle(id)}
    >
      {isInWishlist ? (
        <i className="fa-solid fa-heart text-red-600"></i>
      ) : (
        <i className="fa-regular fa-heart text-emerald-600"></i>
      )}
    </span>
  );
}
