<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class APRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'model' => 'string|max:255',
            'brand' => 'string|max:255',
        ];
    }
}
