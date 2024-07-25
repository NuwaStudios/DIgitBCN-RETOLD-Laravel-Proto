<?php

namespace App\Enums;

enum PersonType: string
{
  case BUILDER = 'builder';
  case BUILDINGOWNER = 'building_owner';
  case CRAFTER = 'crafter';
  case DISMANTLINGMEMBER = 'dismantling_member';
}
