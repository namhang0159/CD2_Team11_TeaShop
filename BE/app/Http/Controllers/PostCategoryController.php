<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Services\PostCategoryService;


    class PostCategoryController extends Controller
    {
        protected $PostCategoryService;
        public function __construct(PostCategoryService $PostCategoryService)
        {
            $this->PostCategoryService = $PostCategoryService;
        }
    
        public function index()
        {
            return response()->json([
                'data' => $this->PostCategoryService->getAll()
            ]);
        }
        public function show($id)
        {
            return response()->json([
                'data' => $this->PostCategoryService->getById($id)
            ]);
        }
        public function store(Request $request)
        {
            $request->validate([
                'name' => 'required'
            ]);

            return response()->json([
                'data' => $this->PostCategoryService->create($request->all())
            ]);
        }
        public function update(Request $request, $id)
        {
            return response()->json([
                'data' => $this->PostCategoryService->update($id, $request->all())
            ]);
        }

        public function destroy($id)
        {
            try {
                $this->PostCategoryService->delete($id);
                return response()->json([
                    'message' => 'Deleted successfully'
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => $e->getMessage()
                ], 400);
            }
        }
    }