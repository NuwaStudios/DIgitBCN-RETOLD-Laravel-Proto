<?php

namespace App\Repositories\Interfaces\Eloquent;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Interface EloquentRepositoryInterface
 * @package App\Repositories
 */
interface EloquentRepositoryInterface
{
  /**
   * Get all models
   * @param array $columns
   * @param array $relations
   * @return Collection
   */
  public function all(array $columns = ['*'], array $relations = []): Collection;

  /**
   * @param array $attributes
   * @return Model
   */
  public function create(array $attributes): ?Model;

  /**
   * @param $id
   * @return Model
   */
  public function findById($id): ?Model;

  /**
   * update existing model
   * @param $id
   * @param array $attributes
   * @return Model
   */
  public function update($id, array $attributes): ?bool;

  /**
   * soft delete
   * @param $id
   * @return bool
   */
  public function deleteById($id): ?bool;

  /**
   * find trashed model and create model object
   * @param $id
   * @return Model
   */
  public function findTrashedById($id): ?Model;

  /**
   * restore soft deleted model
   * @param $id
   * @return bool
   */
  public function restoreById($id): ?bool;

  /**
   * hard delete
   * @param $id
   * @return bool
   */
  public function permanentlyDeleteById($id): ?bool;
}
