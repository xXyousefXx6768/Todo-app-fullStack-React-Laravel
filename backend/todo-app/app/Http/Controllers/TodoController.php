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
            'status' => 'required|boolean',
            'completed_at' => 'nullable|date',
            'priority' => 'required|in:low,medium,high'

        ]);

        if ($validate->fails()) {
            return response()->json([
                'errors' => $validate->errors(),
                'request' => $req->all(),
            ], 422);
        }

        $todo = Todo::create($req->only([
            'title', 'description', 'status', 'priority' , 'completed_at', 'user_id',
        ]));

        return response()->json([
            'message' => 'Todo created successfully!',
            'todo' => $todo
        ], 201);
    }
    function update(Request $req, $id): \Illuminate\Http\JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $validate = Validator::make($req->all(), [
            'title' => 'max:100',
            'description' => 'max:255',
            'completed_at' => 'date',
            'status' => 'boolean',
            'priority' => 'in:low,medium,high'

        ]);
        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);

        }
        $todo->update($req->only([
            'title', 'description', 'completed_at', 'status', 'priority'
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
