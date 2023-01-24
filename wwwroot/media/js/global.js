// Global vars
var resizeWidth = $.getViewport('get','width'),
    resizeHeight = $.getViewport('get','height'),
    smController = false,
    $body = $('body'),
    isDemo = $body.hasClass('demo'),
    pageHeadTimeline,
    $templateName,
    $containerScroll = $('#container-scroll'),
    $isotope;

// On window load
$(window).on('load',function() {
    $.ready.then(function(){
        if(!isDemo) $containerScroll.mixSmSc();
        templates_render('load');
     });
});

// On document ready
$(document).ready(function() {
    // On ready functions
    templates_render('ready');
    
    // On window resize
    var resizeWidth = $.getViewport('get','width');
    $(window).on('resize',function() {
        setTimeoutClear('resizeTimeout',function(){
            resizeHeight = $.getViewport('get','height')
            if(resizeWidth!=$.getViewport('set','width'))
            {
                templates_render('resize');
                resizeWidth = $.getViewport('get','width');
            }
        },50); 
    });
});

// Functions 
    // Templates render
    function templates_render(eventType)
    {   
        $templateName = $('.template_container').attr('data-templatename');
        template_global(eventType)
        
        switch($templateName){
            case 'home':
                template_home(eventType);
            break;
            case 'medical_center':
                template_medical_center(eventType);
            break;
            case 'careers':
                template_careers(eventType);
            break;
            case 'experts_doctors':
                template_experts_doctors(eventType);
            break;
            case 'queue_reserve':
                template_queue_reserve(eventType);
            break;
            case 'order_surgery':
                template_order_surgery(eventType);
            break;
        }
    }
    
    // Template global
    function template_global(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':
        
            // Set viewport
            $.getViewport();
            
            // Scroll to anchor
            $.scrollToAnchor({baseOffset:0});
            
            // Mixel WCAG
            mixelWcag.render();
            
            // Header UX
            headerUX.render();
            
            // ScrollMagic
            scrollMagicAnimations();
            
            // Mix slider
            if($('.mix_slider').length > 0)
                $('.mix_slider').mixSlider();
                
            // Video Background
            if($('.video_bg').length > 0)
                $('.video_bg').videoBg();
                
            // Flickity Carousel
            if($('.carousel').length > 0)
            {
                // Run flickity carousel
                $.getScriptRun(includeScriptsUrlPath+'flickity.pkgd.min.js');
            }

            // On click go up
            $('.go_up').on('click',function(e){
                e.preventDefault();
                gsap.to(window, {duration:0.5,scrollTo:{y:0,autoKill:false}, ease: 'power3.inOut'});
            })
            
            // Set page head timeline
            pageHeadAnimations();
            
            // // On click outside all widgets
            // $(document).on('click tap', function(e) {
            //     //var $this = $(e.target);
            //     // if(!$this.closest('#toggleMenu').length && !$this.closest('#mega_menu').length && $body.hasClass('active-nav'))
            //     //     $body.removeClass('active-nav');
            // });

            // Custom scrollbars
            if($('.cselect').length > 0)
                $('.cselect').customSelect();
            
            // Custom scrollbars
            if($('.scrollbar-inner').length > 0)
            {
                $.getScriptRun(includeScriptsUrlPath+'jquery.scrollbar.min.js',function(){
                    $('.scrollbar-inner').scrollbar({ignoreMobile:true});
                });
            }
            
            // List slice
            if($('.list_slice').length > 0)
            {
                $('.list_slice').listSlice({
                    afterLoad: function(){
                        $containerScroll.mixSmSc('resize');
                    }
                });
            }

            // Lightbox
            if($('#lightbox').length > 0)
            {  
                $('#lightbox').lightbox();
            }

            // Play video
            if($('.mix_video').length > 0)
            {
                $('.mix_video').mixVideoYT();
            }

            // Input file
            if($('.input_file').length > 0)
            {
                $('.input_file').on('change','input[type="file"]',function(){
                    var filename = $(this).val().split('\\').pop(),
                        filename = filename!='' ? filename : '<span class="text_file">צירוף קובץ קורות חיים</span>';
                    $(this).parent().find('.filename').html(filename);
                })
            }

            // Masked inputs
            if($('.masked').length > 0)
            {
                $.getScriptRun(includeScriptsUrlPath+'jquery.mask.min.js',function(){
                    var $masked_cellphone = $('.masked_cellphone'), 
                    $masked_phone = $('.masked_phone'),
                    $masked_id = $('.masked_id'),
                    $masked_creditcard = $('.masked_creditcard'),
                    $masked_cvv = $('.masked_cvv'),
                    $masked_creditdate = $('.masked_creditdate'),
                    $masked_creditdatemy = $('.masked_creditdatemy'),
                    $masked_numhouse = $('.masked_numhouse'),
                    $masked_date = $('.masked_date'),
                    $masked_time = $('.masked_time');
                    
                    if($masked_cellphone.length > 0)
                        $masked_cellphone.mask('000-0000000');
                        
                    if($masked_phone.length > 0)    
                        $masked_phone.mask('0000000000');
                        
                    if($masked_id.length > 0)
                        $masked_id.mask('000000000');
                    
                    if($masked_creditcard.length > 0)
                        $masked_creditcard.mask('000000000000000000');
                    
                    if($masked_cvv.length > 0)
                        $masked_cvv.mask('0000');
                        
                    if($masked_creditdate.length > 0)
                        $masked_creditdate.mask('00/00', {placeholder: "MM/YY - תוקף"});
                        
                    if($masked_creditdatemy.length > 0)
                        $masked_creditdatemy.mask('00');
                        
                    if($masked_numhouse.length > 0)
                        $masked_numhouse.mask('0000');

                    if($masked_date.length > 0)
                        $masked_date.mask('00/00/0000');

                    if($masked_time.length > 0)
                        $masked_time.mask('00/00');
                });
            }

            // Input text
            if($('.input_text').length > 0)
            {
                $('.input_text').on('keyup keypress',function(){
                    if($(this).val()!='')
                        $(this).parents('.input').addClass('filled');
                    else
                        $(this).parents('.input').removeClass('filled');
                });
            }

            // Checkbox / Radiobox
            if($('.checkbox,.radiobox').length > 0)
                $('.checkbox,.radiobox').customCheckRadio();

            // Table mobile
            if($('.table_res').length > 0)
            {
                $('.table_res').each(function(){
                    // Set table labels for mobile
                    var $table = $(this),
                        thTextArr = [];

                    $table.find('.table-thead .table-cell').each(function(index,value){
                        thTextArr.push($(this).html());
                    });
                    $table.find('.table-tbody .table-cell').each(function(){
                        $(this).prepend('<span class="mobile_label">'+thTextArr[$(this).index()]+'</span>');
                    });
                });
            }

            // Flickity carousel bug fix for ios13
            if($('.carousel').length > 0 && 1==2)
            {
                ;(function() {
                    var touchingCarousel = false
                    , touchStartCoords
                
                    document.body.addEventListener('touchstart', function(e) {
                    if (e.target.closest('.carousel-cell')) {
                        touchingCarousel = true
                    } else {
                        touchingCarousel = false
                        return
                    }
                
                    touchStartCoords = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                    })
                
                    document.body.addEventListener('touchmove', function(e) {
                    if (!(touchingCarousel && e.cancelable)) return
                
                    var moveVector = {
                        x: e.touches[0].pageX - touchStartCoords.x,
                        y: e.touches[0].pageY - touchStartCoords.y
                    }
                
                    if (Math.abs(moveVector.x) > Flickity.defaults.dragThreshold)
                        e.preventDefault()
                
                    }, {passive: false})
                
                    // Polyfill for Element.closest
                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
                    if (!Element.prototype.matches) {
                    Element.prototype.matches =
                        Element.prototype.msMatchesSelector ||
                        Element.prototype.webkitMatchesSelector
                    }
                
                    if (!Element.prototype.closest) {
                    Element.prototype.closest =
                        function(s) {
                        var el = this
                
                        do {
                            if (el.matches(s)) return el
                            el = el.parentElement || el.parentNode
                        } while (el !== null && el.nodeType === 1)
                        return null
                        }
                    }
                })();
            }

            // On submit newsletter_box
            $('#newsletter_box').on('submit',function(e){
                e.preventDefault();
                if(validate_email($(this).find('input[type="text"]').val()))
                    $(this).removeClass('error').addClass('animate_finish');
                else
                    $(this).addClass('error');
                return false;
            });
            $('#newsletter_box').on('keyup keypress','input[type="text"]',function(e){
                $(this).parents('#newsletter_box').removeClass('error');
            });

            // Textareas auto
            if($('textarea').length > 0)
            {
                $('textarea').each(function(){
                    var growingTextarea = new Autogrow($(this)[0],10);
                });
            }

            // Toggle answer on click question
            if($('.open_answer').length > 0)
            {
                $('.open_answer').on('click',function(e){
                    var $this = $(this).parents('.item'),
                        up_or_down = !$this.hasClass('open') ? 'down' : 'up',
                        $toggle = '.answer';

                    if(!$this.hasClass('animate'))
                    {
                        $this.toggleClass('open').addClass('animate');
                        if($this.find('.extra_toggle').length > 0)
                        {
                            customSlide($this.find('.extra_toggle'), up_or_down, 0.4, 'power2.inOut', true);
                        }
                        
                        customSlide($this.find($toggle), up_or_down, 0.4, 'power2.inOut', true,function(){
                            $this.removeClass('animate');
                            $containerScroll.mixSmSc('resize');
                            $isotope.isotope('layout')
                        });

                        // If mobile and open scroll down
                        if(resizeWidth < 768)
                            $.scrollToAnchor('to',{target:$this});


                    }
                    return false;
                });
                $('.open_answer').on('click','.btn',function(e){
                    e.preventDefault();
                    document.location.href = $(this).attr('data-link');
                    return false;
                });
            }

            // WCAG URL
            $('.mixelwcag').on('click','button.info',function(){
                window.open('http://example.com/new_url', '_blank');
                return false;
            });

            // Autocomplete
            if($('.autocomplete').length > 0)
            {
                var jsonurlAutocomplete = $('.autocomplete').attr('data-jsonurl'),
                    jsonarrayAutocomplete = $('.autocomplete').attr('data-jsonarray')
                    dataAutocomplete = [];
                
                $.ajax({
                    url: jsonurlAutocomplete,
                    dataType : 'json',
                    success: function(data){
                        dataAutocomplete = data[jsonarrayAutocomplete];
                    }
                });

                $('.autocomplete').on('keyup click','input[type="text"]',function(){
                    var $this = $(this),
                        $thisVal = $this.val(),
                        $thisParents = $this.parents('.autocomplete'),
                        $thisParentsUl = $thisParents.find('.ul'),
                        autocomplete_html = '';

                    if($thisVal.length > 0)
                    {
                        setTimeoutClear('autocompleteTimeout',function(){
                            
                            for(var i = 0; i < dataAutocomplete.length; i++)
                            {
                                var temp_html = '',
                                    print_html = false;

                                temp_html += '<li>';
                                if(dataAutocomplete[i].url!='' && dataAutocomplete[i].title.includes($thisVal))
                                {
                                    temp_html += '<a href="'+dataAutocomplete[i].url+'">'+dataAutocomplete[i].title+'</a>';
                                    print_html = true;
                                }
                                else
                                    temp_html += '<strong>'+dataAutocomplete[i].title+'</strong>';

                                if(dataAutocomplete[i].sub.length > 0)
                                {
                                    temp_html += '<ul>';
                                    for(var t = 0; t < dataAutocomplete[i].sub.length; t++)
                                    {
                                        if(dataAutocomplete[i].sub[t].title.includes($thisVal))
                                        {
                                            temp_html += '<li><a href="'+dataAutocomplete[i].sub[t].url+'">'+dataAutocomplete[i].sub[t].title+'</a></li>';
                                            print_html = true;
                                        }
                                    }
                                    temp_html += '</ul>';
                                }
                                temp_html += '</li>';

                                if(print_html)
                                    autocomplete_html += temp_html;
                            }

                            if(autocomplete_html!='')
                            {
                                $thisParentsUl.html(autocomplete_html);
                                $thisParents.addClass('open');
                            }
                            else
                                $thisParents.removeClass('open');
                        },50);
                    }
                    else
                        $thisParents.removeClass('open');
                });
                $('.autocomplete').on('blur','input[type="text"]',function(){
                    $(this).parents('.autocomplete').removeClass('open');
                });
            }

        break;
        // On load
        case 'load':

            // Play timeline     
            // if(pageHeadTimeline)
            //     pageHeadTimeline.play();

            // Page head add loaded
            $('.page_head').addClass('loaded');

        break;
        // On resize
        case 'resize':
        
            // Update viewport
            $.getViewport();

        break;                
        }
    }

    // Template home
    function template_home(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':

            // Reset popup career form on close
            $('#lightbox').on('beforeClose',function(){
                if($('.popup_invitation').is(':visible'))
                {
                    setTimeout(function(){
                        $('.popup_invitation .lead_section')[0].reset();
                        $('#select_doctor .cselect_custom .list li:first-child').click();
                        $('#select_treat .cselect_custom .list li:first-child').click();
                        $('.popup_invitation').removeClass('submited next_step');
                        $('.popup_invitation .contactsubmit_section .sm-fadein').removeClass('sm-active');
                        $('.popup_invitation .contactsubmit_section').addClass('hide');
                    },200);
                }
            });

            // On select change
            $('.popup_invitation .cselect').on('selected.customSelect',function(){
                if($('#select_doctor .cselect option:selected').val()!='' && $('#select_treat .cselect option:selected').val()!='')
                    $('.popup_invitation .btn_next').prop('disabled',false);
                else
                    $('.popup_invitation .btn_next').prop('disabled',true);
            });

            // On submit popup career form
            $('.popup_invitation').on('click','.form_ui .btn',function(e){
                e.preventDefault();
                if($(this).hasClass('btn_next'))
                {
                    $('.popup_invitation .lead_section .type .doctor').text($('#select_doctor .cselect option:selected').text());
                    $('.popup_invitation .lead_section .type .treat').text($('#select_treat .cselect option:selected').text());
                    $('.popup_invitation').addClass('next_step');
                }
                else
                {
                    $('.popup_invitation').addClass('submited');
                    $('.popup_invitation .contactsubmit_section').removeClass('hide');
                    setTimeout(function(){
                        $('.popup_invitation .contactsubmit_section .sm-fadein').addClass('sm-active');
                    },10);
                }
                return false;
            });

        break;
        // On load
        case 'load':
            
        break;
        // On resize
        case 'resize':
            
        break;
        // On scroll
        case 'scroll':
            
        break;
        }
    }
    
    // Template medical center
    function template_medical_center(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':

            if($('.fixed').length > 0)
                $body.addClass('wcag_up');

            // Title open mobile
            $('.twocol_section').on('click','.title_open_mobile:not(.title_open_mobile_contact)',function(){
                $(this).parents('.mobile_menu').toggleClass('open');
                return false;
            });
            $('.twocol_section').on('click','.title_open_mobile_contact',function(){
                $(this).parents('.fixed').toggleClass('open');
                return false;
            });

        break;
        // On load
        case 'load':
            
        break;
        // On resize
        case 'resize':
            
        break;
        // On scroll
        case 'scroll':
            
        break;
        }
    }

    // Template careers
    function template_careers(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':

            // Title open mobile
            $('.btn_opencareer').on('click',function(){
                $('.popup_career .lead_section .title_section').html($(this).parents('.item').find('.title_question').text());
            });

            // Reset popup career form on close
            $('#lightbox').on('beforeClose',function(){
                if($('.popup_career').is(':visible'))
                {
                    setTimeout(function(){
                        $('.popup_career .form_ui')[0].reset();
                        $('.popup_career').removeClass('submited');
                        $('.popup_career .contactsubmit_section .sm-fadein').removeClass('sm-active');
                        $('.popup_career .contactsubmit_section').addClass('hide');
                    },200);
                }
            });

            // On submit popup career form
            $('.popup_career').on('click','.form_ui .btn_submit',function(e){
                e.preventDefault();
                $('.popup_career').addClass('submited');
                $('.popup_career .contactsubmit_section').removeClass('hide');
                setTimeout(function(){
                    $('.popup_career .contactsubmit_section .sm-fadein').addClass('sm-active');
                },10);
                return false;
            });
            
            // Filter items
            $.getScriptRun(includeScriptsUrlPath+'isotope.min.js',function(){
                // vars
                var $filters = $('.filterbox_section');
                        
                // Set items classes
                $('.careers_section .item').each(function(){
                    var $this = $(this);
                    $this.addClass($this.attr('data-filter').replace(/ /g,"_")).removeAttr('data-filter');
                });
                    
                // First init isotope
                $isotope = $('.careers_section .list').isotope({itemSelector: '.item',percentPosition: true,originLeft: false,hiddenStyle: {opacity: 0,transform: 'scale(0.95)'},visibleStyle: {opacity: 1,transform: 'scale(1.0)'} }),
                isoData = $isotope.data('isotope');

                $isotope.on('layoutComplete', function( event, filteredItems ) {
                    console.log(2);
                    $containerScroll.mixSmSc('resize');
                });
            
                // Do stuff on click tag filters
                $filters.on('click','a',function(event){

                    $(this).toggleClass('active');
                    var $thisTag = $(this).attr('data-tag').replace(/ /g,"_");
                    
                    var inclusives = [];
                    $filters.find('a').each(function(i,elem){
                        if($(this).hasClass('active'))
                        {
                            inclusives.push($(this).text().replace(' ','_'));
                        }
                    });
                    
                    var filterValue = inclusives.length ? '.'+inclusives.join(',.') : '*';

                    if($filters.find('li:first-child a').hasClass('active'))
                        filterValue = '*';
                    
                    $('.careers_section .list .item').addClass('isotope_hide');
                    $isotope.isotope({ filter: filterValue });
                    $($isotope.isotope('getFilteredItemElements')).removeClass('isotope_hide');

                    return false;
                });
            });

        break;
        // On load
        case 'load':
            
        break;
        // On resize
        case 'resize':
            
        break;
        // On scroll
        case 'scroll':
            
        break;
        }
    }

    // Template experts doctors
    function template_experts_doctors(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':

            // On change select
            $('.search_section .cselect').on('selected.customSelect',function(event,value){
                var $this = $(this)
                    $select_2 = $('#select_2').parent().find('.list'),
                    $select_3 = $('#select_3').parent().find('.list');
                
                switch ($(this).attr('id')) {
                    case 'select_1':
                        
                        $select_2.add($select_3).find('li:first-child').click();
                        $select_2.add($select_3).find('li').removeClass('hide_imp');
                        $select_2.add($select_3).find('li:not([data-filter="'+value+'"]):not(:first-child)').addClass('hide_imp');

                    break;

                    case 'select_2':
                        
                        $select_3.find('li:first-child').click();
                        $select_3.find('li').removeClass('hide_imp');
                        $select_3.find('li:not([data-filtertwo="'+value+'"]):not(:first-child)').addClass('hide_imp');

                    break;
                }

                filtersUpdated();
            });

            // Filters update functions
            function replaceAll(str,mapObj){
                var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
            
                return str.replace(re, function(matched){
                    return mapObj[matched.toLowerCase()];
                });
            }
            function filtersUpdated()
            {
                // Build URL
                var special = $("#select_1 option:selected").val(),
                    expert = $("#select_2 option:selected").val(),
                    treat = $("#select_3 option:selected").val(),
                    url_gets = '?special='+special+'&expert='+expert+'&treat='+treat;

                // Add loader
                $('.results .loader').addClass('loading');

                // Ajax call + Fake loader
                setTimeout(function(){
                    $.ajax({
                        url: 'media/json/doctors.json'+url_gets,
                        dataType : 'json',
                        contentType: 'application/json;',
                        success: function(data){
                            var docs = data.doctors;

                            // Remove loader
                            $('.results .loader').removeClass('loading');

                            // Update browser url
                            var current_url = location.protocol + '//' + location.host + location.pathname;
                            window.history.replaceState(null, null, current_url+url_gets);

                            // Update results counter
                            $('#results_counter').text(docs.length);

                            // Build docs html with template
                            var template_doc = $('#template_doc').html(),
                                html_results = '';

                            for(var i=0, len = docs.length; i < len; i++)
                            {
                                var doc_data = docs[i];

                                // Replace data in template
                                var mapObj = {
                                    '{url}':doc_data.url,
                                    '{image}':doc_data.image,
                                    '{name}':doc_data.name,
                                    '{expertise}':doc_data.expertise
                                };

                                html_results += replaceAll(template_doc,mapObj);
                            }

                            // Update jobs results
                            $('#docs_list').html($(html_results));

                            // Update smooth scroll
                            $containerScroll.mixSmSc('resize'); 
                        }
                    });
                },1000);
            }

        break;
        // On load
        case 'load':
            
        break;
        // On resize
        case 'resize':
            
        break;
        // On scroll
        case 'scroll':
            
        break;
        }
    }

    // Template queue reserve
    function template_queue_reserve(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':

            // On select change
            $('.popup_invitation .cselect').on('selected.customSelect',function(){
                if($('#select_doctor .cselect option:selected').val()!='' && $('#select_treat .cselect option:selected').val()!='')
                    $('.popup_invitation .btn_next').prop('disabled',false);
                else
                    $('.popup_invitation .btn_next').prop('disabled',true);
            });

            // On submit popup career form
            $('.popup_invitation').on('click','.form_ui .btn',function(e){
                e.preventDefault();
                if($(this).hasClass('btn_next'))
                {
                    $('.popup_invitation .lead_section .type .doctor').text($('#select_doctor .cselect option:selected').text());
                    $('.popup_invitation .lead_section .type .treat').text($('#select_treat .cselect option:selected').text());
                    $('.popup_invitation').addClass('next_step');
                    setTimeout(function(){
                        $('.popup_invitation').addClass('next_step_finish');
                    },500);
                }
                else
                {
                    $('.popup_invitation').addClass('submited');
                    $('.popup_invitation .contactsubmit_section').removeClass('hide');
                    setTimeout(function(){
                        $('.popup_invitation .contactsubmit_section .sm-fadein').addClass('sm-active');
                    },10);
                }
                return false;
            });

        break;
        // On load
        case 'load':
            
        break;
        // On resize
        case 'resize':
            
        break;
        // On scroll
        case 'scroll':
            
        break;
        }
    }

    // Template order surgery
    function template_order_surgery(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':

            // On click link nav
            $('#header-order').on('click','.nav a', function(){
                var $this = $(this);
                $.scrollToAnchor('to',{target:$('#ordersurgery_section .group:eq(' + $(this).parent().index() + ')'),onComplete:function(){
                    setTimeoutClear('scrollA',function(){
                        $('#header-order .nav a.active').removeClass('active');
                        $('#header-order .nav li:eq(' + $this.parent().index() + ') a').addClass('active');
                    },50);
                }});
                return false;
            });

            // // On enter / leave form group add active class
            $(window).on('scroll',function() {
                var $this_scrollTop = window.scrollY;

                if ($this_scrollTop + resizeHeight > $('#ordersurgery_section .group:eq(3)').offset().top) {
                    $('#header-order .nav a.active').removeClass('active');
                    $('#header-order .nav li:eq(3) a').addClass('active');
                } else if ($this_scrollTop > ($('#ordersurgery_section .group:eq(1)').offset().top + $('#ordersurgery_section .group:eq(1)').innerHeight() - 100)) {
                    $('#header-order .nav a.active').removeClass('active');
                    $('#header-order .nav li:eq(2) a').addClass('active');
                } else if ($this_scrollTop > ($('#ordersurgery_section .group:eq(0)').offset().top + $('#ordersurgery_section .group:eq(0)').innerHeight() - 100)) {
                    $('#header-order .nav a.active').removeClass('active');
                    $('#header-order .nav li:eq(1) a').addClass('active');
                } else {
                    $('#header-order .nav a.active').removeClass('active');
                    $('#header-order .nav li:eq(0) a').addClass('active');
                }
            });
            
            // On click link nav
            $('#ordersurgery_section .form_ui').on('click', '.btn', function(e){
                e.preventDefault();
                $('#ordersurgery_section .row').css('height', $('#ordersurgery_section .step_one').innerHeight() + 'px');
                gsap.to(window, {duration:0.4,scrollTo:{y:0,autoKill:false}, ease: 'power3.inOut'});
                setTimeout(function() {
                    $('#ordersurgery_section,#header-order').addClass('success');
                    setTimeout(function() {
                        $containerScroll.mixSmSc('resize');
                    }, 500);
                }, 400);
                return false;
            });

        break;
        // On load
        case 'load':
            
        break;
        // On resize
        case 'resize':
            
        break;
        // On scroll
        case 'scroll':
            
        break;
        }
    }

    // Page head timeline animations
    function pageHeadAnimations()
    {
        // Check if mobile
        var isMobileScroll = resizeWidth >= 768 ? false : true;

        // Page head split title
        var titleArr = $('.page_head .title_section')
        titleArr = titleArr.find('.parallax-move').length > 0 ? titleArr.find('.parallax-move') : titleArr;
        var titleArrtext = titleArr.text().split(' ')
        titleArrtext = titleArrtext.map(function(word) {
            return /^[a-zA-Z]+$/.test(word) ? '<span class="d-ltr">'+word+'</span>' : word
        })
        titleArrtext = titleArrtext.join(' ')
        titleArr.html(titleArrtext)

        var pageheadSplit = new SplitText('.page_head .title_section', {type:"chars,words", wordsClass:"word", charsClass:"char"});
        $('.page_head .title_section'+($('.page_head .title_section .parallax-move').length > 0 ? ' .parallax-move' : '')).append('<div class="original_text">'+pageheadSplit._originals[0]+'</div>');
                                
        for (var i = 0; i < pageheadSplit.chars.length; i++) {
            pageheadSplit.chars[i].style.transitionDelay = 0.0175*i+'s';
        }
    }
    
    // ScrollMagic animations
    function scrollMagicAnimations()
    {
        var $sm_global = $('.sm-global');
        if($sm_global.length > 0)
        {
            $sm_global.each(function(){
                var _this = this,
                    $this = $(this),
                    $smprop = $this.data('smprop');

                switch ($smprop.type) {
                    case 'split':

                        var titleArr = $this
                        titleArr = titleArr.find('.parallax-move').length > 0 ? titleArr.find('.parallax-move') : titleArr;
                        var titleArrtext = titleArr.text().split(' ')
                        titleArrtext = titleArrtext.map(function(word) {
                            return /^[a-zA-Z]+$/.test(word) ? '<span class="d-ltr">'+word+'</span>' : word
                        })
                        titleArrtext = titleArrtext.join(' ')
                        titleArr.html(titleArrtext)

                        var paragraphSplit = new SplitText(_this, {type:"chars,words", wordsClass:"word", charsClass:"char"});
                        $this.append('<div class="original_text">'+paragraphSplit._originals[0]+'</div>');
                                
                        for (var i = 0; i < paragraphSplit.chars.length; i++) {
                            paragraphSplit.chars[i].style.transitionDelay = 0.0175*i+'s';
                        }

                        break;
                }

                new VisibilityState(this, {callback: function(){
                    $this.addClass('sm-active');
                },intersection:{threshold:$smprop.threshold},once:true});

            });

        }  
    }