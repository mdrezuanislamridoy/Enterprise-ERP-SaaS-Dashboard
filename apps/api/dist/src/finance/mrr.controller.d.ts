import { PrismaService } from '../prisma.service';
export declare class MrrController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMrr(): Promise<{
        totalMrr: string;
        activeClients: number;
        totalClients: number;
        revenueMetrics: {
            id: string;
            mrr: number;
            month: string;
            costs: number;
            aws: number;
        }[];
    }>;
}
