<?php

namespace App\Services\Simple;

use Illuminate\Support\Facades\Http;

class SimpleClient
{
    protected $session;

    protected $authToken;

    protected function baseUrl()
    {
        return config('services.pagosimple.base_url');
    }

    protected function http()
    {
        return Http::asJson()
            ->timeout(20)
            ->retry(2, 200)
            ->acceptJson()
            ->withoutVerifying();
    }

    protected function headers()
    {
        $headers = [
            'nit' => config('services.pagosimple.nit'),
        ];

        if ($this->session) {
            $headers['token'] = $this->session->token();
            $headers['session_token'] = $this->session->sessionToken();
        }

        if ($this->authToken) {
            $headers['auth_token'] = $this->authToken;
        }

        return $headers;
    }
}
