function module(e,t,n){let o,l,a,i,s,r,c,u,f,d,m,h,k,E,g,p;n.link("react",{default(e){o=e},useState(e){l=e},useEffect(e){a=e}},0),n.link("@rocket.chat/fuselage",{Callout(e){i=e},ButtonGroup(e){s=e},Button(e){r=e},Icon(e){c=e}},1),n.link("../../../contexts/AuthorizationContext",{usePermission(e){u=e}},2),n.link("../../../components/NotAuthorizedPage",{default(e){f=e}},3),n.link("../../../components/Page",{default(e){d=e}},4),n.link("../../../contexts/ServerContext",{useMethod(e){m=e},useServerInformation(e){h=e},useEndpoint(e){k=e}},5),n.link("../../../contexts/TranslationContext",{useTranslation(e){E=e}},6),n.link("../../../lib/download",{downloadJsonAs(e){g=e}},7),n.link("./NewInformationPage",{default(e){p=e}},8);const w=o.memo((function e(){const t=E(),n=u("view-statistics"),[w,C]=l(!0),[x,y]=l(),[S,I]=l({}),[P,v]=l([]),[b,A]=l(()=>()=>({})),B=k("GET","statistics"),T=m("instances/get");a(()=>{let e=!1;const t=async function(){let{refresh:t=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};C(!0),y(!1);try{const[n,o]=await Promise.all([B({refresh:t}),T()]);if(e)return;I(n),v(o)}catch(x){y(x)}finally{C(!1)}};return A(()=>t),t(),()=>{e=!0}},[n,T,B]);const z=h(),D=()=>{w||b({refresh:!0})},G=()=>{w||g(S,"statistics")};return x?o.createElement(d,null,o.createElement(d.Header,{title:t("Info")},o.createElement(s,null,o.createElement(r,{primary:!0,type:"button",onClick:D},o.createElement(c,{name:"reload"})," ",t("Refresh")))),o.createElement(d.ScrollableContentWithShadow,null,o.createElement(i,{type:"danger"},t("Error_loading_pages")," "))):n?o.createElement(p,{canViewStatistics:n,isLoading:w,info:z,statistics:S,instances:P,onClickRefreshButton:D,onClickDownloadInfo:G}):o.createElement(f,null)}));n.exportDefault(w)}

