function module(e,t,n){let r,a,o,l,s,u,i,c,m,d,w,h,k,p,E,f,x,y;n.link("meteor/meteor",{Meteor(e){r=e}},0),n.link("react",{default(e){a=e},useState(e){o=e},useCallback(e){l=e},useMemo(e){s=e}},1),n.link("@rocket.chat/fuselage",{Button(e){u=e},TextInput(e){i=e},Field(e){c=e},Modal(e){m=e},Box(e){d=e},Throbber(e){w=e}},2),n.link("@rocket.chat/fuselage-hooks",{useSafely(e){h=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation(e){k=e}},4),n.link("../../../contexts/UserContext",{useUser(e){p=e}},5),n.link("../../../contexts/ServerContext",{useMethod(e){E=e}},6),n.link("../../../hooks/useMethodData",{useMethodData(e){f=e}},7),n.link("../../../contexts/RouterContext",{useRouteParameter(e){x=e},useRoute(e){y=e}},8);const _=function(){let{requirePasswordChange:e,requirePasswordChangeReason:t=(e?"You_need_to_change_your_password":"Please_enter_your_new_password_below")}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t},g=()=>{const e=p(),t=k(),n=E("setUserPassword"),g=E("resetPassword"),C=x("token"),P=s(()=>[{token:C}],[C]),{value:{enabled:b,policy:T}={}}=f("getPasswordPolicy",P),R=y("home"),v=_(e||{}),[M,D]=o(""),[S,U]=h(o(!1)),[q,A]=h(o()),B=l(e=>D(e.currentTarget.value),[D]),F=!M.trim()||S,H=l(async e=>{if(e.preventDefault(),!F){U(!0);try{if(C&&g){const e=await g(C,M);await r.loginWithToken(e.token),R.push({})}else await n(M)}catch({error:q,reason:t=q}){A(t)}finally{U(!1)}}},[F,U,C,g,M,R,n,A]);return a.createElement(m,{is:"form",onSubmit:H},a.createElement(m.Header,null,a.createElement(m.Title,{textAlign:"start"},t("Password"))),a.createElement(m.Content,null,a.createElement(c,null,a.createElement(c.Label,null,t(v)),a.createElement(c.Row,null,a.createElement(i,{placeholder:t("Type_your_new_password"),type:"password",name:"newPassword",id:"newPassword",dir:"auto",onChange:B,autoComplete:"off",value:M})),q&&a.createElement(c.Error,null,q),b&&a.createElement(c.Hint,null,T.map((e,n)=>a.createElement(d,{is:"p",textAlign:"start",key:n},t(...e)))))),a.createElement(m.Footer,null,a.createElement(c,null,a.createElement(c.Row,null,a.createElement(u,{primary:!0,disabled:F,type:"submit"},S?a.createElement(w,{size:"x12",inheritColor:!0}):t("Reset"))))))};n.exportDefault(g)}
