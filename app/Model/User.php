<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
	protected $table = "bk_users";

	protected $fillable = [

		'user_name',
		'user_email',
		'user_password',
		'user_role',
	];
}