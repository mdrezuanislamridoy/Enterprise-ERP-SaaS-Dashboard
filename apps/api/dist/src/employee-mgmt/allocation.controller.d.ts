import { PrismaService } from '../prisma.service';
export declare class AllocationController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            role: string;
            employee: string;
            hours: number;
            project: string;
            startDate: string;
            endDate: string;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            role: string;
            employee: string;
            hours: number;
            project: string;
            startDate: string;
            endDate: string;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            role: string;
            employee: string;
            hours: number;
            project: string;
            startDate: string;
            endDate: string;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
