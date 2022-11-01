<?php

use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

/**
 * Create image name.
 * 
 * @return string Image name.
 */
function createImageName($imageBase = null)
{
    $imageName = Str::uuid()->toString() . chr(46);
    $imageName = Str::replace(chr(45), chr(100), $imageName);

    if ($imageBase) {
        $imageName .= $imageBase->getClientOriginalExtension();
    } else {
        $imageName .= chr(106) . chr(112) . chr(103);
    }

    return $imageName;
}

/**
 * Global helpers.
 */
class Helper
{
    /**
     * Create order number.
     * 
     * @param int $preferenceId
     * @return string Order number.
     */
    public static function createOrderNumber($preferenceId)
    {
        return chr(rand(97, 122)) . time() . chr(80) . $preferenceId;
    }

    /**
     * Filter on table.
     * 
     * @param string $search
     * @param array $columns
     * @return array Data.
     */
    public static function filterData($search, $model, $columns)
    {
        $data = [];

        foreach ($columns as $column) {
            $result = $model->where($column, 'like', chr(37) . $search . chr(37))->limit(10)->get();
            $result = json_decode(json_encode($result), true);
            $data = array_merge($data, $result);
        }

        return ['data' => $data];
    }

    /**
     * Save image to storage.
     * 
     * @return string Image name.
     */
    public static function saveImageToStorage($imageBase)
    {
        $storagePath = config('services.storage.path');

        $imageName = createImageName($imageBase);
        $imageFile = Image::make($imageBase);
        $imageFile->resize(500, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        $storagePath = $storagePath . $imageName;
        $imageFile->save($storagePath, 80);

        return $imageName;
    }

    /**
     * Test environment.
     * 
     * @return string Image name.
     */
    public static function randomImageName()
    {
        return createImageName();
    }
}
