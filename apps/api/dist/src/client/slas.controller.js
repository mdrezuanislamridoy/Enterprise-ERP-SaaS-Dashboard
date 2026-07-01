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
exports.SlasController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let SlasController = class SlasController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSlas() {
        const slas = await this.prisma.sla.findMany();
        return { slas };
    }
    async createSla(body) {
        const count = await this.prisma.sla.count();
        const sla = await this.prisma.sla.create({
            data: {
                slaId: `SLA-${1000 + count + 1}`,
                clientName: body.clientName,
                service: body.service,
                uptime: body.uptime || "99.9%",
                status: body.status || "Met",
            }
        });
        return { sla };
    }
    async updateSla(id, body) {
        const sla = await this.prisma.sla.update({
            where: { id },
            data: {
                clientName: body.clientName,
                service: body.service,
                uptime: body.uptime,
                status: body.status,
            }
        });
        return { sla };
    }
    async deleteSla(id) {
        await this.prisma.sla.delete({ where: { id } });
        return { success: true };
    }
};
exports.SlasController = SlasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SlasController.prototype, "getSlas", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SlasController.prototype, "createSla", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SlasController.prototype, "updateSla", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlasController.prototype, "deleteSla", null);
exports.SlasController = SlasController = __decorate([
    (0, common_1.Controller)('api/slas'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SlasController);
//# sourceMappingURL=slas.controller.js.map