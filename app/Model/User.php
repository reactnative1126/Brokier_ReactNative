<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
	protected $table = "bk_users";

	protected $fillable = [
		'unique_id',
		'user_name',
		'brokerage_name',
		'user_email',
		'user_phone',
		'user_website',
		'user_instagram_id',
		'user_password',
		'user_photo',
		'user_role',
		'agent_unique_id'
	];
}