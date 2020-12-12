<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Room extends Model {
	protected $table = "bk_rooms";

	protected $fillable = [
		'mlsNumber',

		'roomNo',
		'description',
		'features',
		'features2',
		'features3',
		'length',
		'width',
	];
}