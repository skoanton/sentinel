import { BarChart, Map, CheckCircle, Clock, Layers, ListX, RefreshCcw, XCircle } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { RoombaTotalStatistics } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

export default function RoombaTotalStatisticsTable() {
  const { statistics } = useLoaderData<{ statistics: RoombaTotalStatistics }>();

  if (statistics === null) {
    return (
      <div className="border rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-blue-500" />
          Roomba Total Statistics
        </h2>
        <p className="text-gray-500">No statistics found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg shadow-md p-4">
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
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              Total Runtime (hrs)
            </TableCell>
            <TableCell>{statistics.totalCleaningTime} hrs</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Average Mission Time (mins)
            </TableCell>
            <TableCell>{statistics.averageMissionTime} mins</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <Layers className="w-4 h-4 mr-2 text-yellow-500" />
              Total Missions
            </TableCell>
            <TableCell>{statistics.totalMissions}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Successful Missions
            </TableCell>
            <TableCell>{statistics.successfulMissions}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              Failed Missions
            </TableCell>
            <TableCell>{statistics.failedMissions}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <ListX className="w-4 h-4 mr-2 text-gray-500" />
              Canceled Missions
            </TableCell>
            <TableCell>{statistics.canceledMissions}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <RefreshCcw className="w-4 h-4 mr-2 text-purple-500" />
              Total Scrubs
            </TableCell>
            <TableCell>{statistics.totalScrubs}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium flex items-center">
              <Map className="w-4 h-4 mr-2 text-teal-500" />
              Total Cleaned Area (sqft)
            </TableCell>
            <TableCell>{statistics.totalCleanedArea} sqft</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="text-sm text-gray-500 mt-4">Last Updated: {new Date(statistics.updatedAt).toLocaleString()}</p>
    </div>
  );
}
