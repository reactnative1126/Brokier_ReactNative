<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpenHousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_open_houses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber');

			$table->string('date')->nullable();
            $table->string('startTime')->nullable();
            $table->string('endTime')->nullable();
            
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
        Schema::dropIfExists('bk_open_houses');
    }
}
