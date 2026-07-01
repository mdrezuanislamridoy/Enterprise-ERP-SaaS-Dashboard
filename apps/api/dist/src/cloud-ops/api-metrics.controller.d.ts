import { PrismaService } from '../prisma.service';
export declare class ApiMetricsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMetrics(): Promise<{
        metrics: {
            id: string;
            status: string;
            endpoint: string;
            requests: number;
            latency: number;
            errorRate: number;
        }[];
    }>;
    createMetric(body: any): Promise<{
        metric: {
            id: string;
            status: string;
            endpoint: string;
            requests: number;
            latency: number;
            errorRate: number;
        };
    }>;
    updateMetric(id: string, body: any): Promise<{
        metric: {
            id: string;
            status: string;
            endpoint: string;
            requests: number;
            latency: number;
            errorRate: number;
        };
    }>;
    deleteMetric(id: string): Promise<{
        success: boolean;
    }>;
}
