import { ServiceStatus, StatusData } from '@/types/StatusData';
import axios from 'axios';

/**
 * Fetches the composite service status for all services.
 * @returns {Promise<StatusData | undefined>} A promise that resolves to the composite service status data or undefined if an error occurs.
 */

export async function getCompositeServiceStatus(): Promise<StatusData | undefined> {
   const web = await getWebStatus();
   return { web: { name: '🌐 Orbis Website', status: web } };
}

/**
 * Fetches the status of the Orbis.place website.
 * @returns {Promise<ServiceStatus>} A promise that resolves to the service status of the Orbis.place website.
 * */
export async function getWebStatus(): Promise<ServiceStatus> {
   try {
      const res = await axios.get('https://orbis.place/', { method: 'GET' });
      if (res.status === 200) {
         return { 0: true };
      } else {
         return { 0: false };
      }
   } catch {
      return { 0: false };
   }
}
