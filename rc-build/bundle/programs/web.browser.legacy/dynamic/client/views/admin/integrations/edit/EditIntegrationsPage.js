function module(n,t,e){var o,i,u,c,a,l,r,f,g,k,m,s;function d(n){var t=o({},n),e=k(),d=s("admin-integrations"),E=m("type"),x=m("id"),b=l((function(){d.push({})}),[d]),p=l((function(){d.push({context:"history",type:"outgoing",id:x})}),[x,d]);return a.createElement(r,o({flexDirection:"column"},t),a.createElement(r.Header,{title:e("incoming"===E?"Integration_Incoming_WebHook":"Integration_Outgoing_WebHook")},a.createElement(u,null,a.createElement(i,{onClick:b},a.createElement(c,{name:"back",size:"x16"})," ",e("Back")),"outgoing"===E&&a.createElement(i,{onClick:p},e("History")))),"outgoing"===E&&a.createElement(g,{integrationId:x,key:"outgoing"})||"incoming"===E&&a.createElement(f,{integrationId:x,key:"incoming"}))}e.link("@babel/runtime/helpers/extends",{default:function(n){o=n}},0),e.export({default:function(){return d}}),e.link("@rocket.chat/fuselage",{Button:function(n){i=n},ButtonGroup:function(n){u=n},Icon:function(n){c=n}},0),e.link("react",{default:function(n){a=n},useCallback:function(n){l=n}},1),e.link("../../../../components/Page",{default:function(n){r=n}},2),e.link("./EditIncomingWebhook",{default:function(n){f=n}},3),e.link("./EditOutgoingWebhook",{default:function(n){g=n}},4),e.link("../../../../contexts/TranslationContext",{useTranslation:function(n){k=n}},5),e.link("../../../../contexts/RouterContext",{useRouteParameter:function(n){m=n},useRoute:function(n){s=n}},6)}
