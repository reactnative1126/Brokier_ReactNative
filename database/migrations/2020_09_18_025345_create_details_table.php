<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bk_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mlsNumber')->unique();

            $table->string('airConditioning')->nullable();
            $table->string('basement1')->nullable();
            $table->string('basement2')->nullable();
            $table->string('centralVac')->nullable();
            $table->string('den')->nullable();
            $table->text('description')->nullable();
            $table->string('elevator')->nullable();
            $table->string('exteriorConstruction1')->nullable();
            $table->string('exteriorConstruction2')->nullable();
            $table->text('extras')->nullable();
            $table->string('furnished')->nullable();
            $table->string('garage')->nullable();
            $table->string('heating')->nullable();
            $table->string('patio')->nullable();
            $table->string('swimmingPool')->nullable();
            $table->string('virtualTourUrl')->nullable();
            $table->string('yearBuilt')->nullable();
            
            $table->string('landAccessType')->nullable();
            $table->string('landSewer')->nullable();
            $table->string('viewType')->nullable();
            $table->string('zoningDescription')->nullable();
            $table->string('analyticsClick')->nullable();
            $table->string('analyticsView')->nullable();
            $table->string('moreInformationLink')->nullable();
            $table->string('alternateURLVideoLink')->nullable();
            $table->string('flooringType')->nullable();
            $table->string('foundationType')->nullable();
            $table->string('landscapeFeatures')->nullable();
            $table->string('fireProtection')->nullable();
            $table->string('roofMaterial')->nullable();
            $table->string('farmType')->nullable();
            $table->string('zoningType')->nullable();
            $table->string('businessType')->nullable();
            $table->string('businessSubType')->nullable();
            $table->string('landDisposition')->nullable();
            $table->string('storageType')->nullable();
            $table->string('constructionStyleSplitLevel')->nullable();
            $table->string('constructionStatus')->nullable();
            $table->string('loadingType')->nullable();
            $table->string('ceilingType')->nullable();
            $table->string('liveStreamEventURL')->nullable();
            $table->string('energuideRating')->nullable();
            $table->string('amperage": null')->nullable();
            
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
        Schema::dropIfExists('bk_details');
    }
}
