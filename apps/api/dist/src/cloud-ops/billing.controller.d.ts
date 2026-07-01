import { PrismaService } from '../prisma.service';
export declare class BillingController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBilling(): Promise<{
        billing: {
            id: string;
            status: string;
            service: string;
            trend: number;
            cost: number;
            lastUpdated: string;
        }[];
    }>;
    createBilling(body: any): Promise<{
        billing: {
            id: string;
            status: string;
            service: string;
            trend: number;
            cost: number;
            lastUpdated: string;
        };
    }>;
    updateBilling(id: string, body: any): Promise<{
        billing: {
            id: string;
            status: string;
            service: string;
            trend: number;
            cost: number;
            lastUpdated: string;
        };
    }>;
    deleteBilling(id: string): Promise<{
        success: boolean;
    }>;
}
