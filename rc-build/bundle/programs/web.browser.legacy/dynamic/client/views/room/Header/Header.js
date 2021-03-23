function module(e,t,n){var o,l,r,a,u,c,i,m,f,s,E,d,k,p,v,x;n.link("react",{default:function(e){o=e}},0),n.link("../../../components/Header",{default:function(e){l=e}},1),n.link("../../../components/Breadcrumbs",{default:function(e){r=e}},2),n.link("../../../hooks/useRoomIcon",{useRoomIcon:function(e){a=e}},3),n.link("./icons/Encrypted",{default:function(e){u=e}},4),n.link("./icons/Favorite",{default:function(e){c=e}},5),n.link("./icons/Translate",{default:function(e){i=e}},6),n.link("./ToolBox",{default:function(e){m=e}},7),n.link("../../../components/avatar/RoomAvatar",{default:function(e){f=e}},8),n.link("../../../contexts/LayoutContext",{useLayout:function(e){s=e}},9),n.link("./Burger",{default:function(e){E=e}},10),n.link("../../../components/MarkdownText",{default:function(e){d=e}},11),n.link("../../../../app/utils",{roomTypes:function(e){k=e}},12),n.link("../../../contexts/UserContext",{useUserSubscription:function(e){p=e},useUserId:function(e){v=e}},13),n.link("../../../hooks/useUserData",{useUserData:function(e){x=e}},14),n.exportDefault(o.memo((function(e){var t=e.room,n=s(),l=n.isEmbedded,r=n.showTopNavbarEmbeddedLayout;return l&&!r?null:"d"===t.t&&t.uids.length<3?o.createElement(h,{room:t}):o.createElement(B,{room:t,topic:t.topic})})));var T=function(e){var t=e.room,n=a(t);return o.createElement(r.Icon,{name:n.name},!n.name&&n)},b=function(e){var t=e.room,n=p(t.prid),a=n?k.getRouteLink(n.t,n):null;return o.createElement(r,null,t.prid&&n&&o.createElement(o.Fragment,null,o.createElement(r.Item,null,o.createElement(T,{room:n}),o.createElement(r.Link,{href:a},n.name)),o.createElement(r.Separator,null)),o.createElement(r.Item,null,o.createElement(T,{room:t}),o.createElement(l.Title,null,t.name)))},h=function(e){var t=e.room,n=v(),l=t.uids.filter((function(e){return e!==n})).shift(),r=x(l);return o.createElement(B,{room:t,topic:null==r?void 0:r.statusText})},B=function(e){var t=e.room,n=e.topic,r,a=s().isMobile,k=o.createElement(f,{room:t});return o.createElement(l,null,a&&o.createElement(l.ToolBox,null,o.createElement(E,null)),k&&o.createElement(l.Avatar,null,k),o.createElement(l.Content,null,o.createElement(l.Content.Row,null,o.createElement(b,{room:t}),o.createElement(c,{room:t}),o.createElement(u,{room:t}),o.createElement(i,{room:t})),o.createElement(l.Content.Row,null,o.createElement(l.Subtitle,null,n&&o.createElement(d,{variant:"inlineWithoutBreaks",content:n})))),o.createElement(l.ToolBox,null,o.createElement(m,{room:t})))}}

