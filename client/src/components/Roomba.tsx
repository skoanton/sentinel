import { useState } from "react";
import { Roomba } from "@prisma/client";

type RoombaProps = {};

export default function Roomba({}: RoombaProps) {
  const [roomba, setRoomba] = useState<Roomba[]>([]);

  return <></>;
}
