import { PrismaService } from '../prisma.service';
export declare class DeliveryReportsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            status: string;
            client: string;
            project: string;
            dueDate: string;
            completion: number;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            status: string;
            client: string;
            project: string;
            dueDate: string;
            completion: number;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            status: string;
            client: string;
            project: string;
            dueDate: string;
            completion: number;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
