<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Http\Controllers\CraftFormController;
use App\Http\Controllers\CrafterController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\OrganisationsController;
use App\Http\Controllers\PendingApprovalController;

use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
| These routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/google-auth/redirect', function () {
  return Socialite::driver('google')->redirect();
});

Route::get('/google-auth/callback', function () {
  $googleUser = Socialite::driver('google')->user();

  $user = User::updateOrCreate([
    'google_id' => $googleUser->id,
  ], [
    'name' => $googleUser->name,
    'email' => $googleUser->email,
  ]);

  Auth::login($user);

  return redirect('/dashboard');
});

Route::middleware(['auth', 'verified', 'enabled'])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
  })->name('dashboard');

  Route::middleware('role:admin')->group(function () {
    /** ********************************************************************************************************************
     * Users
     * *********************************************************************************************************************/
    Route::prefix('/users')->group(function () {
      Route::get('/', function () {
        return Inertia::render('Users');
      })->name('users');

      Route::get('/create', function () {
        return Inertia::render('Users/Create');
      })->name('users.create');
    });

    /** ********************************************************************************************************************
     * Organisations
     * *********************************************************************************************************************/
    Route::prefix('/organisations')->group(function () {
      Route::get('/', [OrganisationsController::class, 'index'])->name('organisations');

      Route::get('/create', [OrganisationsController::class, 'create'])->name('organisations.create');
      Route::post('/', [OrganisationsController::class, 'store'])->name('organisations.store');

      Route::get('/{id}', [OrganisationsController::class, 'show'])->name('organisations.show');

      Route::get('/{id}/edit', [OrganisationsController::class, 'edit'])->name('organisations.edit');
      Route::put('/{id}', [OrganisationsController::class, 'update'])->name('organisations.update');
    });

    Route::prefix('/pending')->group(function () {
      Route::get('/', [PendingApprovalController::class, 'index'])->name('pending');
    });
  });

  Route::middleware('role:admin,manager,documenter')->group(function () {

      /** ********************************************************************************************************************
       * Crafts
       * *********************************************************************************************************************/
      Route::prefix('/crafts')->group(function () {
        Route::get('/', [CraftFormController::class, 'index'])->name('crafts');

        Route::get('/create', [CraftFormController::class, 'create'])->name('crafts.create');
        Route::post('/create', [CraftFormController::class, 'store'])->name('crafts.store');

        Route::middleware('organisation')->group(function () {
          Route::get('/{id}', [CraftFormController::class, 'show'])->name('crafts.show');

          Route::get('/{id}/edit', [CraftFormController::class, 'edit'])->name('crafts.edit');
          Route::post('/{id}/edit', [CraftFormController::class, 'update'])->name('crafts.update');
        });
      });

      /** ********************************************************************************************************************
       * Buildings
       * *********************************************************************************************************************/
      Route::prefix('/buildings')->group(function () {
        Route::get('/', [BuildingController::class, 'index'])->name('buildings');

        Route::get('/create', [BuildingController::class, 'create'])->name('buildings.create');
        Route::post('/create', [BuildingController::class, 'store'])->name('buildings.store');

        Route::middleware('organisation')->group(function () {
          Route::get('/{id}', [BuildingController::class, 'show'])->name('buildings.show');

          Route::get('/{id}/edit', [BuildingController::class, 'edit'])->name('buildings.edit');
          Route::post('/{id}/edit', [BuildingController::class, 'update'])->name('buildings.update');
      });
    });

    /** ********************************************************************************************************************
     * Crafters
     * *********************************************************************************************************************/
    Route::prefix('/crafters')->group(function () {
      Route::get('/', [CrafterController::class, 'index'])->name('crafters');

      Route::get('/create', [CrafterController::class, 'create'])->name('crafters.create');
      Route::post('/', [CrafterController::class, 'store'])->name('crafters.store');

      Route::get('/{id}', [CrafterController::class, 'index'])->name('crafters.show');
    });
  });

  Route::get('/admin-contact-form', function () {
    return Inertia::render('AdminContact');
  })->name('adminContactForm');

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/unauthorized', function () {
  return Inertia::render('Unauthorized');
});

require __DIR__ . '/auth.php';
