<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Transformers\Users\UserTransformer;
use App\Model\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

/**
 * Class UsersController.
 *
 * @author Jose Fonseca <jose@ditecnologia.com>
 */
class UsersController extends Controller
{
    use Helpers;

    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function validateEmail(Request $request)
    {
        $userEmail = $request->get('userEmail');
        Log::info($userEmail);
        $query = new User;
        $users = $query->where('user_email', $userEmail)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($users);
        $data['users'] = $users;

        return $data;
    }

    public function setUser(Request $request)
    {
        $userName = $request->get('name');
        $userEmail = $request->get('email');
        $userPassword = $request->get('password');
        $userRole = $request->get('role');

        $query = new User;
        $userId = $query->insertGetId(
            ['user_name' => $userName, 'user_email' => $userEmail, 'user_password' => MD5($userPassword), 'user_role'=>$userRole]
        );

        $users = $query->where('id', $userId)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($users);
        $data['users'] = $users;

        return $data;
    }

    public function getUser(Request $request)
    {
        $userEmail = $request->get('email');
        $userPassword = $request->get('password');

        $query = new User;

        $users = $query->where([['user_email', $userEmail], ['user_password', MD5($userPassword)]])->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($users);
        $data['users'] = $users;

        return $data;
    }
}
