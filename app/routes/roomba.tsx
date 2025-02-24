import { Roomba } from "@prisma/client";
import { json, useLoaderData } from "@remix-run/react";
import RoombaCard from "~/components/RoombaCard";
import { getAllRoombasDb } from "~/db/roomba.db";

export async function loader() {
  const roombas = await getAllRoombasDb();

  return json({ roombas });
}

export default function RoombaIndex() {
  const { roombas } = useLoaderData<{ roombas: Roomba[] }>();

  return (
    <>
      {roombas === null ? (
        <p>Loading roombas...</p>
      ) : (
        <div className="flex gap-4">
          {roombas.map((roomba) => (
            <RoombaCard key={roomba.id} roomba={roomba} />
          ))}
        </div>
      )}
    </>
  );
}
