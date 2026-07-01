"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const client_module_1 = require("./client/client.module");
const contract_module_1 = require("./contract/contract.module");
const talent_module_1 = require("./talent/talent.module");
const ai_module_1 = require("./ai/ai.module");
const cloud_ops_module_1 = require("./cloud-ops/cloud-ops.module");
const employee_mgmt_module_1 = require("./employee-mgmt/employee-mgmt.module");
const finance_module_1 = require("./finance/finance.module");
const reports_module_1 = require("./reports/reports.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            client_module_1.ClientModule,
            contract_module_1.ContractModule,
            talent_module_1.TalentModule,
            ai_module_1.AiModule,
            cloud_ops_module_1.CloudOpsModule,
            employee_mgmt_module_1.EmployeeMgmtModule,
            finance_module_1.FinanceModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map