import { json } from "@remix-run/node";
import { getRoombaStats } from "~/services/roomba";

export async function loader() {
  try {
    const roomba = await getRoombaStats();
    return json({ roomba });
  } catch (error) {
    console.error("Error updating Roomba status:", error);
    return json({ message: "Error updating Roomba status" }, { status: 500 });
  }
}
