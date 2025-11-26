export interface StatusData {
   [key: string]: { name: string; status: ServiceStatus };
}

export interface ServiceStatus {
   [key: number]: boolean;
}
