<?php
namespace Admin\Tool;

use Ions\Mvc\Model;

class ImageModel extends Model
{
    public function resize($filename, $width, $height)
    {
        if (!is_file($this->image->getDirectory() .'/'. $filename)) {
            return null;
        }

        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        $image_old = $filename;
        $image_new = 'cache/' . substr($filename, 0, strrpos($filename, '.')) . '-' . $width . 'x' . $height . '.' . $extension;

        if (!is_file($this->image->getDirectory() .'/'. $image_new) || (filemtime($this->image->getDirectory() .'/'. $image_old) > filemtime($this->image->getDirectory() .'/'. $image_new))) {
            list($width_orig, $height_orig, $image_type) = getimagesize($this->image->getDirectory() .'/'. $image_old);

            if (!in_array($image_type, [IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF])) {
                return $this->image->getDirectory() .'/'. $image_old;
            }

            $path = '';

            $directories = explode('/', dirname($image_new));

            foreach ($directories as $directory) {
                $path = $path . '/' . $directory;

                if (!is_dir($this->image->getDirectory() .'/'. $path)) {
                    @mkdir($this->image->getDirectory() .'/'. $path, 0777);
                }
            }

            if ($width_orig != $width || $height_orig != $height) {
                $this->image->load($image_old);
                $this->image->resize($width, $height);
                $this->image->save($this->image->getDirectory() .'/'. $image_new);
            } else {
                copy($this->image->getDirectory() .'/'. $image_old, $this->image->getDirectory() .'/'. $image_new);
            }
        }

        return 'img/' . $image_new;

    }
}
