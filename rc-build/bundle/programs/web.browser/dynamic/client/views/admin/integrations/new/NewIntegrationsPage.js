function module(e,t,n){let o,l,i,a,c,u,r,m,g,s,k,d,f;function E(e){let t=o({},e);const n=k(),E=f("admin-integrations"),x=r(e=>()=>{E.push({context:"new",type:e})},[E]),p=r(()=>{E.push({})},[E]),b=d("type");return u.createElement(m,o({flexDirection:"column"},t),u.createElement(m.Header,{title:n("Integrations")},u.createElement(a,null,u.createElement(i,{onClick:p},u.createElement(c,{name:"back",size:"x16"})," ",n("Back")))),u.createElement(l,null,u.createElement(l.Item,{selected:"incoming"===b,onClick:x("incoming")},n("Incoming")),u.createElement(l.Item,{selected:"outgoing"===b,onClick:x("outgoing")},n("Outgoing"))),"incoming"===b&&u.createElement(g,{key:"incoming"})||"outgoing"===b&&u.createElement(s,{key:"outgoing"}))}n.link("@babel/runtime/helpers/extends",{default(e){o=e}},0),n.export({default:()=>E}),n.link("@rocket.chat/fuselage",{Tabs(e){l=e},Button(e){i=e},ButtonGroup(e){a=e},Icon(e){c=e}},0),n.link("react",{default(e){u=e},useCallback(e){r=e}},1),n.link("../../../../components/Page",{default(e){m=e}},2),n.link("./NewIncomingWebhook",{default(e){g=e}},3),n.link("./NewOutgoingWebhook",{default(e){s=e}},4),n.link("../../../../contexts/TranslationContext",{useTranslation(e){k=e}},5),n.link("../../../../contexts/RouterContext",{useRouteParameter(e){d=e},useRoute(e){f=e}},6)}

