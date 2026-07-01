import { PrismaService } from '../prisma.service';
export declare class ContractController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getContracts(): Promise<{
        activeContracts: {
            id: string;
            client: string;
            service: string;
            value: string;
            status: string;
            deadline: string;
        }[];
    }>;
    createContract(body: any): Promise<{
        contract: {
            id: string;
            client: string;
            clientId: string;
            status: string;
            contractId: string;
            service: string;
            value: string;
            deadline: string;
        };
    }>;
    updateContract(id: string, body: any): Promise<{
        contract: {
            id: string;
            client: string;
            clientId: string;
            status: string;
            contractId: string;
            service: string;
            value: string;
            deadline: string;
        };
    }>;
    deleteContract(id: string): Promise<{
        success: boolean;
    }>;
}
