<?php

namespace App\Services\Simple;

class VoucherService extends SimpleClient
{
    protected $session;

    public function __construct(
        private SessionService $sessionService,
    ) {}

    public function withSession(SessionService $session): static
    {
        $this->session = $session;
        return $this;
    }

    public function individualReport(string $documentType, string $document, ?string $quotePeriod = null): array
    {
        $session = $this->sessionService->login();

        $payload = [
            'payroll_number' => '',
            'init_payment_date' => '',
            'end_payment_date' => '',
            'branch_code' => '',
            'quote_period' => $quotePeriod ?? '',
            'identification' => [
                'document_type' => $documentType,
                'document' => $document,
            ],
        ];

        $response = $this->withSession($session)
            ->http()
            ->withHeaders($this->headers())
            ->post($this->baseUrl() . '/vouchers/individual-report', $payload);

        if (! $response->successful()) {
            throw new \Exception($response->json('message') ?? 'Error consultando comprobante individual');
        }

        if (! $response->json('success')) {
            throw new \Exception($response->json('message') ?? 'La API no devolvió una respuesta exitosa');
        }

        $base64 = $response->json('data');

        if (! $base64) {
            throw new \Exception('La API no devolvió el PDF en Base64');
        }

        $cleanBase64 = preg_replace('/^data:application\/pdf;base64,/', '', $base64);
        $binary = base64_decode($cleanBase64, true);

        if ($binary === false) {
            throw new \Exception('No fue posible decodificar el PDF');
        }

        return [
            'base64' => $cleanBase64,
            'binary' => $binary,
            'message' => $response->json('message'),
            'code' => $response->json('code'),
        ];
    }
}
