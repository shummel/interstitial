/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 * @link http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
 *
 * Extended for interstitial: @shummel
 */

/**
 * the semi-colon before the function invocation is a safety
 * net against concatenated scripts and/or other plugins
 * that are not closed properly.
 */
;(function ($, window, document, undefined) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'interstitial',
        defaults = {
            url: null,
            content: null,
            position: 'bottom', // bottom|top|right|left
            scroll: true,
            exit: true,
            timer: 10000, //10s
            css : {
                'background-color': '#fff',
                'display'  : 'none',
                'opacity' : '0.95',
                'padding' : '5%',
                'position' : 'fixed',
                'height' : '15%',
                'width' : '100%',
                'bottom' : '0'
            }
        };

    // The actual plugin constructor
    function Interstitial(element, options) {
        this.element = element;

        // Handle css style informations:
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        options.css[options.position] = 0;
        options.css = $.extend({}, defaults.css, options.css);
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this.$_adWrapper = null;

        this.init();
    }

    /**
     * Extend plugin what should do this plugin...
     * Create Interstitial
     *
     * Place initialization logic here
     * You already have access to the DOM element and the options via the instance, e.g. this.element and this.options.
     *
     * @returns {*}
     */
    Interstitial.prototype.init = function () {
        var that = this,
            adWrapper = null,
            timeoutInstance = null;

        if (that.options.url != null || that.options.content != null) {
            if(createAd(that.options.url, that.options.content)){
                add2Dom();
                addEventListener();
            }
        } else {
            return false;
        }


        /**
         * Create and add interstitial with default resp. got css options.
         * Close image is hard coded here with enough padding for easy touch at mobiles.
         *
         */
        function createAd(url, content){
            var bool = 1,
                id = pluginName + '_'.concat(Math.random().toString(36).substring(2, 12)),
                closeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAIVBMVEX///91dXVtbW2enp6ZmZlra\n' +
                    '2u9vb1wcHC7u7t9fX2YmJiiepBrAAADqElEQVR4nO2di2KCMAxFJ6/p/v+DB8uYgoAgSZPc3fMBmN\n' +
                    'PeAkJpPz4IIYQQQgghhBBCCCGEEEIIIfpcG+8KfmmuNsft2qq2OfJB6qrtLI7btZdLFaEXm+pysVD\n' +
                    's+uP2iv69WEsh6opDD4ZQFEH9XhwF3YPaVGMhuop3QWfFu6Cu4qOga1Dr6rEQPcWpoKPiVFBPcS7o\n' +
                    'FtSmmheio9g9HdepF+c9+FOIguJzDzopLglq9OJ1UdBBcVmwL+TsPepz9scjlx2LhnWstV3ZXjStY\n' +
                    'r31yimuC6okyfjwOzBvZG/FAinyDWqRBvZULJQgv6AWa1yvi0bB3/UJatHseAS1cLOWVyyem9Jj0W\n' +
                    'Hsl21Tl/N3yR91ugaXU3S7ySj1w473wmUUXW/2S/y4839S+5O4+3MF6xb2/j9qXkKExyamiiEELcs\n' +
                    'IEFHBSjGMoFUpXzEiKlic0t0vE1P0gxooooK2YjhB7ZKCXCamaI6bYGNwRK/dA0ZUt7CQERV0FAML\n' +
                    '6hQXNqLCecXggucLDB1R4dyJPuhlYsqZXggfUeH9MhNEVHhXMY3gu6MpxRgceac3kozBkePlJoqoc\n' +
                    'FQxneDRkpNFVDiimFLwSNkJIyrsPf2nukxM2dc3SSMq7Ck+bUSF14rJBV8LpI6osK0IILgtkT6iwq\n' +
                    'ri5+0TQnAjqGtkiqhwUDGf4EZQFwWTRVQ4oJhT8EBQM0ZU2NmLWXtwYJdiZsFdQc0bUeGlYnbBl0H\n' +
                    'NHVFhUxFBsA/q2p1of5eaPqLCbdXw5l2aDvB9CD8O4c+l8NdD+Hsa+PtS+P8W8P8P4f/jwz+ngX/W\n' +
                    'Bv+8FP6ZN/x7C/h3T/DvD+HfAcO/x4efiwE/nwZ+ThT8vDb4uYnw80vh5wjDz/OGn6sP/70F/Dcz8\n' +
                    'N89wX+7Bv/9Ifw3pPDfAcN/yw3/PT78mgrw62LAr20Cvz4N/BpD8OtE2bR3oLEIv14b/Jp78Osmwq\n' +
                    '99Cb9+KfwatPDrCMOvBQ2/njf8muzw6+rD740Av78F/B4l8PvMwO8VBL/fE/yeXfD7rsHvnef9fw1\n' +
                    '+g0dzxQAPFWwbOcZDWsMq8PcDDr+nc3t2T2f8fbn/wd7qS73o9D7veSxq9ODAXNHtney8F7UE54qO\n' +
                    '79WninqCU0XXuRGPQdUUfFR0nqV0V9QVvCt6T+D5C6q24HjRcBccFXUuE1OGXowwke4nqPo9ONC1A\n' +
                    'XpwoK5sBPt71Ag9ONCcvhclhBBCCCGEEEIIIYQQQgghhCzwDUQzJ6GFdcb1AAAAAElFTkSuQmCC',
                $htmlClose = $('<span id="' + id + '_close" style="position: absolute; right:0; top:0; padding:2%; cursor:pointer;"><img width="30" height="30" alt="schließen icon" src="' + closeImg + '" style="border:2px solid #757575; border-radius: 50%"></span>').click(hideInterstitial),
                $htmlAdWrapper = $('<div id="' + id + '_adWrapper" style="opacity: 1;"></div>');

            that.$_adWrapper = $('<div id="' + id + '"></div>');

            $($htmlClose).appendTo(that.$_adWrapper);
            $($htmlAdWrapper).appendTo(that.$_adWrapper);
            that.$_adWrapper.css(that.options.css);
            adWrapper = that.$_adWrapper[0];

            // fill interstitial with content:
            if(url != null){
                that.$_adWrapper.append(getContent(url, $htmlAdWrapper));
            }
            else if(content != null){
                that.$_adWrapper.append(content);
            }
            else {
                bool = 0;
            }

            return bool;
        }

        /**
         * Get interstitials content
         */
        function getContent(url, html){
            return $(html).load(url);
        }

        /**
         * Add interstitial at DOM.
         */
        function add2Dom(){
            that.element.append(adWrapper);
        }

        /**
         * Hide interstitial.
         */
        function hideInterstitial(){
            that.$_adWrapper.slideUp('slow');
        }

        /**
         * Shows interstitial via jQuery animation 'slideDown'.
         * Additional all event listeners and timeout will delete when interstitial is show once.
         */
        function showInterstitial(){
            removeEventListener();
            if (timeoutInstance != null) clearTimeout(timeoutInstance);
            that.$_adWrapper.slideDown('slow');
        }

        /**
         * Remove all event listeners.
         */
        function removeEventListener(){
            $(window).off('scroll touchmove mousemove');
        }

        /**
         * Add all event listeners for show interstitial
         */
        function addEventListener(){
            // bind scroll event if requested
            if(that.options.scroll) bindScrollEvent();

            // bind time event if requested
            if(that.options.timer != null) bindTimeEvent();

            // bind mouse event
            if(that.options.exit) bindMousemoveEvent();
        }

        /**
         * Bind event: mousemove
         * If mouse moves to near above window edge interstitial will show (exit-popUp).
         */
        function bindMousemoveEvent(){
            $(window).on('mousemove', function(event){
                if(event.clientY < 30) {
                    showInterstitial();
                }
            })
        }

        /**
         * Bind event: scroll up, touchmove up (mobile)
         * If user scroll back to top interstitial will show.
         */
        function bindScrollEvent(){
            var hPos = 0,
                hPosTmp = hPos;

            $(window).on('scroll touchmove', function() {
                hPosTmp = window.pageYOffset;

                if(hPosTmp >= hPos) {
                    hPos = hPosTmp;
                } else {
                    showInterstitial();
                }
            });
        }

        /**
         * Bind event: Timer
         * After defined time the interstitial will show.
         */
        function bindTimeEvent(){
            timeoutInstance = setTimeout(showInterstitial, that.options.timer);
        }
    };

    /**
     * A really lightweight plugin wrapper around the constructor,
     * preventing against multiple instantiations.
     *
     * @param options
     * @returns {*}
     */
    $.fn.interstitial = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Interstitial(this, options));
            }
        });
    }

})(jQuery, window, document);