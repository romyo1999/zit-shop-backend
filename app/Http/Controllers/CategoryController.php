<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function store(request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name',
            'feature' => 'required|string|max:1000',
            'size' => 'required|string|max:1000',

            // Add other validation rules for your fields
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $category=Category::create([
            "name"=>$request->name,
            "feature"=>$request->feature,
            "size"=>$request->size
        ]);
        return response()->json(['success' => true, 'category' => $category], 201);   
     }


        public function index(){
            $categories = Category::orderBy('created_at', 'desc')->paginate(6);

            return response()->json(['categories' => $categories], 200);
        }

        public function update($id){
            $category = Category::find($id);
            if($category){
                return response(["category"=>$category],200);
            }else{
                return response(["Error"=>"category not found ","status"=>404]);
            }
        }

        public function edit(request $request,$id){
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|',
                'feature' => 'required|string|max:1000',
                'size' => 'required|string|max:1000',
    
                // Add other validation rules for your fields
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $category=Category::find($id);
            
            if($category){
                $category->update([
                    "name"=>$request->name,
                    "feature"=>$request->feature,
                    "size"=>$request->size
                ]);
                return response()->json(['success' => true, 'category' => $category], 201);   
            }
         }

    public function destroy($id){
        $category =Category::find($id);

        if($category){
            $category->delete();
            return response(["message"=>"deleted succsefliy "]);
        }else{
            $category->delete();
            return response(["message"=>"category not found "]);
        }
    }

    
    public function list(){
        $categories = Category::select("id","name")->get();
        return response()->json(['categories' => $categories], 200);
    }

}
