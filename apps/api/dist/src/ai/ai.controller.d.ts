import { PrismaService } from '../prisma.service';
export declare class AiController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getInsights(): Promise<{
        insights: {
            id: string;
            icon: string;
            color: string;
            type: string;
            title: string;
            desc: string;
            bg: string;
        }[];
    } | {
        insights: {
            title: string;
            desc: string;
            type: string;
            icon: string;
            color: string;
            bg: string;
        }[];
    }>;
    chat(body: {
        message: string;
    }): Promise<{
        reply: string;
    }>;
}
