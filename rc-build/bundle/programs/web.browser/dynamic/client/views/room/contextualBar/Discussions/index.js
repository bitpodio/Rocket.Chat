function module(e,t,n){let s,o,r,l,i,a,u,c,d,m,k,f,p,h,x,g,b,C,E,I,S,T,w,v,D,M,y,R,B,U,L,z;function A(e){return t=>{let{msg:n,username:r,tcount:i,ts:a}=t,u=o(t,["msg","username","tcount","ts"]);return(l.createElement(e,s({replies:i,username:r,msg:n,ts:a},u)))}}n.link("@babel/runtime/helpers/extends",{default(e){s=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},1),n.export({withData:()=>F,normalizeThreadMessage:()=>H,DiscussionList:()=>V}),n.link("meteor/kadira:flow-router",{FlowRouter(e){r=e}},0),n.link("react",{default(e){l=e},useCallback(e){i=e},useMemo(e){a=e},useState(e){u=e},memo(e){c=e}},1),n.link("@rocket.chat/fuselage",{Box(e){d=e},Icon(e){m=e},TextInput(e){k=e},Callout(e){f=e}},2),n.link("react-virtuoso",{Virtuoso(e){p=e}},3),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){h=e},useResizeObserver(e){x=e},useAutoFocus(e){g=e}},4),n.link("../../../../components/VerticalBar",{default(e){b=e}},5),n.link("../../../../contexts/TranslationContext",{useTranslation(e){C=e}},6),n.link("../../../../contexts/UserContext",{useUserId(e){E=e},useUserSubscription(e){I=e}},7),n.link("../../../../hooks/useTimeAgo",{useTimeAgo(e){S=e}},8),n.link("../../hooks/useUserRoom",{useUserRoom(e){T=e}},9),n.link("../../../../contexts/SettingsContext",{useSetting(e){w=e}},10),n.link("./components/Message",{default(e){v=e}},11),n.link("../../../../lib/clickableItem",{clickableItem(e){D=e}},12),n.link("../../../../../lib/escapeHTML",{escapeHTML(e){M=e}},13),n.link("../../../../hooks/useAsyncState",{AsyncStatePhase(e){y=e}},14),n.link("../../providers/ToolboxProvider",{useTabBarClose(e){R=e}},15),n.link("../../../../lib/renderMessageBody",{renderMessageBody(e){B=e}},16),n.link("../../../../components/ScrollableContentWrapper",{default(e){U=e}},17),n.link("./useDiscussionsList",{useDiscussionsList(e){L=e}},18),n.link("../../../../hooks/lists/useRecordList",{useRecordList(e){z=e}},19);const G=l.memo(A(D(v))),_={tunread:1,tunreadUser:1,tunreadGroup:1},N={t:1,name:1};function F(e){return t=>{let{rid:n}=t,r=o(t,["rid"]);const c=T(n,N),d=I(n,_),m=E(),k=R(),[f,p]=u(""),x=h(f,400),g=a(()=>({rid:n,text:x}),[n,x]),{discussionsList:b,initialItemCount:C,loadMoreItems:S}=L(g,m),{phase:w,error:v,items:D,itemCount:M}=z(b),B=i(e=>{p(e.currentTarget.value)},[]);return l.createElement(e,s({},r,{onClose:k,unread:null==d?void 0:d.tunread,unreadUser:null==d?void 0:d.tunreadUser,unreadGroup:null==d?void 0:d.tunreadGroup,userId:m,error:v,discussions:D,total:M,initial:C,loading:w===y.LOADING,loadMoreItems:S,room:c,text:f,setText:B}))}}const H=e=>{let t=s({},e);if(t.msg)return B(t).replace(/<br\s?\\?>/g," ");if(t.attachments){const e=t.attachments.find(e=>e.title||e.description);if(e&&e.description)return M(e.description);if(e&&e.title)return M(e.title)}},P=c((function e(t){let{discussion:n,showRealNames:s,userId:o,onClick:r}=t;const i=C(),a=S(),u=H(n),{name:c=n.u.username}=n.u;return l.createElement(G,{replies:n.replies,dcount:n.dcount,dlm:n.dlm,name:s?c:n.u.username,username:n.u.username,following:n.replies&&n.replies.includes(o),"data-drid":n.drid,msg:u,t:i,formatDate:a,onClick:r})}));function V(e){let{total:t=10,discussions:n=[],loadMoreItems:s,loading:o,onClose:a,error:u,userId:c,text:h,setText:E}=e;const I=w("UI_Use_Real_Name"),S=C(),T=g(!0),v=i(e=>{const{drid:t}=e.currentTarget.dataset;r.goToRoomById(t)},[]),{ref:D,contentBoxSize:{inlineSize:M=378,blockSize:y=1}={}}=x({debounceDelay:200});return l.createElement(l.Fragment,null,l.createElement(b.Header,null,l.createElement(b.Icon,{name:"discussion"}),l.createElement(d,{flexShrink:1,flexGrow:1,withTruncatedText:!0,mi:"x8"},S("Discussions")),l.createElement(b.Close,{onClick:a})),l.createElement(b.Content,{paddingInline:0,ref:D},l.createElement(d,{display:"flex",flexDirection:"row",p:"x24",borderBlockEndWidth:"x2",borderBlockEndStyle:"solid",borderBlockEndColor:"neutral-200",flexShrink:0},l.createElement(k,{placeholder:S("Search_Messages"),value:h,onChange:E,ref:T,addon:l.createElement(m,{name:"magnifier",size:"x20"})})),l.createElement(d,{flexGrow:1,flexShrink:1,overflow:"hidden",display:"flex"},u&&l.createElement(f,{mi:"x24",type:"danger"},u.toString()),0===t&&l.createElement(d,{p:"x24"},S("No_Discussions_found")),!u&&t>0&&n.length>0&&l.createElement(l.Fragment,null,l.createElement(p,{style:{height:y,width:M,overflow:"hidden"},totalCount:t,endReached:o?()=>{}:e=>s(e,Math.min(50,t-e)),overscan:25,data:n,components:{Scroller:U},itemContent:(e,t)=>l.createElement(P,{discussion:t,showRealNames:I,userId:c,onClick:v})})))))}n.exportDefault(F(V))}
