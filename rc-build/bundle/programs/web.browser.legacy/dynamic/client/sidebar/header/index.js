function module(e,t,n){var a,l,i,o,r,c,u,s,f,m,d,k;n.link("react",{default:function(e){a=e}},0),n.link("@rocket.chat/fuselage",{Sidebar:function(e){l=e}},1),n.link("./actions/Home",{default:function(e){i=e}},2),n.link("./actions/Search",{default:function(e){o=e}},3),n.link("./actions/Directory",{default:function(e){r=e}},4),n.link("./actions/Sort",{default:function(e){c=e}},5),n.link("./actions/CreateRoom",{default:function(e){u=e}},6),n.link("./actions/Login",{default:function(e){s=e}},7),n.link("./UserAvatarButton",{default:function(e){f=e}},8),n.link("../../contexts/UserContext",{useUser:function(e){m=e}},9),n.link("../../contexts/TranslationContext",{useTranslation:function(e){d=e}},10),n.link("../hooks/useSidebarPaletteColor",{useSidebarPaletteColor:function(e){k=e}},11);var E=function(){var e=m(),t=d();return k(),a.createElement(a.Fragment,null,a.createElement(l.TopBar.Section,{className:"sidebar--custom-colors"},a.createElement(f,{user:e}),a.createElement(l.TopBar.Actions,null,a.createElement(i,{title:t("Home")}),a.createElement(o,{title:t("Search"),"data-qa":"sidebar-search"}),e&&a.createElement(a.Fragment,null,a.createElement(r,{title:t("Directory")}),a.createElement(c,{title:t("Filters")}),a.createElement(u,{title:t("Create_A_New_Channel"),"data-qa":"sidebar-create"})),!e&&a.createElement(s,{title:t("Login")}))))};n.exportDefault(a.memo(E))}

