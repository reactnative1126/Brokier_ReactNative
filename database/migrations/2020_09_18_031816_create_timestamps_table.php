<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimestampsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_timestamps', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber')->unique();

			$table->string('idxUpdated')->nullable();
			$table->string('listingUpdated')->nullable();
			$table->string('photosUpdated')->nullable();
			$table->string('conditionalExpiryDate')->nullable();
			$table->string('terminatedDate')->nullable();
			$table->string('suspendedDate')->nullable();
			$table->string('listingEntryDate')->nullable();
			$table->string('closedDate')->nullable();
			$table->string('unavailableDate')->nullable();
			$table->string('expiryDate')->nullable();
            $table->string('extensionEntryDate')->nullable();
            
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
        Schema::dropIfExists('bk_timestamps');
    }
}
