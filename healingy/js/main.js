/**
  * headerSticky
  * headerChangeBg
  * retinaLogos
  * changeValue
  * chooseState
  * fillDate
  * action_click
  * selectPayment
  * totalPriceVariant
  * tabs
  * btnCloseCartShop
  * footer
  * topbar
  * ajaxContactForm
  * ajaxSubscribe.eventLoad
  * goTop
  * preloader
**/

(function ($) {
    ("use strict");

    // headerFixed
    var headerSticky = function () {
        let didScroll;
        let lastScrollTop = 0;
        let delta = 5;
        let navbarHeight = $("header").outerHeight();
        const section = $("header").get(0);
        const rect = section.getBoundingClientRect();

        $(window).scroll(function (event) {
            if ($(this).scrollTop() >= navbarHeight + rect.top) {
                didScroll = true;
                $("header").addClass("scrollHeader");
            } else {
                setInterval(function () {
                    if ($(this).scrollTop() <= rect.top) {
                        $("header").css("top", "unset");
                        $("header").removeClass("scrollHeader");
                    }
                }, 250);
            }
        });

        setInterval(function () {
            if (didScroll) {
                let st = $(this).scrollTop();
                // Make scroll more than delta
                if (Math.abs(lastScrollTop - st) <= delta) {
                    return;
                }
                // If scrolled down and past the navbar, add class .nav-up.
                if (st > lastScrollTop && st > navbarHeight) {
                    // Scroll Down
                    $("header").css("top", `-${navbarHeight}px`);
                } else {
                    // Scroll Up
                    if (st + $(window).height() < $(document).height()) {
                        $("header").css("top", "0px");
                    }
                }
                lastScrollTop = st;
                didScroll = false;
            }
        }, 250);
    };

    // headerChangeBg
    var headerChangeBg = function () {
        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 50) {
                $("header.header-style-absolute").addClass("header-bg");
            } else {
                $("header.header-style-absolute").removeClass("header-bg");
            }
        });
    };

    // retinaLogos
    var retinaLogos = function () {
        var retina = window.devicePixelRatio > 1 ? true : false;
        if (retina) {
            var tfheader = $("#logo_header").data("retina");
            $("#logo_header").attr({ src: tfheader, width: 192, height: 40 });

            var tffooter = $("#logo_footer").data("retina");
            $("#logo_footer").attr({ src: tffooter, width: 192, height: 40 });
        }
    };

    //changeValue
    var changeValue = function () {
        if ($(".tf-dropdown-sort").length > 0) {
            $(".select-item").click(function (event) {
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".text-sort-value")
                    .text($(this).find(".text-value-item").text());
                $(this)
                    .closest(".dropdown-menu")
                    .find(".select-item.active")
                    .removeClass("active");
                $(this).addClass("active");
            });
        }
    };

    // chooseState
    var chooseState = function () {
        if ($(".select-custom").length > 0) {
            $("#country").on("change", function () {
                const provincesData = $(this)
                    .find(":selected")
                    .data("provinces");
                const $stateSelect = $("#state");
                $stateSelect
                    .empty()
                    .append('<option value="">Choose State/Province</option>');
                if (provincesData && provincesData.length > 0) {
                    const provinces = JSON.parse(
                        provincesData.replace(/'/g, '"')
                    );
                    provinces.forEach(function (province) {
                        $stateSelect.append(
                            `<option value="${province[0]}">${province[1]}</option>`
                        );
                    });
                }
            });
        }
    };

    //fillDate
    var fillDate = function () {
        $("#dateInput").on("input", function () {
            let value = $(this).val();
            value = value.replace(/\D/g, "");
            if (value.length > 2) {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
            const month = parseInt(value.slice(0, 2));
            if (month > 12) {
                value = "12" + value.slice(2);
            } else if (month === 0) {
                value = "01" + value.slice(2);
            }
            $(this).val(value);
        });
        $("#dateInput").on("blur", function () {
            let value = $(this).val();
            if (value.length === 4 && value.includes("/")) {
                value = "0" + value;
            }
            if (value.length === 1) {
                value = "0" + value + "/";
            }
            if (value.length === 3 && !value.includes("/")) {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
            $(this).val(value);
        });
    };

    // action_click
    var action_click = function () {
        $(".tf-action-btns").on("click", function () {
            $(this).toggleClass("active");
        });
    };

    // selectPayment
    var selectPayment = function () {
        $(".check-payment").on("click", function () {
            var $this = $(this);
            var $accordionItem = $this.closest(".payment-option");
            var index = $accordionItem.index();
            $(".payment-option").removeClass("active");
            $accordionItem.addClass("active");
            $(".accordion-collapse").each(function (i) {
                var collapse = new bootstrap.Collapse(this, { toggle: false });
                if (i === index) {
                    collapse.show();
                } else {
                    collapse.hide();
                }
            });
        });
        $("creditCard-1").prop("checked", true);
        $(".payment-option").first().addClass("active");
    };

    // totalPriceVariant
    var totalPriceVariant = function () {
        var basePrice =
            parseFloat($(".price-on-sale").data("base-price")) ||
            parseFloat($(".price-on-sale").text().replace("$", ""));
        var quantityInput = $(".quantity-product");

        $(".color-btn, .size-btn").on("click", function () {
            var newPrice = parseFloat($(this).data("price")) || basePrice;
            quantityInput.val(1);
            $(".price-on-sale").text(
                "$" + newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
            var totalPrice = newPrice;
            $(".total-price").text(
                "$" +
                    totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
        });

        $(".btn-decrease").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest(".wg-quantity").find("input");
            var value = parseInt($input.val());

            if (value > 1) {
                value = value - 1;
            }
            $input.val(value);
            updateTotalPrice();
        });

        $(".btn-increase").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest(".wg-quantity").find("input");
            var value = parseInt($input.val());

            if (value > 0) {
                value = value + 1;
            }
            $input.val(value);
            updateTotalPrice();
        });

        function updateTotalPrice() {
            var currentPrice = parseFloat(
                $(".price-on-sale").text().replace("$", "")
            );
            var quantity = parseInt(quantityInput.val());
            var totalPrice = currentPrice * quantity;
            $(".total-price").text(
                "$" +
                    totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
        }
    };

    //tabs
    var tabs = function () {
        $(".widget-tabs").each(function () {
            $(this).find(".widget-content-tab").children().hide();
            $(this).find(".widget-content-tab").children(".active").show();
            $(this)
                .find(".widget-menu-tab")
                .children(".item-title")
                .on("click", function () {
                    var liActive = $(this).index();
                    var contentActive = $(this)
                        .siblings()
                        .removeClass("active")
                        .parents(".widget-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                    contentActive.addClass("active").fadeIn("slow");
                    contentActive.siblings().removeClass("active");
                    $(this)
                        .addClass("active")
                        .parents(".widget-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive)
                        .siblings()
                        .hide();
                });
        });
    };

    // btnCloseCartShop
    var btnCloseCartShop = function () {
        $(".cart-item-remove .icon").on("click", function () {
            $(this).closest(".shop-cart-inner >li").hide();
        });
    };

    // footer
    var footer = function () {
        function checkScreenSize() {
            if (window.matchMedia("(max-width: 767px)").matches) {
                $(".tf-collapse-content").css("display", "none");
            } else {
                $(".footer-menu-list").siblings().removeClass("open");
                $(".tf-collapse-content").css("display", "unset");
            }
        }
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        var args = { duration: 250 };
        $(".title-mobile").on("click", function () {
            $(this).parent(".footer-col-block").toggleClass("open");
            if (!$(this).parent(".footer-col-block").is(".open")) {
                $(this).next().slideUp(args);
            } else {
                $(this).next().slideDown(args);
            }
        });
    };

    // topbar
    var topbar = function () {
        $(".btn-show-top").on("click", function () {
            $(this).closest(".tf-top-bar").toggleClass("active");
        });
    };

    // ajaxContactForm
    var ajaxContactForm = function () {
        $("#contactform,#commentform").each(function () {
            $(this).validate({
                submitHandler: function (form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $("<div />", { class: "loading" });

                    $.ajax({
                        type: "POST",
                        url: $form.attr("action"),
                        data: str,
                        beforeSend: function () {
                            $form.find(".send-wrap").append(loading);
                        },
                        success: function (msg) {
                            var result, cls;
                            if (msg === "Success") {
                                result =
                                    "Message Sent Successfully To Email Administrator";
                                cls = "msg-success";
                            } else {
                                result = "Error sending email.";
                                cls = "msg-error";
                            }

                            $form.prepend(
                                $("<div />", {
                                    class: "flat-alert mb-20 " + cls,
                                    text: result,
                                }).append(
                                    $(
                                        '<a class="close mt-0" href="#"><i class="icon-close"></i></a>'
                                    )
                                )
                            );

                            $form.find(":input").not(".submit").val("");
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find(".loading").remove();
                        },
                    });
                },
            });
        }); // each contactform
    };

    // ajaxSubscribe
    var ajaxSubscribe = {
        obj: {
            subscribeEmail: $("#subscribe-email"),
            subscribeButton: $("#subscribe-button"),
            subscribeMsg: $("#subscribe-msg"),
            subscribeContent: $("#subscribe-content"),
            dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
            success_message:
                '<div class="notification_ok">Thank you for joining our mailing list!</div>',
            failure_message:
                '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError: '<div class="notification_error">{msg}</div>',
            noticeInfo: '<div class="notification_error">{msg}</div>',
            basicAction: "mail/subscribe.php",
            mailChimpAction: "mail/subscribe-mailchimp.php",
        },

        eventLoad: function () {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on("click", function () {
                if (window.ajaxCalling) return;
                var isMailchimp = objUse.dataMailchimp === "true";
                ajaxSubscribe.ajaxCall(objUse.basicAction);
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html("").hide();
            $.ajax({
                url: action,
                type: "POST",
                dataType: "json",
                data: {
                    subscribeEmail: objUse.subscribeEmail.val(),
                },
                success: function (responseData, textStatus, jqXHR) {
                    if (responseData.status) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(
                                    objUse.noticeError.replace(
                                        "{msg}",
                                        "Error! <strong>Email is required.</strong>"
                                    )
                                );
                                break;
                            case "email-err":
                                messageDiv.html(
                                    objUse.noticeError.replace(
                                        "{msg}",
                                        "Error! <strong>Email invalid.</strong>"
                                    )
                                );
                                break;
                            case "duplicate":
                                messageDiv.html(
                                    objUse.noticeError.replace(
                                        "{msg}",
                                        "Error! <strong>Email is duplicate.</strong>"
                                    )
                                );
                                break;
                            case "filewrite":
                                messageDiv.html(
                                    objUse.noticeInfo.replace(
                                        "{msg}",
                                        "Error! <strong>Mail list file is open.</strong>"
                                    )
                                );
                                break;
                            case "undefined":
                                messageDiv.html(
                                    objUse.noticeInfo.replace(
                                        "{msg}",
                                        "Error! <strong>undefined error.</strong>"
                                    )
                                );
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(
                                    500,
                                    function () {
                                        messageDiv.html(objUse.failure_message);
                                    }
                                );
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Connection error");
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                },
            });
        },
    };

    //goTop
    var goTop = function () {
        if ($("div").hasClass("progress-wrap")) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition =
                progressPath.style.WebkitTransition = "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition =
                progressPath.style.WebkitTransition =
                    "stroke-dashoffset 10ms linear";
            var updateprogress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateprogress();
            $(window).scroll(updateprogress);
            var offset = 200;
            var duration = 0;
            jQuery(window).on("scroll", function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({ scrollTop: 0 }, duration);
                return false;
            });
        }
    };

    // preloader
    var preloader = function () {
        $("#loading").fadeOut("slow", function () {
            $(this).remove();
        });
    };

    // Dom Ready
    $(function () {
        headerSticky();
        headerChangeBg();
        retinaLogos();
        changeValue();
        chooseState();
        fillDate();
        action_click();
        selectPayment();
        totalPriceVariant();
        tabs();
        btnCloseCartShop();
        footer();
        topbar();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        goTop();
        preloader();
    });
})(jQuery);
