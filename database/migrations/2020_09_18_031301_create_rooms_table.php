<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber');

            $table->string('roomNo');

            $table->string('description')->nullable();
            $table->string('features')->nullable();
            $table->string('features2')->nullable();
            $table->string('features3')->nullable();
            $table->string('length')->nullable();
            $table->string('width')->nullable();
            
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
        Schema::dropIfExists('bk_rooms');
    }
}
