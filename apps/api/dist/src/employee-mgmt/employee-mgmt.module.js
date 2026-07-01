"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMgmtModule = void 0;
const common_1 = require("@nestjs/common");
const skill_matrix_controller_1 = require("./skill-matrix.controller");
const performance_controller_1 = require("./performance.controller");
const allocation_controller_1 = require("./allocation.controller");
const prisma_module_1 = require("../prisma.module");
let EmployeeMgmtModule = class EmployeeMgmtModule {
};
exports.EmployeeMgmtModule = EmployeeMgmtModule;
exports.EmployeeMgmtModule = EmployeeMgmtModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [skill_matrix_controller_1.SkillMatrixController, performance_controller_1.PerformanceController, allocation_controller_1.AllocationController],
    })
], EmployeeMgmtModule);
//# sourceMappingURL=employee-mgmt.module.js.map