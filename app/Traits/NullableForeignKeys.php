<?php

namespace App\Traits;

trait NullableForeignKeys
{
  protected static function bootNullableForeignKeys()
  {
    static::creating(function ($model) {
      $foreignKeys = $model->getForeignKeyNames();

      foreach ($foreignKeys as $foreignKey) {
        $model->{$foreignKey} = null;
      }
    });
  }
}
