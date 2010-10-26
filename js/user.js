// Page order
// usage / "file name":"short description."
var index = {
  "index.html" : "INDEX",
  "page2.html" : "Page 2",
  "page3.html" : "Page 3"
};

// Keyboard shortcuts
// usage / "key code" : "function name"
var keyboard_shortcuts = {
  "39" : "read_next_page()",
  "190" : "read_next_page()",
  "37" : "read_previous_page()",
  "188" : "read_previous_page()"
}

// Get current page's file name.
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
// return / 
//  next page url : string
//   last page ? null
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
// return / 
//  previous page url : string
//   first page ? null
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

// Generate INDEX.
// return / html : string
function create_index() {
  var index_html = "<div id='index_block'><ol>";
  for (var key in index) {
    index_html += "<li><a href='"+key+"'>"+index[key]+"</a></li>";
  }
  index_html += "</ol></div>";
  
  return index_html;
}

function read_next_page() {
  var next_page = get_next_page_url();
  if (next_page != null) {
    location.href = next_page;
  }
}

function read_previous_page() {
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
  $("#header").append(create_index());

  $("#body").not("#index").click(function(){
    $("#index_block").fadeOut("fast");
    $("#index").removeClass("on_index_block_true");
  });

  $("#index").toggle(
    function(){
      $("#index_block").fadeIn("fast");
      $("#index").addClass("on_index_block_true");
    },
    function() {
      $("#index_block").fadeOut("fast");
      $("#index").removeClass("on_index_block_true");
    }
  );

  // Keyboard shortcut.
  $(window).keydown(function(e){
    var _event = keyboard_shortcuts[e.keyCode];
    if (_event != null) { eval(_event); }
  });

  var date = new Date();
  var year = date.getFullYear();
  $("#footer .copy").empty();
  if (year > 2010) {
    $("#footer .copy").append("&copy; 2010 - "+year);
  } else {
    $("#footer .copy").append("&copy; "+year);
  }

});

