<?php

namespace App\Http\Controllers;

use App\Models\Favorit;
use App\Models\Product;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
class FavoritController extends Controller
{


    public function likes(){
        $count=Favorit::all()->count();
        $likes=Favorit::paginate(10);

        $Formatteditems=$likes->getCollection()->map(function($item){
                $item['formatted_created_at']=Carbon::parse($item->created_at)->diffForHumans();
                return $item ;

        });
        $likes->setCollection($Formatteditems);



        return response()->json(["likes"=>$likes,"count"=>$count]);
    }

    public function items()
    {
        $user = Auth::user();
    
        if ($user) {
            $user_id = $user->id;
    
            // Fetch all favorited products for the user
            $favoritedProducts = Favorit::where("user_id", $user_id)->with('product')->get();
    
            return response()->json(["favorites" => $favoritedProducts],200);
        } else {
            return response()->json(["message" => "Unauthorized"], 401);
        }
    }

    public function index()
    {
        $user = Auth::user();
    
        if ($user) {
            $user_id = $user->id;
    
            // Fetch all favorited products for the user
            $favoritedProducts = Favorit::where("user_id", $user_id)->get();
    
            return response()->json(["favorites" => $favoritedProducts]);
        } else {
            return response()->json(["message" => "Unauthorized"], 401);
        }
    }



    public function store($id)
    {
        $user =Auth::user();   
        
        if($user){
            $user_id=$user->id;

            $favorit=Favorit::where("user_id",$user_id)->where("product_id",$id)->exists();
            if($favorit){
                Favorit::where("user_id",$user_id)->where("product_id",$id)->delete();
                return response()->json(["message"=>"deleted succssesfuly"],200);
            }else{

                $favorit=Favorit::create([
                'user_id'=>$user_id,
                'product_id'=>$id
            ]);
            return response()->json(["message"=>"addes successfuly"],201);
            }
        }else{
            return response()->json(["message"=>"Unauthorized"],401);

        }
    }

 
    public function show(Favorit $favorit)
    {
        //
    }

 
  

 


    public function destroy($id)
    {
        $user =Auth::user();   
    
        if($user){
           $user_id=$user->id;
           $favorit=Favorit::where("user_id",$user_id)->where("product_id",$id);
            $favorit->delete();
            return response()->json(["message"=>"deleted successfuly"]);
        }
    }
}
