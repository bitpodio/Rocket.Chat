function module(e,n,t){var l,a,o,i,c,u,r,m,f,E;function x(){var e=c(),n=r("context"),t=r("_id"),x=u("admin-email-inboxes"),s=function(){x.push({context:"new"})};return l.createElement(i,{flexDirection:"row"},l.createElement(i,null,l.createElement(i.Header,{title:e("Email_Inboxes")},n&&l.createElement(a,{alignSelf:"flex-end",onClick:function(){return x.push({})}},l.createElement(o,{name:"back"}),e("Back")),!n&&l.createElement(a,{primary:!0,onClick:s},l.createElement(o,{name:"plus"})," ",e("New_Email_Inbox"))),l.createElement(i.Content,null,!n&&l.createElement(m,null),"new"===n&&l.createElement(f,null),"edit"===n&&l.createElement(E,{id:t}))))}t.export({EmailInboxPage:function(){return x}}),t.link("react",{default:function(e){l=e}},0),t.link("@rocket.chat/fuselage",{Button:function(e){a=e},Icon:function(e){o=e}},1),t.link("../../../components/Page",{default:function(e){i=e}},2),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){c=e}},3),t.link("../../../contexts/RouterContext",{useRoute:function(e){u=e},useRouteParameter:function(e){r=e}},4),t.link("./EmailInboxTable",{default:function(e){m=e}},5),t.link("./EmailInboxForm",{default:function(e){f=e},EmailInboxEditWithData:function(e){E=e}},6),t.exportDefault(x)}

