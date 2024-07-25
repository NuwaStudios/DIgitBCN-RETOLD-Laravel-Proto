<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\Eloquent\EloquentRepositoryInterface;
use App\Repositories\Interfaces\Eloquent\BaseRepository;
use App\Repositories\Interfaces\TypeRepositoryInterface;
use App\Repositories\TypeRepository;

class RepositoryServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   */
  public function register(): void
  {
    $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
  }

  /**
   * Bootstrap services.
   */
  public function boot(): void
  {
    //
  }
}
