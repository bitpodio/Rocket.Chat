function module(e,l,n){let o,t,i,a,c,r;n.link("@rocket.chat/fuselage",{Banner(e){o=e},Icon(e){t=e}},0),n.link("react",{default(e){i=e},useCallback(e){a=e},useEffect(e){c=e}},1),n.link("../../lib/banners",{"*"(e){r=e}},2);const s=e=>{let{config:l}=e;const{closable:n=!0,title:s,text:u,html:d,icon:m,modifiers:v}=l,f=!(null!=v&&v.includes("large")),b=null!=v&&v.includes("danger")?"danger":"info";c(()=>{if(!l.timer)return;const e=setTimeout(()=>{var e;null===(e=l.onClose)||void 0===e||e.call(void 0),r.close()},l.timer);return()=>{clearTimeout(e)}},[l.onClose,l.timer]);const g=a(()=>{var e;null===(e=l.action)||void 0===e||e.call(void 0)},[l.action]),C=a(()=>{var e;null===(e=l.onClose)||void 0===e||e.call(void 0),r.close()},[l.onClose]);return i.createElement(o,{inline:f,actionable:!!l.action,closeable:n,icon:m?i.createElement(t,{name:m,size:20}):void 0,title:s,variant:b,onAction:g,onClose:C},u,d&&i.createElement("div",{dangerouslySetInnerHTML:{__html:d}}))};n.exportDefault(s)}

