<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\FavoritController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Models\Category;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post("/register", [RegisteredUserController::class, 'store'])
                ->middleware('guest')
                ->name('register');
                
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
->middleware('guest')
->name('login');

Route::middleware(['auth:sanctum'])->group( function () {
    Route::get('/dashboard', function(){
    return Response()->json([
        "messageyou loged in"
    ]);
});
});

Route::post("/category/create" ,[CategoryController::class ,'store']);
Route::get("/category" ,[CategoryController::class ,"index"]);
Route::delete("/category/{id}" ,[CategoryController::class ,"destroy"]);
Route::get("/category/{id}" ,[CategoryController::class ,"update"]);
Route::patch("/category/{id}" ,[CategoryController::class ,"edit"]);
Route::get("/categories_list" ,[CategoryController::class ,"list"]);



Route::get("/products" ,[ProductController::class ,'index']);
Route::get("/products/show/{id}" ,[ProductController::class ,'show']);
Route::post("/product/create" ,[ProductController::class ,'store']);
Route::get("/products/manage" ,[ProductController::class ,'manage_product']);
Route::get("/products/{id}" ,[ProductController::class ,'update']);
Route::delete("/product/{id}" ,[ProductController::class ,'destroy']);
Route::patch("/product/{id}" ,[ProductController::class ,'edit']);
Route::post("/product/image1/{id}" ,[ProductController::class ,'UpdateImage1']);
Route::post("/product/image2/{id}" ,[ProductController::class ,'UpdateImage2']);


Route::get("/users/search" ,[UserController::class ,'search']);
Route::get("/users" ,[UserController::class ,'index']);
Route::patch("/users/{id}" ,[UserController::class ,'update_role']);
Route::delete("/users/{id}" ,[UserController::class ,'destroy']);
Route::get("/user/profile" ,[UserController::class ,'update']);
Route::post("/user/profile/image/{id}" ,[UserController::class ,'edit_image']);
Route::put("/user/profile/{id}" ,[UserController::class ,'edit']);
Route::get("/user/auth" ,[UserController::class ,'ckeck_auth']);
Route::get("/user/logout" ,[UserController::class ,'logout']);
Route::put("/user/address/{id}" ,[UserController::class ,'update_address']);




Route::get("/products/group/{filter}" ,[ProductController::class ,'group']);
Route::get("/products/category/{filter}/{id}" ,[ProductController::class ,'category']);
Route::get("/products/group/{group}/category/{category_name}/id/{id}" ,[ProductController::class ,'gorup_category']);



Route::get("/favorites/show" ,[FavoritController::class ,'items']);
Route::get("/favorites" ,[FavoritController::class ,'index']);
Route::post("/favorites/{id}" ,[FavoritController::class ,'store']);
Route::delete("/favorites/{id}" ,[FavoritController::class ,'destroy']);
Route::get("/likes" ,[FavoritController::class ,'likes']);




Route::post("/contact" ,[ContactController::class ,'store']);
Route::get("/contact" ,[ContactController::class ,'index']);
Route::delete("/contact/{id}" ,[ContactController::class ,'destroy']);



Route::post("/notification" ,[NotificationController::class ,'store']);
Route::get("/notification" ,[NotificationController::class ,'index']);
Route::delete("/notification" ,[NotificationController::class ,'destroy']);



Route::get("/cart" ,[CartController::class ,'index']);
Route::post("/cart/{id}" ,[CartController::class ,'store']);
Route::put("/cart/{id}" ,[CartController::class ,'update']);
Route::delete("/cart/{id}" ,[CartController::class ,'destroy']);
Route::post("/cart/add/{id}" ,[CartController::class ,'add_edit']);
Route::post("/cart/delete/{id}" ,[CartController::class ,'delete_edit']);
Route::get("/cart/count" ,[CartController::class ,'cart_count']);
Route::get("/cart/all" ,[CartController::class ,'allCarts']);




Route::get("/discount" ,[DiscountController::class ,'index']);
Route::put("/discount/{id}" ,[DiscountController::class ,'edit']);
Route::delete("/discount/{id}" ,[DiscountController::class ,'destroy']);
Route::post("/discount" ,[DiscountController::class ,'store']);
Route::get("/discount/{id}" ,[DiscountController::class ,'get_discount']);
Route::get("/discount/update/{id}" ,[DiscountController::class ,'show']);

