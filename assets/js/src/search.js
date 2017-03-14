"use strict";

$(function() {
    var $searchField = $("#search-field"),
        $popularTags = $("#popular-tags"),
        showTags,
        hideTags,
        rss_doc;

    showTags = function() {
        return $popularTags.show();
    };

    hideTags = function() {
        return $popularTags.hide();
    };

    $.ajax({
      url:'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fmygene.info%2Frss%2F',
      dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
      success:function(json){
        rss_doc = json;
        console.log("Success rss");
      },
      error:function(){
        alert("Error");
      }      
    });

    return $searchField.ghostHunter({
        results: "#search-results",
        rss: rss_doc,
        zeroResultsInfo: false,
        onKeyUp: true,
        displaySearchInfo: true,
        result_template: "<a class=\"result\" href='{{link}}'>\n  <h2>{{title}}</h2>\n  <h4>{{pubDate}}</h4>\n</a>",
        onComplete: function(query) {
            if (query.length > 0) {
                return hideTags();
            } else {
                return showTags();
            }

        }
    });
});
