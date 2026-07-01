import { PrismaService } from '../prisma.service';
export declare class TalentController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTalent(): Promise<{
        employees: {
            id: string;
            name: string;
            role: string;
            utilization: number;
            performance: number;
            risk: string;
            aiAssisted: boolean;
        }[];
    }>;
    createTalent(body: any): Promise<{
        employee: {
            risk: string;
            id: string;
            email: string | null;
            name: string;
            role: string;
            status: string | null;
            joined: string | null;
            utilization: number;
            performance: number;
            burnoutRisk: string;
            aiAssisted: boolean;
            dept: string | null;
            salary: string | null;
        };
    }>;
    updateTalent(id: string, body: any): Promise<{
        employee: {
            risk: string;
            id: string;
            email: string | null;
            name: string;
            role: string;
            status: string | null;
            joined: string | null;
            utilization: number;
            performance: number;
            burnoutRisk: string;
            aiAssisted: boolean;
            dept: string | null;
            salary: string | null;
        };
    }>;
    deleteTalent(id: string): Promise<{
        success: boolean;
    }>;
}
