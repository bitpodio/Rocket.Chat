function module(e,t,n){let l,s,i,o,u,r,c,a,m,d,k,p,b,f;n.link("react",{default(e){l=e},memo(e){s=e},useCallback(e){i=e},useEffect(e){o=e}},0),n.link("use-subscription",{useSubscription(e){u=e}},1),n.link("../../../app/ui-utils/client",{menu(e){r=e},SideNav(e){c=e},Layout(e){a=e}},2),n.link("../../contexts/TranslationContext",{useTranslation(e){m=e}},3),n.link("../../contexts/RouterContext",{useRoutePath(e){d=e},useCurrentRoute(e){k=e}},4),n.link("../../components/Sidebar",{default(e){p=e}},5),n.link("../../providers/SettingsProvider",{default(e){b=e}},6),n.link("./sidebarItems",{itemsSubscription(e){f=e}},7);const x=()=>{const e=m(),t=u(f),n=i(()=>{a.isEmbedded()?r.close():c.closeFlex()},[]),[s,...x]=k(),E=d(s,...x);return o(()=>{"account"!==s&&c.closeFlex()},[s]),l.createElement(b,{privileged:!0},l.createElement(p,null,l.createElement(p.Header,{onClose:n,title:e("Account")}),l.createElement(p.Content,null,l.createElement(p.ItemsAssembler,{items:t,currentPath:E}))))};n.exportDefault(s(x))}

