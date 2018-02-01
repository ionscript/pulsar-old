<?php

namespace Admin\Common;

use Ions\Mvc\Controller;

class FooterController extends Controller
{
    public function indexAction()
    {
        $data = [];

        $this->language->load('common/footer');

        $data['text_version'] = sprintf($this->language->get('text_version'), \Admin\App::VERSION);

        $data['scripts'] = $this->document->getScripts('footer');

        $this->document->addScript('vendor/jquery/dist/jquery.js', 'footer');
        $this->document->addScript('vendor/jquery-ui/jquery-ui.js', 'footer');
        $this->document->addScript('vendor/bootstrap/dist/js/bootstrap.js', 'footer');
        $this->document->addScript('vendor/jquery.placeholder/jquery.placeholder.js', 'footer');
        $this->document->addScript('vendor/jquery-validation/dist/jquery.validate.min.js', 'footer');
        $this->document->addScript('vendor/datatables/media/js/jquery.dataTables.js', 'footer');
        $this->document->addScript('vendor/jquery.tagsinput/src/jquery.tagsinput.js', 'footer');
        $this->document->addScript('vendor/select2/dist/js/select2.js', 'footer');
        $this->document->addScript('vendor/summernote/dist/summernote.js', 'footer');
        $this->document->addScript('vendor/bootstrap-maxlength/src/bootstrap-maxlength.js', 'footer');
        $this->document->addScript('vendor/bootstrap-notify/js/bootstrap-notify.js', 'footer');
        $this->document->addScript('vendor/magnific-popup/dist/jquery.magnific-popup.js', 'footer');
        $this->document->addScript('vendor/sweetalert/dist/sweetalert.min.js', 'footer');
        $this->document->addScript('vendor/js-cookie/src/js.cookie.js', 'footer');
        $this->document->addScript('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js', 'footer');

        $this->document->addScript('js/admin.app.js', 'footer');
        $this->document->addScript('js/summernote.js', 'footer');

        $data['scripts'] = $this->document->getScripts('footer');

        return $this->view('common/footer', $data);
    }
}
