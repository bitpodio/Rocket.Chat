function module(e,n,t){var r,a,l,o,c,i,u,s,m,f,d,k,p;function E(e){var n=e.reactions,t=e.onClick,o=f("UI_Use_Real_Name");return a.createElement(k,null,a.createElement(l,null,Object.entries(n).map((function(e){var n=r(e,2),c=n[0],i=n[1],u=i.names,s=void 0===u?[]:u,m=i.usernames;return(a.createElement(l,{key:c},a.createElement(l,{display:"flex",flexWrap:"wrap",overflowX:"hidden",mb:"x8"},a.createElement(d,{emojiHandle:c}),a.createElement(l,{paddingBlock:"x4",mis:"x4"},m.map((function(e,n){return a.createElement(C,{key:e,displayName:o&&s[n]||e,username:e,onClick:t})}))))))}))))}function C(e){var n=e.username,t=e.onClick,r=e.displayName;return(a.createElement(l,{marginInlineEnd:"x4","data-username":n,onClick:t,key:r},a.createElement(o,null,r)))}function g(e){var n=e.rid,t=e.reactions,r=e.tabBar,l=e.onClose,o=m(),f=s((function(e){var t=e.currentTarget.dataset.username;t&&p({username:t,rid:n,target:e.currentTarget,open:function(e){e.preventDefault(),l(),r.openUserInfo(t)}})}));return a.createElement(a.Fragment,null,a.createElement(c.Header,null,a.createElement(c.Title,null,o("Users_reacted")),a.createElement(c.Close,{onClick:l})),a.createElement(c.Content,{fontScale:"p1"},a.createElement(E,{reactions:t,onClick:f,onClose:l})),a.createElement(c.Footer,null,a.createElement(i,{align:"end"},a.createElement(u,{primary:!0,onClick:l},o("Ok")))))}t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},0),t.export({Reactions:function(){return E},Username:function(){return C},default:function(){return g}}),t.link("react",{default:function(e){a=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){l=e},Tag:function(e){o=e},Modal:function(e){c=e},ButtonGroup:function(e){i=e},Button:function(e){u=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){s=e}},2),t.link("../../../../client/contexts/TranslationContext",{useTranslation:function(e){m=e}},3),t.link("../../../../client/contexts/SettingsContext",{useSetting:function(e){f=e}},4),t.link("../../../../client/components/Emoji",{default:function(e){d=e}},5),t.link("../../../../client/components/ScrollableContentWrapper",{default:function(e){k=e}},6),t.link("../../../ui/client/lib/UserCard",{openUserCard:function(e){p=e}},7)}
