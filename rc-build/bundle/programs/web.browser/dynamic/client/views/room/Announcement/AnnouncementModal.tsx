function module(e,t,n){let l,o,r,a,c,u,i,m;n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},0),n.link("react",{default(e){o=e}},0),n.link("@rocket.chat/fuselage",{Button(e){r=e},ButtonGroup(e){a=e},Box(e){c=e},Modal(e){u=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){i=e}},2),n.link("../../../components/MarkdownText",{default(e){m=e}},3);const s=e=>{let{onClose:t,confirmLabel:n="Close",children:s}=e,d=l(e,["onClose","confirmLabel","children"]);const E=i();return(o.createElement(u,d,o.createElement(u.Header,null,o.createElement(u.Title,null,E("Announcement")),o.createElement(u.Close,{onClick:t})),o.createElement(u.Content,null,o.createElement(c,null,o.createElement(m,{content:s}))),o.createElement(u.Footer,null,o.createElement(a,{align:"end"},o.createElement(r,{onClick:t},n)))))};n.exportDefault(s)}

