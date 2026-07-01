import { PrismaService } from '../prisma.service';
export declare class SkillMatrixController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        items: {
            id: string;
            employee: string;
            skill: string;
            level: string;
            certified: boolean;
        }[];
    }>;
    create(body: any): Promise<{
        item: {
            id: string;
            employee: string;
            skill: string;
            level: string;
            certified: boolean;
        };
    }>;
    update(id: string, body: any): Promise<{
        item: {
            id: string;
            employee: string;
            skill: string;
            level: string;
            certified: boolean;
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
