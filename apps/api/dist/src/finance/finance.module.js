"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceModule = void 0;
const common_1 = require("@nestjs/common");
const invoices_controller_1 = require("./invoices.controller");
const payroll_controller_1 = require("./payroll.controller");
const licenses_controller_1 = require("./licenses.controller");
const mrr_controller_1 = require("./mrr.controller");
const prisma_module_1 = require("../prisma.module");
let FinanceModule = class FinanceModule {
};
exports.FinanceModule = FinanceModule;
exports.FinanceModule = FinanceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [invoices_controller_1.InvoicesController, payroll_controller_1.PayrollController, licenses_controller_1.LicensesController, mrr_controller_1.MrrController],
    })
], FinanceModule);
//# sourceMappingURL=finance.module.js.map