function module(e,n,t){var r,i,a,l,u,o,c,f;t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},2),t.link("@rocket.chat/fuselage",{Box:function(e){l=e}},0),t.link("react",{default:function(e){u=e},useMemo:function(e){o=e}},1),t.link("marked",{default:function(e){c=e}},2),t.link("dompurify",{default:function(e){f=e}},3);var d=new c.Renderer,s=new c.Renderer,m=new c.Renderer;c.InlineLexer.rules.gfm=a(a({},c.InlineLexer.rules.gfm),{},{strong:/^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,em:/^__(?=\S)([\s\S]*?\S)__(?!_)|^_(?=\S)([\s\S]*?\S)_(?!_)/});var h=function(e,n,t){return'<a href="'+e+'" target="_blank" rel="nofollow">'+t+"</a> "},p=function(e){return e},k=function(){return" "},v=function(e){var n;return"<li>"+e.replace(/<p.*?>|<\/p>/gi,"")+"</li>"};d.link=h,d.listitem=v,s.link=h,s.paragraph=p,s.listitem=v,m.link=h,m.paragraph=p,m.br=k,m.listitem=v;var S={gfm:!0,headerIds:!1},b=a(a({},S),{},{renderer:d}),g=a(a({},S),{},{renderer:s}),_=a(a({},S),{},{renderer:m}),w=function(e){var n=e.content,t=e.variant,a=void 0===t?"document":t,d=e.withTruncatedText,s=void 0!==d&&d,m=e.preserveHtml,h=void 0!==m&&m,p=i(e,["content","variant","withTruncatedText","preserveHtml"]),k=f.sanitize,v,S=a;switch(a){case"inline":v=g;break;case"inlineWithoutBreaks":v=_;break;case"document":default:v=b}var w=o((function(){var e=n&&"string"==typeof n&&c(n,v);return h?e:e&&k(e,{ADD_ATTR:["target"]})}),[n,h,k,v]);return w?u.createElement(l,r({dangerouslySetInnerHTML:{__html:w},withTruncatedText:s,withRichContent:S},p)):null};t.exportDefault(w)}

