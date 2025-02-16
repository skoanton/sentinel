import { getRoombaSessions } from "@/api/api.roomba";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Clock,
  Home,
  AlertTriangle,
  RefreshCcw,
  Trash2,
  Move,
  PlayCircle,
} from "lucide-react";
import { RoombaSession } from "prisma";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type RoombaSessionTableProps = {};

export default function RoombaSessionTable({}: RoombaSessionTableProps) {
  const params = useParams<{ id: string }>();

  if (!params.id) {
    return null;
  }

  const [sessions, setSessions] = useState<RoombaSession[] | null>(null);

  const roombaId = params.id;

  useEffect(() => {
    const fetchRoombaSessions = async () => {
      const response = await getRoombaSessions(roombaId);

      if (!response) {
        return;
      }
      setSessions(response);
    };

    fetchRoombaSessions();
  }, [roombaId]);

  return (
    <>
      {sessions !== null && (
        <div className="border rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart className="w-6 h-6 mr-2 text-blue-500" />
            Roomba Cleaning Sessions
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>📅 Date</TableHead>
                <TableHead>🚀 Cycle</TableHead>
                <TableHead>🕒 Duration</TableHead>
                <TableHead>📏 Cleaned Area</TableHead>
                <TableHead>🛑 Stuck</TableHead>
                <TableHead>🔄 Scrubs</TableHead>
                <TableHead>💨 Dirt Picks</TableHead>
                <TableHead>⚠️ Panics</TableHead>
                <TableHead>⬆️ Cliff (Front)</TableHead>
                <TableHead>⬇️ Cliff (Rear)</TableHead>
                <TableHead>🔁 Motion Blocked</TableHead>
                <TableHead>🚧 Wheel Stalls</TableHead>
                <TableHead>🏠 Bumper Hits</TableHead>
                <TableHead>⏳ Started</TableHead>
                <TableHead>👤 Initiator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    {new Date(session.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{session.cycle}</TableCell>
                  <TableCell>{session.missionTime} min</TableCell>
                  <TableCell>{session.cleanedArea} sqft</TableCell>
                  <TableCell>{session.stuckCount}</TableCell>
                  <TableCell>{session.scrubsCount}</TableCell>
                  <TableCell>{session.dirtPicks}</TableCell>
                  <TableCell>{session.panics}</TableCell>
                  <TableCell>{session.cliffsFront}</TableCell>
                  <TableCell>{session.cliffsRear}</TableCell>
                  <TableCell>{session.motionBlocked}</TableCell>
                  <TableCell>{session.wheelStalls}</TableCell>
                  <TableCell className="flex items-center">
                    {session.bumperHits}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      session.missionStartTime * 1000
                    ).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{session.initiator}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
