<?php echo $header; ?>
    <!-- Main Container -->
    <main id="main-container">
        <!-- Hero Content -->
        <div class="bg-video" data-vide-bg="img/videos/hero_tech" data-vide-options="posterType: jpg">
            <div style="height: 1110px;" class="bg-primary-dark-op">
                <section class="content content-full content-boxed">
                    <!-- Section Content -->
                    <div class="text-center push-300-t visibility-hidden" data-toggle="appear" data-class="animated fadeIn">
                        <a class="fa-2x text-white" href="<?php echo $home; ?>">
                            <i class="fa fa-diamond text-primary push-5-r"></i><?php echo $name; ?>
                        </a>
                    </div>
                    <div class="push-100-t push-30 text-center">
                        <h1 class="h2 font-w700 text-white push-20 visibility-hidden" data-toggle="appear" data-class="animated fadeInDown">Build your Backend and Frontend with one super flexible framework.</h1>
                        <h2 class="h4 text-white-op visibility-hidden" data-toggle="appear" data-timeout="750" data-class="animated fadeIn"><em>Trusted by thousands of web developers and web agencies all over the world.</em></h2>
                        <div class="push-50-t push-20 text-center">
                            <a class="btn btn-rounded btn-noborder btn-lg btn-primary push-5 visibility-hidden" data-toggle="appear" data-class="animated fadeInRight" href="http://demo.ionscript.com">
                                <i class="fa fa-desktop push-10-r"></i><?php echo $button_demo; ?>
                            </a>
                            <a class="btn btn-rounded btn-noborder btn-lg btn-success push-10-r push-5 visibility-hidden" data-toggle="appear" data-class="animated fadeInLeft" href="http://github.com/ionscript/pulsar">
                                <i class="fa fa-download push-10-r"></i><?php echo $button_download; ?>
                            </a>
                        </div>
                    </div>
                </section>
                <section class="content content-full push-300-t"></section>
            </div>
        </div>
        <!-- END Hero Content -->
        <?php echo $content_top; ?>
        <?php echo $content_bottom; ?>

    </main>
    <!-- END Main Container -->
<?php echo $footer; ?>
