function module(e,t,n){var l,a,i,o,r,m,c,s,u,f,x,d,p;function g(e){return null!=e&&"function"==typeof e[Symbol.iterator]}n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},2),n.link("react",{default:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){r=e},Button:function(e){m=e},Icon:function(e){c=e}},1),n.link("../../../../../components/avatar/UserAvatar",{default:function(e){s=e}},2),n.link("../../../../../components/RawText",{default:function(e){u=e}},3),n.link("../../../components/Message",{"*":function(e){f=e}},4),n.link("../../../../../components/Message/NotificationStatus",{"*":function(e){x=e}},5),n.link("../../../../../components/Message/helpers/followSyle",{followStyle:function(e){d=e},anchor:function(e){p=e}},6),n.exportDefault(o.memo(function(){function e(e){var t=e._id,n=e.msg,E=e.following,b=e.username,h=e.name,k=void 0===h?b:h,w=e.ts,y=e.replies,v=e.participants,S=e.handleFollowButton,z=e.unread,N=e.mention,B=e.all,C=e.t,I=void 0===C?function(e){return e}:C,M=e.formatDate,_=void 0===M?function(e){return e}:M,D=e.tlm,F=e.className,T=void 0===F?[]:F,W=i(e,["_id","msg","following","username","name","ts","replies","participants","handleFollowButton","unread","mention","all","t","formatDate","tlm","className"]),A=E?"bell":"bell-off",U=I(E?"Following":"Not_Following");return o.createElement(f.Message,l({},W,{className:[].concat(a(g(T)?T:[T]),[!E&&d]).filter(Boolean)}),o.createElement(f.Container,{mb:"neg-x2"},o.createElement(s,{username:b,className:"rcx-message__avatar",size:"x36"})),o.createElement(f.Container,{width:"1px",mb:"neg-x4",flexGrow:1},o.createElement(f.Header,null,o.createElement(f.Username,{title:b},k),o.createElement(f.Timestamp,{ts:_(w)})),o.createElement(f.BodyClamp,null,o.createElement(u,null,n)),o.createElement(r,{mi:"neg-x2",flexDirection:"row",display:"flex",alignItems:"baseline",mbs:"x8"},o.createElement(r,{display:"flex",alignItems:"center",is:"span",fontSize:"x12",color:"neutral-700",fontWeight:"600"},o.createElement(c,{name:"thread",size:"x20",mi:"x2"}),y),o.createElement(r,{display:"flex",alignItems:"center",is:"span",fontSize:"x12",color:"neutral-700",fontWeight:"600"},o.createElement(c,{name:"user",size:"x20",mi:"x2"}),v),o.createElement(r,{display:"flex",alignItems:"center",is:"span",fontSize:"x12",color:"neutral-700",fontWeight:"600",withTruncatedText:!0,flexShrink:1,mi:"x2"},o.createElement(c,{name:"clock",size:"x20",mi:"x2"})," ",_(D)," "))),o.createElement(f.Container,{alignItems:"center"},o.createElement(m,{className:p,small:!0,square:!0,flexShrink:0,ghost:!0,"data-following":E,"data-id":t,onClick:S,title:U,"aria-label":U},o.createElement(c,{name:A,size:"x20"})),N&&o.createElement(x.Me,{t:I,mb:"x24"})||B&&o.createElement(x.All,{t:I,mb:"x24"})||z&&o.createElement(x.Unread,{t:I,mb:"x24"})))}return e}()))}

