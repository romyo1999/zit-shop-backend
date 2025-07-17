<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
class UserController extends Controller
{
    public function update_address($id ,Request $request){
        $request->validate([
            "address"=>["required","string"]
        ]);

        $user=User::find($id);
        if($user){
            $user->address=$request->address;
            $user->save();
            return response()->json(["massage"=>"updated successfuly"],200);
        }else{
            return response()->json(["massage"=>"unatorized"],401);
        }
    }
    
    public function search(){
        $users= User::orderBy('created_at', 'desc')->get();
        return response()->json(['product' => $users]);
    }


    public function index()
    {

        $users = User::select(["id", "first_name", "last_name", "email","role"])
    ->orderBy('created_at', 'desc')
    ->paginate(8);

        return response()->json(["users" => $users]);


    }

    public function update_role($id ,Request $request)
    {
        $request->validate([
            "role"=>"required|string|max:5"
        ]);

        $user=User::find($id);
        if($user){
            $user->role=$request->role;
            $user->save();
            return response()->json(["new role is"=>$user->role]);
        }else{
            return response()->json(["Error"=>"user not found"]);
        }
    }

    public function destroy($id)
    {
        $user=User::find($id);
        if($user){
            $user->delete();
            return response()->json(["message"=>"deleted successfuly"]);
        }else{
            return response()->json(["Error"=>"User not found"]);

        }
    }



    public function update()
    {
        $user =Auth::user();

        return response()->json(["user"=>$user]);

    }

    public function edit_image($id,Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $user=User::find($id);
        
        if($user){
            try{
                if($user->image!=="images/user.png"){
                    Storage::disk("public")->delete($user->image);
                }
            }catch(\Exception $e){
                return response()->json(["message"=>"first image update"]);
            };

            $imagpath=$request->file("image")->store("images" ,"public");
            $user->image=$imagpath;
            $user->save();
            return response()->json(["message"=>"updated successfuliy"]);
        }
    
    }

    public function edit($id ,Request $request){
        $request->validate([
            "first_name" => 'required|string',
            "last_name" => 'required|string',
            "address" => 'required|string',
            'phone' => ['required', 'regex:/^(2126|2125|06|05)\d{8}$/']
        
    ]);

            $user=User::find($id);

            $user->first_name=$request->first_name;
            $user->last_name=$request->last_name;
            $user->address=$request->address ;
            $user->phone=$request->phone;
            $user->save();
            return response()->json(["message"=>"update successfuliy"]);
    }




        public function ckeck_auth()
        {
            if (Auth::check()) {
                $user = auth()->user();
                return response()->json(["user"=>$user]);

            } else {
                return response()->json(["error"=>"unatorized"],401);
            }
        }


        public function logout()
        {
            Auth::logout();
            return response()->json(["message"=>"logout successfuly"]);
        }




























}
