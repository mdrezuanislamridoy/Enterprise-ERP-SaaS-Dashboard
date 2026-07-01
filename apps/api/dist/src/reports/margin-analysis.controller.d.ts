import { PrismaService } from '../prisma.service';
export declare class MarginAnalysisController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            status: string;
            revenue: number;
            cost: number;
            project: string;
            margin: number;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            status: string;
            revenue: number;
            cost: number;
            project: string;
            margin: number;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            status: string;
            revenue: number;
            cost: number;
            project: string;
            margin: number;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
