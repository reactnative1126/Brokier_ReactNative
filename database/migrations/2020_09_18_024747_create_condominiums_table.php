<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCondominiumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_condominiums', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber')->unique();

            $table->string('ammenities')->nullable();
            $table->string('buildingInsurance')->nullable();
            $table->string('condoCorp')->nullable();
            $table->string('condoCorpNum')->nullable();
            $table->string('exposure')->nullable();
            $table->string('lockerNumber')->nullable();
            $table->string('locker')->nullable();
            $table->string('parkingType')->nullable();
            $table->string('pets')->nullable();
            $table->string('propertyMgr')->nullable();
            $table->string('stories')->nullable();
            
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
        Schema::dropIfExists('bk_condominiums');
    }
}
