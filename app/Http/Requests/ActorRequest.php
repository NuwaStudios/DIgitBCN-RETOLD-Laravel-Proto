<?php

namespace App\Http\Requests;

class ActorRequest extends CommonFormRequest
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
    $required = $this->method() === 'POST' ? 'required' :  '';

    return array_merge($this->commonValidationArray(), [
      'actor_type_id' => [$required, 'integer'],
    ]);
  }
}
