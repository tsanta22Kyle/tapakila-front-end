"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../../../components/dumb/navbar";
import { Poppins } from "next/font/google";
import Profile from "../../../components/user/profile";
import useAuth from "../../../globalStores/useAuth";
// import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function UserPage() {
  const router = useRouter();
  const { user: userInfo, isLoading: isLoadingInfo } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isLoadingInfo && !userInfo) {
      router.push("/");
    }
  }, [userInfo, isLoadingInfo, router]);

  if (!isClient || isLoadingInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <LoadingSpinner /> */}
      </div>
    );
  }

  if (!userInfo) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className={poppins.className}>
      <Navbar mode="not default" />
      <Profile />
    </div>
  );
}