<?php

namespace App\Repositories\Interfaces\Eloquent;

use App\Repositories\Interfaces\Eloquent\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements EloquentRepositoryInterface
{
  /**
   * @var Model
   */
  protected $model;

  /**
   * BaseRepository constructor.
   *
   * @param Model $model
   */
  public function __construct(Model $model)
  {
    $this->model = $model;
  }

  /**
   * @return Collection
   */
  public function all(array $columns = ['*'], array $relations = []): Collection
  {
    return $this->model->with($relations)->get($columns);
  }

  public function getAllByColumnsAndIsTrue($booleanField, array $columns = ['*'], array $relations = [])
  {
    $records = $this->model->with($relations)->where($booleanField, true)->get($columns);
    return $records;
  }

  /**
   * @param array $attributes
   *
   * @return Model
   */
  public function create(array $attributes): Model
  {
    return $this->model->create($attributes);
  }

  /**
   * Find model by id
   * @param $id
   * @return Model
   */
  public function findById($id): ?Model
  {
    return $this->model->find($id);
  }

  public function update($id, array $attributes): ?bool
  {
    return $this->findById($id)?->update($attributes);
  }

  public function deleteById($id): ?bool
  {
    return $this->findById($id)?->delete();
  }

  public function findTrashedById($id): ?Model
  {
    return $this->model->withTrashed()->findOrFail($id);
  }

  public function restoreById($id): ?bool
  {
    return $this->findTrashedById($id)?->restore();
  }

  public function permanentlyDeleteById($id): ?bool
  {
    return $this->findTrashedById($id)?->forceDelete();
  }
}
