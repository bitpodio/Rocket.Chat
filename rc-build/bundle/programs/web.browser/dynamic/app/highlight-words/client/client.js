function module(e,t,g){let h,l,r;g.export({createHighlightWordsMessageRenderer:()=>i}),g.link("./helper",{highlightWords(e){h=e},getRegexHighlight(e){l=e},getRegexHighlightUrl(e){r=e}},0);const i=e=>{let{wordsToHighlight:t}=e;const g=t.map(e=>({highlight:e,regex:l(e),urlRegex:r(e)}));return e=>{var t;return null!==(t=e.html)&&void 0!==t&&t.trim()?(e.html=h(e.html,g),e):e}}}

