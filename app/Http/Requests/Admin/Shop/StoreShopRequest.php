<?php

namespace App\Http\Requests\Admin\Shop;

use App\Traits\Uploader;
use Illuminate\Foundation\Http\FormRequest;

class StoreShopRequest extends FormRequest
{
    use Uploader;

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
            'name' => ['required', 'string', 'max:256'],
            'short_description' => ['required', 'string', 'max:256'],
            'description' => ['nullable', 'string', 'max:1000'],
            'image' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:2048'],
            'site_url' => ['nullable', 'string', 'max:256'],
            'type' => ['required', 'string'],
            'user_id' => ['nullable', 'exists:users,id'],
            'status' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Shop name is required',
            'short_description.required' => 'Short description is required',
            'description.required' => 'Description is required',
            'image.required' => 'Image is required',
            'image.image' => 'Image must be an image',
            'image.mimes' => 'Image must be a png, jpg, or jpeg',
            'image.max' => 'Image size must be less than 2MB',
        ];
    }

    public function validated($key = null, $default = null)
    {

        $data = parent::validated();

        if (!isset($data['site_url'])) {
            $data['site_url'] = '#';
        }

        unset($data['user_id']);

        if (isset($data['image'])) {
            $data['image'] = $this->upload($data['image'], 'shops');
        }

        return $data;
    }
}
