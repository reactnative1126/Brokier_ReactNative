<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_lots', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber')->unique();

            $table->string('acres')->nullable();
            $table->string('depth')->nullable();
            $table->string('irregular')->nullable();
            $table->text('legalDescription')->nullable();
            $table->string('measurement')->nullable();
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
        Schema::dropIfExists('bk_lots');
    }
}
