function module(e,n,t){var o,l,r,i,c,a,u,f,d,x,s,h,m,p;t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},1),t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},3),t.link("@rocket.chat/fuselage",{Box:function(e){c=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){a=e}},1),t.link("react",{default:function(e){u=e},createContext:function(e){f=e},useContext:function(e){d=e},useState:function(e){x=e}},2),t.link("../contexts/SidebarContext",{useSidebar:function(e){s=e}},3),t.link("./ScrollableContentWrapper",{default:function(e){h=e}},4),t.link("./burger/BurgerMenuButton",{default:function(e){m=e}},5),t.link("../contexts/SessionContext",{useSession:function(e){p=e}},6);var b=f([!1,function(){}]),k=function(e){var n=x(!1),t=i(n,2),o=t[0],l=t[1];return(u.createElement(b.Provider,{value:[o,l]},u.createElement(c,r({backgroundColor:"surface",is:"section",display:"flex",flexDirection:"column",flexGrow:1,flexShrink:1,height:"full",overflow:"hidden"},e))))},S=function(e){var n=e.children,t=void 0===n?void 0:n,o=e.title,f=l(e,["children","title"]),x=d(b),h,k=i(x,1)[0],S=a("(max-width: 780px)"),C=s(),g=i(C,2),v=g[0],E=g[1],w=p("unread"),y=function(){E((function(e){return!e}))};return u.createElement(c,{borderBlockEndWidth:"x2",borderBlockEndColor:k?"neutral-200":"transparent"},u.createElement(c,r({marginBlock:"x16",marginInline:"x24",minHeight:"x40",display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"center",color:"neutral-800"},f),S&&u.createElement(m,{open:v,badge:w,marginInlineEnd:"x8",onClick:y}),u.createElement(c,{is:"h1",fontScale:"h1",flexGrow:1},o),t))},C=u.forwardRef(function(){function e(e,n){return u.createElement(c,r({ref:n,paddingInline:"x24",display:"flex",flexDirection:"column",overflowY:"hidden",height:"full"},e))}return e}()),g=u.forwardRef((function(e,n){var t=e.onScrollContent,o=l(e,["onScrollContent"]);return(u.createElement(c,{display:"flex",flexShrink:1,flexDirection:"column",flexGrow:1,overflow:"hidden"},u.createElement(h,{onScroll:t,ref:n},u.createElement(c,r({p:"x16",display:"flex",flexDirection:"column",flexGrow:1},o)))))})),v=function(e){var n=e.onScrollContent,t=l(e,["onScrollContent"]),c=d(b),a,f=i(c,2)[1];return u.createElement(g,r({onScrollContent:function(e){var t=e.top,r=l(e,["top"]);f(!!t),n&&n(o({top:t},r))}},t))};t.exportDefault(Object.assign(k,{Header:S,Content:C,ScrollableContent:g,ScrollableContentWithShadow:v}))}
