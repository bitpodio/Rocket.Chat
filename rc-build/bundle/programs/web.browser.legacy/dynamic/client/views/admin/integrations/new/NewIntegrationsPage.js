function module(n,e,t){var o,i,c,u,l,a,r,f,m,g,s,k,d;function E(n){var e=o({},n),t=s(),E=d("admin-integrations"),x=r((function(n){return function(){E.push({context:"new",type:n})}}),[E]),p=r((function(){E.push({})}),[E]),b=k("type");return a.createElement(f,o({flexDirection:"column"},e),a.createElement(f.Header,{title:t("Integrations")},a.createElement(u,null,a.createElement(c,{onClick:p},a.createElement(l,{name:"back",size:"x16"})," ",t("Back")))),a.createElement(i,null,a.createElement(i.Item,{selected:"incoming"===b,onClick:x("incoming")},t("Incoming")),a.createElement(i.Item,{selected:"outgoing"===b,onClick:x("outgoing")},t("Outgoing"))),"incoming"===b&&a.createElement(m,{key:"incoming"})||"outgoing"===b&&a.createElement(g,{key:"outgoing"}))}t.link("@babel/runtime/helpers/extends",{default:function(n){o=n}},0),t.export({default:function(){return E}}),t.link("@rocket.chat/fuselage",{Tabs:function(n){i=n},Button:function(n){c=n},ButtonGroup:function(n){u=n},Icon:function(n){l=n}},0),t.link("react",{default:function(n){a=n},useCallback:function(n){r=n}},1),t.link("../../../../components/Page",{default:function(n){f=n}},2),t.link("./NewIncomingWebhook",{default:function(n){m=n}},3),t.link("./NewOutgoingWebhook",{default:function(n){g=n}},4),t.link("../../../../contexts/TranslationContext",{useTranslation:function(n){s=n}},5),t.link("../../../../contexts/RouterContext",{useRouteParameter:function(n){k=n},useRoute:function(n){d=n}},6)}

