function module(e,n,t){var r,i,o,u,c,a,l,f,s,p,m,d,x;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Icon:function(e){o=e},SearchInput:function(e){u=e},Skeleton:function(e){c=e}},0),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){a=e}},1),t.link("react",{default:function(e){l=e},useCallback:function(e){f=e},useState:function(e){s=e},useMemo:function(e){p=e}},2),t.link("../../../contexts/SettingsContext",{useSettings:function(e){m=e}},3),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){d=e}},4),t.link("../../../components/Sidebar",{default:function(e){x=e}},5);var h=function(e){var n=m(),t=d(),r=p((function(){if(!e)return function(){return!0};var n=function(e){return[e.i18nLabel&&t(e.i18nLabel),t(e._id),e._id].filter(Boolean)};try{var r=new RegExp(e,"i");return function(e){return n(e).some((function(e){return r.test(e)}))}}catch(i){return function(t){return n(t).some((function(n){return n.slice(0,e.length)===e}))}}}),[e,t]);return p((function(){var e=Array.from(new Set(n.filter(r).map((function(e){return"group"===e.type?e._id:e.group}))));return n.filter((function(n){var t=n.type,r=n.group,i=n._id;return"group"===t&&e.includes(r||i)})).sort((function(e,n){return t(e.i18nLabel||e._id).localeCompare(t(n.i18nLabel||n._id))}))}),[n,r,t])},g=function(e){var n=e.currentPath,t=d(),c=s(""),p=r(c,2),m=p[0],g=p[1],b=f((function(e){return g(e.currentTarget.value)}),[]),k=h(a(m,400)),S=!1;return l.createElement(i,{is:"section",display:"flex",flexDirection:"column",flexShrink:0,pb:"x24"},l.createElement(i,{pi:"x24",pb:"x8",fontScale:"p2",color:"info"},t("Settings")),l.createElement(i,{pi:"x24",pb:"x8",display:"flex"},l.createElement(u,{value:m,placeholder:t("Search"),onChange:b,addon:l.createElement(o,{name:"magnifier",size:"x20"})})),l.createElement(i,{pb:"x16",display:"flex",flexDirection:"column"},!1,!!k.length&&l.createElement(x.ItemsAssembler,{items:k.map((function(e){return{name:t(e.i18nLabel||e._id),pathSection:"admin",pathGroup:e._id}})),currentPath:n}),!k.length&&l.createElement(i,{pi:"x28",mb:"x4",color:"hint"},t("Nothing_found"))))};t.exportDefault(g)}

