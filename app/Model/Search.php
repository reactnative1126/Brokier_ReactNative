<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Search extends Model {
	protected $table = "bk_searches";

	protected $fillable = [

		'user_id',
		'name',
		'region',
		'filters',
		'location',
		'coordinates',
		'description'
	];
}