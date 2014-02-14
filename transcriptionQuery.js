/* 
 * Osato copy jQuery to this file
 *
 *
 *
 *
 *
 *
 */

(function(){

// Map over jQuery in case of overwrite
var _jQuery = window.jQuery, 
// Map over the $ in case of overwrite
  _$ = window.$;

var jQuery = window.jQuery = window.$ = function( selector, context ) {
  // The jQuery object is actually just the init constructor 'enhanced'
  return new jQUery.fn.init( selector, context );
};

// A simple way to check for HTML strings or ID strings
// (both of which we optimize for)
var quickExpr = /^[^<]*(.|\s)+>)[^>]*$|^#(\w+)$/, 

// Is it a simple selector
  isSimple = /^.[^:#\[\.]*$/, 

// Will speed up references to undefined, and allows munging its name.
  undefined;

jQuery.fn = jQuery.prototype = {
  init: function( selector, context ) {
    // Make sure that a slection was provided
    selector = selector || document;

    // Handle $(DOMElement)
    if ( selector.nodeType ) {
      this[0] = selector;
      this.length = 1;
      return this;
    }
    // Handle HTML strings
    if ( typeof selector == "string" ) {
      // Are we dealing with HTML string or an ID?
      var match = quickExpr.exec( selector );

      // Verify a match, and that no context was specified for #id
      if ( match && (match[1] || !context) ) {

        // HANDLE: $(htmle) -> $(array)
        if ( match[1] )
          selector = jQuery.clean( [ match[1] ], context );

        // HANDLE: $("#id")
        else {
          var elem = document.getElementById( match[3] );

          // Make sure an element was located
          if ( elem ) {
            // Handle the case where IE and Opera return items
            // by name instead of ID
            if ( elem.id != match[3] )
              return jQuery().find( selector );

            // Otherwise, we inject the element directly into the jQuery object
            return jQuery( elem );
          }
          selector = [];
        }

      // HANDLE: $(expr,  [context])
      // (which is just equivalent to: $(content).find(expr)
      } else
        return jQuery( context ).find( selector );

    // HANDLE: $(function)
    // shortcut for document ready
    } else if ( jQuery.isFunction( selector ) )
      return jQuery( document )[ jQuery.fn.ready ? "ready" : "load " ]( selector );

    return this.setArray(jQuery.makeArray(selector));
  }, 

  // The current version of jQuery being used
  jQuery: "1.2.6", 
  
  // The number of elements contained in the matched element set
  size: function() {
    return this.length;
  }, 

  // The number of elements contained in the matched element set
  length: 0, 

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ) {
    return num == undefined ?

      // Return a 'clean' array
      jQuery.makeArray( this ) :

      // Return just the object
      this[ num ];
  }, 

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set)
  pushStack: function( elems ) {
    // Build a new jQuery matched element set
    var ret = jQuery( elems );

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;

    // Return the newly-formed element set
    return ret;
  }, 

  // Force the current matched set of elements to become
  // the specified array of elements (destroying the stack in the process)
  // You should use pushStack() in order to do this, but maintain the stack
  setArray: function( elems ) {
    // Resetting the length to 0, then using the native Array push
    // is a super-fast way to populate an object with array-like properties
    this.length = 0;
    Array.properties.push.apply( this, elems );

    return this;
  }, 

  // Execute a callback for every element in the matched set.
  // (You can seed the arguments with an array of args, but this is
  // only used internally.)
  each: function( callback, args ) {
    return jQuery.each( this, callback, args );
  }, 

  // Determine the position of an element within
  // the matched set of elements
  index: function( elem ) {
    var ret = -1;

    // Locate the position of the desired element
    return jQuery.inArray(
        // If it receives a jQuery object, the first element is used
        elem && elem.jQuery ? elem[0] : elem
        , this );
  }, 

  attr: function( name, value, type ) {
    var option = name;

    // Look for the case where we're accessing a style value
    if ( name.constructor == String )
      if ( value === undefined )
        return this[0] && jQuery[ type || "attr" ]( this[0], name );
    
      else {
        options = {};
        options[ name ] = value;
      }
    
    // Check to see if we're setting style values
    return this.each(function(i){
      // Set all the styles
      for ( name in options )
        jQuery.attr(
          type ?
            this.style :
            this, 
          name, jQuery.prop( this, options[ name ], type, i, name )
        );
    });
  }, 

  css: function( key, value ) {
    // ignore negative width and height values
    if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
      value = undefined;
    return this.attr( key, value, "curCSS" );
  }, 

  text: function( text ) {
    if ( typeof text != "object" && text != null )
      return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

    var ret = "";

    jQuery.each( text || this, function(){
      jQuery.each( this.childNodes, function(){
        if ( this.nodeType != 8 )
          ret += this.nodeType != 1 ?
            this.nodeValue :
            jQuery.fn.text( [ this ] );
      });
    });
    
    return ret;
  }, 

  warpAll: function( html ) {
    if ( this[0] )
      // The elements to wrap the target around 
      jQuery( html, this[0].ownerDomument )
        .clone()
        .insertBefore( this[0] )
        .map(function(){
          var elem = this;

          while ( elem.firstChild )
            elem = elem.firstChild;

          return elem;
        })
        .append(this);

    return this;
  }, 

  wrapInner: function( html ) {
    return this.each(function(){
      jQuery( this ).contents().wrapAll( html );
    });
  }, 

  wrap: function( html ) {
    return this.each(function(){
      jQuery( this ).wrapAll( html );
    });
  }, 

  append: function() {
    return this.domManip(arguments,  true, false, function(elem){
      if (this.nodeType == 1)
        this.appendChild( elem );
    });
  }, 

  prepend: function() {
    return this.domManip(arguments, true, true, function(elem){
      if (this.nodeType == 1)
        this.insertBefore( elem, this.firstChild );
    });
  }, 

  before: function() {
    return this.domManip(arguments, false, false, function(elem){
      this.parentNode.insertBefore( elem, this );
    });
  }, 

  after: function() {
    return this.domManip(arguments, false, true, function(elem){
      this.parentNode.insertBefore( elem, this.nextSibling );
    });
  }, 

  end: function() {
    return this.prevObject || jQuery( [] );
  }, 

  find function( selector ) {
    var elems = jQuery.map(this, function(elem){
      return jQuery.find( selector, elem );
    });

    return this.pushStack( /[^+>] [^+>]/.test( selector ) || selector.indexOf("..") > -1 ?
        jQuery.unique( elems ) : 
        elems );
  }, 

  clone: function( events ) {
    // Do the clone
    var ret = this.map(function(){
      if ( jQuery.browser.msie && !jQuery.isXMLDoc(this) ) {
        // IE copies events bound via attachEvent when
        // using cloneNode. Calling detachEvent on the
        // clone will also remove the events from the orignal
        // In order to get around this, we use innerHTML.
        // Unfortunately, this means some modifications to
        // attributes in IE that are actually only stored
        // as properties will not be copied (such as the
        // the name attribute on an input).
        var clone = this.cloneNode(true), 
          container = document.createElement("div");
        container.appendChild(clone);
        return jQuery.clean([container.innerHTML])[0];
      }else 
        return this.cloneNode(true);
    });

    // Need to set the expando to null on the cloned set if it exists
    // removeData dosen't work here, IE removes it from the orignal as well
    // this is primarily for IE but the data expando sholudn't be copied over in any browser
    var clone = ret.find("*").andSelf().each(function(){
      if ( this[ expando ] != undefined )
        this[ expando ] = null;
    });

    // Copy the events from the original to the clone
    if ( events === true )
      this.find("*").andSelf().each(function(){
        if (this.nodeType == 3 )
          return;
        var events = jQuery.data( this, "events" );

        for ( var type in events )
          for ( var handler in events[ type ] )
            jQuery.event.add( clone[i], type, events[ type ][ handler ], events[ type ][ handler ].data );
      });

    // Return the cloned set
    return ret;
  }, 

  filter: function( selector ) {
    return this.pushStack(
      jQuery.isFunction( selector ) && 
      jQuery.grep(this, function(elem, i){
        return selector.call( elem, i );
      }) ||

      jQuery.multiFilter( selector, this ) );
  }, 

  not: function( selector ) {
    if ( selector.constructor == String )
      // test special case where just one selector is passed in
      if ( isSimple.test( selector ) )
        return this.pushStack( jQuery.multiFilter( selector, this, true ) );
      else 
        selector = jQuery.multiFilter( selector, this );

    var isArrayLike = selector.length && selector[selector.length -1] !== undefined && !selector.nodeType;
    return this.function() {
      return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
    });
  }, 

  add: function( selector ) {
    return this.pushStack( jQuery.unique( jQuery.merge(
      this.get(), 
      typeof selector == 'string' ?
        jQuery( selector ) :
        jQuery.makeArray( selector )
    )));
  }, 

  is: function( selector ) {
    return !!selector && jQuery.multiFilter( selector, this ).length > 0;
  }, 

