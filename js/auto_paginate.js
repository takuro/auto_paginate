// Page order
// usage - "file name":"short description."
var index = {
  "index.html" : "INDEX",
  "page2.html" : "Page 2",
  "page3.html" : "Page 3"
};

// Keyboard shortcuts
// usage - "key code" : "function name"
var keyboard_shortcuts = {
  "39" : "move_next_page()",
  "190" : "move_next_page()",
  "37" : "move_previous_page()",
  "188" : "move_previous_page()"
}

// Get current page's file name.
// @return "current page url"
function get_current_page() {
  var url = document.location.href;
  var sa = url.split("/");
  var current_page = sa[sa.length - 1];
  var current_page = current_page.replace("#", "");

  if (current_page == "") {
    current_page = "index.html";
  }

  return current_page;
}

// Get next page's url.
// @return "next page url" or null (if last page)
function get_next_page_url() {
  var current = get_current_page();
  var count = 0;
  var next_page_count = 0;
  var tmp = new Array();
  for (var key in index) {
    tmp[count] = key;
    if (current == key) {
      next_page_count = count+1;
    }
    count++;
  }

  if (count <= next_page_count) {
    return null;
  } else {
    return tmp[next_page_count];
  }
}

// Get previous page's url.
// @return "previous page url" or null (if first page)
function get_previous_page_url() {
  var current = get_current_page();
  var count = 0;
  var previous_page_count = 0;
  var tmp = new Array();
  for (var key in index) {
    tmp[count] = key;
    if (current == key) {
      previous_page_count = count - 1;
    }
    count++;
  }

  if (previous_page_count < 0) {
    return null;
  } else {
    return tmp[previous_page_count];
  }
}

// Generate INDEX
// @return "html code (ordered list)"
function create_index() {
  var index_html = "<ol>";
  for (var key in index) {
    index_html += "<li><a href='"+key+"'>"+index[key]+"</a></li>";
  }
  index_html += "</ol>";
  
  return index_html;
}

// move next page
function move_next_page() {
  var next_page = get_next_page_url();
  if (next_page != null) {
    location.href = next_page;
  }
}

// move previous page
function move_previous_page() {
  var previous_page = get_previous_page_url();
  if (previous_page != null) {
    location.href = previous_page;
  }
}

$(function(){
  var next_page = get_next_page_url();
  var previous_page = get_previous_page_url();

  // Add next page's link.
  if (next_page != null) {
    $(".next").empty();
    $(".next").append("<a href='"+next_page+"'>Next</a>");
  }

  // Add previous page's link.
  if (previous_page != null) {
    $(".previous").empty();
    $(".previous").append("<a href='"+previous_page+"'>Previous</a>");
  }

  // Create INDEX.
  $("#index").append(create_index());

  // Keyboard shortcut.
  $(window).keydown(function(e){
    var _event = keyboard_shortcuts[e.keyCode];
    if (_event != null) { eval(_event); }
  });
});

