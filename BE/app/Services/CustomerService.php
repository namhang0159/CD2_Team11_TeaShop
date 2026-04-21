<?php
    namespace App\Services;

use App\Models\User;

    class CustomerService
    {
        public function getAll()
        {
            return User::where('role', 'user')->get(["id", "full_name", "email", "phone_number","role", "created_at"]);
        }

        public function getById($id)
        {
            return User::where('role', 'user')->findOrFail($id, ["id", "full_name", "email", "phone_number","role", "created_at"]);
        }

        
    }