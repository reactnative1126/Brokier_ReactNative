<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Timestamp extends Model {
	protected $table = "bk_timestamps";

	protected $fillable = [
		'mlsNumber',

		'idxUpdated',
		'listingUpdated',
		'photosUpdated',
		'terminatedDate',
		'suspendedDate',
		'listingEntryDate',
		'closedDate',
		'unavailableDate',
		'expiryDate',
		'extensionEntryDate',
	];
}