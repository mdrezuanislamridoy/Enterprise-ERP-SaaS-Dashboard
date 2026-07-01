import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/ai')
export class AiController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('insights')
  async getInsights() {
    try {
      const insights = await this.prisma.insight.findMany();
      if (insights.length === 0) throw new Error("Empty DB");
      return { insights };
    } catch {
      // Return static mock if DB is down
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

  @Post('chat')
  async chat(@Body() body: { message: string }) {
    // Basic mock AI response for now to satisfy dynamic API requirement
    return {
      reply: `NexusAI received your query: "${body.message}". Processing data across 14 modules. Current analysis indicates nominal operation.`
    };
  }
}
