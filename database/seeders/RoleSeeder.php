<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $viewerRole = Role::firstOrCreate(['name' => 'viewer']);

        // Assign all permissions to admin
        $adminRole->givePermissionTo(Permission::all());

        // Manager permissions
        $managerPermissions = [
            'users.view',
            'users.edit',
            'access-points.create',
            'access-points.view',
            'access-points.edit',
            'access-points.delete',
            'view reports',
        ];
        $managerRole->givePermissionTo($managerPermissions);

        // Editor permissions
        $editorPermissions = [
            'users.view',
            'access-points.create',
            'access-points.view',
            'access-points.edit',
        ];
        $editorRole->givePermissionTo($editorPermissions);

        // Viewer permissions (read-only)
        $viewerPermissions = [
            'users.view',
            'access-points.view',
            'view reports',
        ];
        $viewerRole->givePermissionTo($viewerPermissions);
    }
}
