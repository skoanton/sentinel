import {
  AlertTriangle,
  BarChart,
  BatteryCharging,
  Home,
  Move,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { RoombaTotalStatistics } from "prisma";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRoombaStatistics } from "@/api/api.roomba";

type RoombaStatisticsTableProps = {};

export default function RoombaStatisticsTable({}: RoombaStatisticsTableProps) {
  const params = useParams<{ id: string }>();

  if (!params.id) {
    return null;
  }
  const [statistics, setStatistics] = useState<RoombaTotalStatistics | null>(
    null
  );
  const roombaId = params.id;

  useEffect(() => {
    const fetchRoombaStatistics = async () => {
      const response = await getRoombaStatistics(roombaId);

      if (!response) {
        return;
      }
      setStatistics(response);
    };

    fetchRoombaStatistics();
  }, [roombaId]);

  return (
    <div className="border rounded-lg shadow-md p-4">
      {statistics !== null && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart className="w-6 h-6 mr-2 text-blue-500" />
            Roomba Total Statistics
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>📋 Stat</TableHead>
                <TableHead>📊 Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <BatteryCharging className="w-4 h-4 mr-2 text-green-500" />
                  Total Runtime (hrs)
                </TableCell>
                <TableCell>{statistics.totalHours} hrs</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <Move className="w-4 h-4 mr-2 text-indigo-500" />
                  Cleaned Area
                </TableCell>
                <TableCell>{statistics.totalCleanedArea} sqft</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <Home className="w-4 h-4 mr-2 text-yellow-500" />
                  Total Dockings
                </TableCell>
                <TableCell>{statistics.totalBumperHits}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  Total Stuck Events
                </TableCell>
                <TableCell>{statistics.totalStuck}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <RefreshCcw className="w-4 h-4 mr-2 text-blue-400" />
                  Total Motion Blocked
                </TableCell>
                <TableCell>{statistics.totalMotionBlocked}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <Trash2 className="w-4 h-4 mr-2 text-gray-500" />
                  Total Dirt Detections
                </TableCell>
                <TableCell>{statistics.totalDirtPicks}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <BatteryCharging className="w-4 h-4 mr-2 text-purple-500" />
                  Total Wheel Stalls
                </TableCell>
                <TableCell>{statistics.totalWheelStalls}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <BatteryCharging className="w-4 h-4 mr-2 text-orange-500" />
                  Total Cliff Front
                </TableCell>
                <TableCell>{statistics.totalCliffsFront}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <BatteryCharging className="w-4 h-4 mr-2 text-teal-500" />
                  Total Cliff Rear
                </TableCell>
                <TableCell>{statistics.totalCliffsRear}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium flex items-center">
                  <BatteryCharging className="w-4 h-4 mr-2 text-pink-500" />
                  Total Panic Events
                </TableCell>
                <TableCell>{statistics.totalPanics}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: {new Date(statistics.updatedAt).toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
}
