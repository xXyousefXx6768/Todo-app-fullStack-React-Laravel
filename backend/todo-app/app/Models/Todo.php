<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User; // Import User model




/**
 *
 *
 * @property-read User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Todo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Todo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Todo query()
 * @mixin \Eloquent
 */
class Todo extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = ['title', 'description', 'started_at', 'status', 'completed_at', 'user_id'];




    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
