import Image from "next/image";

import axios from "axios";
import AnEvent from "../../components/dumb/event";
export default async function Home() {

  const events = await fetch("https://jsonplaceholder.typicode.com/posts",{method : 'GET',next : {revalidate : 3600}}).then((res)=> res.json())

  console.log(events)

  return (
    <div >
      <main >
        {events.map((event)=> 
          <AnEvent eventId={event.id}></AnEvent>
        )} 
      </main>
    </div>
  );
}
