<?php

namespace Tests\Feature;

use App\Models\Role;

use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SimpleUserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @return void
     * On vérifie que l'utilisateur avec un role "user" à accès aux fonctionnalités
     * lié à son rôle
     */

    public function test_simple_user_can_access_user_quiz_fonctionalities() {
        $faker = Faker::create();
        $userSimple = User::factory()->create([
            'role_id' => Role::ROLE_USER,
            'lastname' => $faker->firstName,
            'name' => $faker->lastName,
            'email' => $faker->email,
            'password' => Hash::make('password') ,
        ]);
        $response = $this->actingAs($userSimple)->getJson('api/v1/user/quiz');

        $response->assertStatus(200);
    }

    /**
     * @return void
     *  On vérifie que l'utilisateur avec un role "user" n'a pas accès aux fonctionnalités
     *  lié au rôle d'une entreprise
     */
    public function test_user_not_have_access_to_entreprise_quiz_fonctionalities()
    {
        $this->seed();
        $faker = Faker::create();
        $userSimple = User::factory()->create([
            'role_id' => Role::ROLE_USER,
            'lastname' => $faker->firstName,
            'name' => $faker->lastName,
            'email' => $faker->email,
            'password' => Hash::make('password') ,
            ]);
        $response = $this->actingAs($userSimple)->getJson('/api/V1/entreprise/quiz');

        $response->assertStatus(403);
    }

}
