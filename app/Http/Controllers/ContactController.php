<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function index()
    {
        $count=Contact::all()->count();
        $messages=Contact::orderBy('created_at', 'desc')->paginate(10);
        return response()->json(["messages"=>$messages,"count"=>$count]);
    }

  
    public function store(Request $request)
    {
        $request->validate([

       
            "full_name" => ['required', 'string', 'max:255','min:3'],
            "email"=> ['required', 'string', 'max:255','min:3'],
            "message" => ['required', 'string', 'max:255','min:3'],

        ]);

        $message=Contact::create([
            "full_name"=>$request->full_name,
            "email"=>$request->email,
            "message"=>$request->message
        ]);
        return response()->json(["message"=>"created successfuly"]);
    }




    public function show(Contact $contact)
    {
        //
    }

 
    public function edit(Contact $contact)
    {
        //
    }

 
    public function update(Request $request, Contact $contact)
    {
        //
    }


    public function destroy($id)
    {
        $message=Contact::find($id);
        if($message){
            
            $message->delete();
        return response()->json(["message"=>"deleted successfuly"]);

        }

    }
}
