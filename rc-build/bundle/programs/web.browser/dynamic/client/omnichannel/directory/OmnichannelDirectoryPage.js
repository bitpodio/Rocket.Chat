function module(e,t,n){let a,l,c,o,r,i,s,m,u,d,f,E,x,C,h,k,w;n.link("react",{default(e){a=e},useEffect(e){l=e},useCallback(e){c=e},useState(e){o=e}},0),n.link("@rocket.chat/fuselage",{Tabs(e){r=e},Icon(e){i=e},Box(e){s=e}},1),n.link("../../contexts/TranslationContext",{useTranslation(e){m=e}},2),n.link("../../components/Page",{default(e){u=e}},3),n.link("../../contexts/RouterContext",{useRoute(e){d=e},useRouteParameter(e){f=e}},4),n.link("./ContactTab",{default(e){E=e}},5),n.link("../../components/VerticalBar",{default(e){x=e}},6),n.link("./ContactForm",{ContactNewEdit(e){C=e},ContactEditWithData(e){h=e}},7),n.link("./ContactInfo",{ContactInfo(e){k=e}},8),n.link("./ChatTab",{default(e){w=e}},9);const T=()=>{const e=m(),t="contacts",n=f("tab"),T=d("omnichannel-directory"),b=f("context"),p=f("id"),_=c(e=>()=>T.push({tab:e}),[T]),[I,P]=o();l(()=>{if(!n)return T.replace({tab:"contacts"})},[T,n,"contacts"]);const S=c(()=>{if(!b)return"";const t=()=>{T.push({})};return(a.createElement(x,{className:"contextual-bar"},a.createElement(x.Header,null,"new"===b&&a.createElement(s,{flexShrink:1,flexGrow:1,withTruncatedText:!0,mi:"x8"},a.createElement(i,{name:"user",size:"x20"})," ",e("New_Contact")),"info"===b&&a.createElement(s,{flexShrink:1,flexGrow:1,withTruncatedText:!0,mi:"x8"},a.createElement(i,{name:"user",size:"x20"})," ",e("Contact_Profile")),"edit"===b&&a.createElement(s,{flexShrink:1,flexGrow:1,withTruncatedText:!0,mi:"x8"},a.createElement(i,{name:"pencil",size:"x20"})," ",e("Edit_Contact_Profile")),a.createElement(x.Close,{onClick:t})),"new"===b&&a.createElement(C,{reload:I,close:t}),"info"===b&&a.createElement(k,{reload:I,id:p}),"edit"===b&&a.createElement(h,{id:p,reload:I,close:t})))},[b,e,I,T,p]);return(a.createElement(u,{flexDirection:"row"},a.createElement(u,null,a.createElement(u.Header,{title:e("Omnichannel_Contact_Center")}),a.createElement(r,{flexShrink:0},a.createElement(r.Item,{selected:"contacts"===n,onClick:_("contacts")},e("Contacts")),a.createElement(r.Item,{selected:"chats"===n,onClick:_("chats")},e("Chats"))),a.createElement(u.Content,null,"contacts"===n&&a.createElement(E,{setContactReload:P})||"chats"===n&&a.createElement(w,null))),a.createElement(S,null)))};T.displayName="DirectoryOmnichannelPage",n.exportDefault(T)}

