function module(t,e,s){let i,o,a,n,r,l,u,d,c;s.export({useThreadsList:()=>p}),s.link("react",{useCallback(t){i=t},useEffect(t){o=t},useMemo(t){a=t},useState(t){n=t}},0),s.link("../../../../lib/lists/ThreadsList",{ThreadsList(t){r=t}},1),s.link("../../../../contexts/ServerContext",{useEndpoint(t){l=t}},2),s.link("../../../../hooks/lists/useScrollableMessageList",{useScrollableMessageList(t){u=t}},3),s.link("../../../../hooks/lists/useStreamUpdatesForMessageList",{useStreamUpdatesForMessageList(t){d=t}},4),s.link("../../../../../app/ui-utils/client/config",{getConfig(t){c=t}},5);const p=(t,e)=>{const[s]=n(()=>new r(t));o(()=>{s.options!==t&&s.updateFilters(t)},[s,t]);const p=l("GET","chat.getThreadsList"),h=i(async(e,s)=>{const{threads:i,total:o}=await p({rid:t.rid,type:t.type,text:t.text,offset:e,count:s-e});return{items:i,itemCount:o}},[p,t.rid,t.text,t.type]),{loadMoreItems:m,initialItemCount:L}=u(s,h,a(()=>{const t=c("threadsListSize");return t?parseInt(t,10):void 0},[]));return d(s,e,t.rid),{threadsList:s,loadMoreItems:m,initialItemCount:L}}}

