import { Roomba } from "prisma";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  BatteryCharging,
  BatteryFull,
  Calendar,
  ChartArea,
  Cpu,
  Trash,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router";

type RoombaCardProps = {
  roomba: Roomba;
};

export default function RoombaCard({ roomba }: RoombaCardProps) {
  const navigate = useNavigate();
  const handleNavTotalStatistics = () => {
    navigate(`/roomba/statistics/${roomba.id}`);
  };

  return (
    <Card className="p-4">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Cpu className="w-6 h-6 text-blue-500" />
          {roomba.name}
        </CardTitle>
        <span className="text-sm text-gray-500">{roomba.model}</span>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-2">
        <p className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-green-500" /> <strong>IP:</strong>{" "}
          {roomba.ip}
        </p>
        <p className="flex items-center gap-2">
          <BatteryFull className="w-5 h-5 text-yellow-500" />
          <strong>Battery:</strong> {roomba.batteryPercentage}%
        </p>
        <p className="flex items-center gap-2">
          {roomba.chargingState === "charging" ? (
            <BatteryCharging className="w-5 h-5 text-green-500" />
          ) : (
            <BatteryFull className="w-5 h-5 text-yellow-500" />
          )}
          <strong>Status:</strong> {roomba.chargingState}
        </p>
        <p className="flex items-center gap-2">
          <Trash
            className={`w-5 h-5 ${
              roomba.binFull ? "text-red-500" : "text-gray-500"
            }`}
          />
          <strong>Bin:</strong> {roomba.binFull ? "Full" : "Empty"}
        </p>
        <p
          className="flex items-center gap-2 hover:cursor-pointer"
          onClick={handleNavTotalStatistics}
        >
          <ChartArea />
          <p>Total Statistics</p>
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between text-gray-500 text-sm">
        <p className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Registered: {new Date(roomba.createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Last Update: {new Date(roomba.updatedAt).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
