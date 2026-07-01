import { PrismaService } from '../prisma.service';
export declare class LicensesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            status: string;
            cost: string;
            software: string;
            vendor: string;
            seats: number;
            renewalDate: string;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            status: string;
            cost: string;
            software: string;
            vendor: string;
            seats: number;
            renewalDate: string;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            status: string;
            cost: string;
            software: string;
            vendor: string;
            seats: number;
            renewalDate: string;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
