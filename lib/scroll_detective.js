;(function () {
    'use strict';
    function ScrollDetective($, options){

        if (!$){
            throw 'ScrollDetective requires jQuery or similar as a parameter';
        }

        options = options || {
            indicatorClass: 'hidden',
            threshold : 6,
            stopDelay : 3
        };

        var t = {
            $hideOnScrollDown   : $('.hide_on_scroll_down'),
            $hideOnScrollUp     : $('.hide_on_scroll_up'),
            $hideOnScrollStop   : $('.hide_on_scroll_stop'),
            scrollDirection     : '',
            threshold           : 6,

            disable             :function(){ 
                $window.off('scroll', scrollHandler);
                reset(); 
                enabled = false; 
            },
            enable              :function(){ 
                $window.on('scroll', scrollHandler);
                enabled = true; 
            },
            setEnabled          :function(enabled){
                enabled ? t.enable():t.disable();
            }
        };
        
        var $window = $(window),
            scrollTop,
            lastScrollTop = 0,
            scrollingStoppedTimer,
            enabled = false;

        function clearTimeouts(){
            clearTimeout(scrollingStoppedTimer);
            clearTimeout(t.$hideOnScrollStop.data('timeout'));
        }

        function reset(){
            clearTimeouts();
            t.scrollDirection = '';
            scrollTop = lastScrollTop = 0;
        }

        function scrollHandler(){
            var scrollSpeed = scrollTop;
                scrollTop = $window.scrollTop()
                ;

            scrollSpeed -= scrollTop,
            clearTimeouts();
            scrollingStoppedTimer = setTimeout(onScrollingStopped, 40);

            //upper limit
            // on scroll down
            if(scrollTop>lastScrollTop+t.threshold){
                 // if (t.scrollDirection != 'down'){
                    t.scrollDirection = 'down';
                    show(t.$hideOnScrollUp);
                    hide(t.$hideOnScrollDown);
                 // }
            }
            // on scroll up
            else if(scrollTop<lastScrollTop-t.threshold){
                // if (t.scrollDirection != 'up'){
                    t.scrollDirection = 'up';
                    show(t.$hideOnScrollDown);
                    hide(t.$hideOnScrollUp);
                // }
            }

            lastScrollTop = scrollTop;
        }

        function hide($element){
            $element.addClass(options.indicatorClass);
            $element.trigger('scroll_hide');
        }

        function show($element){
            $element.removeClass(options.indicatorClass);
            $element.trigger('scroll_show');
        }

        function onScrollingStopped()
        {
            clearTimeout(scrollingStoppedTimer);
            t.$hideOnScrollStop.each(function(){
                var $this = $(this);
                var seconds = $this.attr('data-seconds') || 3;
                $this.data('timeout', setTimeout(function(){ hide($this); }, seconds*1000));    
            });
        }

        t.enable();
        return t;
    }

    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            return ScrollDetective;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = ScrollDetective;
    } else {
        window.ScrollDetective = ScrollDetective;
    }
}());   
