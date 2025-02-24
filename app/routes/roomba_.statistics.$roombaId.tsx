import { json } from "@remix-run/node";
import RoombaTotalStatisticsTable from "~/components/RoombaTotalStatisticsTable";
import { getTotalStatisticsByIdDb } from "~/db/roomba.db";

export async function loader({ params }: { params: { roombaId: string } }) {
  const { roombaId } = params;

  if (!roombaId) {
    return json({ message: "Roomba not found" }, { status: 404 });
  }

  const statistics = await getTotalStatisticsByIdDb(roombaId);
  console.log("statistics", statistics);
  return json({ statistics });
}

export default function RoombaTableView() {
  return (
    <>
      <RoombaTotalStatisticsTable />
    </>
  );
}
