<?php echo $header; ?>
<!-- Main Container -->
<main id="main-container">
    <div class="content bg-gray-lighter">
        <div class="row items-push">
            <div class="col-sm-7">
                <h1 class="page-heading">
                    <?php echo $heading_title; ?>
                    <small><?php echo $text_list; ?></small>
                </h1>
            </div>
            <div class="col-sm-5 text-right hidden-xs">
                <ol class="breadcrumb push-10-t">
                    <?php foreach ($breadcrumbs as $breadcrumb) { ?>
                        <?php if ($breadcrumb['href']) { ?>
                            <li><a class="link-effect"
                                   href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
                        <?php } else { ?>
                            <li><?php echo $breadcrumb['text']; ?></li>
                        <?php } ?>
                    <?php } ?>
                </ol>
            </div>
        </div>
    </div>
    <div class="content content-boxed">
        <?php if($success) { ?>
            <div class="alert alert-success alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <p><?php echo $success; ?></p>
            </div>
        <?php } ?>
        <div class="row">
            <div class="col-xs-6 col-sm-4">
                <a class="block block-link-hover3 text-center"
                   href="<?php echo $add; ?>">
                    <div class="block-content block-content-full">
                        <div class="h1 font-w700 text-success"><i class="fa fa-plus"></i></div>
                    </div>
                    <div class="block-content block-content-full block-content-mini bg-gray-lighter text-success font-w600">
                        <?php echo $button_add; ?>
                    </div>
                </a>
            </div>
            <div class="col-xs-6 col-sm-4">
                <a class="block block-link-hover3 text-center" href="javascript:void(0)">
                    <div class="block-content block-content-full">
                        <div class="h1 font-w700" data-toggle="countTo" data-to="<?php echo $total; ?>"><?php echo $total; ?></div>
                    </div>
                    <div class="block-content block-content-full block-content-mini bg-gray-lighter text-muted font-w600">All Categories
                    </div>
                </a>
            </div>
            <div class="col-xs-6 col-sm-4">
                <a class="block block-link-hover3 text-center js-swal-confirm">
                    <div class="block-content block-content-full">
                        <div class="h1 font-w700 text-danger"><i class="fa fa-times"></i></div>
                    </div>
                    <div class="block-content block-content-full block-content-mini bg-gray-lighter text-danger font-w600">
                        <?php echo $button_delete; ?>
                    </div>
                </a>
            </div>
        </div>
        <div class="block">
            <div class="block-header bg-gray-lighter">
                <ul class="block-options">
                    <li>
                        <button type="button" data-toggle="block-option" data-action="refresh_toggle" data-action-mode="demo"><i class="icon-refresh"></i></button>
                    </li>
                    <li>
                        <button type="button" data-toggle="block-option" data-action="fullscreen_toggle"><i class="icon-size-fullscreen"></i></button>
                    </li>
                </ul>
                <div class="block-title text-normal">
                    <?php echo $text_list; ?>
                </div>
            </div>
            <div class="block-content">
                <form id="form" enctype="multipart/form-data" method="post" action="<?php echo $delete; ?>">
                <table class="table table-bordered table-hover table-striped js-dataTable-full js-table-checkable">
                    <thead>
                    <tr>
                        <th id="selected" class="text-center" style="width: 5%;">
                            <label class="css-input css-checkbox css-checkbox-primary remove-margin-t remove-margin-b">
                                <input type="checkbox" id="check-all" name="check-all"><span></span>
                            </label>
                        </th>
                        <th class="text-center" style="width: 10%;"><?php echo $column_image; ?></th>
                        <th><?php echo $column_name; ?></th>
                        <th class="hidden-xs text-center" style="width: 10%;"><?php echo $column_status; ?></th>
                        <th class="text-center" style="width: 15%;"><?php echo $column_action; ?></th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php if($categories) { ?>
                        <?php foreach ($categories as $category) { ?>
                            <tr>
                                <td class="text-center text-middle">
                                    <label class="css-input css-checkbox css-checkbox-primary">
                                        <input type="checkbox" name="selected[]"
                                               value="<?php echo $category['id']; ?>">
                                        <span></span>
                                    </label>
                                </td>
                                <td><img class="" src="<?php echo $category['image']; ?>" alt=""></td>
                                <td class="font-w600 text-middle"><?php echo $category['path']; ?></td>
                                <td class="hidden-xs text-center text-middle">
                                    <span class="label label-<?php echo $category['status'] ? 'success' : 'danger'; ?>"><?php echo $category['status'] ? 'enabled' : 'disabled'; ?></span>
                                </td>
                                <td class="text-center text-middle">
                                    <div class="btn-group">
                                        <a href="<?php echo $edit; ?>&id=<?php echo $category['id']; ?>"
                                           data-toggle="tooltip"
                                           title="<?php echo $button_edit; ?>"
                                           class="btn btn-sm btn-default">
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                    </div>
                                    <div class="btn-group">
                                        <a href="<?php echo $delete; ?>&id=<?php echo $category['id']; ?>"
                                           onclick="return false"
                                           data-toggle="tooltip"
                                           title="<?php echo $button_delete; ?>"
                                           class="btn btn-sm btn-default js-swal-confirm">
                                            <i class="fa fa-close"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php } ?>
                        <?php } else { ?>
                            <tr>
                                <td class="text-center" colspan="8"><?php echo $text_no_results; ?></td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
                </form>
                <hr>
                <div class="row">
                    <div class="dataTables_wrapper">
                        <div class="col-sm-6">
                            <div class="dataTables_info">
                                <?php echo $results; ?>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="dataTables_paginate">
                                <?php echo $pagination; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
</main>
<!-- END Main Container -->
<?php echo $footer; ?>
<script>
    jQuery(function () {
        App.initHelpers(['appear', 'appear-countTo']);
    });
</script>