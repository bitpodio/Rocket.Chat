function module(e,t,n){var r,a,i,u,o,l,c,s,d,f,m,p,v,h,b,k,x,T,g,S,y,E,w,A,I,_,R,C,B,M,V,D,N,U,L,q,z,j,P;function W(){var e=r(["left: 0; top: 0;"]);return W=function(){return e},e}n.link("@babel/runtime/helpers/taggedTemplateLiteralLoose",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},2),n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){u=e}},3),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},4),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},5),n.link("react",{default:function(e){c=e},forwardRef:function(e){s=e},useState:function(e){d=e},useMemo:function(e){f=e},useEffect:function(e){m=e},useRef:function(e){p=e}},0),n.link("meteor/meteor",{Meteor:function(e){v=e}},1),n.link("@rocket.chat/fuselage",{Sidebar:function(e){h=e},TextInput:function(e){b=e},Box:function(e){k=e},Icon:function(e){x=e}},2),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){T=e},useDebouncedValue:function(e){g=e},useStableArray:function(e){S=e},useAutoFocus:function(e){y=e},useUniqueId:function(e){E=e}},3),n.link("memoize-one",{default:function(e){w=e}},4),n.link("@rocket.chat/css-in-js",{css:function(e){A=e}},5),n.link("react-virtuoso",{Virtuoso:function(e){I=e}},6),n.link("tinykeys",{default:function(e){_=e}},7),n.link("../../components/UserStatus",{ReactiveUserStatus:function(e){R=e}},8),n.link("../../contexts/TranslationContext",{useTranslation:function(e){C=e}},9),n.link("../../contexts/SettingsContext",{useSetting:function(e){B=e}},10),n.link("../../../app/utils",{roomTypes:function(e){M=e}},11),n.link("../../contexts/UserContext",{useUserPreference:function(e){V=e},useUserSubscriptions:function(e){D=e}},12),n.link("../RoomList",{SideBarItemTemplateWithData:function(e){N=e}},13),n.link("../hooks/useTemplateByViewMode",{useTemplateByViewMode:function(e){U=e}},14),n.link("../hooks/useAvatarTemplate",{useAvatarTemplate:function(e){L=e}},15),n.link("../../../lib/escapeRegExp",{escapeRegExp:function(e){q=e}},16),n.link("../../hooks/useMethodData",{useMethodData:function(e){z=e}},17),n.link("../../hooks/useAsyncState",{AsyncStatePhase:function(e){j=e}},18),n.link("../../components/ScrollableContentWrapper",{default:function(e){P=e}},19);var K=w((function(e,t,n,r,a,i,u){return{items:e,t:t,SideBarItemTemplate:n,AvatarTemplate:r,useRealName:a,extended:i,sidebarViewMode:u}})),$=c.memo((function(e){var t=e.item,n=e.data,r=n.t,a=n.SideBarItemTemplate,i=n.AvatarTemplate,u=n.useRealName,o=n.extended;return"d"!==t.t||t.u?c.createElement(N,{id:"search-"+t._id,tabIndex:-1,extended:o,t:r,room:t,SideBarItemTemplate:a,AvatarTemplate:i}):c.createElement(F,{id:"search-"+t._id,useRealName:u,t:r,item:t,SideBarItemTemplate:a,AvatarTemplate:i})})),F=c.memo((function(e){var t=e.item,n=e.id,r=e.style,a=e.t,i=e.SideBarItemTemplate,u=e.AvatarTemplate,o=e.useRealName,l=e.sidebarViewMode,s=o?t.fname||t.name:t.name||t.fname,d="medium"!==l,f=c.createElement(h.Item.Icon,null,c.createElement(R,{small:d&&"small",uid:t._id})),m=M.getRouteLink(t.t,t);return c.createElement(i,{is:"a",style:{height:"100%"},id:n,href:m,title:s,subtitle:a("No_messages_yet"),avatar:u&&c.createElement(u,t),icon:f,style:r})})),H=v.Device.isDesktop()?window.navigator.platform.toLowerCase().includes("mac")?"(⌘+K)":"(⌃+K)":"",O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,n=/(@|#)?(.*)/i,r=e.match(n),a=l(r,3),i=a[1],u=a[2],o="#"===i,c="@"===i,s=f((function(){return o?{users:!1,rooms:!0}:c?{users:!0,rooms:!1}:{users:!0,rooms:!0}}),[o,c]),d=f((function(){return[u,t,s]}),[s,u,t]),m=z("spotlight",d),p=m.value,v=void 0===p?{users:[],rooms:[]}:p,h=m.phase;return f((function(){return v?{data:v,status:h}:{data:{users:[],rooms:[]},status:"loading"}}),[v,h])},X={sort:{lm:-1,name:1}},G=function(e){var t=/(@|#)?(.*)/i,n=e.match(t),r=l(n,3),a=r[1],i=r[2],c=f((function(){var e=new RegExp(q(i),"i");return o({$or:[{name:e},{fname:e}]},a&&{t:"@"===a?"d":{$ne:"d"}})}),[i,a]),s=D(c,X),d=S(u(null==s?void 0:s.map((function(e){var t=e.t,n=e.name;return"d"===t?n:null}))).filter(Boolean)),m=O(e,d),p=m.data,v=m.status;return f((function(){var e=[],t=function(e,t,n){var r=e._id;return t===n.findIndex((function(e){return r===e._id}))},n=function(e){return!s.find((function(t){var n;return"d"===e.t&&(null===(n=e.uids)||void 0===n?void 0:n.length)>1&&e.uids.includes(t._id)||[t.rid,t._id].includes(e._id)}))},r=function(e){return!s.find((function(t){var n;return"d"===t.t&&2===(null===(n=t.uids)||void 0===n?void 0:n.length)&&t.uids.includes(e._id)}))},a=function(e){return{_id:e._id,t:"d",name:e.username,fname:e.name,avatarETag:e.avatarETag}},o=e.filter((function(e){return[e.usernamame,e.name,e.fname].includes(i)}));return e.push.apply(e,u(p.users.filter(t).filter(r).map(a))),e.push.apply(e,u(p.rooms.filter(n))),{data:Array.from(new Set([].concat(u(o),u(s),e))),status:v}}),[s,i,p])},J=function(e){var t=d(e),n=l(t,2),r=n[0],a=n[1],i;return{value:r,onChange:T((function(e){a(e.currentTarget.value)})),setValue:a}},Q=function(e,t,n){n.setAttribute("aria-activedescendant",e.id),e.setAttribute("aria-selected",!0),e.classList.add("rcx-sidebar-item--selected"),t&&(t.setAttribute("aria-selected",!1),t.classList.remove("rcx-sidebar-item--selected"))},Y=s((function(e,t){return c.createElement(P,a({},e,{ref:t,renderView:function(e){var t=e.style,n=i(e,["style"]);return(c.createElement("div",a({},n,{className:"teste",style:o(o({},t),{},{overflowX:"hidden"})})))},renderTrackHorizontal:function(e){return c.createElement("div",a({},e,{style:{display:"none"},className:"track-horizontal"}))}}))})),Z=c.forwardRef(function(){function e(e,t){var n=e.onClose,r=E(),u=C(),o=J(""),l=o.setValue,s=i(o,["setValue"]),d=y(),f=p(),v=p(),S=p(),w=p(0),R=V("sidebarViewMode"),M=B("UI_Use_Real_Name"),D=U(),N=L(),q="extended"===R,z=g(s.value,100),P=[u("Search"),H].filter(Boolean).join(" "),F=G(z),O=F.data,X=F.status,Z=K(O,u,D,N,M,q,R),ee=T((function(e){var t=null;return(t="up"===e?S.current.parentElement.previousSibling.querySelector("a"):S.current.parentElement.nextSibling.querySelector("a"))?(Q(t,S.current,d.current),t):S.current})),te=T((function(){var e;w.current=0,f.current.scrollToIndex({index:w.current}),S.current=null===(e=v.current)||void 0===e?void 0:e.querySelector("a.rcx-sidebar-item"),S.current&&Q(S.current,void 0,d.current)}));return m((function(){te()})),m((function(){te()}),[z,te]),m((function(){if(d.current){var e=_(d.current,{Escape:function(e){e.preventDefault(),l((function(e){return e||n(),te(),""}))},Tab:n,ArrowUp:function(){var e=ee("up");w.current=Math.max(w.current-1,0),f.current.scrollToIndex({index:w.current}),S.current=e},ArrowDown:function(){var e=ee("down");w.current=Math.min(w.current+1,(null==O?void 0:O.length)+1),f.current.scrollToIndex({index:w.current}),S.current=e},Enter:function(){S.current&&S.current.click()}});return function(){e()}}}),[d,ee,O.length,n,te,l]),c.createElement(k,{position:"absolute","rcx-sidebar":!0,h:"full",display:"flex",flexDirection:"column",zIndex:99,w:"full",className:A(W()),ref:t},c.createElement(h.TopBar.Section,{role:"search",is:"form"},c.createElement(b,a({"aria-owns":r,"data-qa":"sidebar-search-input",ref:d},s,{placeholder:P,addon:c.createElement(x,{name:"cross",size:"x20",onClick:n})}))),c.createElement(k,{ref:v,"aria-expanded":"true",role:"listbox",id:r,tabIndex:-1,flexShrink:1,h:"full",w:"full","data-qa":"sidebar-search-result",onClick:n,"aria-busy":X!==j.RESOLVED},c.createElement(I,{style:{height:"100%",width:"100%"},totalCount:null==O?void 0:O.length,data:O,components:{Scroller:Y},itemContent:function(e,t){return c.createElement($,{data:Z,item:t})},ref:f})))}return e}());n.exportDefault(Z)}
