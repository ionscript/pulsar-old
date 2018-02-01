<?php

namespace Admin\Common;

use Ions\Mvc\Service\Pagination;
use Ions\Mvc\Controller;

class FilemanagerController extends Controller
{
    public function indexAction()
    {
        $this->language->load('common/filemanager');

        if ($this->request->hasQuery('filter_name')) {
            $filter_name = rtrim(str_replace('*', '', $this->request->getQuery('filter_name')), '/');
        } else {
            $filter_name = null;
        }

        // Make sure we have the correct directory
        if ($this->request->hasQuery('directory')) {
            $directory = rtrim($this->image->getDirectory() . '/data/' . str_replace('*', '', $this->request->getQuery('directory')), '/');
        } else {
            $directory = $this->image->getDirectory() . '/data';
        }

        if ($this->request->hasQuery('page')) {
            $page = $this->request->getQuery('page');
        } else {
            $page = 1;
        }

        $directories = [];
        $files = [];

        $data['images'] = [];

        //if (substr(str_replace('\\', '/', realpath($directory . '/' . $filter_name)), 0, strlen($this->image->getDirectory() . '/data')) == $this->image->getDirectory() . '/data') {

        $directory = realpath($directory . '/' . $filter_name);

        if ($directory) {
            // Get directories
            $directories = glob($directory . '/' . $filter_name . '*', GLOB_ONLYDIR);

            if (!$directories) {
                $directories = [];
            }

            // Get files
            $files = glob($directory . '/' . $filter_name . '*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}', GLOB_BRACE);

            if (!$files) {
                $files = [];
            }
        }

        // Merge directories and files
        $images = array_merge($directories, $files);

        // Get total number of files and directories
        $image_total = count($images);

        // Split the array based on current page number and max number of items per page of 10
        $images = array_splice($images, ($page - 1) * 16, 16);

        foreach ($images as $image) {
            $name = str_split(basename($image), 14);

            if (is_dir($image)) {
                $url = '';

                if ($this->request->hasQuery('target')) {
                    $url .= '&target=' . $this->request->getQuery('target');
                }

                if ($this->request->hasQuery('thumb')) {
                    $url .= '&thumb=' . $this->request->getQuery('thumb');
                }

                $data['images'][] = [
                    'thumb' => '',
                    'name' => implode(' ', $name),
                    'type' => 'directory',
                    'path' => substr($image, strlen($this->image->getDirectory())),
                    'href' => $this->url->link('filemanager', 'token=' . $this->session->get('token') . '&directory=' . urlencode(substr($image, strlen($this->image->getDirectory() . '/data'))) . $url, true)
                ];
            } elseif (is_file($image)) {
                $data['images'][] = [
                    'thumb' => $this->model('tool/image')->resize(substr($image, strlen($this->image->getDirectory())), 100, 100),
                    'name' => implode(' ', $name),
                    'type' => 'image',
                    'path' => substr($image, strlen($this->image->getDirectory())),
                    'href' => $this->url->base('img/' . substr($image, strlen($this->image->getDirectory())))
                ];
            }
        }

        $data['heading_title'] = $this->language->get('heading_title');

        $data['text_no_results'] = $this->language->get('text_no_results');
        $data['text_confirm'] = $this->language->get('text_confirm');

        $data['entry_search'] = $this->language->get('entry_search');
        $data['entry_folder'] = $this->language->get('entry_folder');

        $data['button_parent'] = $this->language->get('button_parent');
        $data['button_refresh'] = $this->language->get('button_refresh');
        $data['button_upload'] = $this->language->get('button_upload');
        $data['button_folder'] = $this->language->get('button_folder');
        $data['button_delete'] = $this->language->get('button_delete');
        $data['button_search'] = $this->language->get('button_search');

        $data['token'] = $this->session->get('token');

        if ($this->request->hasQuery('directory')) {
            $data['directory'] = urlencode($this->request->getQuery('directory'));
        } else {
            $data['directory'] = '';
        }

        if ($this->request->hasQuery('filter_name')) {
            $data['filter_name'] = $this->request->getQuery('filter_name');
        } else {
            $data['filter_name'] = '';
        }

        // Return the target ID for the file manager to set the value
        if ($this->request->hasQuery('target')) {
            $data['target'] = $this->request->getQuery('target');
        } else {
            $data['target'] = '';
        }

        // Return the thumbnail for the file manager to show a thumbnail
        if ($this->request->hasQuery('thumb')) {
            $data['thumb'] = $this->request->getQuery('thumb');
        } else {
            $data['thumb'] = '';
        }

        // Parent
        $url = '';

        if ($this->request->hasQuery('directory')) {
            $pos = strrpos($this->request->getQuery('directory'), '/');

            if ($pos) {
                $url .= '&directory=' . urlencode(substr($this->request->getQuery('directory'), 0, $pos));
            }
        }

        if ($this->request->hasQuery('target')) {
            $url .= '&target=' . $this->request->getQuery('target');
        }

        if ($this->request->hasQuery('thumb')) {
            $url .= '&thumb=' . $this->request->getQuery('thumb');
        }

        $data['parent'] = $this->url->link('filemanager', 'token=' . $this->session->get('token') . $url);

        // Refresh
        $url = '';

        if ($this->request->hasQuery('directory')) {
            $url .= '&directory=' . urlencode($this->request->getQuery('directory'));
        }

        if ($this->request->hasQuery('target')) {
            $url .= '&target=' . $this->request->getQuery('target');
        }

        if ($this->request->hasQuery('thumb')) {
            $url .= '&thumb=' . $this->request->getQuery('thumb');
        }

        $data['refresh'] = $this->url->link('filemanager', 'token=' . $this->session->get('token') . $url);

        $url = '';

        if ($this->request->hasQuery('directory')) {
            $url .= '&directory=' . urlencode(html_entity_decode($this->request->getQuery('directory'), ENT_QUOTES, 'UTF-8'));
        }

        if ($this->request->hasQuery('target')) {
            $url .= '&target=' . $this->request->getQuery('target');
        }

        if ($this->request->hasQuery('thumb')) {
            $url .= '&thumb=' . $this->request->getQuery('thumb');
        }

        $pagination = new Pagination();
        $pagination->total = $image_total;
        $pagination->page = $page;
        $pagination->limit = 16;
        $pagination->url = $this->url->link('filemanager', 'token=' . $this->session->get('token') . $url . '&page={page}');

        $data['pagination'] = $pagination->render();


        $this->response->setContent($this->view('common/filemanager', $data));
    }

    public function uploadAction()
    {
        $this->language->load('common/filemanager');

        $json = [];

        // Check admin has permission
        if (!$this->user->hasPermission('modify', 'admin/common/filemanager')) {
            $json['error'] = $this->language->get('error_permission');
        }

        // Make sure we have the correct directory
        if ($this->request->hasQuery('directory')) {
            $directory = rtrim($this->image->getDirectory() . '/data/' . $this->request->getQuery('directory'), '/');
        } else {
            $directory = $this->image->getDirectory() . '/data';
        }

        // Check its a directory
        if (!is_dir($directory) || substr(str_replace('\\', '/', realpath($directory)), 0, strlen($this->image->getDirectory() . '/data')) != $this->image->getDirectory() . '/data') {
            $json['error'] = $this->language->get('error_directory');
        }

        if (!$json) {
            // Check if multiple files are uploaded or just one
            $files = [];

            if (!empty($this->request->getFiles()['file']['name']) && is_array($this->request->getFiles()['file']['name'])) {
                foreach (array_keys($this->request->getFiles()['file']['name']) as $key) {
                    $files[] = array(
                        'name' => $this->request->getFiles()['file']['name'][$key],
                        'type' => $this->request->getFiles()['file']['type'][$key],
                        'tmp_name' => $this->request->getFiles()['file']['tmp_name'][$key],
                        'error' => $this->request->getFiles()['file']['error'][$key],
                        'size' => $this->request->getFiles()['file']['size'][$key]
                    );
                }
            }

            foreach ($files as $file) {
                if (is_file($file['tmp_name'])) {
                    // Sanitize the filename
                    $filename = basename(html_entity_decode($file['name'], ENT_QUOTES, 'UTF-8'));

                    // Validate the filename length
                    if ((strlen($filename) < 3) || (strlen($filename) > 255)) {
                        $json['error'] = $this->language->get('error_filename');
                    }

                    // Allowed file extension types
                    $allowed = [
                        'jpg',
                        'jpeg',
                        'gif',
                        'png'
                    ];

                    if (!in_array(strtolower(substr(strrchr($filename, '.'), 1)), $allowed)) {
                        $json['error'] = $this->language->get('error_filetype');
                    }

                    // Allowed file mime types
                    $allowed = array(
                        'image/jpeg',
                        'image/pjpeg',
                        'image/png',
                        'image/x-png',
                        'image/gif'
                    );

                    if (!in_array($file['type'], $allowed)) {
                        $json['error'] = $this->language->get('error_filetype');
                    }

                    // Return any upload error
                    if ($file['error'] != UPLOAD_ERR_OK) {
                        $json['error'] = $this->language->get('error_upload_' . $file['error']);
                    }
                } else {
                    $json['error'] = $this->language->get('error_upload');
                }

                if (!$json) {
                    move_uploaded_file($file['tmp_name'], $directory . '/' . $filename);
                }
            }
        }

        if (!$json) {
            $json['success'] = $this->language->get('text_uploaded');
        }

        $this->response->setContent(json_encode($json));
    }

    public function folderAction()
    {
        $this->language->load('common/filemanager');

        $json = [];

        // Check admin has permission
        if (!$this->user->hasPermission('modify', 'admin/common/filemanager')) {
            $json['error'] = $this->language->get('error_permission');
        }

        // Make sure we have the correct directory
        if ($this->request->hasQuery('directory')) {
            $directory = rtrim($this->image->getDirectory() . '/data/' . $this->request->getQuery('directory'), '/');
        } else {
            $directory = $this->image->getDirectory() . '/data';
        }

        // Check its a directory
        if (!is_dir($directory) || substr(str_replace('\\', '/', realpath($directory)), 0, strlen($this->image->getDirectory() . '/data')) != $this->image->getDirectory() . '/data') {
            $json['error'] = $this->language->get('error_directory');
        }

        if ($this->request->isPost()) {
            // Sanitize the folder name
            $folder = basename(html_entity_decode($this->request->getPost('folder'), ENT_QUOTES, 'UTF-8'));

            // Validate the filename length
            if ((strlen($folder) < 3) || (strlen($folder) > 128)) {
                $json['error'] = $this->language->get('error_folder');
            }

            // Check if directory already exists or not
            if (is_dir($directory . '/' . $folder)) {
                $json['error'] = $this->language->get('error_exists');
            }
        }

        if (!isset($json['error'])) {
            mkdir($directory . '/' . $folder, 0777);
            chmod($directory . '/' . $folder, 0777);

            @touch($directory . '/' . $folder . '/' . 'index.html');

            $json['success'] = $this->language->get('text_directory');
        }

        $this->response->setContent(json_encode($json));
    }

    public function deleteAction()
    {
        $this->language->load('common/filemanager');

        $json = [];

        // Check admin has permission
        if (!$this->user->hasPermission('modify', 'admin/common/filemanager')) {
            $json['error'] = $this->language->get('error_permission');
        }

        if ($this->request->hasPost('path')) {
            $paths = $this->request->getPost('path');
        } else {
            $paths = [];
        }

        // Loop through each path to run validations
        foreach ($paths as $path) {
            // Check path exsists
            if ($path == $this->image->getDirectory() . '/data' || substr(str_replace('\\', '/', realpath($this->image->getDirectory() . $path)), 0, strlen($this->image->getDirectory() . '/data')) != $this->image->getDirectory() . '/data') {
                $json['error'] = $this->language->get('error_delete');

                break;
            }
        }

        if (!$json) {
            // Loop through each path
            foreach ($paths as $path) {
                $path = rtrim($this->image->getDirectory() . $path, '/');

                // If path is just a file delete it
                if (is_file($path)) {
                    unlink($path);

                    // If path is a directory beging deleting each file and sub folder
                } elseif (is_dir($path)) {
                    $files = array();

                    // Make path into an array
                    $path = array($path . '*');

                    // While the path array is still populated keep looping through
                    while (count($path) != 0) {
                        $next = array_shift($path);

                        foreach (glob($next) as $file) {
                            // If directory add to path array
                            if (is_dir($file)) {
                                $path[] = $file . '/*';
                            }

                            // Add the file to the files to be deleted array
                            $files[] = $file;
                        }
                    }

                    // Reverse sort the file array
                    rsort($files);

                    foreach ($files as $file) {
                        // If file just delete
                        if (is_file($file)) {
                            unlink($file);

                            // If directory use the remove directory function
                        } elseif (is_dir($file)) {
                            rmdir($file);
                        }
                    }
                }
            }

            $json['success'] = $this->language->get('text_delete');
        }

        $this->response->setContent(json_encode($json));
    }
}
