function module(t,e,a){let l,n,i,o,r,s,u,c,k;a.link("@babel/runtime/helpers/objectWithoutProperties",{default(t){l=t}},0),a.link("react",{default(t){n=t},useEffect(t){i=t},useState(t){o=t}},0),a.link("@rocket.chat/fuselage",{Skeleton(t){r=t}},1),a.link("../../../../contexts/TranslationContext",{useTranslation(t){s=t}},2),a.link("./CounterRow",{default(t){u=t}},3),a.link("./CounterItem",{default(t){c=t}},4),a.link("../../../../hooks/useAsyncState",{AsyncStatePhase(t){k=t}},5);const f=t=>{let{data:e,state:a,initialData:f}=t,d=l(t,["data","state","initialData"]);const m=s(),[h,E]=o(f),{totalizers:S}=e||{totalizers:f};return i(()=>{a===k.RESOLVED&&E(S)},[a,m,S]),n.createElement(u,d,h.map((t,e)=>{let{title:a,value:l}=t;return(n.createElement(c,{key:e,title:a?m(a):n.createElement(r,{width:"x60"}),count:l}))}))};a.exportDefault(f)}

