function module(e,t,n){let l,r,o,i,a,c,d,u,f,s,x,h,m;n.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){r=e}},1),n.link("@babel/runtime/helpers/extends",{default(e){o=e}},2),n.link("@rocket.chat/fuselage",{Box(e){i=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery(e){a=e}},1),n.link("react",{default(e){c=e},createContext(e){d=e},useContext(e){u=e},useState(e){f=e}},2),n.link("../contexts/SidebarContext",{useSidebar(e){s=e}},3),n.link("./ScrollableContentWrapper",{default(e){x=e}},4),n.link("./burger/BurgerMenuButton",{default(e){h=e}},5),n.link("../contexts/SessionContext",{useSession(e){m=e}},6);const p=d([!1,()=>void 0]),k=e=>{const[t,n]=f(!1);return(c.createElement(p.Provider,{value:[t,n]},c.createElement(i,o({backgroundColor:"surface",is:"section",display:"flex",flexDirection:"column",flexGrow:1,flexShrink:1,height:"full",overflow:"hidden"},e))))},b=e=>{let{children:t,title:n}=e,l=r(e,["children","title"]);const[d]=u(p),f=a("(max-width: 780px)"),[x,k]=s(),b=m("unread"),S=()=>{k(e=>!e)};return c.createElement(i,{borderBlockEndWidth:"x2",borderBlockEndColor:d?"neutral-200":"transparent"},c.createElement(i,o({marginBlock:"x16",marginInline:"x24",minHeight:"x40",display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"center",color:"neutral-800"},l),f&&c.createElement(h,{open:x,badge:b,marginInlineEnd:"x8",onClick:S}),c.createElement(i,{is:"h1",fontScale:"h1",flexGrow:1},n),t))},S=c.forwardRef((function e(t,n){return c.createElement(i,o({ref:n,paddingInline:"x24",display:"flex",flexDirection:"column",overflowY:"hidden",height:"full"},t))})),C=c.forwardRef((e,t)=>{let{onScrollContent:n}=e,l=r(e,["onScrollContent"]);return(c.createElement(i,{display:"flex",flexShrink:1,flexDirection:"column",flexGrow:1,overflow:"hidden"},c.createElement(x,{onScroll:n,ref:t},c.createElement(i,o({p:"x16",display:"flex",flexDirection:"column",flexGrow:1},l)))))}),g=e=>{let{onScrollContent:t}=e,n=r(e,["onScrollContent"]);const[,i]=u(p);return(c.createElement(C,o({onScrollContent:e=>{let{top:n}=e,o=r(e,["top"]);i(!!n),t&&t(l({top:n},o))}},n)))};n.exportDefault(Object.assign(k,{Header:b,Content:S,ScrollableContent:C,ScrollableContentWithShadow:g}))}

