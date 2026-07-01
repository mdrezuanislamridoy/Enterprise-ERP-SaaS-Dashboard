import { PrismaService } from '../prisma.service';
export declare class ClientController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getClients(): Promise<{
        clients: {
            id: string;
            name: string;
            email: string;
            plan: string;
            mrr: string;
            status: string;
            joined: string;
            stack: string;
        }[];
    }>;
    createClient(body: any): Promise<{
        client: {
            id: string;
            email: string;
            name: string;
            clientId: string;
            plan: string;
            mrr: string;
            status: string;
            joined: string;
            stack: string;
        };
    }>;
    updateClient(id: string, body: any): Promise<{
        client: {
            id: string;
            email: string;
            name: string;
            clientId: string;
            plan: string;
            mrr: string;
            status: string;
            joined: string;
            stack: string;
        };
    }>;
    deleteClient(id: string): Promise<{
        success: boolean;
    }>;
}
