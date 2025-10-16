<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions =[
            // User permissions
            'users.create',
            'users.view',
            'users.edit',
            'users.delete',

            // Role permissions
            'roles.create',
            'roles.view',
            'roles.edit',
            'roles.delete',

            // Access Point permissions
            'access-points.create',
            'access-points.view',
            'access-points.edit',
            'access-points.delete',

            // Additional permissions
            'manage users',
            'manage roles',
            'manage access-points',
            'view reports',
            'manage settings',
        ];

        foreach ($permissions as $key => $value) {
            Permission::firstOrCreate(['name' => $value]);
        }
    }
}
