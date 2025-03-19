import { Event } from "@/app/page";
import style from "./eventDetail.module.css";
import useSWR from "swr";
// import "../../../public/ticketlogo.png"
// import { Vibrant } from "node-vibrant/worker";
import {
  Color,
  getColor,
  Palette,
  getPalette,
  useColor,
} from "color-thief-react";
import { useEffect, useState } from "react";
import { ReducerState, ArrayRGB } from "color-thief-react/lib/types";

function EventDetail({ id }: { id: string }) {
  // Hook de récupération des données via SWR
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:3333/api/v1/events",
    fetcher
  );

  // Gestion de l'état pour la couleur dominante de l'image
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  // Récupération de l'image et calcul de la couleur dominante
  //   const getImageColor = async (url: string) => {
  //     try {
  //     //   const palette = await Vibrant.from(url).getPalette();
  //       console.log("palette",palette);

  //       const dominant = palette.Vibrant?.hex;
  //       console.log(dominant)
  //     //   if (dominant) {
  //     //     setDominantColor(dominant);
  //     //     // Mise à jour de la couleur dominante
  //     //   }
  //     } catch (error) {
  //       console.error("Error fetching dominant color: ", error);
  //     }
  //   };

  const imageUrl =
    "https://img.freepik.com/vecteurs-libre/chef-orchestre-musiciens-debout-modele-flyer-plat-scene-theatre_74855-13485.jpg?t=st=1742387630~exp=1742391230~hmac=0714c3d3cf71f01223231b263310e04c62f1726bd57912c508323e99fe040d55&w=740";

  const proxyUrl = `http://localhost:8080/` + imageUrl;
  // Si SWR charge les données, on récupère l'image et la couleur dominante
  //   useEffect(() => {
  //     // console.log("mandeh use effect");

  //     if (data && data.data && data.data.data.length > 0) {
  //       const event: Event = data.data.data[0];
  //     //   if (!event.img) {
  //     //     getImageColor( proxyUrl
  //     //         ); // Ne pas changer l'ordre des hooks
  //     //   }
  //     }
  //   }, [data]); // Dépendance uniquement sur les données de SWR

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;

  // On suppose que l'événement est toujours présent après la récupération via SWR
  const event: Event = data.data.data[0];

  return (
    <>
      <div className={style.details}>
        <img
          src={
            event.img === ""
              ? "https://img.freepik.com/vecteurs-libre/chef-orchestre-musiciens-debout-modele-flyer-plat-scene-theatre_74855-13485.jpg?t=st=1742387630~exp=1742391230~hmac=0714c3d3cf71f01223231b263310e04c62f1726bd57912c508323e99fe040d55&w=740"
              : event.img
          }
          alt="background"
          className={style.thumbnail}
        />
      </div>

      <Color src={proxyUrl} format={"rgbArray"} crossOrigin="Anonymous">
        {({ data, loading, error }) => {
               const dominantColor = data ? `rgb(${data[0]}, ${data[1]}, ${data[2]})` : "transparent"
            return(
          <div style={{ color: dominantColor, backgroundColor : "red",position : "absolute" }}>
            Text with the predominant color
           
          </div>
        )}}
      </Color>
    </>
  );
}

export default EventDetail;
