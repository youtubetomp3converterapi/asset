/*
// Made by Fais from scracth with helper;
*/ 

      $("#control_sources").click(function() {
        return "none" == $("#sources").css("display") ? $("#sources").slideDown() : $("#sources").slideUp(),
        !1
    });
    $("#sources a").click(function() {
  var likeCount = parseInt($("#control_sources span").html());
  return "disabled" == $(this).attr("class") ? ($(this).attr("class", "enabled"), $("#control_sources span").html(likeCount + 1)) : "enabled" == $(this).attr("class") && ($(this).attr("class", "disabled"), $("#control_sources span").html(likeCount - 1)), false;
});
  var api_file = [];
  var j = 0;
  function _setEmpty() {
    last = "";
    j = 0;
    $("#suggestions").html("").hide();
  }
  function update(type, index) {
    switch(type) {
      case "select":
        $("#suggestions #s_" + index).css("background-color", "#f0f0f0").css("font-weight", 600);
        break;
      case "deselect":
        $("#suggestions #s_" + index).css("background-color", "#ffffff").css("font-weight", 400);
        break;
      case "input":
        $("#query").val(index);
    }
  }
function usingjson(json){
    var j = JSON.parse(json);
    return j;
}
  $(document).on("keyup", "#query", function(event) {
    var t = event.keyCode || event.which;
    var s = [];
    var id = $.trim($(this).val());
    return 13 != t && (id.length < 1 || 0 < id.indexOf("youtube.com/") || 0 < id.indexOf("youtu.be/") ? (_setEmpty(), false) : (38 != t && 40 != t && $.ajax({
      url : "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=" + id,
      dataType : "jsonp",
      success : function(e) {
        e = e.toString().split(",");
        var t = 1;
        $.each(e, function(canCreateDiscussions, n) {
          if (0 < (n = $.trim(n)).length && n != id && !$.isNumeric(n) && -1 == $.inArray(n, s) && "[object object]" != n.toLowerCase()) {
            s.push('<span id="s_' + t + '">' + n + "</span>");
            t++;
          }
        });
        if (0 < s.length) {
          $("#suggestions").html(s).show();
        } else {
          _setEmpty();
        }
      }
    }), void window.setTimeout(function() {
      var toLength = $("#suggestions span").length;
      if (40 == t) {
        if (j < 1) {
          j = 1;
        } else {
          update("deselect", j);
          if (j < toLength) {
            j++;
          } else {
            j = 0;
          }
        }
        if (0 < j) {
          update("select", j);
          update("input", $("#suggestions #s_" + j).html());
        } else {
          update("input", last);
        }
      } else {
        if (38 == t) {
          if (j < 1) {
            j = toLength;
          } else {
            update("deselect", j);
            if (0 < j) {
              j--;
            }
          }
          if (0 < j) {
            update("select", j);
            update("input", $("#suggestions #s_" + j).html());
          } else {
            update("input", last);
          }
        } else {
          last = id;
        }
      }
    }, 100)));
  });
  $(document).on("keypress", "#query", function(event) {
    var t = event.which || event.keyCode;
    if (!(8 != t && 32 != t && 39 != t)) {
      j = 0;
    }
  });
  $(document).on("mouseover", "#suggestions span", function() {
    var i = $(this).attr("id").split("_")[1];
    if (0 < j) {
      update("deselect", j);
    }
    update("select", i);
    j = parseInt(i);
  });
  $(document).on("click", "#suggestions span", function() {
    update("input", $("#suggestions #s_" + j).html());
    $("form").submit();
  });

  $(document).on("submit", "form", function() {
    return _setEmpty(), function() {
        $("#results").remove();
      result = {};
      n = "";
      var value = $.trim($("#query").val().replace(/\s{2,}/g, " "));
      if (value.length < 1 || "please enter a valid artist name or song name" == value.toLowerCase()) {
        return $("#query").val("Please enter a valid artist name or song name");
      }
      var unit = function(e) {
        if (-1 < e.indexOf("youtube.com/")) {
          var corner = !!(corner = /v=[a-zA-Z0-9\-_]{11}/.exec(e)) && corner.toString().substr(2);
        } else {
          if (-1 < e.indexOf("youtu.be/")) {
            corner = !!(corner = /\/[a-zA-Z0-9\-_]{11}/.exec(e)) && corner.toString().substr(1);
          }
        }
        return corner;
      }(value);
      if (unit) {
        $("html, body").animate({
          scrollTop : $("#results").offset().top
        });
      } else {
        $("#load").show();
        var text = "";
        $.ajax({
          url : "/search.php",
          data : {
            q : value.replace(/\s_/g, "_")
          },
          dataType : "json",
          success : function(json) {
            var data = json.items;
            var query = json.query;
            if ($("#load").hide(), 0 < data.length) {
                for (i = 0; i < data.length; i++) {
                text = text + '<div id="result_'+i+'" class="result"> <div class="name">'+data[i].title+'</div> <div class="properties">Source: YouTube • Duration: '+data[i].duration+' • Bitrate: 192 kbps</div> <div class="options"><a data-down="'+data[i].id+'" data-title="'+data[i].title+'" href="#" rel="nofollow" target="_self" class="download">Download</a><a data-play="'+data[i].id+'" href="#" rel="nofollow" class="player">Play</a></div> </div>';
                i++;
              }
              $("#text").before('<div id="results"><p>Here you can find all search results for your search query &bdquo;{Q}&rdquo;. We\'ve found {C} matching results. Now you have the opportunity to listen to each result before downloading it. If you wish to do so, click on the &bdquo;Play&rdquo; button.</p>{R}</div>'.replace(/{Q}/, query).replace(/{C}/, data.length).replace(/{R}/, text));
            } else {
              $("#text").before('<div id="error">' + data + "</div>");
            }
            $("html, body").animate({
              scrollTop : $("form").offset().top
            });
          }
        });
      }
    }(), false;
  });
$(document).ready(function () {
  $('#clicksearch').click(function (e) { 
    e.preventDefault();
    var keyword = $('.valku').val();

    console.log('Search '+keyword);
  });
  
  $(document).on('click','.download',function(e){
    var ytid = $(this).data('down');
    var title = $(this).data('title');
    console.log(ytid);
    if($(this).text() == 'Download'){
    $(this).text('Close');
    $(this).parent().parent().after('<div id="initiaze-'+ytid+'" class="file margin">Initiliazing downloader <i class="fa fa-cog fa-spin"></i></div>');
    setTimeout(function(){
      $('#initiaze-'+ytid).html(`
    
    <div id="download" class="file margin">
    <div class="name">`+title+`</div><hr>
    <div class="options" style="display: block;">
    <a href="#" rel="nofollow" data-frame="`+ytid+`" id="iframeku" class="url">Download</a>
    <a href="#" class="save-cloud" data-cloud="`+ytid+`" id="cloudku">Save to cloud</a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=`+window.location.href+`" rel="nofollow" target="_blank">Share on <i class="fa fa-facebook-official"></i></a>
    </div>
    `);
    }, 500);
    }else{
    $('#initiaze-'+ytid).remove();
    $(this).text('Download');
    }
    e.preventDefault();
  });
  $(document).on('click','.player',function(e){
    var ytid = $(this).data('play');
    console.log(ytid);
    if($(this).text() == 'Play'){
    $(this).text('Stop');
    $('#player-'+ytid).remove();
    $(this).parent().parent().before('<div id="player-'+ytid+'" class="file margin">Loading player <i class="fa fa-cog fa-spin"></i></div>');
    setTimeout(function(){
    $('#player-'+ytid).html(`
    <div id="player"><iframe src="https://stream.download-lagu-mp3.com/video.php?id=`+ytid+`" width="100%" height="315" scrolling="no" frameborder="none" allow="autoplay"></iframe></div>
    `);
    }, 500);
    }else{
    $('#player-'+ytid).remove();
    $(this).text('Play');
    }
    e.preventDefault();
  });
  $(document).on('click','.url',function(e){
    var ytid = $(this).data('frame');
    if($(this).text() == 'Download'){
    $(this).text('Close');
    $(this).parent().parent().prepend('<div class="frameme" id="fra-'+ytid+'"><iframe style="border:none;width:100%;height:100%;margin:10px;" src="https://api.download-lagu-mp3.com/@api/button/mp3/'+ytid+'"></iframe></div>');
    }else{
    $('#fra-'+ytid).remove();
    $('#loader-'+ytid).remove();
    $(this).text('Download');
    }
    e.preventDefault();
  });
  $(document).on('click','.save-cloud',function(e){
    var ytid = $(this).data('cloud');
    if($(this).text() == 'Save to cloud'){
    let ini = this;
    $(ini).parent().parent().append('<div id="loader-'+ytid+'" class="file margin">Loading API Handler <i class="fa fa-cog fa-spin"></i></div>');
        if(typeof window.api_file[ytid] == "undefined"){
            $.ajax({
                url: 'https://api.download-lagu-mp3.com/@api/json/mp3/'+ytid,
                type: "get",
                success: function(data){
                    if(data['error'] != true){
                    $('#loader-'+ytid).remove();
                    window.api_file[ytid] = {file:'https:'+data['vidInfo'][0]['dloadUrl'],
                                    title:data['vidTitle']+' (mp3juices.blog).mp3'
                                    };
    $(ini).text('Close Panel');
    $(ini).parent().parent().append('<div class="providers" id="pro-'+ytid+'"><br><a href="#" data-file="'+api_file[ytid]['file']+'" data-title="'+api_file[ytid]['title']+'" class="dropbox-save"><i class="fa fa-dropbox"></i> Dropbox</a><a href="#" data-file="'+api_file[ytid]['file']+'" data-title="'+api_file[ytid]['title']+'" class="drive-save"><i class="fa fa-google"></i> Google Drive</a></div><div class="script-load" id="script-load"></div>');
                }else{
                    $(ini).parent().parent().append('<div id="loader-'+ytid+'" class="file margin">Failed to communicate with Script Loader</div>');
                }
                }
            });
        }else{
    $('#loader-'+ytid).remove();
    $(ini).text('Close Panel');
    $(ini).parent().parent().append('<div class="providers" id="pro-'+ytid+'"><br><a href="#" data-file="'+api_file[ytid]['file']+'" data-title="'+api_file[ytid]['title']+'" class="dropbox-save"><i class="fa fa-dropbox"></i> Dropbox</a><a href="#" data-file="'+api_file['file']+'" data-title="'+api_file[ytid]['title']+'" class="drive-save"><i class="fa fa-google"></i> Google Drive</a></div><div class="script-load" id="script-load"></div>');
        }
    }else{
    $('#loader-'+ytid).remove();
    $(this).text('Save to cloud');
    $('#script-load').remove();
    $('#pro-'+ytid).remove();
    }
    e.preventDefault();
  });
  $(document).on('click','.dropbox-save',function(e){
    let ini = this;
    var title = $(ini).data('title');
    var file = $(ini).data('file');
    $('.script-load').html('');
    $(ini).parent().parent().append('<div id="boxloader" class="file margin">Loading dropbox <i class="fa fa-cog fa-spin"></i></div>');
                a = document.createElement("script");
                a.setAttribute("type", "text/javascript"),
                a.setAttribute("src", "https://www.dropbox.com/static/api/2/dropins.js");
                a.setAttribute("id", "dropboxjs");
                a.setAttribute("data-app-key", "me8o1cgssw1ikgt");
                document.body.appendChild(a);
                a.onload = function() {
            if(Dropbox){
            $('#boxloader').remove();
    var options = {};
    var button = Dropbox.createSaveButton(file, title, options);
  $('.script-load').append('<div class="provider_progress">Cloud script was successfully loaded. Please click the save button to save the file.</div>');
  $('.script-load').append(button);
    }else{
    $(ini).parent().parent().append('<div id="boxloader" class="provider_progress">Failed load dropbox</div>');
    }
}
    e.preventDefault();
  });
  $(document).on('click','.drive-save',function(e){
    let ini = this;
    var title = $(ini).data('title');
    var file = $(ini).data('file');
    $('.script-load').html('');
    $(ini).parent().parent().append('<div id="boxloader" class="file margin">Loading Drive <i class="fa fa-cog fa-spin"></i></div>');
    if(typeof gapi == "undefined"){
                a = document.createElement("script");
                a.setAttribute("type", "text/javascript"),
                a.setAttribute("src", "https://apis.google.com/js/platform.js");
                document.body.appendChild(a);
                a.onload = function() {
            if(gapi){
            $('#boxloader').remove();
    
  $('.script-load').append('<div class="provider_progress">Cloud script was successfully loaded. Please click the save button to save the file.</div><div id="drivezone"></div>');
    var button = gapi.savetodrive.render("drivezone", {
                        src: file,
                        filename: title,
                        sitename: window.location.hostname
                    });
    }else{
    $(ini).parent().parent().append('<div id="boxloader" class="provider_progress">Failed load Google Drive Scirpt</div>');
    }
    }
}else{
            if(gapi){
            $('#boxloader').remove();
    
  $('.script-load').append('<div class="provider_progress">Cloud script was successfully loaded. Please click the save button to save the file.</div><div id="drivezone"></div>');
    var button = gapi.savetodrive.render("drivezone", {
                        src: file,
                        filename: title,
                        sitename: "mp3juices.blog"
                    });
    }else{
    $(ini).parent().parent().append('<div id="boxloader" class="provider_progress">Failed load Google Drive Scirpt</div>');
    }
}
    e.preventDefault();
  });
});
