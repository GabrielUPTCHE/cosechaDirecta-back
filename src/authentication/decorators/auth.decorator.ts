import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../constant/role';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesAuthGuard } from '../guards/roles-auth.guard';
import { Roles } from './role.decorator';

export const Auth = (...roles: Role[]): any =>
    applyDecorators(
        Roles(...roles),
        UseGuards(JwtAuthGuard, RolesAuthGuard),
    );