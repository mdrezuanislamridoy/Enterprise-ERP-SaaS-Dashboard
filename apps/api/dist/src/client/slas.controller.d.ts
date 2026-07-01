import { PrismaService } from '../prisma.service';
export declare class SlasController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSlas(): Promise<{
        slas: {
            id: string;
            status: string;
            service: string;
            clientName: string;
            slaId: string;
            uptime: string;
        }[];
    }>;
    createSla(body: any): Promise<{
        sla: {
            id: string;
            status: string;
            service: string;
            clientName: string;
            slaId: string;
            uptime: string;
        };
    }>;
    updateSla(id: string, body: any): Promise<{
        sla: {
            id: string;
            status: string;
            service: string;
            clientName: string;
            slaId: string;
            uptime: string;
        };
    }>;
    deleteSla(id: string): Promise<{
        success: boolean;
    }>;
}
