import { BatteryCharging, BatteryFull, Calendar, ChartArea, ClipboardList, Cpu, Play, StopCircle, Trash, Wifi } from "lucide-react";

import { Button } from "./ui/button";
import axios from "axios";
import { Roomba } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { useNavigate } from "@remix-run/react";
type RoombaCardProps = {
  roomba: Roomba;
};

export default function RoombaCard({ roomba }: RoombaCardProps) {
  const navigate = useNavigate();
  const handleNavTotalStatistics = () => {
    navigate(`/roomba/statistics/${roomba.id}`);
  };

  const handleNavSessions = () => {
    navigate(`/roomba/sessions/${roomba.id}`);
  };

  const handleStartCleaning = async () => {
    await axios.post(`/api/roomba/clean`, { status: "start" });
  };

  const handleStopCleaning = async () => {
    await axios.post(`/api/roomba/clean`, { status: "stop" });
  };

  return (
    <Card className="p-5 shadow-lg border rounded-lg transition-transform transform hover:scale-[1.02]">
      {/* Header */}
      <CardHeader className="flex items-center justify-between pb-4 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <Cpu className="w-6 h-6 text-blue-500" />
          {roomba.name}
        </CardTitle>
        <span className="text-sm text-gray-600">{roomba.model}</span>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3 mt-4">
        <div className="flex items-center gap-3">
          <Wifi className="w-5 h-5 text-green-500" />
          <strong>IP:</strong> {roomba.ip}
        </div>

        <div className="flex items-center gap-3">
          <BatteryFull className="w-5 h-5 text-yellow-500" />
          <strong>Battery:</strong> {roomba.batteryPercentage}%
        </div>

        <div className="flex items-center gap-3">
          {roomba.chargingState === "charging" ? (
            <BatteryCharging className="w-5 h-5 text-green-500 animate-pulse" />
          ) : (
            <BatteryFull className="w-5 h-5 text-yellow-500" />
          )}
          <strong>Status:</strong> {roomba.chargingState}
        </div>

        <div className="flex items-center gap-3">
          <Trash className={`w-5 h-5 ${roomba.binFull ? "text-red-500" : "text-gray-500"}`} />
          <strong>Bin:</strong> {roomba.binFull ? "Full" : "Empty"}
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          <p className="flex items-center gap-3 text-blue-500 hover:underline cursor-pointer transition" onClick={handleNavSessions}>
            <ClipboardList className="w-5 h-5 text-teal-500" />
            <strong>Sessions</strong>
          </p>
          <p className="flex items-center gap-3 text-blue-500 hover:underline cursor-pointer transition" onClick={handleNavTotalStatistics}>
            <ChartArea className="w-5 h-5" />
            <strong>Total Statistics</strong>
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-3 border-t pt-4">
        <div className="flex justify-between text-gray-500 text-sm">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Registered: {new Date(roomba.createdAt).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Update: {new Date(roomba.updatedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-between w-full gap-2">
          <Button onClick={handleStartCleaning} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start Cleaning
          </Button>
          <Button onClick={handleStopCleaning} variant="destructive" className="flex items-center gap-2">
            <StopCircle className="w-4 h-4" />
            Stop Cleaning
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
