function module(e,t,l){let a,n,r,o,u,i,s,m,p;l.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},1),l.export({AutoCompleteDepartment:()=>c}),l.link("react",{default(e){r=e},useMemo(e){o=e},useState(e){u=e}},0),l.link("@rocket.chat/fuselage",{AutoComplete(e){i=e},Option(e){s=e}},1),l.link("../contexts/TranslationContext",{useTranslation(e){m=e}},2),l.link("../hooks/useEndpointData",{useEndpointData(e){p=e}},3);const c=r.memo(e=>{const t=m(),[l,c]=u(""),{value:d}=p("livechat/department",o(()=>({text:l}),[l])),{label:b}=e,k=o(()=>d&&[{value:"all",label:b&&t("All")},...d.departments.map(e=>({value:e._id,label:e.name}))]||[{value:"all",label:b||t("All")}],[d,b,t]);return r.createElement(i,a({},e,{filter:l,setFilter:c,renderSelected:e=>{let{label:t}=e;return(r.createElement(r.Fragment,null,t))},renderItem:e=>{let{value:t}=e,l=n(e,["value"]);return(r.createElement(s,a({key:t},l)))},options:k}))})}

