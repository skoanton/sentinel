import si from 'systeminformation';
import { NetworkInformation } from '@shared/types/general';

export async function getAllNetworkInterfacesService() {
    const networkInterfaces = await si.networkInterfaces() as si.Systeminformation.NetworkInterfacesData[];

    const networkInterfacesInfo: NetworkInformation[] = networkInterfaces.map((networkInterface: si.Systeminformation.NetworkInterfacesData) => {
        return {
            devices: [{
                iface: networkInterface.iface,
                ifaceName: networkInterface.ifaceName,
                ip4: networkInterface.ip4,
                mac: networkInterface.mac,
                internal: networkInterface.internal,
                virtual: networkInterface.virtual
            }]
        }
    });

    return networkInterfacesInfo;

}