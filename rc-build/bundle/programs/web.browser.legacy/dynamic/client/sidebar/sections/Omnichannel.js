function module(e,n,t){var a,c,o,i,l,r,u,s,f,m,h,k,p;t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){c=e}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},2),t.link("react",{default:function(e){i=e}},0),t.link("@rocket.chat/fuselage",{Sidebar:function(e){l=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){r=e}},2),t.link("../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){u=e}},3),t.link("../../contexts/TranslationContext",{useTranslation:function(e){s=e}},4),t.link("../../contexts/ServerContext",{useMethod:function(e){f=e}},5),t.link("../../contexts/OmnichannelContext",{useOmnichannelShowQueueLink:function(e){m=e},useOmnichannelAgentAvailable:function(e){h=e},useOmnichannelQueueLink:function(e){k=e},useOmnichannelDirectoryLink:function(e){p=e}},6);var b=i.memo((function(e){var n=f("livechat:changeLivechatStatus"),t=s(),b=h(),x=m(),d=k(),v=p(),T=u(),g=o({title:t(b?"Available":"Not_Available"),icon:b?"message":"message-disabled"},b&&{success:1}),A={title:t("Contact_Center"),icon:"contact"},C=r(function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.awrap(n());case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),T({type:"error",message:e.t0}),console.log(e.t0);case 9:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}());return i.createElement(l.TopBar.ToolBox,e,i.createElement(l.TopBar.Title,null,t("Omnichannel")),i.createElement(l.TopBar.Actions,null,x&&i.createElement(l.TopBar.Action,{icon:"queue",title:t("Queue"),is:"a",href:d}),i.createElement(l.TopBar.Action,a({},g,{onClick:C})),i.createElement(l.TopBar.Action,a({},A,{href:v,is:"a"}))))}));t.exportDefault(b),b.size=56}
