<?php

use App\Http\Controllers\Api\PlanillaController;
use Illuminate\Support\Facades\Route;

Route::post('/mi-planilla/descargar', [PlanillaController::class, 'download']);
