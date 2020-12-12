<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Condominium extends Model {
	protected $table = "bk_condominiums";

	protected $fillable = [
		'mlsNumber',
		
		'ammenities',
		'buildingInsurance',
		'condoCorp',
		'condoCorpNum',
		'exposure',
		'lockerNumber',
		'locker',
		'parkingType',
		'pets',
		'propertyMgr',
		'stories',
	];
}