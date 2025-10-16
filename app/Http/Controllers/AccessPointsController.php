<?php

namespace App\Http\Controllers;

use App\Models\AccessPoints;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessPointsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AccessPoints/Index', [
            'accessPoints' => AccessPoints::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AccessPoints/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'model' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
        ]);

        AccessPoints::create($request->all());

        return redirect()->route('access-points.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $accessPoint = AccessPoints::find($id);
        
        return Inertia::render('AccessPoints/Edit', [
            'accessPoint' => $accessPoint,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'model' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
        ]);
        $accessPoint = AccessPoints::find($id);
        $accessPoint->update($request->all());

        return redirect()->route('access-points.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        AccessPoints::destroy($id);
        return redirect()->route('access-points.index');
    }
}
