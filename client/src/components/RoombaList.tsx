import { useEffect, useState } from "react";
import type { Roomba } from "prisma";
import { getRoombas } from "@/api/api.roomba";
import { Card } from "./ui/card";
import RoombaCard from "./RoombaCard";

type RoombaProps = {};

export default function Roomba({}: RoombaProps) {
  const [roomba, setRoomba] = useState<Roomba[]>([]);

  useEffect(() => {
    const fetchRoombas = async () => {
      const response = await getRoombas();

      if (!response) {
        return;
      }

      setRoomba(response);
    };

    fetchRoombas();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        {roomba.map((roomba) => (
          <RoombaCard key={roomba.id} roomba={roomba} />
        ))}
      </div>
    </>
  );
}
