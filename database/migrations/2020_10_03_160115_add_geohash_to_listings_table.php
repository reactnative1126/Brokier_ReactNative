<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGeohashToListingsTable extends Migration
{
    public function up()
    {
        Schema::table('bk_listings', function (Blueprint $table) {
            $table->string('geohash')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('bk_listings', function (Blueprint $table) {
            $table->dropColumn(['geohash', 'updated_at']);
        });
    }
}
