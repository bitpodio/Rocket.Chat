function module(s,t,e){let i,o,n,l,u,a,r,c,d;e.export({useDiscussionsList:()=>m}),e.link("react",{useCallback(s){i=s},useEffect(s){o=s},useMemo(s){n=s},useState(s){l=s}},0),e.link("../../../../lib/lists/DiscussionsList",{DiscussionsList(s){u=s}},1),e.link("../../../../contexts/ServerContext",{useEndpoint(s){a=s}},2),e.link("../../../../hooks/lists/useScrollableMessageList",{useScrollableMessageList(s){r=s}},3),e.link("../../../../hooks/lists/useStreamUpdatesForMessageList",{useStreamUpdatesForMessageList(s){c=s}},4),e.link("../../../../../app/ui-utils/client/config",{getConfig(s){d=s}},5);const m=(s,t)=>{const[e]=l(()=>new u(s));o(()=>{e.options!==s&&e.updateFilters(s)},[e,s]);const m=a("GET","chat.getDiscussions"),g=i(async(t,e)=>{const{messages:i,total:o}=await m({roomId:s.rid,text:s.text,offset:t,count:e-t});return{items:i,itemCount:o}},[m,s.rid,s.text]),{loadMoreItems:k,initialItemCount:p}=r(e,g,n(()=>{const s=d("discussionListSize");return s?parseInt(s,10):void 0},[]));return c(e,t,s.rid),{discussionsList:e,loadMoreItems:k,initialItemCount:p}}}

