function module(e,n,t){var a,r,l,s,i,u,c,o,f,m,k;function d(){var e=l(["\n\tword-break: break-word;\n"]);return d=function(){return e},e}t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},1),t.link("@babel/runtime/helpers/taggedTemplateLiteralLoose",{default:function(e){l=e}},2),t.export({ContactManagerInfo:function(){return b}}),t.link("react",{default:function(e){s=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e}},1),t.link("@rocket.chat/css-in-js",{css:function(e){u=e}},2),t.link("../../../client/hooks/useEndpointData",{useEndpointData:function(e){c=e}},3),t.link("../../../client/hooks/useAsyncState",{AsyncStatePhase:function(e){o=e}},4),t.link("../../../client/components/avatar/UserAvatar",{default:function(e){f=e}},5),t.link("../../../client/components/UserStatus",{UserStatus:function(e){m=e}},6),t.link("../../../client/components/UserCard",{default:function(e){k=e}},7);var p=u(d()),h=function(e){var n=e.className,t=r(e,["className"]);return(s.createElement(k.Info,a({className:[n,p],flexShrink:0},t)))};function b(e){var n=e.username,t=c("users.info?username="+n),a=t.value,r=t.phase;if(!a&&r===o.LOADING)return null;var l=a.user,u=l.name,d=l.status;return(s.createElement(s.Fragment,null,s.createElement(h,{style:{display:"flex"}},s.createElement(f,{title:n,username:n}),s.createElement(k.Username,{mis:"x10",name:n,status:s.createElement(m,{status:d})}),s.createElement(i,{display:"flex",mis:"x7",mb:"x9",align:"center",justifyContent:"center"},"(",u,")"))))}}
