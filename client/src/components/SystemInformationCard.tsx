import { getSystemInformation } from "@/api/api.systemInformation"
import { Progress } from "@/components/ui/progress"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SystemInformation } from "@shared/types/general"
import { useEffect, useState } from "react"
type SystemInformationCardProps = {}

export default function SystemInformationCard({ }: SystemInformationCardProps) {

    const [systemInformation, setSystemInformation] = useState<SystemInformation | null>(null)

    useEffect(() => {

        const fetchSystemInformation = async () => {
            const response = await getSystemInformation();
            console.log(response)
            if (response) {
                setSystemInformation(response);
            }
        }
        fetchSystemInformation();
    }, [])

    if (!systemInformation) {
        return <p>Loading system information...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* Uptime */}
            <Card>
                <CardHeader>
                    <CardTitle>Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold">{systemInformation.uptime.hours}h</p>
                    <p className="text-lg font-semibold">{systemInformation.uptime.minutes}m</p>
                </CardContent>
            </Card>

            {/* CPU */}
            <Card>
                <CardHeader>
                    <CardTitle>CPU Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Brand:</strong> {systemInformation.cpu.brand}</p>
                    <p><strong>Speed:</strong> {systemInformation.cpu.speed} GHz</p>
                    <p><strong>Cores:</strong> {systemInformation.cpu.cores} ({systemInformation.cpu.physicalCores} Physical)</p>
                </CardContent>
            </Card>

            {/* OS */}
            <Card>
                <CardHeader>
                    <CardTitle>Operating System</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Platform:</strong> {systemInformation.os.platform}</p>
                    <p><strong>Distro:</strong> {systemInformation.os.distro}</p>
                    <p><strong>Release:</strong> {systemInformation.os.release}</p>
                </CardContent>
            </Card>

            {/* RAM */}
            <Card>
                <CardHeader>
                    <CardTitle>Memory Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Total:</strong> {systemInformation.ram.total} GB</p>
                    <p><strong>Used:</strong> {systemInformation.ram.used} GB</p>
                    <p><strong>Free:</strong> {systemInformation.ram.free} GB</p>
                    <Progress value={(systemInformation.ram.used / systemInformation.ram.total) * 100} />
                </CardContent>
            </Card>

            {/* Hard Drives */}
            {systemInformation.hardDrives.map((drive, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{drive.name} Drive</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Size:</strong> {drive.size} GB</p>
                        <p><strong>Used:</strong> {drive.used} GB</p>
                        <p><strong>Available:</strong> {drive.available} GB</p>
                        <Progress value={drive.use} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}