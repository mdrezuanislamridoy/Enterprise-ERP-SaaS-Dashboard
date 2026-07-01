import { PrismaService } from '../prisma.service';
export declare class PerformanceController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            employee: string;
            period: string;
            score: number;
            rating: string;
            notes: string | null;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            employee: string;
            period: string;
            score: number;
            rating: string;
            notes: string | null;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            employee: string;
            period: string;
            score: number;
            rating: string;
            notes: string | null;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
