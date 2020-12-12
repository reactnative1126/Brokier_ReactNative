<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model {
	protected $table = "bk_listings";

	protected $fillable = [
		'mlsNumber',

		'status',
		'class',
		'type',
		'listPrice',
		'daysOnMarket',
		'occupancy',
		'listDate',
		'updatedOn',
		'lastStatus',
		'soldPrice',
		'soldDate',
		// map
		'latitude',
		'longitude',
		// address
		'area',
		'city',
		'country',
		'district',
		'majorIntersection',
		'neighborhood',
		'streetDirection',
		'streetName',
		'streetNumber',
		'streetSuffix',
		'unitNumber',
		'zip',
		'state',
		// details
		'numBathrooms',
		'numBathroomsPlus',
		'numBedrooms',
		'numBedroomsPlus',
		'numFireplaces',
		'numGarageSpaces',
		'numParkingSpaces',
		'numRooms',
		'numRoomsPlus',
		'propertyType',
		'sqft',
		'style',
		// condominium fees
		'cableInlc',
		'heatIncl',
		'hydroIncl',
		'maintenance',
		'parkingIncl',
		'taxesIncl',
		'waterIncl',

		'geohash',

		'images',
		'agents',
	];

	function condominium() {
		return $this->hasOne("App\Model\Condominium", "mlsNumber", "mlsNumber");
	}

	function detail() {
		return $this->hasOne("App\Model\Detail", "mlsNumber", "mlsNumber");
	}

	function lot() {
		return $this->hasOne("App\Model\Lot", "mlsNumber", "mlsNumber");
	}
	
	function nearby() {
		return $this->hasOne("App\Model\Nearby", "mlsNumber", "mlsNumber");
	}

	function office() {
		return $this->hasOne("App\Model\Office", "mlsNumber", "mlsNumber");
	}

	function openHouse() {
		return $this->hasMany("App\Model\OpenHouse", "mlsNumber", "mlsNumber");
	}

	function room() {
		return $this->hasMany("App\Model\Room", "mlsNumber", "mlsNumber");
	}

	function permission() {
		return $this->hasOne("App\Model\Permission", "mlsNumber", "mlsNumber");
	}

	function tax() {
		return $this->hasOne("App\Model\Tax", "mlsNumber", "mlsNumber");
	}

	function timestamp() {
		return $this->hasOne("App\Model\Timestamp", "mlsNumber", "mlsNumber");
	}
}