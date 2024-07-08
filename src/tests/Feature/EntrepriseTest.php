<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Faker\Factory as Faker;

class EntrepriseTest extends TestCase
{
    use RefreshDatabase;
    public function setUp(): void
    {
        parent::setUp();


    }

    public function test_entreprise_has_access_to_his_fonctionnalities()
    {

        $entreprise = User::factory()->create([
            'role_id' => Role::ROLE_ENTREPRISE,
            'lastname' => "fakerfirstName",
            'name' => "fakerfirstName",
            'email' => "fakerfirstName@gmail.com",
            'password' => Hash::make('password') ,


        ]);
        $response = $this->actingAs($entreprise)->getJson('/api/v1/entreprise/quiz');

        $response->assertStatus(200);
    }
}
