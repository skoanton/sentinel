import { getRoombas } from "@/api/api.roomba";
import RoombaCard from "@/components/RoombaCard";
import { Roomba } from "prisma";
import { useEffect, useState } from "react";

type RoombasPageProps = {};

export default function RoombasPage({}: RoombasPageProps) {
  const [roombas, setRoombas] = useState<Roomba[] | null>(null);

  useEffect(() => {
    const fetchRoombas = async () => {
      const response = await getRoombas();
      setRoombas(response);
    };
    fetchRoombas();
  }, []);

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
