<?php

return [
    'error-not-found' => \Admin\Error\NotFoundController::class,
    'home' => \Application\Common\HomeController::class,
    'column_left' => \Application\Common\ColumnLeftController::class,
    'column_right' => \Application\Common\ColumnRightController::class,
    'content_top' => \Application\Common\ContentTopController::class,
    'content_bottom' => \Application\Common\ContentBottomController::class,
    'header' => \Application\Common\HeaderController::class,
    'footer' => \Application\Common\FooterController::class,
    'no-footer' => \Application\Common\NoFooterController::class,
    'menu' => \Application\Common\MenuController::class,
    'search' => \Application\Common\SearchController::class,
    'lang' => \Application\Common\LanguageController::class,
    'extension/analytics/google' => \Application\Extension\Analytics\GoogleController::class,
    'extension/module/banner' => \Application\Extension\Module\SlideshowController::class,
];
