function module(e,t,a){var n,i,r,o,l;a.link("@babel/runtime/helpers/extends",{default:function(e){n=e}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){i=e}},1),a.link("react",{default:function(e){r=e}},0),a.link("../../../../hooks/useEndpointData",{useEndpointData:function(e){o=e}},1),a.link("../counter/CounterContainer",{default:function(e){l=e}},2);var u={title:"",value:0},s=[u,u,u,u],c=function(e){var t=e.params,a=e.reloadRef,u=i(e,["params","reloadRef"]),c=o("livechat/analytics/dashboards/conversation-totalizers",t),d=c.value,f=c.phase,v=c.reload;return a.current.conversationOverview=v,r.createElement(l,n({state:f,data:d,initialData:s},u))};a.exportDefault(c)}

