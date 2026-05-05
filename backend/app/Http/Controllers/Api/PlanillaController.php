<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Simple\VoucherService;
use Illuminate\Http\Request;

class PlanillaController extends Controller
{
    public function download(Request $request, VoucherService $voucherService)
    {
        $request->validate([
            'tipoDocumento' => ['required', 'string'],
            'numeroDocumento' => ['required', 'string'],
            'periodo' => ['nullable', 'string'],
        ]);

        $result = $voucherService->individualReport(
            $request->input('tipoDocumento'),
            $request->input('numeroDocumento'),
            $request->input('periodo')
        );

        $fileName = 'planilla-' . $request->input('numeroDocumento') . '.pdf';

        return response($result['binary'], 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ]);
    }
}
