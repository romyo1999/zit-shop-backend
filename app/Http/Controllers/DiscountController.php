<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $discounts=Discount::paginate(8);
        return response()->json(["message"=>$discounts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_discount($id)
    {
        $discount=Discount::where("code",$id)->exists();
        if($discount){
            $dis=Discount::where("code",$id)->get();
            return response()->json(["discount"=>$dis],200);
        }else{
            return response()->json(["error"=>"code dosent exists"],201);
        }
    }

 
    public function store(Request $request)
    {
        $request->validate([
            "code"=>["required","string"],
            "percentage"=>["required","string"]
        ]);

        $discount=Discount::create([
            "code"=>$request->code,
            "percentage"=>$request->percentage
        ]);
        return response()->json(["message"=>"added successfuly"]);
    }



    public function show($id)
    {
        $discount=Discount::findOrFail($id);
        return response()->json(["discount"=>$discount]);
    }


    public function edit($id ,Request $request)
    {
        $request->validate([
            "code"=>["required","string"],
            "percentage"=>["required","integer"]
        ]);
        $discount=Discount::findOrFail($id);
        $discount->update([
            "code"=>$request->code,
            "percentage"=>$request->percentage
        ]);
        return response()->json(["message"=>"updated successfuly"]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Discount $discount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $discount =Discount::findOrFail($id);

        if($discount){
            $discount->delete();
            return response()->json(["message"=>"deleted successfumy"]);
        }else{
            return response()->json(["Error"=>"discount Not found"]);
        }
    }
}
