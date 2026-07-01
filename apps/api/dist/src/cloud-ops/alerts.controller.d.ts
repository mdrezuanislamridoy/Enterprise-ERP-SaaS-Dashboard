import { PrismaService } from '../prisma.service';
export declare class AlertsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAlerts(): Promise<{
        alerts: {
            id: string;
            status: string;
            service: string;
            alertId: string;
            metric: string;
            threshold: string;
        }[];
    }>;
    createAlert(body: any): Promise<{
        alert: {
            id: string;
            status: string;
            service: string;
            alertId: string;
            metric: string;
            threshold: string;
        };
    }>;
    updateAlert(id: string, body: any): Promise<{
        alert: {
            id: string;
            status: string;
            service: string;
            alertId: string;
            metric: string;
            threshold: string;
        };
    }>;
    deleteAlert(id: string): Promise<{
        success: boolean;
    }>;
}
