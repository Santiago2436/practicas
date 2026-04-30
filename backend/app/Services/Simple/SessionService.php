<?php

namespace App\Services\Simple;

class SessionService extends SimpleClient
{
    private string $token;

    private string $sessionToken;

    public function login()
    {
        $response = $this->http()->post(
            $this->baseUrl() . '/auth/login',
            [
                'document_type' => config('services.pagosimple.document_type'),
                'document' => config('services.pagosimple.document'),
                'password' => config('services.pagosimple.password'),
                'secret_key' => config('services.pagosimple.secret_key'),
                'nit' => config('services.pagosimple.nit'),
                'company' => config('services.pagosimple.company'),
            ]
        );

        if (! $response->successful()) {
            throw new \Exception($response->json('message') ?? 'Error en login API');
        }

        $data = $response->json('data');

        $this->token = $data['token'];
        $this->sessionToken = $data['session_token'];

        return $this;
    }

    public function token()
    {
        return $this->token;
    }

    public function sessionToken()
    {
        return $this->sessionToken;
    }
}
