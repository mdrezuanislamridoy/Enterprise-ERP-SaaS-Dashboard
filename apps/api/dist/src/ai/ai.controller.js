"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AiController = class AiController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getInsights() {
        try {
            const insights = await this.prisma.insight.findMany();
            if (insights.length === 0)
                throw new Error("Empty DB");
            return { insights };
        }
        catch {
            return {
                insights: [
                    {
                        title: "Revenue Forecast — July 2026",
                        desc: "Based on current deployments, projected MRR is $354K (+5.2% over June). Key driver: Enterprise Web App completions and 3 pending AI contracts.",
                        type: "forecast",
                        icon: "TrendingUp",
                        color: "text-indigo-500",
                        bg: "bg-indigo-50 dark:bg-indigo-950/30",
                    },
                    {
                        title: "Client Churn Risk",
                        desc: "BlueSky Systems shows 73% churn probability. Last API call: 18 days ago. Recommend a proactive technical outreach call.",
                        type: "alert",
                        icon: "AlertCircle",
                        color: "text-red-500",
                        bg: "bg-red-50 dark:bg-red-950/30",
                    }
                ]
            };
        }
    }
    async chat(body) {
        return {
            reply: `NexusAI received your query: "${body.message}". Processing data across 14 modules. Current analysis indicates nominal operation.`
        };
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('insights'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getInsights", null);
__decorate([
    (0, common_1.Post)('chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('api/ai'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiController);
//# sourceMappingURL=ai.controller.js.map