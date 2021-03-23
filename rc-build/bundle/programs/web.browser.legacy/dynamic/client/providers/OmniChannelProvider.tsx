function module(e,n,t){var i,u,a,l,r,c,o,s,f,d,h,v,m,g,k,b,p,A,x;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){u=e}},1),t.link("@babel/runtime/regenerator",{default:function(e){a=e}},2),t.link("react",{default:function(e){l=e},useState:function(e){r=e},useEffect:function(e){c=e},useCallback:function(e){o=e},useMemo:function(e){s=e}},0),t.link("../../app/notifications/client",{Notifications:function(e){f=e}},1),t.link("../contexts/OmnichannelContext",{OmnichannelContext:function(e){d=e}},2),t.link("../hooks/useReactiveValue",{useReactiveValue:function(e){h=e}},3),t.link("../contexts/UserContext",{useUser:function(e){v=e},useUserId:function(e){m=e}},4),t.link("../contexts/AuthorizationContext",{usePermission:function(e){g=e}},5),t.link("../contexts/SettingsContext",{useSetting:function(e){k=e}},6),t.link("../../app/livechat/client/collections/LivechatInquiry",{LivechatInquiry:function(e){b=e}},7),t.link("../../app/livechat/client/lib/stream/queueManager",{initializeLivechatInquiryStream:function(e){p=e}},8),t.link("../hooks/useMethodData",{useMethodData:function(e){A=e}},9),t.link("../hooks/useAsyncState",{AsyncStatePhase:function(e){x=e}},10);var _=[],L={inquiries:{enabled:!1},enabled:!1,agentAvailable:!1,showOmnichannelQueueLink:!1},q=function(){var e=m(),n=k("Livechat_guest_pool_max_number_incoming_livechats_displayed");return c((function(){var n=function(){function n(){return a.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:p(e);case 1:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return n}();return function(){function t(){return a.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:p(e),f.onUser("departmentAgentData",n);case 2:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return t}()(),function(){f.unUser("departmentAgentData",n)}}),[e]),h(o((function(){return b.find({status:"queued",$or:[{defaultAgent:{$exists:!1}},{"defaultAgent.agentId":e}]},{sort:{queueOrder:1,estimatedWaitingTimeQueue:1,estimatedServiceTimeAt:1},limit:n}).fetch()}),[n,e]))},y=function(e){var n=e.children;return(l.createElement(d.Provider,{value:L,children:n}))},w=function(e){var n=e.value,t=e.children,i=q(),a=k("Livechat_show_queue_list_link")&&n.agentAvailable,r=s((function(){return u(u({},n),{},{inquiries:{enabled:!0,queue:i},showOmnichannelQueueLink:a})}),[n,i,a]);return l.createElement(d.Provider,{value:r,children:t})},E=function(e){var n=e.children,t=k("Livechat_Routing_Method"),a=r(u(u({},L),{},{enabled:!0})),o=i(a,2),s=o[0],f=o[1],h=v(),m=A("livechat:getRoutingConfig",_),b=m.value,p=m.phase,q=m.reload,E=g("view-livechat-queue");return c((function(){p!==x.LOADING&&q()}),[t,q]),c((function(){f((function(e){return u(u({},e),{},{agentAvailable:"available"===(null==h?void 0:h.statusLivechat)})}))}),[null==h?void 0:h.statusLivechat]),b&&h?E&&b.showQueue&&!b.autoAssignAgent&&s.agentAvailable?l.createElement(w,{value:s,children:n}):l.createElement(d.Provider,{value:s,children:n}):l.createElement(y,{children:n})},S=l.memo((function(e){var n=e.children,t=k("Livechat_enabled"),i=g("view-l-room");return t&&i?l.createElement(E,{children:n}):l.createElement(y,{children:n})}));t.exportDefault(S)}

