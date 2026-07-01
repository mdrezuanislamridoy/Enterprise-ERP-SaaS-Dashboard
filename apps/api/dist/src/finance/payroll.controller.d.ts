import { PrismaService } from '../prisma.service';
export declare class PayrollController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            status: string;
            salary: string;
            employee: string;
            period: string;
            deductions: string;
            netPay: string;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            status: string;
            salary: string;
            employee: string;
            period: string;
            deductions: string;
            netPay: string;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            status: string;
            salary: string;
            employee: string;
            period: string;
            deductions: string;
            netPay: string;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
