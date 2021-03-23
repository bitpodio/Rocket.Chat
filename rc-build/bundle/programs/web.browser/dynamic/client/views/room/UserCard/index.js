function module(e,t,n){let a,o,l,s,i,r,c,u,m,k,p,d,b,f,h,E,g,x,C,A,U;n.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},1),n.link("react",{default(e){l=e},useMemo(e){s=e},useRef(e){i=e}},0),n.link("@rocket.chat/fuselage",{PositionAnimated(e){r=e},AnimatedVisibility(e){c=e},Menu(e){u=e},Option(e){m=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){k=e}},2),n.link("../../../contexts/SettingsContext",{useSetting(e){p=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation(e){d=e}},4),n.link("../../../components/UserCard",{default(e){b=e}},5),n.link("../../../components/Backdrop",{Backdrop(e){f=e}},6),n.link("../../../components/UserStatus",{ReactiveUserStatus(e){h=e}},7),n.link("../../../components/UTCClock",{LocalTime(e){E=e}},8),n.link("../hooks/useUserInfoActions",{useUserInfoActions(e){g=e},useUserInfoActionsSpread(e){x=e}},9),n.link("../../../contexts/AuthorizationContext",{useRolesDescription(e){C=e}},10),n.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){A=e}},11),n.link("../../../hooks/useEndpointData",{useEndpointData(e){U=e}},12);const I=e=>{let{username:t,onClose:n,target:I,open:S,rid:T}=e;const y=i(I),D=C(),v=d(),N=p("UI_Use_Real_Name"),R=s(()=>({username:t}),[t]),{value:_,phase:O}=U("users.info",R);y.current=I;const B=s(()=>{const e=O===A.LOADING,n=e?void 0:null,{user:a}=_||{user:{}},{_id:o,name:s=t,roles:i=n,status:r=null,statusText:c=r,bio:u=n,utcOffset:m=n,nickname:k,avatarETag:p}=a;return{_id:o,name:N?s:t,username:t,roles:i&&D(i).map((e,t)=>l.createElement(b.Role,{key:t},e)),bio:u,etag:p,localTime:Number.isInteger(m)&&l.createElement(E,{utcOffset:m}),status:r&&l.createElement(h,{uid:o,presence:r}),customStatus:c,nickname:k}},[_,t,N,O,D]),M=k(e=>{S&&S(e),n&&n()}),{actions:P,menu:G}=x(g(B,T)),L=s(()=>G?l.createElement(u,{flexShrink:0,mi:"x2",key:"menu",ghost:!1,renderItem:e=>{let{label:{label:t,icon:n}}=e,s=o(e,["label"]);return(l.createElement(m,a({},s,{label:t,icon:n})))},options:G}):null,[G]),j=s(()=>{const e=e=>{let[t,{label:n,icon:a,action:o}]=e;return(l.createElement(b.Action,{key:t,title:n,"aria-label":n,onClick:o,icon:a}))};return[...P.map(e),L].filter(Boolean)},[P,L]);return l.createElement(l.Fragment,null,l.createElement(f,{bg:"transparent",onClick:n}),l.createElement(r,{anchor:y,placement:"top-start",margin:8,visible:c.UNHIDING},l.createElement(b,a({},B,{onClose:n,open:M,actions:j,t:v}))))};n.exportDefault(I)}
