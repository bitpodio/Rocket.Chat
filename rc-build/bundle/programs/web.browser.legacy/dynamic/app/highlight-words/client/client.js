function module(t,e,r){var i,n,g;r.export({createHighlightWordsMessageRenderer:function(){return h}}),r.link("./helper",{highlightWords:function(t){i=t},getRegexHighlight:function(t){n=t},getRegexHighlightUrl:function(t){g=t}},0);var h=function(t){var e,r=t.wordsToHighlight.map((function(t){return{highlight:t,regex:n(t),urlRegex:g(t)}}));return function(t){var e;return null!==(e=t.html)&&void 0!==e&&e.trim()?(t.html=i(t.html,r),t):t}}}
