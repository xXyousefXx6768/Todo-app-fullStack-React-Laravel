<?php

namespace App\Http\Controllers;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class TodoController extends Controller
{

    function store(Request $req): \Illuminate\Http\JsonResponse
    {
        $validate = Validator::make($req->all(), [
            'title' => 'required|max:100',
            'description' => 'required|max:255',
            'started_at' => 'required|date',
            'status' => 'required|boolean',
            'completed_at' => 'nullable|date',
            'user_id' => 'required|exists:users,id'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $todo = Todo::create($req->only([
            'title', 'description', 'started_at', 'status', 'completed_at', 'user_id'
        ]));

        return response()->json([
            'message' => 'Todo created successfully!',
            'todo' => $todo
        ], 201);
    }
    function update(Request $req, Todo $todo): \Illuminate\Http\JsonResponse
    {
        $validate = Validator::make($req->all(), [
            'title' => 'required|max:100',
            'description' => 'required|max:255',
            'started_at' => 'required|date',
            'status' => 'required|boolean',

        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);

        }
        $todo->update($req->only([
            'title', 'description', 'started_at', 'status'
        ]));
        return response()->json([
            'message' => 'Todo updated successfully!',
            'todo' => $todo
        ] , 200 );
    }
    function find(int $id): \Illuminate\Http\JsonResponse{
        $todo = Todo::find($id);
        if (!$todo){
            return response()->json([
                'message' => 'Todo not found!'

            ],422);
        }
        return response()->json([
            'message' => 'Todo retrieved successfully!',
            'todo' => $todo
        ],200);
    }

    function destroy(int $id): \Illuminate\Http\JsonResponse{
        $res = Todo::find($id)->delete();
        if ($res){
            return response()->json([
                'message' => 'Todo deleted successfully!'
            ],200);
        }else{
            return response()->json([
                'message' => 'Todo not deleted'
            ],422);
        }

    }


}
