<?php

namespace Application\Error;

use Ions\Mvc\Controller;

class NotFoundController extends Controller
{
    public function indexAction()
    {
        $data = [];

        $this->language->load('error/not_found');

        $data['text_not_found'] = $this->language->get('text_not_found');
        $data['text_home'] = $this->language->get('text_home');

        $data['home'] = $this->url->link('common/home');

        $this->response->setContent($this->view('error/not_found', $data));
    }
}
