function module(e,n,t){var r,o,i,u,a,l,s,c,d,f,m,p,h,k,g,x,v,b,C,T,E,y,S,w,I,M,U,R,B,G,L,_,D,A,z,N,P,F,j,H,V,W,O;function Q(e){return function(n){var t=n.msg,r=n.username,a=n.replies,l=void 0===a?[]:a,s=n.tcount,c=n.ts,d=i(n,["msg","username","replies","tcount","ts"]);return(u.createElement(e,o({replies:s,participants:null==l?void 0:l.length,username:r,msg:t,ts:c},d)))}}t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},2),t.export({withData:function(){return X},normalizeThreadMessage:function(){return Z},ThreadList:function(){return ee}}),t.link("react",{default:function(e){u=e},useCallback:function(e){a=e},useMemo:function(e){l=e},useState:function(e){s=e},useRef:function(e){c=e},memo:function(e){d=e}},0),t.link("react-virtuoso",{Virtuoso:function(e){f=e}},1),t.link("@rocket.chat/fuselage",{Box:function(e){m=e},Icon:function(e){p=e},TextInput:function(e){h=e},Select:function(e){k=e},Margins:function(e){g=e},Callout:function(e){x=e}},2),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){v=e},useResizeObserver:function(e){b=e},useLocalStorage:function(e){C=e},useMutableCallback:function(e){T=e},useAutoFocus:function(e){E=e}},3),t.link("../../../../components/VerticalBar",{default:function(e){y=e}},4),t.link("../../../../contexts/TranslationContext",{useTranslation:function(e){S=e}},5),t.link("../../../../contexts/RouterContext",{useRoute:function(e){w=e},useCurrentRoute:function(e){I=e},useQueryStringParameter:function(e){M=e}},6),t.link("../../../../../app/ui-utils/client",{call:function(e){U=e}},7),t.link("../../../../contexts/UserContext",{useUserId:function(e){R=e},useUserSubscription:function(e){B=e}},8),t.link("../../hooks/useUserRoom",{useUserRoom:function(e){G=e}},9),t.link("../../../../contexts/SettingsContext",{useSetting:function(e){L=e}},10),t.link("../../../../hooks/useTimeAgo",{useTimeAgo:function(e){_=e}},11),t.link("../../../../lib/clickableItem",{clickableItem:function(e){D=e}},12),t.link("./components/Message",{default:function(e){A=e}},13),t.link("../../../../../lib/escapeHTML",{escapeHTML:function(e){z=e}},14),t.link("../../../../hooks/useAsyncState",{AsyncStatePhase:function(e){N=e}},15),t.link("../../providers/ToolboxProvider",{useTabBarClose:function(e){P=e},useTabContext:function(e){F=e}},16),t.link("../../../../../app/threads/client/components/ThreadComponent",{default:function(e){j=e}},17),t.link("../../../../lib/renderMessageBody",{renderMessageBody:function(e){H=e}},18),t.link("../../../../components/ScrollableContentWrapper",{default:function(e){V=e}},19),t.link("./useThreadsList",{useThreadsList:function(e){W=e}},20),t.link("../../../../hooks/lists/useRecordList",{useRecordList:function(e){O=e}},21);var q=u.memo(Q(D(A))),J={tunread:1,tunreadUser:1,tunreadGroup:1},K={t:1,name:1};function X(e){return function(n){var t=n.rid,c=i(n,["rid"]),d=R(),f=P(),m=G(t,K),p=B(t,J),h=C("thread-list-type","all"),k=r(h,2),g=k[0],x=k[1],b=s(""),T=r(b,2),E=T[0],y=T[1],S=v(E,400),w=l((function(){return{rid:t,text:S,type:g,tunread:null==p?void 0:p.tunread,uid:d}}),[t,S,g,p,d]),I=W(w,d),M=I.threadsList,U=I.initialItemCount,L=I.loadMoreItems,_=O(M),D=_.phase,A=_.error,z=_.items,F=_.itemCount,j=a((function(e){y(e.currentTarget.value)}),[]);return u.createElement(e,o({},c,{unread:null==p?void 0:p.tunread,unreadUser:null==p?void 0:p.tunreadUser,unreadGroup:null==p?void 0:p.tunreadGroup,userId:d,error:A,threads:z,total:F,initial:U,loading:D===N.LOADING,loadMoreItems:L,room:m,text:E,setText:j,type:g,setType:x,onClose:f}))}}var Y=function(e){e.preventDefault(),e.stopPropagation(),U([!0,"true"].includes(e.currentTarget.dataset.following)?"unfollowMessage":"followMessage",{mid:e.currentTarget.dataset.id})},Z=function(e){var n=o({},e);if(n.msg)return H(n).replace(/<br\s?\\?>/g," ");if(n.attachments){var t=n.attachments.find((function(e){return e.title||e.description}));if(t&&t.description)return z(t.description);if(t&&t.title)return z(t.title)}},$=d(function(){function e(e){var n=e.thread,t=e.showRealNames,r=e.unread,o=e.unreadUser,i=e.unreadGroup,a=e.userId,l=e.onClick,s=S(),c=_(),d=Z(n),f=n.u.name,m=void 0===f?n.u.username:f;return u.createElement(q,{tcount:n.tcount,tlm:n.tlm,ts:n.ts,u:n.u,replies:n.replies,name:t?m:n.u.username,username:n.u.username,unread:r.includes(n._id),mention:o.includes(n._id),all:i.includes(n._id),following:n.replies&&n.replies.includes(a),"data-id":n._id,msg:d,t:s,formatDate:c,handleFollowButton:Y,onClick:l})}return e}());function ee(e){var n=e.total,t=void 0===n?10:n,o=e.threads,i=void 0===o?[]:o,a=e.room,s=e.unread,d=void 0===s?[]:s,v=e.unreadUser,C=void 0===v?[]:v,U=e.unreadGroup,R=void 0===U?[]:U,B=e.type,G=e.setType,_=e.loadMoreItems,D=e.loading,A=e.onClose,z=e.error,N=e.userId,P=e.text,H=e.setText,W=L("UI_Use_Real_Name"),O=c(),Q=S(),q=E(!0),J=I(),K,X=r(J,1)[0],Y=w(X),Z=T((function(e){var n=e.currentTarget.dataset.id;Y.push({tab:"thread",context:n,rid:a._id,name:a.name})})),ee=l((function(){return[["all",Q("All")],["following",Q("Following")],["unread",Q("Unread")]]}),[Q]);O.current=i;var ne=b({debounceDelay:200}),te=ne.ref,re=ne.contentBoxSize,oe=(re=void 0===re?{}:re).inlineSize,ie=void 0===oe?378:oe,ue=re.blockSize,ae=void 0===ue?1:ue,le=F(),se=M("jump");return u.createElement(u.Fragment,null,u.createElement(y.Header,null,u.createElement(y.Icon,{name:"thread"}),u.createElement(y.Text,null,Q("Threads")),u.createElement(y.Close,{onClick:A})),u.createElement(y.Content,{paddingInline:0,ref:te},u.createElement(m,{display:"flex",flexDirection:"row",p:"x24",borderBlockEndWidth:"x2",borderBlockEndStyle:"solid",borderBlockEndColor:"neutral-200",flexShrink:0},u.createElement(m,{display:"flex",flexDirection:"row",flexGrow:1,mi:"neg-x4"},u.createElement(g,{inline:"x4"},u.createElement(h,{placeholder:Q("Search_Messages"),value:P,onChange:H,addon:u.createElement(p,{name:"magnifier",size:"x20"}),ref:q}),u.createElement(k,{flexGrow:0,width:"110px",onChange:G,value:B,options:ee})))),u.createElement(m,{flexGrow:1,flexShrink:1,overflow:"hidden",display:"flex"},z&&u.createElement(x,{mi:"x24",type:"danger"},z.toString()),0===t&&u.createElement(m,{p:"x24"},Q("No_Threads")),!z&&t>0&&i.length>0&&u.createElement(f,{style:{height:ae,width:ie},totalCount:t,endReached:D?function(){}:function(e){return _(e,Math.min(50,t-e))},overscan:25,data:i,components:{Scroller:V},itemContent:function(e,n){return u.createElement($,{thread:n,showRealNames:W,unread:d,unreadUser:C,unreadGroup:R,userId:N,onClick:Z})}}))),le&&u.createElement(y.InnerContent,null,u.createElement(j,{mid:le,jump:se,room:a})))}t.exportDefault(X(ee))}

