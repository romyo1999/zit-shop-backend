<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages=Notification::all()->count();
         return response()->json(["data"=>$messages]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'message'=>["required","integer"]
        ]);

        $notification=Notification::create([
            "message"=>$request->message
        ]);

        // $notification=Notification::create();
        // $notification->message=$request->message;
        // $notification->save();

        return response()->json(["message"=>"ttt successfuly"]);

    }


    public function show(Notification $notification)
    {
        //
    }

 
    public function edit(Notification $notification)
    {
        //
    }


    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy( )
    {
        Notification::query()->delete();
        return response()->json(['message'=>'deleted successfuly']);
    }
}
