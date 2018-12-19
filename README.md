# Interstitial

## SEO Factes for Interstials
First Google don't like interstitials - espacially at mobile devices!

If you be aware any tipps, than you don't risk your page ranke where you use interstitials. 
Otherwise your _expensive_ page will lose important ranking positions and follow traffic. 

For that consider following **SEO Tipps:**

Interstitials...
1. ... should **don't disturb to heavy user experience**.
2. ... need to be **easy to dismiss**.
3. ... should **not overlay more than 15% of screen**.
4. ... should **contains only user search intend relevant stuff**.

Means, if you have to say any important stuff to user's search intend, than it's fine. 
Examples are hints for cookies, age limitations or search intend machted informations.

## Plugin Description
- jQuery Plugin
- Initialize **Interstitial** at matched element.
- Interstitial is responsive. **Make your interstitials content responsive!**

### Dependencies
- jQuery

### Behavior
- initial hidden
- show at event (see below)
- easy dismissed over big close image
- will show once per pageload
- default position: at bottom of window border
- default animation: slide in (display) from down to top and slide out (hide) from top to down
(animation can't change via options; if you need change plugin for your style)

### Event Listener
Interstitial will display when: 

| Event | Description |
| --- | --- |
| mousemove | if user move mouse over top window edge (margin < 30px to edge) |
| scroll | if user scroll back to top |
| touchmove | _(for mobile)_ simular to scroll |
| timer out | after timeframe _(default: 10000ms, you may change it via options)_ |

Once displayed, all event listener will remove.

### HTML
#### Structure

```
- div#interstitial_[randomValue] (main container)
- |- span#[main container id]_close (contains close icon)
- |-- div#[main container id]_adWrapper (contains ad content)
```
#### Close Image
Close image is hard coded and integrated as base64 coded image. This way you don't depending from extern source. 
If you need to change image, do it within plugin self!


## Use Plugin and Initializing
1. Download plugin script to your project.
2. Lazy load plugin (ajax or inline in HTML Document as latest as possible).
3. Initialize interstitial with options, at least with _url_
4. With parameter _options_ you may define any own interstitial attributes.

```javascript
jQuery('body').interstitial(
    {
       url: 'https://cdn.immonet.de/frontend-resources/4.7.1/immonet/img/logo_with_claim.svg'
    }
 );
```
### Options
Options you set as JavaScript object.
You define any own interstitials attributes.
Example see below!

#### url
To add interstitials content via ajax.

- required _(if no content is given; be aware HINT after content description)_
- type: _string_
- default: _empty_

**Example**
```javascript
    var options = {
        url: 'https://cdn.immonet.de/frontend-resources/4.7.1/immonet/img/logo_with_claim.svg'
    }
    jQuery('body').interstitial(options);
```
******
#### content
To add interstitials content via hard coded HTML Code.
- required _(if no url is given)_
- type: _string_
- default: _empty_

**Example**
```javascript
    var adHtmlContent = '<div class="pos-relative overflow-hidden" id="capitalinvestment"><div class="row box-50 bg-default"><div class="hidden-xs col-sm-3 col-md-3 text-center box-50"><span class="ico icoInvestmentO ico-size-120 text-primary" title="Kapitalanlage Immobilien - Immobilien-Investment"></span></div><div class="col-xs-12 col-sm-9 col-md-9 box-50"><div class="row"><div class="col-xs-12 margin-bottom-12 margin-bottom-sm-24 box-45 text-center"><a href="/immobilien-als-kapitalanlage" onclick="utag.link({\'enh_action\':\'promo_click\',\'promotion_id\':[\'523\'],\'promotion_name\':[\'kapitalanlage\'],\'promotion_creative\':[\'under-emopic-teaser-caption\'],\'promotion_position\':[\'kapitalanlage-sucheinstieg\']});" target="_blank" title="Immobilien als Kapitalanlage - Beratung von Finanzexperten"><h2 class="headline-250 margin-bottom-6 text-primary"><span class="ico icoInvestmentO ico-size-30 margin-right-6 hidden-sm hidden-md hidden-lg" title="Kapitalanlage Immobilien - Immobilien Investment"></span>\n' +
    'Ihr individuelles Kapitalanlage Angebot<span class="hidden-xs"> anfordern</span></h2><p class="text-225 text-default" id="capitalinvestment-text">Mit individuellen Angeboten unserer Kapitalanlage Finanzexperten legen Sie Ihr Geld sicher und rentabel an.</p></a></div><div class="col-xs-12"><form action="/immobilien-als-kapitalanlage/amount#immobilien-investment-form" class="row" method="post" target="_blank"><div class="col-xs-12 col-sm-4 margin-bottom-6 box-45"><input class="form-control" id="amount" max="99999999" maxlength="8" min="100" name="sum" placeholder="schon ab 100 EUR" required="" size="8" type="number"></div><div class="col-xs-12 col-sm-8 box-45"><input class="btn btn-primary btn-block btn-80 full-width text-space-normal" id="btn-int-kapitalanlage-suche-beratung-anfordern" onclick="utag.link({\'enh_action\':\'promo_click\',\'promotion_id\':[\'523\'],\'promotion_name\':[\'kapitalanlage\'],\'promotion_creative\':[\'under-emopic-teaser\'],\'promotion_position\':[\'kapitalanlage-sucheinstieg\']});" type="submit" title="Kapital anlegen - Immobilien-Investment mit unseren Finanzexperten " value="Kapitalanlage Angebote einholen"></div></form></div></div></div></div></div>'

    var options = {
        content: adHtmlContent
    };
    jQuery('body').interstitial(options);
```

**Be aware !!!**
```
- you need to give url OR content
- if you give either url nor content, no interstial element will create
- if you give both, url will prioritized
```
******

#### position
Defined position of interstitial within window.
 
- optional
- type: _string_
- default: _bottom_
******

#### scroll
Defined whether interstial will show at scroll back to top. This options works for mobile too.
If true, event listener will defined for _scroll_ (Desktop) and _touchmove_ (Mobile).

- optional
- type: _boolean_ 
- default: _true_
******

#### exit
Defined whether interstial will show when user move mouse near to top of window border.
**HINT:** This event doesn't work at mobile devices!

- optional
- type: _boolean_ 
- default: _true_
******

#### timer
Defined time after interstitial will display.
To remove this event set this option to _null_.

**HINT:** Cause exit-event don't work at mobile devices, set this value! 

- optional
- type: number
- default: 10000 (10s)
******

#### css
You may define own css informations. Usee valid css attributes within an javascript object. 
Your css options will merge with default options. To overwrite default style informations 
set default css attributes with own value (see examples below).

- optional
- type: object
- default:
```javascript
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
```
******


### Best Practise to Initializing
#### Initialize through Self-Calling-Function!

Write your code to initialize in a self calling function. In this way all defined vars will lose 
and don't waste your global scope!

**Example:**
```javascript
(function(){
    var opt = {
        url: 'https://cdn.immonet.de/frontend-resources/4.7.1/immonet/img/logo_with_claim.svg',
        css : {
            'background-color': '#b2d6e2'
        }
    };
    jQuery('body').interstitial(options);
})();
```

### Examples for any styles
#### Interstitial at right window border
```javascript
(function(){
    var opt = {
        url: 'https://cdn.immonet.de/frontend-resources/4.7.1/immonet/img/logo_with_claim.svg',
        position: 'right',
        css : {
            'background-color' : '#b2d6e2',
            'height' : '100%',
            'width' : '25%'
        }
    };
    jQuery('body').interstitial(opt);
})();
```

#### Interstitial at top of window
Interstitial will slide in (display) from top to down and hide (close) down to top.
```javascript
(function(){
    var opt = {
        url: 'https://cdn.immonet.de/frontend-resources/4.7.1/immonet/img/logo_with_claim.svg',
        position: 'top',
        css : {
            'background-color' : '#b2d6e2'
        }
    };
    jQuery('body').interstitial(opt);
})();
```
