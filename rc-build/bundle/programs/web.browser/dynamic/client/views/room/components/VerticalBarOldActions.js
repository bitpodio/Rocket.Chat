function module(e,t,l){let n,a,r,o,i,c,m;l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),l.link("react",{default(e){r=e}},0),l.link("../../../components/VerticalBar",{default(e){o=e}},1),l.link("../../../contexts/TranslationContext",{useTranslation(e){i=e}},2),l.link("../providers/ToolboxProvider",{useTabBarClose(e){c=e}},3),l.link("./BlazeTemplate",{BlazeTemplate(e){m=e}},4),l.exportDefault(e=>{let{name:t,icon:l,tabBar:u,title:s}=e,d=a(e,["name","icon","tabBar","title"]);const b=c(),k=i();return r.createElement(r.Fragment,null," ",r.createElement(o.Header,null,r.createElement(o.Icon,{name:l}),r.createElement(o.Text,null,k(s)),b&&r.createElement(o.Close,{onClick:b})),r.createElement(o.Content,null,r.createElement(m,n({flexShrink:1,overflow:"hidden",name:t,tabBar:u},d))))})}
