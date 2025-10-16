import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles?: Role[];
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    permissions?: Permission[];
    [key: string]: unknown;
}

export interface Permission {
    id: number;
    name: string;
    guard_name?: string;
    [key: string]: unknown;
}

export interface AccessPoint {
    id: number;
    brand: string;
    model: string;
}

export interface Props {
    id: number;
    brand: string;
    model: string;
    accessPoints: AccessPoint[];
    roles: Role[];
    permissions: Permission[];
}

export interface EditProps {
    accessPoint: AccessPoint;
    users : User;
    role: Role;
    roles: Role[];
    rolePermissions: string[];
    permissions: string[];
    password: string;
}

export interface UserEditProps {
    user: User;
    roles: string[];
    userRoles: string[];
}