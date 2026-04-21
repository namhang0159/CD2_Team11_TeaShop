<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PostService;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        return response()->json([
            'data' => $this->postService->getAll()
        ]);
        
    }

    public function show($slug)
    {
        return response()->json(
            ['data' => $this->postService->getBySlug($slug)]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required'
        ]);

        return response()->json(
            ['data' => $this->postService->create($request->all())]
        );
    }

    public function update(Request $request, $id)
    {
        return response()->json(
            ['data' => $this->postService->update($id, $request->all())]
        );
    }

    public function destroy($id)
    {
        $this->postService->delete($id);

        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }
}