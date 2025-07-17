<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\App;
use Illuminate\Database\Eloquent;

use function PHPSTORM_META\map;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
    
        if ($user) {
            $user_id = $user->id;
    
            // Fetch all favorited products for the user
            $CartProducts = Cart::where("user_id", $user_id)->with('product')->get();
    
            return response()->json(["products" => $CartProducts],200);
        } else {
            return response()->json(["message" => "Unauthorized"], 401);
        }
    }


    public function allCarts()
    {
        $count=Cart::all()->sum("quantity");
        $cart=Cart::paginate(8);
        return response()->json(["cart"=>$cart,'count'=>$count]);
    }

  
    public function store($id,Request $request)
    {

        $request->validate([
            'size'=>['required','string']
        ]);
        $user =Auth::user();   
        
        if($user){
            $user_id=$user->id;
                
                $product=Cart::create([
                'user_id'=>$user_id,
                'product_id'=>$id,
                "quantity"=>1,
                "size"=>$request->size

            ]);
            return response()->json(["message"=>"created successfuly"],201);

        }else{
            return response()->json(["message"=>"Unauthorized"],401);

        }
    }

 
    public function add_edit( $id,Request $request)
    {

        $request->validate([

            "quantity"=>["required","integer"]
        ]);
        $item= Cart::findOrFail($id);
        if ($item){
            $item->update([
                "quantity"=>$request->quantity
            ]);
            return response()->json(["message"=>" quant updated successfuly"]);

        }else{
            return response()->json(["message"=>"Unauthorized"],401);
        }
    }

    public function delete_edit( $id,Request $request)
    {

        $request->validate([

            "quantity"=>["required","integer"]
        ]);
        $item= Cart::findOrFail($id);
        if ($item){
            $item->update([
                "quantity"=>$request->quantity
            ]);
            return response()->json(["message"=>" quant updated successfuly"]);

        }else{
            return response()->json(["message"=>"Unauthorized"],401);
        }
    }

  
    public function update($id,Request $request)
    {
        $user =Auth::user();   
    
        if($user){
           $user_id=$user->id;
           $cart=Cart::where("user_id",$user_id)->where("product_id",$id);
            $cart->quantity=$request->quantity;
            $cart->save();
            return response()->json(["message"=>"updated successfuly"]);
        }
    }

   
    public function destroy($id)
    {
        $user =Auth::user();   
    
        if($user){
          $cart=Cart::findOrFail($id);
          $cart->delete();
          return response()->json(["message"=>"Deleted successfuly"]);
        }else{
          return response()->json(["message"=>"Unauthorized"],401);
        }
    }

    public function cart_count(){
        $user=Auth::user();
        if($user){
            $count=Cart::where("user_id",$user->id)->sum("quantity");
        return response()->json(["count"=>$count]);
        }else{
        return response()->json(["error"=>"unautorized"],401);

        }
    }
}
