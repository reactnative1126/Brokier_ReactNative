<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Arr;
use Sk\Geohash\Geohash;

use App\Model\Listing;
use App\Model\Condominium;
use App\Model\Detail;
use App\Model\Lot;
use App\Model\Nearby;
use App\Model\Office;
use App\Model\OpenHouse;
use App\Model\Permission;
use App\Model\Room;
use App\Model\Tax;
use App\Model\Timestamp;

class ListingsCron extends Command
{
    protected $signature = 'listings:cron';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        for($page = 1; $page <= 80; $page++) {
            $response = Http::withHeaders(['Content-Type' => 'application/json', 'REPLIERS-API-KEY' => 'ygmJxh2vUhNxWgpWSU9AM3t7NE5YFa'])->get('https://api.repliers.io/listings?status=U&lastStatus=Lsd&minSoldDate=2020-09-01&maxSoldDate=2020-10-31&pageNum='.(string)$page);
            // $items = Http::withHeaders(['Content-Type' => 'application/json', 'REPLIERS-API-KEY' => 'ygmJxh2vUhNxWgpWSU9AM3t7NE5YFa'])->get('https://api.repliers.io/listings?pageNum='.(string)$page)['listings'];
            
            if(!empty($response)){
                $items = $response['listings'];
                
                $mlsNumbers = [];
                $listings = [];
                $condominiums = [];
                $details = [];
                $lots = [];
                $nearbys = [];
                $offices = [];
                $openHouses = [];
                $permissions = [];
                $rooms = [];
                $taxes = [];
                $timestamps = [];
                
                foreach ($items as $index => $item) {
                    $mlsNumber =  $item['mlsNumber'];
                    $mlsNumbers[$index] = $mlsNumber;

                    $listing = new Listing;
                    $listing->fill($item);

                    $listing->latitude = $item['map']['latitude'];
                    $listing->longitude = $item['map']['longitude'];
                    $geohash = new Geohash();
                    $listing->geohash = $geohash->encode((float)$item['map']['latitude'], (float)$item['map']['longitude'], 12);

                    $listing->area = $item['address']['area'];
                    $listing->city = $item['address']['city'];
                    $listing->country = $item['address']['country'];
                    $listing->district = $item['address']['district'];
                    $listing->majorIntersection = $item['address']['majorIntersection'];
                    $listing->neighborhood = $item['address']['neighborhood'];
                    $listing->streetDirection = $item['address']['streetDirection'];
                    $listing->streetName = $item['address']['streetName'];
                    $listing->streetNumber = $item['address']['streetNumber'];
                    $listing->streetSuffix = $item['address']['streetSuffix'];
                    $listing->unitNumber = $item['address']['unitNumber'];
                    $listing->zip = $item['address']['zip'];
                    $listing->state = $item['address']['state'];

                    $listing->numBathrooms = $item['details']['numBathrooms'];
                    $listing->numBathroomsPlus = $item['details']['numBathroomsPlus'];
                    $listing->numBedrooms = $item['details']['numBedrooms'];
                    $listing->numBedroomsPlus = $item['details']['numBedroomsPlus'];
                    $listing->numFireplaces = $item['details']['numFireplaces'];
                    $listing->numGarageSpaces = $item['details']['numGarageSpaces'];
                    $listing->numParkingSpaces = $item['details']['numParkingSpaces'];
                    $listing->numRooms = $item['details']['numRooms'];
                    $listing->numRoomsPlus = $item['details']['numRoomsPlus'];
                    $listing->propertyType = $item['details']['propertyType'];
                    $listing->sqft = $item['details']['sqft'];
                    $listing->style = $item['details']['style'];
                    
                    $listing->cableInlc = $item['condominium']['fees']['cableInlc'];
                    $listing->heatIncl = $item['condominium']['fees']['heatIncl'];
                    $listing->hydroIncl = $item['condominium']['fees']['hydroIncl'];
                    $listing->maintenance = $item['condominium']['fees']['maintenance'];
                    $listing->parkingIncl = $item['condominium']['fees']['parkingIncl'];
                    $listing->taxesIncl = $item['condominium']['fees']['taxesIncl'];
                    $listing->waterIncl = $item['condominium']['fees']['waterIncl'];

                    $listing->images = implode('#', $item['images']);
                    $listing->agents = implode('#', $item['agents']);
                    $listings[] = $listing->toArray();
                    
                    $condominium = new Condominium;
                    $condominium->fill($item['condominium']);
                    $condominium->mlsNumber = $mlsNumber;
                    $condominium->ammenities = implode('#', $item['condominium']['ammenities']);
                    $condominiums[] = $condominium->toArray();
                    
                    $detail = new Detail;
                    $detail->fill($item['details']);
                    $detail->mlsNumber = $mlsNumber;
                    $details[] = $detail->toArray();

                    $lot = new Lot;
                    $lot->fill($item['lot']);
                    $lot->mlsNumber = $mlsNumber;
                    $lots[] = $lot->toArray();

                    $nearby = new Nearby;
                    $nearby->fill($item['nearby']);
                    $nearby->mlsNumber = $mlsNumber;
                    $nearby->ammenities = implode('#', $item['nearby']['ammenities']);
                    $nearbys[] = $nearby->toArray();

                    $office = new Office;
                    $office->fill($item['office']);
                    $office->mlsNumber = $mlsNumber;
                    $offices[] = $office->toArray();

                    foreach ($item['openHouse'] as $key => $house) {
                        $openHouse = new OpenHouse;
                        $openHouse->fill($house);
                        $openHouse->mlsNumber = $mlsNumber;
                        $openHouses[] = $openHouse->toArray();
                    }

                    $permission = new Permission;
                    $permission->fill($item['permissions']);
                    $permission->mlsNumber = $mlsNumber;
                    $permissions[] = $permission->toArray();
                    
                    foreach ($item['rooms'] as $key => $value) {
                        $room = new Room;
                        $room->fill($value);
                        $room->mlsNumber = $mlsNumber;
                        $room->roomNo = $key;
                        $rooms[] = $room->toArray();
                    }

                    $tax = new Tax;
                    $tax->fill($item['taxes']);
                    $tax->mlsNumber = $mlsNumber;
                    $taxes[] = $tax->toArray();

                    $timestamp = new Timestamp;
                    $timestamp->fill($item['timestamps']);
                    $timestamp->mlsNumber = $mlsNumber;
                    $timestamps[] = $timestamp->toArray();
                }
                if(!empty($mlsNumbers)) {
                    Listing::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Condominium::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Detail::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Lot::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Nearby::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Office::whereIn('mlsNumber', $mlsNumbers)->delete();
                    OpenHouse::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Permission::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Room::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Tax::whereIn('mlsNumber', $mlsNumbers)->delete();
                    Timestamp::whereIn('mlsNumber', $mlsNumbers)->delete();    
                }
                Log::info("Page:".$page.' / Count:'.count($listings));
                if(!empty($listings)) {
                    Listing::insert($listings);
                    Condominium::insert($condominiums);
                    Detail::insert($details);
                    Lot::insert($lots);
                    Nearby::insert($nearbys);
                    Office::insert($offices);
                    OpenHouse::insert($openHouses);
                    Permission::insert($permissions);
                    Room::insert($rooms);
                    Tax::insert($taxes);
                    Timestamp::insert($timestamps);
                }
            }
        }
    }
}
