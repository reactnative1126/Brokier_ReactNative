<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model {
	protected $table = "bk_details";

	protected $fillable = [
		'mlsNumber',

		'airConditioning',
		'basement1',
		'basement2',
		'centralVac',
		'den',
		'description',
		'elevator',
		'exteriorConstruction1',
		'exteriorConstruction2',
		'extras',
		'furnished',
		'garage',
		'heating',
		'patio',
		'swimmingPool',
		'virtualTourUrl',
		'yearBuilt',
            
		'landAccessType',
		'landSewer',
		'viewType',
		'zoningDescription',
		'analyticsClick',
		'analyticsView',
		'moreInformationLink',
		'alternateURLVideoLink',
		'flooringType',
		'foundationType',
		'landscapeFeatures',
		'fireProtection',
		'roofMaterial',
		'farmType',
		'zoningType',
		'businessType',
		'businessSubType',
		'landDisposition',
		'storageType',
		'constructionStyleSplitLevel',
		'constructionStatus',
		'loadingType',
		'ceilingType',
		'liveStreamEventURL',
		'energuideRating',
		'amperage": null',
	];
}