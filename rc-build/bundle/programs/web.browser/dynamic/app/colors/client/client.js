function module(e,r,s){s.export({createHexColorPreviewMessageRenderer:()=>l}),s.link("./style.css");const l=()=>e=>{var r;if(null===(r=e.html)||void 0===r||!r.trim())return e;const s=/(?:^|\s|\n)(#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?)\b/g;return e.html=e.html.replace(s,(e,r)=>e.replace(r,'<div class="message-color"><div class="message-color-sample" style="background-color:'.concat(r,'"></div>').concat(r.toUpperCase(),"</div>"))),e}}

