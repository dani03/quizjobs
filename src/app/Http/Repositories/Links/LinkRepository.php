<?php

namespace App\Http\Repositories\Links;

use App\Models\Link;
use Carbon\Carbon;
use Illuminate\Support\Str;

class LinkRepository
{

    public function create(int $quizId, int $expireTime = 2) {

       return  Link::create([
            "hash_token" => Hash('sha256', Str::random(32)),
            "expires_at" => Carbon::now()->addHours($expireTime),
            'quiz_id' => $quizId
        ]);
    }

    public function findHashToken(string $token) {
        return Link::where('hash_token', $token)->first();
    }


}
