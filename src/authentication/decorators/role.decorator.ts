import { SetMetadata } from '@nestjs/common';
import { Role } from '../../constant/role';

export const METADATA_ROLES = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(METADATA_ROLES, roles);