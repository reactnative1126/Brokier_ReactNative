<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Transformers\Users\UserTransformer;
use App\Model\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Http\File;

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
        $uniqueId = $request->get('unique_id');
        $userName = $request->get('name');
        $userEmail = $request->get('email');
        $userPassword = $request->get('password');
        $userRole = $request->get('role');

        $query = new User;
        $userId = $query->insertGetId(
            ['unique_id' => $uniqueId, 'user_name' => $userName, 'brokerage_name' => '', 'user_email' => $userEmail, 'user_phone' => '', 'user_website' => '', 'user_instagram_id' => '', 'user_password' => MD5($userPassword), 'user_role'=>$userRole]
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

    public function getReferral(Request $request)
    {
        $uniqueId = $request->get('uniqueId');

        $query = new User;

        $users = $query->where('agent_unique_id', $uniqueId)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($users);
        $data['users'] = $users;

        return $data;
    }

    public function updateUser(Request $request)
    {
        $userId = $request->get('user_id');
        $uniqueId = $request->get('unique_id');
        $userName = $request->get('name');
        $userEmail = $request->get('email');
        $brokerageName = $request->get('brokerage_name');
        $userPhone = $request->get('phone');
        $userWebsite = $request->get('website');
        $userInstagramId = $request->get('instagram_id');
        $userRole = $request->get('role');

        $query = new User;
        $query->where('id', $userId)->
        update(['user_name'=>$userName, 'brokerage_name' => $brokerageName, 'user_email'=>$userEmail, 'user_phone' => $userPhone, 'user_website' => $userWebsite, 'user_instagram_id' => $userInstagramId, 'user_role' => $userRole]);

        $users = $query->where('id', $userId)->get();

        $data['status'] = 200;
        $data['message'] = "Success";
        $data['count'] = count($users);
        $data['users'] = $users;

        return $data;
    }

    public function uploadAvatar(Request $request)
    {
        $file = $request->file('upload');
        // $path = Storage::disk('local')->put('example.txt', 'Contents');
        // $path = Storage::putFile('upload');
        // $path = Storage::put('file.jpg', $upload);
        // $path = Storage::move('old/file.jpg', 'new/file.jpg');
// $url = Storage::url('file.jpg');
        $file->move('./avatars', $upload);
        // Log::info($path);

        return $path;
    }
}
