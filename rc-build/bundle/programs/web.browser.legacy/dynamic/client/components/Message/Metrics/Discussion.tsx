function module(e,n,t){var l,o,c,a,i,u,r;t.link("react",{default:function(e){l=e}},0),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){o=e}},1),t.link("../../../hooks/useTimeAgo",{useTimeAgo:function(e){c=e}},2),t.link("..",{default:function(e){a=e},Reply:function(e){i=e},Content:function(e){u=e}},3),t.link("../hooks/useBlockRendered",{useBlockRendered:function(e){r=e}},4);var s=function(e){var n=e.lm,t=e.count,s=e.rid,m=e.drid,d=e.openDiscussion,f=o(),k=c(),E=r(),g=E.className,v=E.ref;return l.createElement(u,null,l.createElement("div",{className:g,ref:v}),l.createElement(i,{"data-rid":s,"data-drid":m,onClick:d},t?f("message_counter",{counter:t,count:t}):f("Reply")),l.createElement(a,null,l.createElement(a.Item,{title:null==n?void 0:n.toLocaleString()},l.createElement(a.Item.Icon,{name:"clock"}),l.createElement(a.Item.Label,null,n?k(n):f("No_messages_yet")))))};t.exportDefault(s)}

