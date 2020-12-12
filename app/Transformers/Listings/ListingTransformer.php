<?php

namespace App\Transformers\Listings;

use App\Model\Listing;
use League\Fractal\TransformerAbstract;

/**
 * Class ListingTransformer.
 */
class ListingTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $defaultIncludes = ['roles'];

    /**
     * @param Listing $model
     * @return array
     */
    public function transform(Listing $model)
    {
        return [
            'mlsNumber' => $model->mlsNumber,

            'status' => $model->status,
            'class' => $model->class,
            'type' => $model->type,
            'listPrice' => $model->listPrice,
            'daysOnMarket' => $model->daysOnMarket,
            'occupancy' => $model->occupancy,
            'listDate' => $model->listDate,
            'updatedOn' => $model->updatedOn,
            'lastStatus' => $model->lastStatus,
            'soldPrice' => $model->soldPrice,
            'soldDate' => $model->soldDate,

            'images' => $model->images,
            'agents' => $model->agents,
            
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }

    /**
     * @param Listing $model
     * @return \League\Fractal\Resource\Collection
     */
    public function includeRoles(Listing $model)
    {
        return $this->collection($model->roles, new RoleTransformer());
    }
}
