"use strict";
function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

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

    return $searchField.ghostHunter({
        results: "#search-results",
        rss: 'http://biothings.io:9000/tag/mygene-info/rss',
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
