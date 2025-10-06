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
            'users.create',
            'users.view',
            'users.edit',
            'users.delete',
            'roles.create',
            'roles.view',
            'roles.edit',
            'roles.delete',
            'access-points.create',
            'access-points.view',
            'access-points.edit',
            'access-points.delete',
        ];

        foreach ($permissions as $key => $value) {
            Permission::firstOrCreate(['name' => $value]);
        }
    }
}
