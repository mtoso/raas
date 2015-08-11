<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use GuzzleHttp\Client;

$app->get('/{name:.*?}', function($name) use ($app) {
    $client = new Client(['base_uri' => 'http://localhost:3000/']);
    $response = $client->post('/', [
        'json' => ['name' => ucfirst($name ?: 'World')],
        'query' => ['module' => 'app-hello/', 'component' => 'hello'],
    ]);
    $contents = $response->getBody()->getContents();

    return response($contents, 200);
});
