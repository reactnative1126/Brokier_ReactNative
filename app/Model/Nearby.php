<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Nearby extends Model {
	protected $table = "bk_nearby";

	protected $fillable = [
		'mlsNumber',

		'ammenities',
	];
}