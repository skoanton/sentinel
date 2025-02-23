import { json } from "@remix-run/node";

export async function action({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const status = body.status;

    if (!status) {
      throw new Error("Status is required");
    }

    console.log(status);
    return json({ message: "Roomba status updated!" });
  } catch (error) {
    console.error("Error updating Roomba status:", error);
    return json({ message: "Error updating Roomba status" }, { status: 500 });
  }
}
