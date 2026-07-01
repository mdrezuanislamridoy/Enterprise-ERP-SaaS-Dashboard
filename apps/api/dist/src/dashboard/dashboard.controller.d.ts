import { PrismaService } from '../prisma.service';
export declare class DashboardController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboard(): Promise<{
        mrrData: {
            month: string;
            mrr: number;
            costs: number;
            aws: number;
        }[];
        revenueByCategoryData: {
            name: string;
            value: number;
        }[];
        clientGrowthData: {
            month: string;
            new: number;
            churned: number;
            net: number;
        }[];
        kpis: {
            label: string;
            value: string;
            change: number;
            icon: string;
            colorClass: string;
            darkColorClass: string;
            border: string;
        }[];
        activeContracts: {
            id: string;
            client: string;
            service: string;
            value: string;
            status: string;
            deadline: string;
        }[];
        topServices: {
            name: string;
            category: string;
            deals: number;
            revenue: string;
            trend: number;
        }[];
        systemAlerts: {
            service: string;
            id: string;
            metric: string;
            threshold: string;
            status: string;
        }[];
        activities: {
            user: string;
            action: string;
            target: string;
            time: string;
            icon: string;
            color: string;
        }[];
    }>;
    search(): Promise<{
        results: {
            id: string;
            title: string;
            type: string;
        }[];
    }>;
    getNotifications(): Promise<{
        notifications: {
            id: string;
            title: string;
            message: string;
            read: boolean;
            createdAt: Date;
        }[];
    }>;
}
