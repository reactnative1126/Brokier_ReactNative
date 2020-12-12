<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class OpenHouse extends Model {
	protected $table = "bk_open_houses";

	protected $fillable = [
		'mlsNumber',

		'date',
		'startTime',
		'endTime',
	];
}