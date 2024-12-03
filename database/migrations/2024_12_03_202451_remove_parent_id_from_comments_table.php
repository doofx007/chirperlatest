<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveParentIdFromCommentsTable extends Migration
{
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['parent_id']);

            // Now drop the parent_id column
            $table->dropColumn('parent_id');
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            // Restore the parent_id column and foreign key
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('comments')->cascadeOnDelete();
        });
    }
}
