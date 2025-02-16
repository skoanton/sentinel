import { getSystemInformation } from "@/api/api.systemInformation";
import { Progress } from "@/components/ui/progress";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SystemInformation } from "@shared/types/general";
import { useEffect, useState } from "react";
import { Clock, HardDrive, MemoryStick } from "lucide-react";
type SystemInformationCardProps = {};

export default function SystemInformationCard({}: SystemInformationCardProps) {
  const [systemInformation, setSystemInformation] =
    useState<SystemInformation | null>(null);

  useEffect(() => {
    const fetchSystemInformation = async () => {
      const response = await getSystemInformation();
      console.log(response);
      if (response) {
        setSystemInformation(response);
      }
    };
    fetchSystemInformation();
  }, []);

  if (!systemInformation) {
    return <p>Loading system information...</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {/* Memory Usage */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center gap-2">
          <MemoryStick className="w-6 h-6 text-blue-500" />
          <CardTitle>Memory Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Total:</strong> {systemInformation.ram.total} GB
          </p>
          <p>
            <strong>Used:</strong> {systemInformation.ram.used} GB
          </p>
          <p>
            <strong>Free:</strong> {systemInformation.ram.free} GB
          </p>
          <Progress
            value={
              (systemInformation.ram.used / systemInformation.ram.total) * 100
            }
          />
        </CardContent>
        <CardFooter className="flex items-center text-gray-500 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Uptime: {systemInformation.uptime.hours} hours
        </CardFooter>
      </Card>

      {/* Hard Drives */}
      {systemInformation.hardDrives.map((drive, index) => (
        <Card key={index} className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-2">
            <HardDrive className="w-6 h-6 text-green-500" />
            <CardTitle>{drive.name} Drive</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Size:</strong> {drive.size} GB
            </p>
            <p>
              <strong>Used:</strong> {drive.used} GB
            </p>
            <p>
              <strong>Available:</strong> {drive.available} GB
            </p>
            <Progress value={drive.use} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
