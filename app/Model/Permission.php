<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model {
	protected $table = "bk_permissions";

	protected $fillable = [
		'mlsNumber',

		'displayAddressOnInternet',
		'displayPublic',
	];
}