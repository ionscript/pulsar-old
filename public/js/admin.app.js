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

    // Tooltip remove fixed
    $(document).on('click', '[data-toggle=\'tooltip\']', function (e) {
        $('body > .tooltip').remove();
    });

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

    // tooltips on hover
    $('[data-toggle=\'tooltip\']').tooltip({container: 'body', html: true});

    // Makes tooltips work on ajax generated content
    $(document).ajaxStop(function () {
        $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
    });

    // https://github.com/opencart/opencart/issues/2595
    $.event.special.remove = {
        remove: function (o) {
            if (o.handler) {
                o.handler.apply(this, arguments);
            }
        }
    }

    $('[data-toggle=\'tooltip\']').on('remove', function () {
        $(this).tooltip('destroy');
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








var App = function () {
    // Helper variables - set in uiInit()
    var $lHtml, $lBody, $lPage, $lSidebar, $lSidebarScroll, $lSideOverlay, $lSideOverlayScroll, $lHeader, $lMain,
        $lFooter;


    var BaseUIActivity = function () {
        // Randomize progress bars values
        var barsRandomize = function () {
            jQuery('.js-bar-randomize').on('click', function () {
                jQuery(this)
                    .parents('.block')
                    .find('.progress-bar')
                    .each(function () {
                        var $this = jQuery(this);
                        var $random = Math.floor((Math.random() * 91) + 10) + '%';

                        $this.css('width', $random);

                        if (!$this.parent().hasClass('progress-mini')) {
                            $this.html($random);
                        }
                    });
            });
        };

        var SweetAlert = function () {
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
        };

        return {
            init: function () {
                // Init randomize bar values
                barsRandomize();
                SweetAlert();
            }
        };
    }();

    jQuery(function () {
        BaseUIActivity.init();
    });

    var BaseFormValidation = function() {
        // Init Bootstrap Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
        var initValidationBootstrap = function(){
            jQuery('.js-validation-bootstrap').validate({
                errorClass: 'help-block animated fadeInDown',
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    jQuery(e).parents('.form-group > div').append(error);
                },
                highlight: function(e) {
                    jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                    jQuery(e).closest('.help-block').remove();
                },
                success: function(e) {
                    jQuery(e).closest('.form-group').removeClass('has-error');
                    jQuery(e).closest('.help-block').remove();
                },
                rules: {
                    'val-username': {
                        required: true,
                        minlength: 3
                    },
                    'val-email': {
                        required: true,
                        email: true
                    },
                    'val-password': {
                        required: true,
                        minlength: 5
                    },
                    'val-confirm-password': {
                        required: true,
                        equalTo: '#val-password'
                    },
                    'val-suggestions': {
                        required: true,
                        minlength: 5
                    },
                    'val-skill': {
                        required: true
                    },
                    'val-website': {
                        required: true,
                        url: true
                    },
                    'val-digits': {
                        required: true,
                        digits: true
                    },
                    'val-number': {
                        required: true,
                        number: true
                    },
                    'val-range': {
                        required: true,
                        range: [1, 5]
                    },
                    'val-terms': {
                        required: true
                    }
                },
                messages: {
                    'val-username': {
                        required: 'Please enter a username',
                        minlength: 'Your username must consist of at least 3 characters'
                    },
                    'val-email': 'Please enter a valid email address',
                    'val-password': {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long'
                    },
                    'val-confirm-password': {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long',
                        equalTo: 'Please enter the same password as above'
                    },
                    'val-suggestions': 'What can we do to become better?',
                    'val-skill': 'Please select a skill!',
                    'val-website': 'Please enter your website!',
                    'val-digits': 'Please enter only digits!',
                    'val-number': 'Please enter a number!',
                    'val-range': 'Please enter a number between 1 and 5!',
                    'val-terms': 'You must agree to the service terms!'
                }
            });
        };

        // Init Material Forms Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
        var initValidationMaterial = function(){
            jQuery('.js-validation-material').validate({
                errorClass: 'help-block text-right animated fadeInDown',
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    jQuery(e).parents('.form-group .form-material').append(error);
                },
                highlight: function(e) {
                    jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                    jQuery(e).closest('.help-block').remove();
                },
                success: function(e) {
                    jQuery(e).closest('.form-group').removeClass('has-error');
                    jQuery(e).closest('.help-block').remove();
                },
                rules: {
                    'val-username2': {
                        required: true,
                        minlength: 3
                    },
                    'val-email2': {
                        required: true,
                        email: true
                    },
                    'val-password2': {
                        required: true,
                        minlength: 5
                    },
                    'val-confirm-password2': {
                        required: true,
                        equalTo: '#val-password2'
                    },
                    'val-suggestions2': {
                        required: true,
                        minlength: 5
                    },
                    'val-skill2': {
                        required: true
                    },
                    'val-website2': {
                        required: true,
                        url: true
                    },
                    'val-digits2': {
                        required: true,
                        digits: true
                    },
                    'val-number2': {
                        required: true,
                        number: true
                    },
                    'val-range2': {
                        required: true,
                        range: [1, 5]
                    },
                    'val-terms2': {
                        required: true
                    }
                },
                messages: {
                    'val-username2': {
                        required: 'Please enter a username',
                        minlength: 'Your username must consist of at least 3 characters'
                    },
                    'val-email2': 'Please enter a valid email address',
                    'val-password2': {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long'
                    },
                    'val-confirm-password2': {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long',
                        equalTo: 'Please enter the same password as above'
                    },
                    'val-suggestions2': 'What can we do to become better?',
                    'val-skill2': 'Please select a skill!',
                    'val-website2': 'Please enter your website!',
                    'val-digits2': 'Please enter only digits!',
                    'val-number2': 'Please enter a number!',
                    'val-range2': 'Please enter a number between 1 and 5!',
                    'val-terms2': 'You must agree to the service terms!'
                }
            });
        };

        return {
            init: function () {
                // Init Bootstrap Forms Validation
                initValidationBootstrap();

                // Init Meterial Forms Validation
                initValidationMaterial();
            }
        };
    }();

    jQuery(function(){ BaseFormValidation.init(); });

    var BasePagesLogin = function() {

        var initValidationLogin = function(){
            jQuery('.js-validation-login').validate({
                errorClass: 'help-block text-right animated fadeInDown',
                errorElement: 'div',
                errorPlacement: function(error, e) {
                    jQuery(e).parents('.form-group .form-material').append(error);
                },
                highlight: function(e) {
                    jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                    jQuery(e).closest('.help-block').remove();
                },
                success: function(e) {
                    jQuery(e).closest('.form-group').removeClass('has-error');
                    jQuery(e).closest('.help-block').remove();
                },
                rules: {
                    'username': {
                        required: true,
                        minlength: 3
                    },
                    'password': {
                        required: true,
                        minlength: 4
                    }
                },
                messages: {
                    'username': {
                        required: 'Please enter a username',
                        minlength: 'Your username must consist of at least 3 characters'
                    },
                    'password': {
                        required: 'Please provide a password',
                        minlength: 'Your password must be at least 5 characters long'
                    }
                }
            });
        };

        return {
            init: function () {
                // Init Login Form Validation
                initValidationLogin();
            }
        };
    }();

    jQuery(function(){ BasePagesLogin.init(); });

    var BaseTableDatatables = function() {
        // Init full DataTable, for more examples you can check out https://www.datatables.net/
        var initDataTableFull = function() {
            jQuery('.js-dataTable-full').dataTable({
                columnDefs: [ { orderable: false, targets: [0, -1] } ],
                pageLength: 10,
                lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
            });
        };

        // Init simple DataTable, for more examples you can check out https://www.datatables.net/
        var initDataTableSimple = function() {
            jQuery('.js-dataTable-simple').dataTable({
                columnDefs: [ { orderable: false, targets: [ 4 ] } ],
                pageLength: 10,
                lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
                searching: false,
                oLanguage: {
                    sLengthMenu: ""
                },
                dom:
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-6'i><'col-sm-6'p>>"
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
                initDataTableSimple();
                initDataTableFull();
            }
        };
    }();

    jQuery(function(){ BaseTableDatatables.init(); });

    var FormValidation = function () {
        r = function () {
            jQuery(".js-validation-material").validate({
                ignore: [],
                errorClass: "help-block text-right animated fadeInDown",
                errorElement: "div",
                errorPlacement: function (e, r) {
                    jQuery(r).parents(".form-group > div").append(e)
                },
                highlight: function (e) {
                    var r = jQuery(e);
                    r.closest(".form-group").removeClass("has-error").addClass("has-error"), r.closest(".help-block").remove()
                },
                success: function (e) {
                    var r = jQuery(e);
                    r.closest(".form-group").removeClass("has-error"), r.closest(".help-block").remove()
                },
                rules: {
                    "username": {required: !0, minlength: 3},
                    "val-email2": {required: !0, email: !0},
                    "val-password2": {required: !0, minlength: 5},
                    "val-confirm-password2": {required: !0, equalTo: "#val-password2"},
                    "val-select22": {required: !0},
                    "val-select2-multiple2": {required: !0, minlength: 2},
                    "val-suggestions2": {required: !0, minlength: 5},
                    "val-skill2": {required: !0},
                    "val-currency2": {required: !0, currency: ["$", !0]},
                    "val-website2": {required: !0, url: !0},
                    "val-phoneus2": {required: !0, phoneUS: !0},
                    "val-digits2": {required: !0, digits: !0},
                    "val-number2": {required: !0, number: !0},
                    "val-range2": {required: !0, range: [1, 5]},
                    "val-terms2": {required: !0}
                },
                messages: {
                    "username": {
                        required: "Please enter a username",
                        minlength: "Your username must consist of at least 3 characters"
                    },
                    "val-email2": "Please enter a valid email address",
                    "val-password2": {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    "val-confirm-password2": {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long",
                        equalTo: "Please enter the same password as above"
                    },
                    "val-select22": "Please select a value!",
                    "val-select2-multiple2": "Please select at least 2 values!",
                    "val-suggestions2": "What can we do to become better?",
                    "val-skill2": "Please select a skill!",
                    "val-currency2": "Please enter a price!",
                    "val-website2": "Please enter your website!",
                    "val-phoneus2": "Please enter a US phone!",
                    "val-digits2": "Please enter only digits!",
                    "val-number2": "Please enter a number!",
                    "val-range2": "Please enter a number between 1 and 5!",
                    "val-terms2": "You must agree to the service terms!"
                }
            })
        };
        return {
            init: function () {
                r(), jQuery(".js-select2").on("change", function () {
                    jQuery(this).valid()
                })
            }
        }
    }();

    jQuery(function () {
        FormValidation.init()
    });

    jQuery('.sorting_asc').removeAttr('class');


    var uiHelperSummernote = function () {
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
    };

    var uiHelperDatepicker = function () {
        // Init datepicker (with .js-datepicker and .input-daterange class)
        jQuery('.js-datepicker').add('.input-daterange').datepicker({
            weekStart: 1,
            autoclose: true,
            todayHighlight: true
        });
    };

    var uiHelperTagsInputs = function () {
        // Init Tags Inputs (with .js-tags-input class)
        jQuery('.js-tags-input').tagsInput({
            height: '36px',
            width: '100%',
            defaultText: 'Add tag',
            removeWithBackspace: true,
            delimiter: [',']
        });
    };

    var uiToggleClass = function () {
        jQuery('[data-toggle="class-toggle"]').on('click', function () {
            var $el = jQuery(this);

            jQuery($el.data('target').toString()).toggleClass($el.data('class').toString());

            if ($lHtml.hasClass('no-focus')) {
                $el.blur();
            }
        });
    };

    var uiHelperDraggableItems = function () {
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
    };

    var uiNav = function () {
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
    };

    var uiHelperSelect2 = function () {
        // Init Select2 (with .js-select2 class)
        jQuery('.js-select2').select2();
    };

    var uiHelperNotify = function () {
        // Init notifications (with .js-notify class)
        jQuery('.js-notify').on('click', function () {
            var $notify = jQuery(this);
            var $notifyMsg = $notify.data('notify-message');
            var $notifyType = $notify.data('notify-type') ? $notify.data('notify-type') : 'info';
            var $notifyFrom = $notify.data('notify-from') ? $notify.data('notify-from') : 'top';
            var $notifyAlign = $notify.data('notify-align') ? $notify.data('notify-align') : 'right';
            var $notifyIcon = $notify.data('notify-icon') ? $notify.data('notify-icon') : '';
            var $notifyUrl = $notify.data('notify-url') ? $notify.data('notify-url') : '';

            jQuery.notify({
                    icon: $notifyIcon,
                    message: $notifyMsg,
                    url: $notifyUrl
                },
                {
                    element: 'body',
                    type: $notifyType,
                    allow_dismiss: true,
                    newest_on_top: true,
                    showProgressbar: false,
                    placement: {
                        from: $notifyFrom,
                        align: $notifyAlign
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeIn',
                        exit: 'animated fadeOutDown'
                    }
                });
        });
    };

    var uiMaxlength = function () {
        jQuery(".js-maxlength").each(function () {
            var a = jQuery(this);
            a.maxlength({
                alwaysShow: !!a.data("always-show"),
                threshold: a.data("threshold") ? a.data("threshold") : 10,
                warningClass: a.data("warning-class") ? a.data("warning-class") : "label label-warning",
                limitReachedClass: a.data("limit-reached-class") ? a.data("limit-reached-class") : "label label-danger",
                placement: a.data("placement") ? a.data("placement") : "bottom",
                preText: a.data("pre-text") ? a.data("pre-text") : "",
                separator: a.data("separator") ? a.data("separator") : "/",
                postText: a.data("post-text") ? a.data("post-text") : ""
            })
        })
    };

    var uiInit = function () {
        // Set variables
        $lHtml = jQuery('html');
        $lBody = jQuery('body');
        $lPage = jQuery('#page-container');
        $lSidebar = jQuery('#sidebar');
        $lSidebarScroll = jQuery('#sidebar-scroll');
        $lSideOverlay = jQuery('#side-overlay');
        $lSideOverlayScroll = jQuery('#side-overlay-scroll');
        $lHeader = jQuery('#header-navbar');
        $lMain = jQuery('#main-container');
        $lFooter = jQuery('#page-footer');

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
    };

    var uiLayout = function () {
        // Resizes #main-container min height (push footer to the bottom)
        var $resizeTimeout;

        if ($lMain.length) {
            uiHandleMain();

            jQuery(window).on('resize orientationchange', function () {
                clearTimeout($resizeTimeout);

                $resizeTimeout = setTimeout(function () {
                    uiHandleMain();
                }, 150);
            });
        }

        // Init sidebar and side overlay custom scrolling
        //uiHandleScroll('init');

        // Init transparent header functionality (solid on scroll - used in frontend)
        if ($lPage.hasClass('header-navbar-fixed') && $lPage.hasClass('header-navbar-transparent')) {
            jQuery(window).on('scroll', function () {
                if (jQuery(this).scrollTop() > 20) {
                    $lPage.addClass('header-navbar-scroll');
                } else {
                    $lPage.removeClass('header-navbar-scroll');
                }
            });
        }

        // Call layout API on button click
        jQuery('[data-toggle="layout"]').on('click', function () {
            var $btn = jQuery(this);

            uiLayoutApi($btn.data('action'));

            if ($lHtml.hasClass('no-focus')) {
                $btn.blur();
            }
        });
    };

    var uiHandleMain = function () {
        var $hWindow = jQuery(window).height();
        var $hHeader = $lHeader.outerHeight();
        var $hFooter = $lFooter.outerHeight();

        if ($lPage.hasClass('header-navbar-fixed')) {
            $lMain.css('min-height', $hWindow - $hFooter);
        } else {
            $lMain.css('min-height', $hWindow - ($hHeader + $hFooter));
        }
    };

    var uiLayoutApi = function ($mode) {
        var $windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // Mode selection
        switch ($mode) {
            case 'sidebar_pos_toggle':
                $lPage.toggleClass('sidebar-l sidebar-r');
                break;
            case 'sidebar_pos_left':
                $lPage
                    .removeClass('sidebar-r')
                    .addClass('sidebar-l');
                break;
            case 'sidebar_pos_right':
                $lPage
                    .removeClass('sidebar-l')
                    .addClass('sidebar-r');
                break;
            case 'sidebar_toggle':
                if ($windowW > 991) {
                    $lPage.toggleClass('sidebar-o');
                } else {
                    $lPage.toggleClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_open':
                if ($windowW > 991) {
                    $lPage.addClass('sidebar-o');
                } else {
                    $lPage.addClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_close':
                if ($windowW > 991) {
                    $lPage.removeClass('sidebar-o');
                } else {
                    $lPage.removeClass('sidebar-o-xs');
                }
                break;
            case 'sidebar_mini_toggle':
                if ($windowW > 991) {
                    $lPage.toggleClass('sidebar-mini');
                }
                break;
            case 'sidebar_mini_on':
                if ($windowW > 991) {
                    $lPage.addClass('sidebar-mini');
                }
                break;
            case 'sidebar_mini_off':
                if ($windowW > 991) {
                    $lPage.removeClass('sidebar-mini');
                }
                break;
            case 'side_overlay_toggle':
                $lPage.toggleClass('side-overlay-o');
                break;
            case 'side_overlay_open':
                $lPage.addClass('side-overlay-o');
                break;
            case 'side_overlay_close':
                $lPage.removeClass('side-overlay-o');
                break;
            case 'side_overlay_hoverable_toggle':
                $lPage.toggleClass('side-overlay-hover');
                break;
            case 'side_overlay_hoverable_on':
                $lPage.addClass('side-overlay-hover');
                break;
            case 'side_overlay_hoverable_off':
                $lPage.removeClass('side-overlay-hover');
                break;
            case 'header_fixed_toggle':
                $lPage.toggleClass('header-navbar-fixed');
                break;
            case 'header_fixed_on':
                $lPage.addClass('header-navbar-fixed');
                break;
            case 'header_fixed_off':
                $lPage.removeClass('header-navbar-fixed');
                break;
            default:
                return false;
        }
    };

    var uiBlocks = function () {
        // Init default icons fullscreen and content toggle buttons
        uiBlocksApi(false, 'init');

        // Call blocks API on option button click
        jQuery('[data-toggle="block-option"]').on('click', function () {
            uiBlocksApi(jQuery(this).parents('.block'), jQuery(this).data('action'));
        });
    };

    var uiBlocksApi = function ($block, $mode) {
        // Set default icons for fullscreen and content toggle buttons
        var $iconFullscreen = 'si si-size-fullscreen';
        var $iconFullscreenActive = 'si si-size-actual';
        var $iconContent = 'si si-arrow-up';
        var $iconContentActive = 'si si-arrow-down';

        if ($mode === 'init') {
            // Auto add the default toggle icons to fullscreen and content toggle buttons
            jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]').each(function () {
                var $this = jQuery(this);

                $this.html('<i class="' + (jQuery(this).closest('.block').hasClass('block-opt-fullscreen') ? $iconFullscreenActive : $iconFullscreen) + '"></i>');
            });

            jQuery('[data-toggle="block-option"][data-action="content_toggle"]').each(function () {
                var $this = jQuery(this);

                $this.html('<i class="' + ($this.closest('.block').hasClass('block-opt-hidden') ? $iconContentActive : $iconContent) + '"></i>');
            });
        } else {
            // Get block element
            var $elBlock = ($block instanceof jQuery) ? $block : jQuery($block);

            // If element exists, procceed with blocks functionality
            if ($elBlock.length) {
                // Get block option buttons if exist (need them to update their icons)
                var $btnFullscreen = jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]', $elBlock);
                var $btnToggle = jQuery('[data-toggle="block-option"][data-action="content_toggle"]', $elBlock);

                // Mode selection
                switch ($mode) {
                    case 'fullscreen_toggle':
                        $elBlock.toggleClass('block-opt-fullscreen');

                        // Enable/disable scroll lock to block
                        $elBlock.hasClass('block-opt-fullscreen') ? jQuery($elBlock).scrollLock() : jQuery($elBlock).scrollLock('off');

                        // Update block option icon
                        if ($btnFullscreen.length) {
                            if ($elBlock.hasClass('block-opt-fullscreen')) {
                                jQuery('i', $btnFullscreen)
                                    .removeClass($iconFullscreen)
                                    .addClass($iconFullscreenActive);
                            } else {
                                jQuery('i', $btnFullscreen)
                                    .removeClass($iconFullscreenActive)
                                    .addClass($iconFullscreen);
                            }
                        }
                        break;
                    case 'fullscreen_on':
                        $elBlock.addClass('block-opt-fullscreen');

                        // Enable scroll lock to block
                        jQuery($elBlock).scrollLock();

                        // Update block option icon
                        if ($btnFullscreen.length) {
                            jQuery('i', $btnFullscreen)
                                .removeClass($iconFullscreen)
                                .addClass($iconFullscreenActive);
                        }
                        break;
                    case 'fullscreen_off':
                        $elBlock.removeClass('block-opt-fullscreen');

                        // Disable scroll lock to block
                        jQuery($elBlock).scrollLock('off');

                        // Update block option icon
                        if ($btnFullscreen.length) {
                            jQuery('i', $btnFullscreen)
                                .removeClass($iconFullscreenActive)
                                .addClass($iconFullscreen);
                        }
                        break;
                    case 'content_toggle':
                        $elBlock.toggleClass('block-opt-hidden');

                        // Update block option icon
                        if ($btnToggle.length) {
                            if ($elBlock.hasClass('block-opt-hidden')) {
                                jQuery('i', $btnToggle)
                                    .removeClass($iconContent)
                                    .addClass($iconContentActive);
                            } else {
                                jQuery('i', $btnToggle)
                                    .removeClass($iconContentActive)
                                    .addClass($iconContent);
                            }
                        }
                        break;
                    case 'content_hide':
                        $elBlock.addClass('block-opt-hidden');

                        // Update block option icon
                        if ($btnToggle.length) {
                            jQuery('i', $btnToggle)
                                .removeClass($iconContent)
                                .addClass($iconContentActive);
                        }
                        break;
                    case 'content_show':
                        $elBlock.removeClass('block-opt-hidden');

                        // Update block option icon
                        if ($btnToggle.length) {
                            jQuery('i', $btnToggle)
                                .removeClass($iconContentActive)
                                .addClass($iconContent);
                        }
                        break;
                    case 'refresh_toggle':
                        $elBlock.toggleClass('block-opt-refresh');

                        // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
                        if (jQuery('[data-toggle="block-option"][data-action="refresh_toggle"][data-action-mode="demo"]', $elBlock).length) {
                            setTimeout(function () {
                                $elBlock.removeClass('block-opt-refresh');
                            }, 2000);
                        }
                        break;
                    case 'state_loading':
                        $elBlock.addClass('block-opt-refresh');
                        break;
                    case 'state_normal':
                        $elBlock.removeClass('block-opt-refresh');
                        break;
                    case 'close':
                        $elBlock.hide();
                        break;
                    case 'open':
                        $elBlock.show();
                        break;
                    default:
                        return false;
                }
            }
        }
    };

    var uiHelperPrint = function () {
        // Store all #page-container classes
        var $pageCls = $lPage.prop('class');

        // Remove all classes from #page-container
        $lPage.prop('class', '');

        // Print the page
        window.print();

        // Restore all #page-container classes
        $lPage.prop('class', $pageCls);
    };

    var uiHelperTableToolsSections = function () {
        var $table = jQuery('.js-table-sections');
        var $tableRows = jQuery('.js-table-sections-header > tr', $table);

        // When a row is clicked in tbody.js-table-sections-header
        $tableRows.click(function (e) {
            var $row = jQuery(this);
            var $tbody = $row.parent('tbody');

            if (!$tbody.hasClass('open')) {
                jQuery('tbody', $table).removeClass('open');
            }

            $tbody.toggleClass('open');
        });
    };

    var uiHelperTableToolsCheckable = function () {
        var $table = jQuery('.js-table-checkable');

        // When a checkbox is clicked in thead
        jQuery('thead input:checkbox', $table).click(function () {
            var $checkedStatus = jQuery(this).prop('checked');

            // Check or uncheck all checkboxes in tbody
            jQuery('tbody input:checkbox', $table).each(function () {
                var $checkbox = jQuery(this);

                $checkbox.prop('checked', $checkedStatus);
                uiHelperTableToolscheckRow($checkbox, $checkedStatus);
            });
        });

        // When a checkbox is clicked in tbody
        jQuery('tbody input:checkbox', $table).click(function () {
            var $checkbox = jQuery(this);

            uiHelperTableToolscheckRow($checkbox, $checkbox.prop('checked'));
        });

        // When a row is clicked in tbody
        jQuery('tbody > tr', $table).click(function (e) {
            if (e.target.type !== 'checkbox'
                && e.target.type !== 'button'
                && e.target.tagName.toLowerCase() !== 'a'
                && !jQuery(e.target).parent('label').length) {
                var $checkbox = jQuery('input:checkbox', this);
                var $checkedStatus = $checkbox.prop('checked');

                $checkbox.prop('checked', !$checkedStatus);
                uiHelperTableToolscheckRow($checkbox, !$checkedStatus);
            }
        });
    };

    var uiHelperTableToolscheckRow = function ($checkbox, $checkedStatus) {
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

    var uiHelperMagnific = function () {
        // Simple Gallery init
        jQuery('.js-gallery').each(function () {
            jQuery(this).magnificPopup({
                delegate: 'a.img-link',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });

        // Advanced Gallery init
        jQuery('.js-gallery-advanced').each(function () {
            jQuery(this).magnificPopup({
                delegate: 'a.img-lightbox',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    };

    var uiForms = function () {
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
    };

    var uiHandleTheme = function () {
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

    var uiScrollTo = function () {
        jQuery('[data-toggle="scroll-to"]').on('click', function () {
            var $this = jQuery(this);
            var $target = $this.data('target');
            var $speed = $this.data('speed') ? $this.data('speed') : 1000;

            jQuery('html, body').animate({
                scrollTop: jQuery($target).offset().top
            }, $speed);
        });
    };


    return {
        init: function () {
            // Init all vital functions
            uiInit();
            uiLayout();
            uiNav();
            uiBlocks();
            uiForms();
            uiHandleTheme();
            uiToggleClass();
            uiScrollTo();
            uiMaxlength();
        },
        layout: function ($mode) {
            uiLayoutApi($mode);
        },
        blocks: function ($block, $mode) {
            uiBlocksApi($block, $mode);
        },
        initHelper: function ($helper) {
            switch ($helper) {
                case 'print-page':
                    uiHelperPrint();
                    break;
                case 'table-tools':
                    uiHelperTableToolsSections();
                    uiHelperTableToolsCheckable();
                    break;
                case 'magnific-popup':
                    uiHelperMagnific();
                    break;
                case 'summernote':
                    uiHelperSummernote();
                    break;
                case 'datepicker':
                    uiHelperDatepicker();
                    break;
                case 'tags-inputs':
                    uiHelperTagsInputs();
                    break;
                case 'select2':
                    uiHelperSelect2();
                    break;
                case 'notify':
                    uiHelperNotify();
                    break;
                case 'draggable-items':
                    uiHelperDraggableItems();
                    break;
                default:
                    return false;
            }
        },
        initHelpers: function ($helpers) {
            if ($helpers instanceof Array) {
                for (var $index in $helpers) {
                    App.initHelper($helpers[$index]);
                }
            } else {
                App.initHelper($helpers);
            }
        }
    };
}();

// Initialize app when page loads
jQuery(function () {
    App.init();
});
