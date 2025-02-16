import { useState } from "react";
import type { Roomba } from "prisma";

type RoombaProps = {};

export default function Roomba({}: RoombaProps) {
  const [roomba, setRoomba] = useState<Roomba[]>([]);

  return <></>;
}
