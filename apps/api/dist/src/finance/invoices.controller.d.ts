import { PrismaService } from '../prisma.service';
export declare class InvoicesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            status: string;
            clientName: string;
            invoiceId: string;
            amount: string;
            dueDate: string;
            issuedDate: string;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            status: string;
            clientName: string;
            invoiceId: string;
            amount: string;
            dueDate: string;
            issuedDate: string;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            status: string;
            clientName: string;
            invoiceId: string;
            amount: string;
            dueDate: string;
            issuedDate: string;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
