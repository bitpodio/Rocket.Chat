function module(e,t,n){let l,a,r,o,c,s,i,u,m,g,d,k,f,h,p,E,P,x,b,S,C,_;n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("@babel/runtime/helpers/objectSpread2",{default(e){r=e}},2),n.link("@rocket.chat/fuselage",{Box(e){o=e},Button(e){c=e},ButtonGroup(e){s=e},Icon(e){i=e},Accordion(e){u=e},Pagination(e){m=e}},0),n.link("@rocket.chat/fuselage-hooks",{useSafely(e){g=e}},1),n.link("react",{default(e){d=e},useCallback(e){k=e},useState(e){f=e},useEffect(e){h=e}},2),n.link("../../../components/Page",{default(e){p=e}},3),n.link("../../../contexts/RouterContext",{useCurrentRoute(e){E=e},useRoute(e){P=e}},4),n.link("../../../contexts/ServerContext",{useEndpoint(e){x=e}},5),n.link("../../../contexts/TranslationContext",{useTranslation(e){b=e}},6),n.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime(e){S=e}},7),n.link("./LogItem",{default(e){C=e}},8),n.link("./LogsLoading",{default(e){_=e}},9);const T=e=>{let{id:t,current:n,itemsPerPage:l}=e;const[a,o]=g(f({})),c=x("GET","/apps/".concat(t)),s=x("GET","/apps/".concat(t,"/logs")),i=k(async()=>{try{const[{app:e},{logs:t}]=await Promise.all([c(),s()]);o(r(r({},e),{},{logs:t}))}catch(e){o({error:e})}},[c,s,o]);h(()=>{i()},[i]);const u=a.logs&&n>a.logs.length?0:n,m=a.logs?a.logs.length:0,d=a.logs?r(r({},a),{},{logs:a.logs.slice(u,l+n)}):a;return[d,m,i]};function I(e){let{id:t}=e,n=a(e,["id"]);const r=b(),g=S(),[h,x]=f(25),[I,L]=f(0),[y,A,R]=T({id:t,itemsPerPage:h,current:I}),[w]=E(),B=P(w),D=()=>{R()},j=()=>{B.push()},v=!Object.values(y).length,F=!v&&!y.error,G=k(e=>{let{count:t,current:n,itemsPerPage:l}=e;return r("Showing_results_of",n+1,Math.min(n+l,t),t)},[r]),W=k(()=>r("Items_per_page:"),[r]);return d.createElement(p,l({flexDirection:"column"},n),d.createElement(p.Header,{title:r("View_the_Logs_for",{name:y.name||""})},d.createElement(s,null,d.createElement(c,{primary:!0,onClick:D},d.createElement(i,{name:"undo"})," ",r("Refresh")),d.createElement(c,{onClick:j},d.createElement(i,{name:"back"})," ",r("Back")))),d.createElement(p.ScrollableContent,null,v&&d.createElement(_,null),y.error&&d.createElement(o,{maxWidth:"x600",alignSelf:"center",fontScale:"h1"},y.error.message),F&&d.createElement(d.Fragment,null,d.createElement(u,{maxWidth:"x600",alignSelf:"center"},y.logs&&y.logs.map(e=>d.createElement(C,{key:e._createdAt,title:"".concat(g(e._createdAt),': "').concat(e.method,'" (').concat(e.totalTime,"ms)"),instanceId:e.instanceId,entries:e.entries}))))),d.createElement(m,{mi:"x24",divider:!0,current:I,itemsPerPage:h,itemsPerPageLabel:W,showingResultsLabel:G,count:A,onSetItemsPerPage:x,onSetCurrent:L}))}n.exportDefault(I)}

