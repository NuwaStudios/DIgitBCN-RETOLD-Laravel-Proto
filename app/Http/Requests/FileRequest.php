<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;

class FileRequest extends Request
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'name' => 'required|string',
      'type' => 'required|string'
      // 'type' => 'required|string|in:image,video,audio,document'
    ];
  }
}