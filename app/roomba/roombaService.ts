export async function startRoombaCleaning() {
  try {
    console.log("Roomba started cleaning");
  } catch (error) {
    console.error("Error starting Roomba:", error);
    throw error;
  }
}
