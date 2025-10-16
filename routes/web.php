<?php

use App\Http\Controllers\AccessPointsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('access-points', AccessPointsController::class);
    // Users routes with permission middleware
    Route::resource('users', UserController::class);
    // Roles routes with permission middleware
    Route::resource('roles', RolesController::class);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

