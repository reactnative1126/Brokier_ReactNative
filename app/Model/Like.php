<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Like extends Model {
	protected $table = "bk_likes";

	protected $fillable = [

		'user_id',
		'listing_id',
	];
}