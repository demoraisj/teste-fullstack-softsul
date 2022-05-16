<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(): array
    {
        return Branch::all()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreBranchRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreBranchRequest $request)
    {
        $branch = Branch::create($request->validated());

        return response()->json($branch, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Branch $branch
     * @return array
     */
    public function show(Branch $branch)
    {
        return $branch->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateBranchRequest $request
     * @param \App\Models\Branch $branch
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $branch->update($request->validated());

        return response()->json($branch);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Branch $branch
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json(null, 204);
    }
}
