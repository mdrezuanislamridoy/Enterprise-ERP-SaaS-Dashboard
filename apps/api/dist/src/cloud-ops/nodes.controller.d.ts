import { PrismaService } from '../prisma.service';
export declare class NodesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getNodes(): Promise<{
        nodes: {
            id: string;
            name: string;
            status: string;
            uptime: string;
            nodeId: string;
            region: string;
            cpuUsage: number;
            memoryUsage: number;
        }[];
    }>;
    createNode(body: any): Promise<{
        node: {
            id: string;
            name: string;
            status: string;
            uptime: string;
            nodeId: string;
            region: string;
            cpuUsage: number;
            memoryUsage: number;
        };
    }>;
    updateNode(id: string, body: any): Promise<{
        node: {
            id: string;
            name: string;
            status: string;
            uptime: string;
            nodeId: string;
            region: string;
            cpuUsage: number;
            memoryUsage: number;
        };
    }>;
    deleteNode(id: string): Promise<{
        success: boolean;
    }>;
}
