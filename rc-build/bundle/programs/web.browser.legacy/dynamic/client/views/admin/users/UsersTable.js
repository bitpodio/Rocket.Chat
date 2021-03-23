function module(e,t,n){var a,l,r,i,s,o,c,u,m,f,d,p,k,x,y,E,h,v,C;n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},2),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},3),n.export({UsersTable:function(){return T}}),n.link("@rocket.chat/fuselage",{Box:function(e){s=e},Table:function(e){o=e}},0),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){c=e},useMediaQuery:function(e){u=e}},1),n.link("react",{default:function(e){m=e},useMemo:function(e){f=e},useCallback:function(e){d=e},useState:function(e){p=e}},2),n.link("../../../components/avatar/UserAvatar",{default:function(e){k=e}},3),n.link("../../../components/GenericTable",{default:function(e){x=e}},4),n.link("../../../lib/capitalize",{capitalize:function(e){y=e}},5),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){E=e}},6),n.link("../../../contexts/RouterContext",{useRoute:function(e){h=e}},7),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){v=e}},8),n.link("../../../components/FilterByText",{default:function(e){C=e}},9);var g={whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"},b=function(e){return"asc"===e?1:-1},S=function(e){var t=e.emails,n=e._id,a=e.username,l=e.name,r=e.roles,i=e.status,c=e.avatarETag,u=e.onClick,f=e.mediaQuery,d=e.active,p=E(),x=p(d?y(i):"Disabled");return m.createElement(o.Row,{onKeyDown:u(n),onClick:u(n),tabIndex:0,role:"link",action:!0,"qa-user-id":n},m.createElement(o.Cell,{style:g},m.createElement(s,{display:"flex",alignItems:"center"},m.createElement(k,{size:f?"x28":"x40",title:a,username:a,etag:c}),m.createElement(s,{display:"flex",style:g,mi:"x8"},m.createElement(s,{display:"flex",flexDirection:"column",alignSelf:"center",style:g},m.createElement(s,{fontScale:"p2",style:g,color:"default"},l||a),!f&&l&&m.createElement(s,{fontScale:"p1",color:"hint",style:g}," ","@"+a," "))))),f&&m.createElement(o.Cell,null,m.createElement(s,{fontScale:"p2",style:g,color:"hint"},a)," ",m.createElement(s,{mi:"x4"})),m.createElement(o.Cell,{style:g},t&&t.length&&t[0].address),f&&m.createElement(o.Cell,{style:g},r&&r.join(", ")),m.createElement(o.Cell,{fontScale:"p1",color:"hint",style:g},x))},w=function(e,t){var n=e.text,a=e.itemsPerPage,l=e.current;return f((function(){return i(i({fields:JSON.stringify({name:1,username:1,emails:1,roles:1,status:1,avatarETag:1,active:1}),query:JSON.stringify({$or:[{"emails.address":{$regex:n||"",$options:"i"}},{username:{$regex:n||"",$options:"i"}},{name:{$regex:n||"",$options:"i"}}]}),sort:JSON.stringify(t.reduce((function(e,t){var n=r(t,2),a=n[0],l=n[1];return e[a]=b(l),e}),{}))},a&&{count:a}),l&&{offset:l})}),[n,a,l,t])};function T(){var e=E(),t=p({text:"",current:0,itemsPerPage:25}),n=r(t,2),i=n[0],s=n[1],o=p([["name","asc"],["usernames","asc"]]),f=r(o,2),k=f[0],y=f[1],g=c(i,500),b=c(k,500),T=w(g,b),D,$=v("users.list",T).value,P=void 0===$?{}:$,H=h("admin-users"),N=d((function(e){return function(){return H.push({context:"info",id:e})}}),[H]),O=d((function(e){var t=[],n=r(k,1),a=r(n[0],2),l=a[0],i=a[1];l===e?t.push([e,"asc"===i?"desc":"asc"]):t.push([e,"asc"]),"name"===e&&t.push(["usernames",i]),"status"===e&&t.push(["active","asc"===i?"desc":"asc"]),y(t)}),[k]),R=u("(min-width: 1024px)");return m.createElement(x,{header:m.createElement(m.Fragment,null,m.createElement(x.HeaderCell,{key:"name",direction:k[0][1],active:"name"===k[0][0],onClick:O,sort:"name",w:"x200"},e("Name")),R&&m.createElement(x.HeaderCell,{key:"username",direction:k[0][1],active:"username"===k[0][0],onClick:O,sort:"username",w:"x140"},e("Username")),m.createElement(x.HeaderCell,{key:"email",direction:k[0][1],active:"emails.adress"===k[0][0],onClick:O,sort:"emails.address",w:"x120"},e("Email")),R&&m.createElement(x.HeaderCell,{key:"roles",direction:k[0][1],active:"roles"===k[0][0],onClick:O,sort:"roles",w:"x120"},e("Roles")),m.createElement(x.HeaderCell,{key:"status",direction:k[0][1],active:"status"===k[0][0],onClick:O,sort:"status",w:"x100"},e("Status"))),results:P.users,total:P.total,setParams:s,params:i,renderFilter:function(t){var n=t.onChange,r=l(t,["onChange"]);return(m.createElement(C,a({placeholder:e("Search_Users"),onChange:n},r)))}},(function(e){return m.createElement(S,a({key:e._id,onClick:N,mediaQuery:R},e))}))}n.exportDefault(T)}

