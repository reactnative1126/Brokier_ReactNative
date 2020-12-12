<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Lot extends Model {
	protected $table = "bk_lots";

	protected $fillable = [
		'mlsNumber',

		'acres',
		'depth',
		'irregular',
		'legalDescription',
		'measurement',
		'width',
	];
}