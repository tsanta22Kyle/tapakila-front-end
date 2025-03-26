"use profile"
import Navbar from "../../../components/dumb/navbar";
import { Poppins } from "next/font/google";
import Profile from "../../../components/user/profile";


const poppins = Poppins({
  weight: ['400', '700'],  // Choisissez les graisses
  subsets: ['latin'],       // Choisissez les sous-ensembles
});

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await params;


  return (
    
    <div className={poppins.className}>

    <Navbar mode="not default"></Navbar>
    <Profile></Profile>
      
    </div>
    
  );}