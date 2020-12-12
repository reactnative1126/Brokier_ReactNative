<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Office extends Model {
	protected $table = "bk_office";

	protected $fillable = [
		'mlsNumber',

		'brokerageName',
	];
}