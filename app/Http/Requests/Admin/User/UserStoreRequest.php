<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['required', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10'],
            'password' => ['required', 'string', 'min:8', 'max:30'],
            'status' => ['nullable', 'boolean'],
            'role' => ['required', 'in:admin,shop'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'phone.required' => 'Phone is required',
            'password.required' => 'Password is required',
            'email.unique' => 'Email already exists',
            'phone.unique' => 'Phone already exists',
            'password.min' => 'Password must be at least 8 characters',
            'phone.min' => 'Phone must be at least 10 characters',
            'phone.regex' => 'Phone must be a valid phone number',
            'password.max' => 'Password must be less than 30 characters',
        ];
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated();
        unset($data['role']);

        if (! isset($data['status'])) {
            $data['status'] = true;
        }

        return $data;
    }
}
