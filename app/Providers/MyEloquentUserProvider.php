<?php

namespace App\Providers;

use Illuminate\Auth\EloquentUserProvider;

class MyEloquentUserProvider extends EloquentUserProvider
{
  public function retrieveById($identifier) {
    return $this->createModel()->newQuery()->with(['organisation', 'role'])->find($identifier);
  }
}
