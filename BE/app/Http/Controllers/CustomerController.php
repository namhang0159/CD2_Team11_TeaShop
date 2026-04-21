<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Services\CustomerService;
class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    public function index()
    {
        return response()->json([
            'data' => $this->customerService->getAll()
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'data' => $this->customerService->getById($id)
        ]);
    }
}