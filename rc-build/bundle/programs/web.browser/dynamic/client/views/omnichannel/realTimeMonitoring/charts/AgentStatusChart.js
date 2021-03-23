function module(a,e,t){let n,l,s,r,i,u,o,c,f,h,d;t.link("@babel/runtime/helpers/extends",{default(a){n=a}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default(a){l=a}},1),t.link("react",{default(a){s=a},useRef(a){r=a},useEffect(a){i=a}},0),t.link("./Chart",{default(a){u=a}},1),t.link("../../../../contexts/TranslationContext",{useTranslation(a){o=a}},2),t.link("../../../../../app/livechat/client/lib/chartHandler",{drawDoughnutChart(a){c=a}},3),t.link("./useUpdateChartData",{useUpdateChartData(a){f=a}},4),t.link("../../../../hooks/useEndpointData",{useEndpointData(a){h=a}},5),t.link("../../../../hooks/useAsyncState",{AsyncStatePhase(a){d=a}},6);const b=["Available","Away","Busy","Offline"],p={available:0,away:0,busy:0,offline:0},y=(a,e,t)=>c(a,t("Agents"),e,b,Object.values(p)),k=a=>{let{params:e,reloadRef:t}=a,c=l(a,["params","reloadRef"]);const b=o(),k=r(),v=r(),A=f({context:v,canvas:k,t:b,init:y}),{value:D,phase:m,reload:w}=h("livechat/analytics/dashboards/charts/agents-status",e);t.current.agentStatusChart=w;const{offline:C=0,available:E=0,away:x=0,busy:g=0}=null!=D?D:p;return i(()=>{const a=async()=>{v.current=await y(k.current,v.current,b)};a()},[b]),i(()=>{m===d.RESOLVED&&(A("Offline",[C]),A("Available",[E]),A("Away",[x]),A("Busy",[g]))},[E,x,g,C,m,b,A]),s.createElement(u,n({ref:k},c))};t.exportDefault(k)}

