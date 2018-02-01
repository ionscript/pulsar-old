// OpenCart common.js
function getURLVar(key) {
    var value = [];

    var query = String(document.location).split('?');

    if (query[1]) {
        var part = query[1].split('&');

        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');

            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }

        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}

$(document).ready(function () {
    //Form Submit for IE Browser
    $('button[type=\'submit\']').on('click', function () {
        $("form[id*='form-']").submit();
    });

    // Highlight any found errors
    $('.text-danger').each(function () {
        var element = $(this).parent().parent();

        if (element.hasClass('form-group')) {
            element.addClass('has-error');
        }
    });

    // Set last page opened on the menu
    $('#menu a[href]').on('click', function () {
        sessionStorage.setItem('menu', $(this).attr('href'));
    });

    if (location.href !== sessionStorage.getItem('menu')) {
        sessionStorage.removeItem('menu');
    }

    if (!sessionStorage.getItem('menu')) {
        $('#menu-dashboard a').addClass('active');
    } else {
        $('#menu a[href=\'' + sessionStorage.getItem('menu') + '\']').addClass('active').parents("li").addClass('open');
    }

    // Image Manager
    $(document).on('click', 'a[data-toggle=\'image\']', function (e) {
        var $element = $(this);
        var $popover = $element.data('bs.popover'); // element has bs popover?

        e.preventDefault();

        // destroy all image popovers
        $('a[data-toggle="image"]').popover('destroy');

        // remove flickering (do not re-add popover when clicking for removal)
        if ($popover) {
            return;
        }

        $element.popover({
            html: true,
            placement: 'right',
            trigger: 'manual',
            content: function () {
                return '<button type="button" id="button-image" class="btn btn-primary"><i class="fa fa-pencil"></i></button> <button type="button" id="button-clear" class="btn btn-danger"><i class="fa fa-trash-o"></i></button>';
            }
        });

        $element.popover('show');

        $('#button-image').on('click', function () {
            var $button = $(this);
            var $icon = $button.find('> i');

            $('#modal-image').remove();

            $.ajax({
                url: '/admin/filemanager?token=' + getURLVar('token') + '&target=' + $element.parent().find('input').attr('id') + '&thumb=' + $element.attr('id'),
                dataType: 'html',
                beforeSend: function () {
                    $button.prop('disabled', true);
                    if ($icon.length) {
                        $icon.attr('class', 'fa fa-circle-o-notch fa-spin');
                    }
                },
                complete: function () {
                    $button.prop('disabled', false);
                    if ($icon.length) {
                        $icon.attr('class', 'fa fa-pencil');
                    }
                },
                success: function (html) {
                    $('body').append('<div id="modal-image" class="modal">' + html + '</div>');

                    $('#modal-image').modal('show');
                }
            });

            $element.popover('destroy');
        });

        $('#button-clear').on('click', function () {
            $element.find('img').attr('src', $element.find('img').attr('data-placeholder'));

            $element.parent().find('input').val('');

            $element.popover('destroy');
        });
    });
});

// Autocomplete */
(function ($) {
    $.fn.autocomplete = function (option) {
        return this.each(function () {
            var $this = $(this);
            var $dropdown = $('<ul class="dropdown-menu" />');

            this.timer = null;
            this.items = [];

            $.extend(this, option);

            $this.attr('autocomplete', 'off');

            // Focus
            $this.on('focus', function () {
                this.request();
            });

            // Blur
            $this.on('blur', function () {
                setTimeout(function (object) {
                    object.hide();
                }, 200, this);
            });

            // Keydown
            $this.on('keydown', function (event) {
                switch (event.keyCode) {
                    case 27: // escape
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });

            // Click
            this.click = function (event) {
                event.preventDefault();

                var value = $(event.target).parent().attr('data-value');

                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            }

            // Show
            this.show = function () {
                var pos = $this.position();

                $dropdown.css({
                    top: pos.top + $this.outerHeight(),
                    left: pos.left
                });

                $dropdown.show();
            }

            // Hide
            this.hide = function () {
                $dropdown.hide();
            }

            // Request
            this.request = function () {
                clearTimeout(this.timer);

                this.timer = setTimeout(function (object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            }

            // Response
            this.response = function (json) {
                var html = '';
                var category = {};
                var name;
                var i = 0, j = 0;

                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        // update element items
                        this.items[json[i]['value']] = json[i];

                        if (!json[i]['category']) {
                            // ungrouped items
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        } else {
                            // grouped items
                            name = json[i]['category'];
                            if (!category[name]) {
                                category[name] = [];
                            }

                            category[name].push(json[i]);
                        }
                    }

                    for (name in category) {
                        html += '<li class="dropdown-header">' + name + '</li>';

                        for (j = 0; j < category[name].length; j++) {
                            html += '<li data-value="' + category[name][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[name][j]['label'] + '</a></li>';
                        }
                    }
                }

                if (html) {
                    this.show();
                } else {
                    this.hide();
                }

                $dropdown.html(html);
            }

            $dropdown.on('click', '> li > a', $.proxy(this.click, this));
            $this.after($dropdown);
        });
    }
})(window.jQuery);


// App
var App = function () {

    var $html,
        $body,
        $page,
        $sidebar,
        $sidebarScroll,
        $header,
        $main,
        $footer;

    var BaseTableDatatables = function() {
        // Init full DataTable, for more examples you can check out https://www.datatables.net/
        var initDataTableFull = function() {
            jQuery('.js-dataTable-full').dataTable({
                columnDefs: [ { orderable: false, targets: [0, -1] } ],
                pageLength: 10,
                lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
            });
        };

        // DataTables Bootstrap integration
        var bsDataTables = function() {
            var $DataTable = jQuery.fn.dataTable;

            // Set the defaults for DataTables init
            jQuery.extend( true, $DataTable.defaults, {
                dom:
                "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                renderer: 'bootstrap',
                oLanguage: {
                    sLengthMenu: "_MENU_",
                    sInfo: "Showing <strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
                    oPaginate: {
                        sPrevious: '<i class="fa fa-angle-left"></i>',
                        sNext: '<i class="fa fa-angle-right"></i>'
                    }
                }
            });

            // Default class modification
            jQuery.extend($DataTable.ext.classes, {
                sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
                sFilterInput: "form-control",
                sLengthSelect: "form-control"
            });

            // Bootstrap paging button renderer
            $DataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
                var api     = new $DataTable.Api(settings);
                var classes = settings.oClasses;
                var lang    = settings.oLanguage.oPaginate;
                var btnDisplay, btnClass;

                var attach = function (container, buttons) {
                    var i, ien, node, button;
                    var clickHandler = function (e) {
                        e.preventDefault();
                        if (!jQuery(e.currentTarget).hasClass('disabled')) {
                            api.page(e.data.action).draw(false);
                        }
                    };

                    for (i = 0, ien = buttons.length; i < ien; i++) {
                        button = buttons[i];

                        if (jQuery.isArray(button)) {
                            attach(container, button);
                        }
                        else {
                            btnDisplay = '';
                            btnClass = '';

                            switch (button) {
                                case 'ellipsis':
                                    btnDisplay = '&hellip;';
                                    btnClass = 'disabled';
                                    break;

                                case 'first':
                                    btnDisplay = lang.sFirst;
                                    btnClass = button + (page > 0 ? '' : ' disabled');
                                    break;

                                case 'previous':
                                    btnDisplay = lang.sPrevious;
                                    btnClass = button + (page > 0 ? '' : ' disabled');
                                    break;

                                case 'next':
                                    btnDisplay = lang.sNext;
                                    btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                    break;

                                case 'last':
                                    btnDisplay = lang.sLast;
                                    btnClass = button + (page < pages - 1 ? '' : ' disabled');
                                    break;

                                default:
                                    btnDisplay = button + 1;
                                    btnClass = page === button ?
                                        'active' : '';
                                    break;
                            }

                            if (btnDisplay) {
                                node = jQuery('<li>', {
                                    'class': classes.sPageButton + ' ' + btnClass,
                                    'aria-controls': settings.sTableId,
                                    'tabindex': settings.iTabIndex,
                                    'id': idx === 0 && typeof button === 'string' ?
                                        settings.sTableId + '_' + button :
                                        null
                                })
                                    .append(jQuery('<a>', {
                                            'href': '#'
                                        })
                                            .html(btnDisplay)
                                    )
                                    .appendTo(container);

                                settings.oApi._fnBindAction(
                                    node, {action: button}, clickHandler
                                );
                            }
                        }
                    }
                };

                attach(
                    jQuery(host).empty().html('<ul class="pagination"/>').children('ul'),
                    buttons
                );
            };

            // TableTools Bootstrap compatibility - Required TableTools 2.1+
            if ($DataTable.TableTools) {
                // Set the classes that TableTools uses to something suitable for Bootstrap
                jQuery.extend(true, $DataTable.TableTools.classes, {
                    "container": "DTTT btn-group",
                    "buttons": {
                        "normal": "btn btn-default",
                        "disabled": "disabled"
                    },
                    "collection": {
                        "container": "DTTT_dropdown dropdown-menu",
                        "buttons": {
                            "normal": "",
                            "disabled": "disabled"
                        }
                    },
                    "print": {
                        "info": "DTTT_print_info"
                    },
                    "select": {
                        "row": "active"
                    }
                });

                // Have the collection use a bootstrap compatible drop down
                jQuery.extend(true, $DataTable.TableTools.DEFAULTS.oTags, {
                    "collection": {
                        "container": "ul",
                        "button": "li",
                        "liner": "a"
                    }
                });
            }
        };

        return {
            init: function() {
                // Init Datatables
                bsDataTables();
                initDataTableFull();
            }
        };
    }();

    jQuery(function(){ BaseTableDatatables.init(); });

    jQuery('.sorting_asc').removeAttr('class');

    var init = function () {
        // Set variables
        $html = jQuery('html');
        $body = jQuery('body');
        $page = jQuery('#page-container');
        $sidebar = jQuery('#sidebar');
        $sidebarScroll = jQuery('#sidebar-scroll');
        $header = jQuery('#header-navbar');
        $main = jQuery('#main-container');
        $footer = jQuery('#page-footer');

        // Initialize Tooltips
        jQuery('[data-toggle="tooltip"], .js-tooltip').tooltip({
            container: 'body',
            animation: false
        });

        // Initialize Popovers
        jQuery('[data-toggle="popover"], .js-popover').popover({
            container: 'body',
            animation: true,
            trigger: 'hover'
        });

        // Initialize Tabs
        jQuery('[data-toggle="tabs"] a, .js-tabs a').click(function (e) {
            e.preventDefault();
            jQuery(this).tab('show');
        });

        // Init form placeholder (for IE9)
        jQuery('.form-control').placeholder();

        jQuery('.js-select').select2();

        // Init Tags Inputs (with .js-tags-input class)
        jQuery('.js-tags-input').tagsInput({
            height: '36px',
            width: '100%',
            defaultText: 'Add tag',
            removeWithBackspace: true,
            delimiter: [',']
        });

        jQuery(".js-swal-confirm").on("click", function () {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this data!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d26a5c",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                html: false
            }, function () {
                document.forms.form.submit();
            });
        })

        // Init draggable items functionality (with .js-draggable-items class)
        jQuery('.js-draggable-items').sortable({
            connectWith: '.draggable-column',
            items: '.draggable-item',
            opacity: .75,
            handle: '.draggable-handler',
            placeholder: 'draggable-placeholder',
            tolerance: 'pointer',
            start: function (e, ui) {
                ui.placeholder.css({
                    'height': ui.item.outerHeight(),
                    'margin-bottom': ui.item.css('margin-bottom')
                });
            }
        });

        jQuery('[data-toggle="scroll-to"]').on('click', function () {
            var $this = jQuery(this);
            var $target = $this.data('target');
            var $speed = $this.data('speed') ? $this.data('speed') : 1000;

            jQuery('html, body').animate({
                scrollTop: jQuery($target).offset().top
            }, $speed);
        });

        // Init datepicker (with .js-datepicker and .input-daterange class)
        jQuery('.js-datepicker').add('.input-daterange').datepicker({
            weekStart: 1,
            autoclose: true,
            todayHighlight: true
        });

        // Init text editor in air mode (inline)
        jQuery('.js-summernote-air').summernote({
            airMode: true
        });

        // Init full text editor

        jQuery('.js-summernote').summernote({
            height: 350,
            minHeight: null,
            maxHeight: null
        });


        jQuery('[data-toggle="class-toggle"]').on('click', function () {
            var $el = jQuery(this);

            jQuery($el.data('target').toString()).toggleClass($el.data('class').toString());

            if ($lHtml.hasClass('no-focus')) {
                $el.blur();
            }
        });
        jQuery('.form-material.floating > .form-control').each(function () {
            var $input = jQuery(this);
            var $parent = $input.parent('.form-material');

            if ($input.val()) {
                $parent.addClass('open');
            }

            $input.on('change', function () {
                if ($input.val()) {
                    $parent.addClass('open');
                } else {
                    $parent.removeClass('open');
                }
            });
        });

        //Table
        var $tableSection = jQuery('.js-table-sections');
        var $tableRows = jQuery('.js-table-sections-header > tr', $tableSection);

        // When a row is clicked in tbody.js-table-sections-header
        $tableRows.click(function (e) {
            var $row = jQuery(this);
            var $tbody = $row.parent('tbody');

            if (!$tbody.hasClass('open')) {
                jQuery('tbody', $tableSection).removeClass('open');
            }

            $tbody.toggleClass('open');
        });




        var $tableCheckable = jQuery('.js-table-checkable');

        // When a checkbox is clicked in thead
        jQuery('thead input:checkbox', $tableCheckable).click(function () {
            var $checkedStatus = jQuery(this).prop('checked');

            // Check or uncheck all checkboxes in tbody
            jQuery('tbody input:checkbox', $tableCheckable).each(function () {
                var $checkbox = jQuery(this);

                $checkbox.prop('checked', $checkedStatus);
                checkRow($checkbox, $checkedStatus);
            });
        });

        // When a checkbox is clicked in tbody
        jQuery('tbody input:checkbox', $tableCheckable).click(function () {
            var $checkbox = jQuery(this);

            checkRow($checkbox, $checkbox.prop('checked'));
        });

        // When a row is clicked in tbody
        jQuery('tbody > tr', $tableCheckable).click(function (e) {
            if (e.target.type !== 'checkbox'
                && e.target.type !== 'button'
                && e.target.tagName.toLowerCase() !== 'a'
                && !jQuery(e.target).parent('label').length) {
                var $checkbox = jQuery('input:checkbox', this);
                var $checkedStatus = $checkbox.prop('checked');

                $checkbox.prop('checked', !$checkedStatus);
                checkRow($checkbox, !$checkedStatus);
            }
        });


        // When a submenu link is clicked
        jQuery('[data-toggle="nav-submenu"]').on('click', function (e) {
            // Stop default behaviour
            e.stopPropagation();

            // Get link
            var $link = jQuery(this);

            // Get link's parent
            var $parentLi = $link.parent('li');

            if ($parentLi.hasClass('open')) { // If submenu is open, close it..
                $parentLi.removeClass('open');
            } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
                $link
                    .closest('ul')
                    .find('> li')
                    .removeClass('open');

                $parentLi
                    .addClass('open');
            }

            // Remove focus from submenu link
            if ($lHtml.hasClass('no-focus')) {
                $link.blur();
            }
        });


        // Resizes #main-container min height (push footer to the bottom)
        var $resizeTimeout;

        if ($main.length) {
            main();

            jQuery(window).on('resize orientationchange', function () {
                clearTimeout($resizeTimeout);

                $resizeTimeout = setTimeout(function () {
                    main();
                }, 150);
            });
        }

        // Init sidebar and side overlay custom scrolling
        //uiHandleScroll('init');

        // Init transparent header functionality (solid on scroll - used in frontend)
        if ($page.hasClass('header-navbar-fixed') && $page.hasClass('header-navbar-transparent')) {
            jQuery(window).on('scroll', function () {
                if (jQuery(this).scrollTop() > 20) {
                    $page.addClass('header-navbar-scroll');
                } else {
                    $page.removeClass('header-navbar-scroll');
                }
            });
        }

        // Call layout API on button click
        jQuery('[data-toggle="layout"]').on('click', function () {
            var $btn = jQuery(this);

            layout($btn.data('action'));

            if ($lHtml.hasClass('no-focus')) {
                $btn.blur();
            }
        });




    };

    var main = function () {
        var $window = jQuery(window).height();
        var $headerHeight = $header.outerHeight();
        var $footerHeight = $footer.outerHeight();

        if ($page.hasClass('header-navbar-fixed')) {
            $main.css('min-height', $window - $footerHeight);
        } else {
            $main.css('min-height', $window - ($headerHeight + $footerHeight));
        }
    };

    var layout = function ($mode) {
        var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // Mode selection
        switch ($mode) {
            case 'sidebar_pos_toggle':
                $page.toggleClass('sidebar-l sidebar-r');
                break;
            case 'sidebar_pos_left':
                $page
                    .removeClass('sidebar-r')
                    .addClass('sidebar-l');
                break;
            case 'sidebar_pos_right':
                $page
                    .removeClass('sidebar-l')
                    .addClass('sidebar-r');
                break;
            case 'sidebar_toggle':
                if ($width > 991) {
                    $page.toggleClass('sidebar-o');
                } else {
                    $page.toggleClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_open':
                if ($width > 991) {
                    $page.addClass('sidebar-o');
                } else {
                    $page.addClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_close':
                if ($width > 991) {
                    $page.removeClass('sidebar-o');
                } else {
                    $page.removeClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_mini_toggle':
                if ($width > 991) {
                    $page.toggleClass('sidebar-mini');
                }
                break;
            case 'sidebar_mini_on':
                if ($width > 991) {
                    $page.addClass('sidebar-mini');
                }
                break;
            case 'sidebar_mini_off':
                if ($width > 991) {
                    $page.removeClass('sidebar-mini');
                }
                break;
            case 'side_overlay_toggle':
                $page.toggleClass('side-overlay-o');
                break;
            case 'side_overlay_open':
                $page.addClass('side-overlay-o');
                break;
            case 'side_overlay_close':
                $page.removeClass('side-overlay-o');
                break;
            case 'side_overlay_hoverable_toggle':
                $page.toggleClass('side-overlay-hover');
                break;
            case 'side_overlay_hoverable_on':
                $page.addClass('side-overlay-hover');
                break;
            case 'side_overlay_hoverable_off':
                $page.removeClass('side-overlay-hover');
                break;
            case 'header_fixed_toggle':
                $page.toggleClass('header-navbar-fixed');
                break;
            case 'header_fixed_on':
                $page.addClass('header-navbar-fixed');
                break;
            case 'header_fixed_off':
                $page.removeClass('header-navbar-fixed');
                break;
            default:
                return false;
        }
    };

    var checkRow = function ($checkbox, $checkedStatus) {
        if ($checkedStatus) {
            $checkbox
                .closest('input')
                .addClass('active');
        } else {
            $checkbox
                .closest('input')
                .removeClass('active');
        }
    };

    var theme = function () {
        var $cssTheme = jQuery('#css-theme');

        // Set the active color theme link as active
        jQuery('[data-toggle="theme"][data-theme="' + ($cssTheme.length ? $cssTheme.attr('href') : 'default') + '"]')
            .parent('li')
            .addClass('active');

        // When a color theme link is clicked
        jQuery('[data-toggle="theme"]').on('click', function () {
            var $this = jQuery(this);
            var $theme = $this.data('theme');

            // Set this color theme link as active
            jQuery('[data-toggle="theme"]')
                .parent('li')
                .removeClass('active');

            jQuery('[data-toggle="theme"][data-theme="' + $theme + '"]')
                .parent('li')
                .addClass('active');

            // Update color theme
            if ($theme === 'default') {
                if ($cssTheme.length) {
                    $cssTheme.remove();
                }
            } else {
                if ($cssTheme.length) {
                    $cssTheme.attr('href', $theme);
                } else {
                    jQuery('#css-main')
                        .after('<link rel="stylesheet" id="css-theme" href="' + $theme + '">');
                }
            }

            $cssTheme = jQuery('#css-theme');
        });
    };

    return {
        init: function ($mode) {
            // Init all vital functions
            init();
            main();
            theme();
            layout($mode);
        }
    };
}();

// Initialize app when page loads
jQuery(function () {
    App.init();
});
