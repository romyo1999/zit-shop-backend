<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Stmt\TryCatch;

class ProductController extends Controller
{


    public function index(){
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json(['product' => $products]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'group' => 'required|string',
            'image1' => 'required|image|mimes:jpeg,png,jpg,gif',
            'image2' => 'required|image|mimes:jpeg,png,jpg,gif',
            'category_id' => 'required|numeric',
        ]);

        // Handle image uploads
        $image1Path = $request->file('image1')->store('images','public');
        $image2Path = $request->file('image2')->store('images','public');

        // Create a new product
        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'group' => $request->group,
            'image1' => $image1Path,
            'image2' => $image2Path,
            'category_id' => $request->category_id,
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

  
 public function show($id){
    $product=Product::where("id",$id)->with('category')->get();
    return response()->json(["product"=>$product]);
 }


    public function manage_product(){
        $products = Product::paginate(10); // Adjust the number based on your preference

        return response()->json(['product' => $products]);
    }
 

    public function update( $id)
    {
        $product =Product::find($id);
        if($product){
            return response()->json(['product' => $product],200);
        }else{
            return response()->json(["product not found"=>$product ,"status"=>404]);
        }
    }

  
    public function edit($id,Request $request)
    {
        
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'group' => 'required|string',
            'category_id' => 'required|numeric',
        ]);

        $product=Product::find($id);

        $product->title =$request->title;
        $product->description=$request->description;
        $product->group=$request->group;
        $product->price=$request->price;
        $product->category_id =$request->category_id;
        $product->save();
        return response()->json(['message' => 'Product updated  successfully', 'product' => $product], 201);
    }

  



    public function destroy( $id)
    {
        $product=Product::findOrFail($id);
        try {
            Storage::disk("public")->delete($product->image1);
            Storage::disk("public")->delete($product->image2);
            $product->delete();
            return response()->json(['message' => 'Product and associated images deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete the product and associated images'], 500);
        }
    }



    public function UpdateImage1($id,Request $request){
        // return response()->json(["image"=>$request->file("image1")]);

        $request->validate([
            'image1' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $product =Product::find($id);

        Storage::disk("public")->delete($product->image1);
        $imagpath1=$request->file("image1")->store("images" ,"public");
        $product->image1 =$imagpath1;
        $product->save();
        return response()->json(["image updated"=>$product->image1]);

    }
    public function UpdateImage2($id,Request $request){
        // return response()->json(["image"=>$request->image1]);
        $request->validate([
            'image2' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        try {
            $product =Product::find($id);

            Storage::disk("public")->delete($product->image2);
            $imagpath2=$request->file("image2")->store("images" ,"public");
            $product->image2 =$imagpath2;
            $product->save();
            return response()->json(["image updated"=>$product->image2]);
        }catch(Error){
            return response()->json(["request Error"=>"file is not image"]);
        }

    }


    //product woman 
    public function group($filter){

        $products=Product::where("group" ,$filter)->get();

        return response()->json(["products"=>$products]);
    }



    public function category($filter,$id){

        $category = Category::where('name', $filter)->first();

        if (!$category) {
            $category = Category::find($id);
        }

        $products = $category->products()->get();

        return response()->json(["products"=>$products]);
    }


    public function gorup_category($group,$category_name,$id){

        $category = Category::where('name', $category_name)->first();

        if (!$category) {
            $category = Category::find($id);
        }

        $products = $category->products()->where("group",$group)->get();

        return response()->json(["products"=>$products]);
    }

    











































}
