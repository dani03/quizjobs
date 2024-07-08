<?php

namespace App\Http\Controllers\Api\V1\Links;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Quiz\QuizRepository;
use App\Http\Requests\LinkRequest;
use App\Http\Resources\QuizResource;
use App\Http\Services\Links\LinkService;
use App\Http\Services\Quiz\QuizService;
use App\Models\Link;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Support\Facades\App;
use \Symfony\Component\HttpFoundation\Response as ResponseSm;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController extends Controller
{

    public function __construct(private LinkService $linkService) {

    }
    /**
     * créer un nouveau lien pour un quiz.
     */
    public function store(LinkRequest $request)
    {
        $this->authorize('create-quiz');
        //recupération du quiz
        $quiz_id = $request->quiz_id;
        $quiz = (new QuizService(new QuizRepository()))->getQuiz($quiz_id);
        if(!$quiz) {
            return response()->json(['message' => "Ce quiz n'existe pas ou a été supprimé."],ResponseSm::HTTP_NOT_FOUND);
        }
        $link = $this->linkService->creatingLink($quiz);
        $appURL = env('APP_URL');
        $customLink = "{$appURL}/invitation-link?token={$link->hash_token}";
        return response()->json(['data' => "votre lien a été crée.",'link' => $customLink],ResponseSm::HTTP_OK);
    }


    public function show(Request $request)
    {
        $token = $request->query('token');
        $link = $this->linkService->getLink($token);
        if($link === false) {
            return response()->json(['message' => "ce lien n'existe pas"],ResponseSm::HTTP_NOT_FOUND);
        }
        //vérifie si le lien est valide
        $linkIsValid = $this->linkService->checkExpireLink($link);
        if(!$linkIsValid) {
            return response()->json(['message' => "Le lien a expiré. Veuillez demander un nouveau lien."],ResponseSm::HTTP_NOT_FOUND);
        }
        //sinon si le lien est valide on récupère le quiz
        $quiz = (new QuizService(New QuizRepository()))->getQuiz($link->quiz_id);
        return QuizResource::make($quiz);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
