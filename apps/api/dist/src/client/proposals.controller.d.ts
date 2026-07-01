import { PrismaService } from '../prisma.service';
export declare class ProposalsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProposals(): Promise<{
        proposals: {
            id: string;
            status: string;
            value: string;
            title: string;
            proposalId: string;
            clientName: string;
            date: string;
        }[];
    }>;
    createProposal(body: any): Promise<{
        proposal: {
            id: string;
            status: string;
            value: string;
            title: string;
            proposalId: string;
            clientName: string;
            date: string;
        };
    }>;
    updateProposal(id: string, body: any): Promise<{
        proposal: {
            id: string;
            status: string;
            value: string;
            title: string;
            proposalId: string;
            clientName: string;
            date: string;
        };
    }>;
    deleteProposal(id: string): Promise<{
        success: boolean;
    }>;
}
