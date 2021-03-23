function module(e,t,a){let l,n,r,o,i,c,s,u,m,d,k,f;a.link("react",{default(e){l=e}},0),a.link("@rocket.chat/fuselage",{Sidebar(e){n=e}},1),a.link("./actions/Home",{default(e){r=e}},2),a.link("./actions/Search",{default(e){o=e}},3),a.link("./actions/Directory",{default(e){i=e}},4),a.link("./actions/Sort",{default(e){c=e}},5),a.link("./actions/CreateRoom",{default(e){s=e}},6),a.link("./actions/Login",{default(e){u=e}},7),a.link("./UserAvatarButton",{default(e){m=e}},8),a.link("../../contexts/UserContext",{useUser(e){d=e}},9),a.link("../../contexts/TranslationContext",{useTranslation(e){k=e}},10),a.link("../hooks/useSidebarPaletteColor",{useSidebarPaletteColor(e){f=e}},11);const E=()=>{const e=d(),t=k();return f(),l.createElement(l.Fragment,null,l.createElement(n.TopBar.Section,{className:"sidebar--custom-colors"},l.createElement(m,{user:e}),l.createElement(n.TopBar.Actions,null,l.createElement(r,{title:t("Home")}),l.createElement(o,{title:t("Search"),"data-qa":"sidebar-search"}),e&&l.createElement(l.Fragment,null,l.createElement(i,{title:t("Directory")}),l.createElement(c,{title:t("Filters")}),l.createElement(s,{title:t("Create_A_New_Channel"),"data-qa":"sidebar-create"})),!e&&l.createElement(u,{title:t("Login")}))))};a.exportDefault(l.memo(E))}
