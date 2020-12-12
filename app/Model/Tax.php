<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model {
	protected $table = "bk_taxes";

	protected $fillable = [
		'mlsNumber',

		'annualAmount',
		'assessmentYear',
	];
}