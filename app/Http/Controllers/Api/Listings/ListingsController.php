<?php

namespace App\Http\Controllers\Api\Listings;

use App\Http\Controllers\Controller;
use App\Transformers\Listings\ListingTransformer;
use App\Model\Listing;
use App\Model\Like;
use App\Model\Room;
use App\Model\Search;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Sk\Geohash\Geohash;

class ListingsController extends Controller
{
    use Helpers;
    
    protected $model;
    
    public function __construct(Listing $model)
    {
        $this->model = $model;
    }

    public function all(Request $request)
    { 
        $query = new Listing;
        $listings = $query->select('id', 'mlsNumber', 'latitude', 'longitude', 'listPrice')->get();

        Log::info($query->toSql());

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }

    public function available(Request $request)
    {
        $offset = $request->get('offset');
        $query = new Listing;
        $query = $query->where('status', 'A');
        $listings = $query->limit(20000)->offset($offset * 20000)->get();

        Log::info($query->toSql());

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }


    public function unavailable(Request $request)
    {
        $offset = $request->get('offset');
        $query = new Listing;
        $query = $query->where('status', 'U');
        $listings = $query->orderBy('soldDate', 'desc')->limit(20000)->offset($offset * 20000)->get();

        Log::info($query->toSql());

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }
    
    public function map(Request $request)
    {
        $zoom = $request->get('zoom');
        $nw_latitude = $request->get('nw_latitude');
        $nw_longitude = $request->get('nw_longitude');
        $se_latitude = $request->get('se_latitude');
        $se_longitude = $request->get('se_longitude');

        $init_filters = $request->get('filters');
        $filters = json_decode($init_filters);

        $query = new Listing;

        $query = $query->where([['latitude', '<', $nw_latitude], ['longitude', '<', $se_longitude], ['latitude', '>', $se_latitude], ['longitude', '>', $nw_longitude]]);

        if(!empty($filters->type)) { 
            if($filters->type == 'Sale') {
                if(empty($filters->lastStatus)) { 
                    if($filters->daysOnMarket == 0) { 
                        // Log::info('ForSale -> status='A' type='Sale' dayOnMarket = 0');
                        $query = $query->where([['status', 'A'],['type', 'Sale']]);
                    } else { 
                        // Log::info('ForSale -> status='A', type='Sale', dayOnMarket > 0');
                        $query = $query->where(function ($q) use($filters) {
                            $q->where([['status', 'A'],['type', 'Sale']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                        });
                    }
                } else {
                    if($filters->daysOnMarket == 0) {
                        // Log::info('ForSale & Sold -> status='A', type='Sale' || status='A', lastStatus='Sld', daysOnMarket = 0, soldInDate > 0');
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Sale']]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Sld']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    } else {     
                        // Log::info('ForSale & Sold -> status='A', type='Sale' || status='A', lastStatus='Sld', daysOnMarket > 0, soldInDate > 0');              
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Sale']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Sld']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    }
                }
            } else { 
                if(empty($filters->lastStatus)) { 
                    if($filters->daysOnMarket == 0) {
                        // Log::info('ForRent -> status='A' type='Lease' dayOnMarket = 0');
                        $query = $query->where([['status', 'A'],['type', 'Lease']]);
                    } else {
                        // Log::info('ForRent -> status='A' type='Lease' dayOnMarket > 0');
                        $query = $query->where(function ($q) use($filters) {
                            $q->where([['status', 'A'],['type', 'Lease']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                        });
                    }
                } else { 
                    if($filters->daysOnMarket == 0) {  
                        // Log::info('ForRent & Rented -> status='A', type='Lease' || status='U', lastStatus='Lsd', daysOnMarket = 0, soldInDate > 0');    
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Lease']]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Lsd']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    } else {      
                        // Log::info('ForRent & Rented -> status='A', type='Lease' || status='U', lastStatus='Lsd', daysOnMarket > 0, soldInDate > 0');                       
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Lease']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Lsd']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    }
                }
            }
        } else {
            if($filters->lastStatus == 'Sld') {
                // Log::info('Sold -> status='U', lastStatus='Sld', soldInDate > 0'); 
                $query = $query->where(function ($q) use( $filters) {
                    $q->orWhere(function ($q1) use($filters) {
                        $q1->where([['status', 'U'],['lastStatus', 'Sld']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                    });
                });
            } else {
                // Log::info('Rented -> status='U', lastStatus='Lsd', soldInDate > 0'); 
                $query = $query->where(function ($q) use( $filters) {
                    $q->orWhere(function ($q1) use($filters) {
                        $q1->where([['status', 'U'],['lastStatus', 'Lsd']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                    });
                });
            }
        }
       
        $query = $query->where(function ($q) use($filters) {
            if($filters->propertyType->detached == true) {
                $q->orWhere('class', 'ResidentialProperty')->orWhere('propertyType', 'Detached');
            }
            if($filters->propertyType->semiDetached == true) {
                $q->orWhere('propertyType', 'Semi-Detached');
            }
            if($filters->propertyType->freeholdTown == true) {
                $q->orWhere('propertyType', 'Att/Row/Twnhouse');
            }
            if($filters->propertyType->condoTown == true) {
                $q->orWhere('class', 'CondoProperty')->orWhere('propertyType', 'Condo Townhouse');
            }
            if($filters->propertyType->condoApartment == true) {
                $q->orWhere('propertyType', 'Condo Apt');
            }
            if($filters->propertyType->multiFamily == true) {
                $q->orWhere('propertyType', 'Att/Row/Twnhouse');
            }
            if($filters->propertyType->land == true) {
                $q->orWhere('propertyType', 'Land')->orWhere('propertyType', 'Vacant Land');
            }
        });

        if($filters->price->minPrice > 0) {
            $query = $query->where('listPrice', '>=', $filters->price->minPrice);
        }
        if($filters->price->maxPrice < 5000000) {
            $query = $query->where('listPrice', '<=', $filters->price->maxPrice);
        }

        if($filters->rooms->bed > 0) {
            $query = $query->where('numBedrooms', '>=', $filters->rooms->bed);
        }
        if($filters->rooms->bath > 0) {
            $query = $query->where('numBathrooms', '>=', $filters->rooms->bath);
        }
        if($filters->rooms->parking > 0) {
            $query = $query->where('numParkingSpaces', '>=', $filters->rooms->parking);
        }
        if($filters->rooms->garage > 0) {
            $query = $query->where('numGarageSpaces', '>=', $filters->rooms->garage);
        }

        if($filters->size->minSize > 0) {
            $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(sqft, '-', 2), '-', -1) < ?", $filters->size->minSize);
        }
        if($filters->size->maxSize < 5000) {
            $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(sqft, '-', 1), '-', -1) > ?", $filters->size->maxSize);
        }

        // if($filters->age->minAge > 0) {
        //     $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(yearBuilt, '-', 2), '-', -1) < ?", $filters->age->minAge);
        // }
        // if($filters->age->maxAge < 100) {
        //     $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(yearBuilt, '-', 1), '-', -1) > ?", $filters->age->maxAge);
        // }

        if($filters->condo->minCondo > 0){
            $query = $query->where('maintenance', '>=', $filters->condo->minCondo);
        }
        if($filters->condo->maxCondo < 5000) {
            $query = $query->where('maintenance', '<=', $filters->condo->maxCondo);
        }
        
        if($zoom <= 6) {
            // $query = $query->select('id', 'listPrice', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count, SUBSTRING(geohash, 1, 2) AS geohash'));
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 2)');
        } else if($zoom == 7) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 3)');
        } else if($zoom == 8) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 4)');
        } else if($zoom == 9) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 4)');
        } else if($zoom == 10) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 5)');
        } else if($zoom == 11) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 5)');
        } else if($zoom == 12) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 5)');
        } else if($zoom == 13) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 6)');
        } else if($zoom == 14) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('AVG(latitude) AS latitude, AVG(longitude) AS longitude, COUNT(*) as count'));
            $query = $query->groupByRaw('SUBSTRING(geohash, 1, 6)');
        } else if($zoom > 14) {
            $query = $query->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', 'latitude', 'longitude', DB::raw('0 as count'));
        }

        $listings = $query->get();

        // foreach ($listings as $key => $listing) {
        //     $geohash = new Geohash();
        //     $neighbors = $geohash->getNeighbors($listing->geohash);

        //     $geotools = new \League\Geotools\Geotools();
        //     $NorthEast = $geotools->geohash()->decode($neighbors['NorthEast']);
        //     $SouthWest = $geotools->geohash()->decode($neighbors['SouthWest']);

        //     $coordA = new \League\Geotools\Coordinate\Coordinate([$NorthEast->getCoordinate()->getLatitude(), $NorthEast->getCoordinate()->getLongitude()]);
        //     $coordB = new \League\Geotools\Coordinate\Coordinate([$SouthWest->getCoordinate()->getLatitude(), $SouthWest->getCoordinate()->getLongitude()]);
        //     $vertex = $geotools->vertex()->setFrom($coordA)->setTo($coordB);
        //     $middlePoint = $vertex->middle();
        //     Log::info($middlePoint->getLatitude());
        //     Log::info($middlePoint->getLongitude());

        //     $listing->latitude = $middlePoint->getLatitude();
        //     $listing->longitude = $middlePoint->getLongitude();
        // }

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }

    public function list(Request $request)
    {
        $offset = $request->get('offset');
        $sort = $request->get('sort');
        $nw_latitude = $request->get('nw_latitude');
        $nw_longitude = $request->get('nw_longitude');
        $se_latitude = $request->get('se_latitude');
        $se_longitude = $request->get('se_longitude');

        $init_filters = $request->get('filters');
        $filters = json_decode($init_filters);

        $query = new Listing;

        $query = $query->where([['latitude', '<', $nw_latitude], ['longitude', '<', $se_longitude], ['latitude', '>', $se_latitude], ['longitude', '>', $nw_longitude]]);

        if(!empty($filters->type)) { 
            if($filters->type == 'Sale') {
                if(empty($filters->lastStatus)) { 
                    if($filters->daysOnMarket == 0) { 
                        // Log::info('ForSale -> status='A' type='Sale' dayOnMarket = 0');
                        $query = $query->where([['status', 'A'],['type', 'Sale']]);
                    } else { 
                        // Log::info('ForSale -> status='A', type='Sale', dayOnMarket > 0');
                        $query = $query->where(function ($q) use($filters) {
                            $q->where([['status', 'A'],['type', 'Sale']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                        });
                    }
                } else {
                    if($filters->daysOnMarket == 0) {
                        // Log::info('ForSale & Sold -> status='A', type='Sale' || status='A', lastStatus='Sld', daysOnMarket = 0, soldInDate > 0');
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Sale']]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Sld']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    } else {     
                        // Log::info('ForSale & Sold -> status='A', type='Sale' || status='A', lastStatus='Sld', daysOnMarket > 0, soldInDate > 0');              
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Sale']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Sld']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    }
                }
            } else { 
                if(empty($filters->lastStatus)) { 
                    if($filters->daysOnMarket == 0) {
                        // Log::info('ForRent -> status='A' type='Lease' dayOnMarket = 0');
                        $query = $query->where([['status', 'A'],['type', 'Lease']]);
                    } else {
                        // Log::info('ForRent -> status='A' type='Lease' dayOnMarket > 0');
                        $query = $query->where(function ($q) use($filters) {
                            $q->where([['status', 'A'],['type', 'Lease']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                        });
                    }
                } else { 
                    if($filters->daysOnMarket == 0) {  
                        // Log::info('ForRent & Rented -> status='A', type='Lease' || status='U', lastStatus='Lsd', daysOnMarket = 0, soldInDate > 0');    
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Lease']]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Lsd']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    } else {      
                        // Log::info('ForRent & Rented -> status='A', type='Lease' || status='U', lastStatus='Lsd', daysOnMarket > 0, soldInDate > 0');                       
                        $query = $query->where(function ($q) use( $filters) {
                            $q->where([['status', 'A'],['type', 'Lease']])->whereRaw("DATEDIFF(NOW(), listDate) <= ?", [$filters->daysOnMarket]);
                            $q->orWhere(function ($q1) use($filters) {
                                $q1->where([['status', 'U'],['lastStatus', 'Lsd']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                            });
                        });
                    }
                }
            }
        } else {
            if($filters->lastStatus == 'Sld') {
                // Log::info('Sold -> status='U', lastStatus='Sld', soldInDate > 0'); 
                $query = $query->where(function ($q) use( $filters) {
                    $q->orWhere(function ($q1) use($filters) {
                        $q1->where([['status', 'U'],['lastStatus', 'Sld']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                    });
                });
            } else {
                // Log::info('Rented -> status='U', lastStatus='Lsd', soldInDate > 0'); 
                $query = $query->where(function ($q) use( $filters) {
                    $q->orWhere(function ($q1) use($filters) {
                        $q1->where([['status', 'U'],['lastStatus', 'Lsd']])->whereRaw("DATEDIFF(NOW(), soldDate) <= ?", [$filters->soldInLast]);
                    });
                });
            }
        }
       
        $query = $query->where(function ($q) use($filters) {
            if($filters->propertyType->detached == true) {
                $q->orWhere('class', 'ResidentialProperty')->orWhere('propertyType', 'Detached');
            }
            if($filters->propertyType->semiDetached == true) {
                $q->orWhere('propertyType', 'Semi-Detached');
            }
            if($filters->propertyType->freeholdTown == true) {
                $q->orWhere('propertyType', 'Att/Row/Twnhouse');
            }
            if($filters->propertyType->condoTown == true) {
                $q->orWhere('class', 'CondoProperty')->orWhere('propertyType', 'Condo Townhouse');
            }
            if($filters->propertyType->condoApartment == true) {
                $q->orWhere('propertyType', 'Condo Apt');
            }
            if($filters->propertyType->multiFamily == true) {
                $q->orWhere('propertyType', 'Att/Row/Twnhouse');
            }
            if($filters->propertyType->land == true) {
                $q->orWhere('propertyType', 'Land')->orWhere('propertyType', 'Vacant Land');
            }
        });

        if($filters->price->minPrice > 0) {
            $query = $query->where('listPrice', '>=', $filters->price->minPrice);
        }
        if($filters->price->maxPrice < 5000000) {
            $query = $query->where('listPrice', '<=', $filters->price->maxPrice);
        }

        if($filters->rooms->bed > 0) {
            $query = $query->where('numBedrooms', '>=', $filters->rooms->bed);
        }
        if($filters->rooms->bath > 0) {
            $query = $query->where('numBathrooms', '>=', $filters->rooms->bath);
        }
        if($filters->rooms->parking > 0) {
            $query = $query->where('numParkingSpaces', '>=', $filters->rooms->parking);
        }
        if($filters->rooms->garage > 0) {
            $query = $query->where('numGarageSpaces', '>=', $filters->rooms->garage);
        }

        if($filters->size->minSize > 0) {
            $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(sqft, '-', 2), '-', -1) < ?", $filters->size->minSize);
        }
        if($filters->size->maxSize < 5000) {
            $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(sqft, '-', 1), '-', -1) > ?", $filters->size->maxSize);
        }

        // if($filters->age->minAge > 0) {
        //     $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(yearBuilt, '-', 2), '-', -1) < ?", $filters->age->minAge);
        // }
        // if($filters->age->maxAge < 100) {
        //     $query = $query->whereRaw("SUBSTRING_INDEX(SUBSTRING_INDEX(yearBuilt, '-', 1), '-', -1) > ?", $filters->age->maxAge);
        // }

        if($filters->condo->minCondo > 0){
            $query = $query->where('maintenance', '>=', $filters->condo->minCondo);
        }
        if($filters->condo->maxCondo < 5000) {
            $query = $query->where('maintenance', '<=', $filters->condo->maxCondo);
        }

        if($sort == 'Price') {
            $query = $query->orderBy('listPrice', 'asc');
        } else if($sort == 'List') {
            $query = $query->orderBy('listDate', 'desc');
        } else {
            $query = $query->orderBy('soldDate', 'desc');
        }

        $listings = $query->select('id', 'status', 'type', 'latitude', 'longitude', 'lastStatus', 'soldDate', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'unitNumber', 'district', 'neighborhood', 'city', 'unitNumber', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('0 as count'))->offset($offset * 10)->limit(10)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }


    public function favorite(Request $request)
    {
        $userId = $request->get('userId');
        $offset = $request->get('offset');

        $query = new Like;
        $likes = $query->where('user_id', $userId)->pluck('listing_id');

        $query1 = new Listing;
        $listings = $query1->select('id', 'status', 'type', 'lastStatus', 'listPrice', 'soldPrice', 'daysOnMarket', 'streetNumber', 'streetName', 'streetSuffix', 'district', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'images', DB::raw('0 as count'))->whereIn('id', $likes)->orderBy('id', 'desc')->offset($offset * 10)->limit(10)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }
    
    public function detail(Request $request)
    {
        $id = $request->get('id');

        $query = new Listing;
        $query = $query->where('id', $id)
            ->with('condominium')
            ->with('detail')
            ->with('tax');
        $listings = $query->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }
    
    public function histories(Request $request)
    {
        $streetNumber = $request->get('streetNumber');
        $streetName = $request->get('streetName');
        $streetSuffix = $request->get('streetSuffix');
        $unitNumber = $request->get('unitNumber');

        $query = new Listing;
        $query = $query->select('id', 'status', 'type', 'lastStatus', 'listDate', 'soldDate', 'listPrice', 'soldPrice', 'mlsNumber')->where([['streetNumber', $streetNumber], ['streetName', $streetName], ['streetSuffix', $streetSuffix], ['unitNumber', $unitNumber]]);
        $listings = $query->orderBy('listDate', 'desc')->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }
    
    public function similars(Request $request)
    {
        $latitude = $request->get('latitude');
        $longitude = $request->get('longitude');

        $status = $request->get('status');
        $type = $request->get('type');
        $lastStatus = $request->get('lastStatus');
        $propertyType = $request->get('propertyType');
        $numBedrooms = $request->get('numBedrooms');


        $query = new Listing;
        if(empty($type)) {
            $query = $query->where([['status', $status], ['lastStatus', $lastStatus], ['propertyType', $propertyType], ['numBedrooms', $numBedrooms]]);
        } else if(empty($lastStatus)) {
            $query = $query->where([['status', $status], ['type', $type], ['propertyType', $propertyType], ['numBedrooms', $numBedrooms]]);
        } else {
            $query = $query->where([['status', $status], ['type', $type], ['lastStatus', $lastStatus], ['propertyType', $propertyType], ['numBedrooms', $numBedrooms]]);
        }

        $listings = $query->orderByRaw('ABS(IFNULL(latitude, 0) - ?), ABS(IFNULL(longitude, 0) - ?) DESC', [$latitude, $longitude])->offset(0)->limit(5)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }
    
    public function rooms(Request $request)
    {
        $mlsNumber = $request->get('mlsNumber');

        $query = new Room;
        $query = $query->where('mlsNumber', $mlsNumber);   

        $listings = $query->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }
    
    public function search(Request $request)
    {
        $search = $request->get('search');

        $query = new Listing;
        $query = $query->select('id', 'mlsNumber', 'streetName', 'streetNumber', 'streetSuffix', 'city', 'state', 'listPrice', 'lastStatus', 'numBedrooms', 'numBedroomsPlus', 'numBathrooms', 'numBathroomsPlus', 'numParkingSpaces', 'type')
                    ->where('mlsNumber', 'like', $search.'%')
                    ->orWhere('area', 'like', $search.'%')
                    ->orWhere('city', 'like', $search.'%')
                    ->orWhere('country', 'like', $search.'%')
                    ->orWhere('district', 'like', $search.'%')
                    ->orWhere('neighborhood', 'like', $search.'%')
                    ->orWhere('streetDirection', 'like', $search.'%')
                    ->orWhere('streetName', 'like', $search.'%')
                    ->orWhere('streetNumber', 'like', $search.'%')
                    ->orWhere('streetSuffix', 'like', $search.'%')
                    ->orWhere('zip', 'like', $search.'%')
                    ->orWhere(function ($q) use($search) {
                        $q->whereRaw("CONCAT(IFNULL(streetNumber, ''), ' ', IFNULL(streetName, ''), ' ', IFNULL(streetSuffix, ''), ' ', IFNULL(streetDirection, ''), ', ', IFNULL(city, ''), ', ', IFNULL(state, ''), ', ', IFNULL(country, '')) LIKE ?", $search.'%');
                    })
                    ->limit(20);

        $listings = $query->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($listings);
        $data['listings'] = $listings;

        return $data;
    }

    public function setSearches(Request $request)
    {
        $name = $request->get('name');
        $userId = $request->get('userId');
        $region = $request->get('region');
        $filters = $request->get('filters');
        $location = $request->get('location');
        $coordinates = $request->get('coordinates');
        $description = $request->get('description');
        Log::info($coordinates);

        $query = new Search;
        $result = $query->insertGetId(['user_id' => $userId, 'name' => $name, 'region' => json_encode($region), 'filters' => json_encode($filters), 'location' => $location, 'coordinates' => json_encode($coordinates), 'description' => $description]);

        $data['status'] = 200;
        $data['message'] = "Success";
        // $data['count'] = count($likes);
        // $data['likes'] = $likes;

        return $data;
    }


    public function getSearches(Request $request)
    {
        $userId = $request->get('userId');

        $query = new Search;

        $searches = $query->where('user_id', $userId)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($searches);
        $data['searches'] = $searches;

        return $data;
    }

    public function setLike(Request $request)
    {
        $userId = $request->get('userId');
        $listingId = $request->get('listingId');

        $query = new Like;
        $listings = $query->where([['user_id', $userId],['listing_id', $listingId]])->get();

        if(count($listings) > 0){
            $result = $query->where([['user_id', $userId],['listing_id', $listingId]])->delete();
        } else {
            $result = $query->insertGetId(['user_id' => $userId, 'listing_id' => $listingId]);
        }

        $likes = $query->where('user_id', $userId)->pluck('listing_id');
        Log::info($likes);

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($likes);
        $data['likes'] = $likes;

        return $data;
    }

    public function getLike(Request $request)
    {
        $userId = $request->get('userId');

        $query = new Like;

        $likes = $query->where('user_id', $userId)->pluck('listing_id');
        Log::info($likes);

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($likes);
        $data['likes'] = $likes;

        return $data;
    }
}