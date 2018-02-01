<!-- Footer -->
<footer id="page-footer" class="content-mini content-mini-full font-s12 bg-gray-lighter clearfix">
    <div class="text-center"><?php echo $text_footer; ?><br /><?php echo $text_version; ?></div>
</footer>
<!-- END Footer -->

</div>
<!-- END Page Container -->
<?php foreach ($scripts as $script) { ?>
    <script type="text/javascript" src="<?php echo $script; ?>"></script>
<?php } ?>

<script>
    $(function(){
        App.initHelpers(['summernote']);
        App.initHelpers(['datepicker', 'select2', 'tags-inputs']);
        App.initHelpers(['table-tools']);
        App.initHelpers('magnific-popup');
        App.initHelpers('notify');
        App.initHelpers('draggable-items');
    });
</script>

</body>
</html>
