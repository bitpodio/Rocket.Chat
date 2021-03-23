function module(e,n,t){var o,i,r,u,c,l,a,s,f,m,h,d,k;t.link("react",{default:function(e){o=e},useCallback:function(e){i=e},useEffect:function(e){r=e}},0),t.link("meteor/meteor",{Meteor:function(e){u=e}},1),t.link("../../app/authorization/client",{hasPermission:function(e){c=e},hasAtLeastOnePermission:function(e){l=e},hasAllPermission:function(e){a=e},hasRole:function(e){s=e}},2),t.link("../contexts/AuthorizationContext",{AuthorizationContext:function(e){f=e},RoleStore:function(e){m=e}},3),t.link("./createReactiveSubscriptionFactory",{createReactiveSubscriptionFactory:function(e){h=e}},4),t.link("../hooks/useReactiveValue",{useReactiveValue:function(e){d=e}},5),t.link("../../app/models/client/models/Roles",{Roles:function(e){k=e}},6);var v={queryPermission:h((function(e,n){return c(e,n)})),queryAtLeastOnePermission:h((function(e,n){return l(e,n)})),queryAllPermissions:h((function(e,n){return a(e,n)})),queryRole:h((function(e){return s(u.userId(),e)})),roleStore:new m},R=function(e){var n=e.children,t=d(i((function(){return k.find().fetch().reduce((function(e,n){return e[n._id]=n,e}),{})}),[]));return r((function(){v.roleStore.roles=t,v.roleStore.emit("change",t)}),[t]),o.createElement(f.Provider,{children:n,value:v})};t.exportDefault(R)}

