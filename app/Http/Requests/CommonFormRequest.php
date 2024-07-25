<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommonFormRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function commonValidationArray(): array
  {
    $required = $this->method() === 'POST' ? 'required' :  '';

    $toValidate = [
      'name' =>  [$required, 'string', 'max:255'],
      'description' => [$required, 'string', 'max:255'],
    ];

    return [$toValidate];
  }
}
