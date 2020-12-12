<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function($api){

    $api->group(['middleware' => ['throttle:60,1', 'bindings'], 'namespace' => 'App\Http\Controllers'], function($api) {

        $api->group(['prefix' => 'listings'], function ($api) {
            $api->get('/all', 'Api\Listings\ListingsController@all');
            $api->get('/available', 'Api\Listings\ListingsController@available');
            $api->get('/unavailable', 'Api\Listings\ListingsController@unavailable');

            $api->get('/map', 'Api\Listings\ListingsController@map');
            $api->get('/list', 'Api\Listings\ListingsController@list');
            $api->get('/detail', 'Api\Listings\ListingsController@detail');
            $api->get('/histories', 'Api\Listings\ListingsController@histories');
            $api->get('/similars', 'Api\Listings\ListingsController@similars');
            $api->get('/rooms', 'Api\Listings\ListingsController@rooms');
            $api->get('/search', 'Api\Listings\ListingsController@search');

            $api->get('/like', 'Api\Listings\ListingsController@getLike');
            $api->post('/like', 'Api\Listings\ListingsController@setLike');

            $api->get('/favorite', 'Api\Listings\ListingsController@favorite');
            $api->get('/searches', 'Api\Listings\ListingsController@getSearches');
            $api->post('/searches', 'Api\Listings\ListingsController@setSearches');
        });

        $api->group(['prefix' => 'users'], function ($api) {
            $api->get('/validate', 'Api\Auth\UsersController@validateEmail');
            $api->post('/', 'Api\Auth\UsersController@setUser');
            $api->get('/', 'Api\Auth\UsersController@getUser');

        });

        $api->get('ping', 'Api\PingController@index');

        $api->get('assets/{uuid}/render', 'Api\Assets\RenderFileController@show');

        $api->group(['middleware' => ['auth:api'], ], function ($api) {

            // $api->group(['prefix' => 'users'], function ($api) {
            //     $api->get('/', 'Api\Users\UsersController@index');
            //     $api->post('/', 'Api\Users\UsersController@store');
            //     $api->get('/{uuid}', 'Api\Users\UsersController@show');
            //     $api->put('/{uuid}', 'Api\Users\UsersController@update');
            //     $api->patch('/{uuid}', 'Api\Users\UsersController@update');
            //     $api->delete('/{uuid}', 'Api\Users\UsersController@destroy');
            // });

            $api->group(['prefix' => 'roles'], function ($api) {
                $api->get('/', 'Api\Users\RolesController@index');
                $api->post('/', 'Api\Users\RolesController@store');
                $api->get('/{uuid}', 'Api\Users\RolesController@show');
                $api->put('/{uuid}', 'Api\Users\RolesController@update');
                $api->patch('/{uuid}', 'Api\Users\RolesController@update');
                $api->delete('/{uuid}', 'Api\Users\RolesController@destroy');
            });

            $api->get('permissions', 'Api\Users\PermissionsController@index');

            $api->group(['prefix' => 'me'], function($api) {
                $api->get('/', 'Api\Users\ProfileController@index');
                $api->put('/', 'Api\Users\ProfileController@update');
                $api->patch('/', 'Api\Users\ProfileController@update');
                $api->put('/password', 'Api\Users\ProfileController@updatePassword');
            });

            $api->group(['prefix' => 'assets'], function($api) {
                $api->post('/', 'Api\Assets\UploadFileController@store');
            });

        });

    });

});



