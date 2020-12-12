<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_listings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber')->unique();
            
            $table->string('status')->nullable();
			$table->string('class')->nullable();
			$table->string('type')->nullable();
			$table->string('listPrice')->nullable();
			$table->string('daysOnMarket')->nullable();
			$table->string('occupancy')->nullable();
			$table->string('listDate')->nullable();
			$table->string('updatedOn')->nullable();
			$table->string('lastStatus')->nullable();
			$table->string('soldPrice')->nullable();
            $table->string('soldDate')->nullable();
            // map
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            // address
            $table->string('area')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('district')->nullable();
            $table->string('majorIntersection')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('streetDirection')->nullable();
            $table->string('streetName')->nullable();
            $table->string('streetNumber')->nullable();
            $table->string('streetSuffix')->nullable();
            $table->string('unitNumber')->nullable();
            $table->string('zip')->nullable();
            $table->string('state')->nullable();
            // details
            $table->string('numBathrooms')->nullable();
            $table->string('numBathroomsPlus')->nullable();
            $table->string('numBedrooms')->nullable();
            $table->string('numBedroomsPlus')->nullable();
            $table->string('numFireplaces')->nullable();
            $table->string('numGarageSpaces')->nullable();
            $table->string('numParkingSpaces')->nullable();
            $table->string('numRooms')->nullable();
            $table->string('numRoomsPlus')->nullable();
            $table->string('propertyType')->nullable();
            $table->string('sqft')->nullable();
            $table->string('style')->nullable();
            // condominium fees
            $table->string('cableInlc')->nullable();
            $table->string('heatIncl')->nullable();
            $table->string('hydroIncl')->nullable();
            $table->string('maintenance')->nullable();
            $table->string('parkingIncl')->nullable();
            $table->string('taxesIncl')->nullable();
            $table->string('waterIncl')->nullable();
            
            $table->text('images')->nullable();
            $table->text('agents')->nullable();
            
            // $table->timestamp('created_at')->nullable();
            // $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bk_listings');
    }
}
