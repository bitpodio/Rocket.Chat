function module(e,t,n){let l,a,i,o,s,r,u,c,m,f,d,p,b,h,E;n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("react",{default(e){i=e},useRef(e){o=e},useCallback(e){s=e},useState(e){r=e},useMemo(e){u=e},useEffect(e){c=e}},0),n.link("@rocket.chat/fuselage",{Button(e){m=e},PositionAnimated(e){f=e},Options(e){d=e},useCursor(e){p=e},Box(e){b=e}},1),n.link("../contexts/TranslationContext",{useTranslation(e){h=e}},2),n.link("./UserStatus",{UserStatus(e){E=e}},3);const k=e=>{let{onChange:t=(()=>{}),optionWidth:n,initialStatus:k="offline",placement:y="bottom-end"}=e,x=a(e,["onChange","optionWidth","initialStatus","placement"]);const g=h(),[w,C]=r(k),S=u(()=>{const e=(e,t)=>i.createElement(b,{display:"flex",flexDirection:"row",alignItems:"center"},i.createElement(b,{marginInlineEnd:"x8"},i.createElement(E,{status:e})),t);return[["online",e("online",g("Online"))],["busy",e("busy",g("Busy"))],["away",e("away",g("Away"))],["offline",e("offline",g("Invisible"))]]},[g]),[B,v,D,I,[U,W,A]]=p(-1,S,(e,t)=>{let[n]=e,[,l]=t;C(n),I(),l()}),K=o(),O=s(()=>{K.current.focus(),A(),K.current.classList.add("focus-visible")},[A]),P=s(e=>{let[t]=e;C(t),I(),W()},[W,I]);return c(()=>t(w),[w,t]),i.createElement(i.Fragment,null,i.createElement(m,l({ref:K,small:!0,square:!0,ghost:!0,onClick:O,onBlur:W,onKeyUp:D,onKeyDown:v},x),i.createElement(E,{status:w})),i.createElement(f,{width:"auto",visible:U,anchor:K,placement:y},i.createElement(d,{width:n,onSelect:P,options:S,cursor:B})))};n.exportDefault(k)}
