Scroll Detective
=========

A minimal JavaScript module for manipulating DOM Elements when scrolling in certain directions or after scrolling stops.

## Installation
	
	npm install scroll_detective --save

  Furthermore jQuery or a similar library is required that supports the methods `on()`, `off()`, `trigger()` and querying selectors like jQuery.

## Usage
  HTML:

  	<div class="hide_on_scroll_down">Hidden when you scroll down.</div>
  	<div class="hide_on_scroll_up">Hidden when you scroll up.</div>

  CSS:

  	.hide_on_scroll_up, .hide_on_scroll_down{
  		opacity:1;
  	}

	.hidden{
		opacity:0;
	}

	.hide_on_scroll_down.hidden{
		top:-50px;
	}

  JS:
  	
  	var scroll_detective = ScrollDetective($);

## Documentation
###Supported CSS classes: 
  - `hide_on_scroll_down` : The CSS class `hidden` will be added as soon as the user scrolls down.
  - `hide_on_scroll_up` : The CSS class `hidden` will be added as soon as the user scrolls up.
  - `hide_on_scroll_stop` : The CSS class `hidden` will be added after the user stops scrolling.

###Events: 
  - `scroll_hide` : Triggered by each element when it's being hidden.
  - `scroll_show` : Triggered by each element when it's being shown.

###Methods: 
  - `setEnabled(boolean)` : Set the enabled state.
  - `enable()` : Convenience method for `setEnabled(true)`.
  - `disable()` : Convenience method for `setEnabled(false)`.


## Todo:
  - Add Options to documentation
  - Enable hiding without css classes
  - Enable timeout for scroll_stop again after disabling.

## Release History

* 0.1.0 Initial release