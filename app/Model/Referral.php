<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Referral extends Model {
	protected $table = "bk_referral";

	protected $fillable = [
		'listing_id',
		'user_id',
		'unique_id',
	];
}