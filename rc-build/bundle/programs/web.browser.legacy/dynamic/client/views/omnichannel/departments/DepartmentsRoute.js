function module(e,t,n){var a,r,o,i,c,l,u,s,d,m,f,p,k,h,v,x,E,g,C,T,b,w,D,y,P;function R(e){var t=e._id,n=e.reload,a=v("DELETE","livechat/department/"+t),r=D(),i=y(),u=h(),s=c(function(){function e(){var e;return o.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.awrap(a());case 2:!0===(e=t.sent).success&&n();case 4:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return e}()),d=c((function(e){e.stopPropagation();var t=function(){function e(){return o.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.awrap(s());case 3:i({type:"success",message:u("Department_removed")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),i({type:"error",message:e.t0});case 9:r();case 10:case"end":return e.stop()}}return e}(),null,null,[[0,6]],Promise)}return e}();r(l.createElement(w,{onDelete:t,onCancel:function(){return r()}}))}));return l.createElement(m.Cell,{fontScale:"p1",color:"hint",withTruncatedText:!0},l.createElement(p,{small:!0,ghost:!0,title:u("Remove"),onClick:d},l.createElement(f,{name:"trash",size:"x16"})))}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),n.link("@babel/runtime/regenerator",{default:function(e){o=e}},2),n.export({RemoveDepartmentButton:function(){return R}}),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){i=e},useMutableCallback:function(e){c=e}},0),n.link("react",{default:function(e){l=e},useMemo:function(e){u=e},useCallback:function(e){s=e},useState:function(e){d=e}},1),n.link("@rocket.chat/fuselage",{Table:function(e){m=e},Icon:function(e){f=e},Button:function(e){p=e}},2),n.link("../../../components/GenericTable",{default:function(e){k=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){h=e}},4),n.link("../../../hooks/useEndpointAction",{useEndpointAction:function(e){v=e}},5),n.link("../../../contexts/AuthorizationContext",{usePermission:function(e){x=e}},6),n.link("../../../components/NotAuthorizedPage",{default:function(e){E=e}},7),n.link("./DepartmentsPage",{default:function(e){g=e}},8),n.link("./DepartmentEdit",{default:function(e){C=e}},9),n.link("../../../contexts/RouterContext",{useRouteParameter:function(e){T=e},useRoute:function(e){b=e}},10),n.link("../../../components/DeleteWarningModal",{default:function(e){w=e}},11),n.link("../../../contexts/ModalContext",{useSetModal:function(e){D=e}},12),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){y=e}},13),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){P=e}},14);var A=function(e){return"asc"===e?1:-1},_=function(e,t){var n=e.text,o=e.itemsPerPage,i=e.current,c=r(t,2),l=c[0],s=c[1];return u((function(){var e;return a(a({fields:JSON.stringify({name:1,username:1,emails:1,avatarETag:1}),text:n,sort:JSON.stringify((e={},e[l]=A(s),e.usernames="name"===l?A(s):void 0,e))},o&&{count:o}),i&&{offset:i})}),[n,o,i,l,s])};function N(){var e=h(),t=x("manage-livechat-departments"),n=d({text:"",current:0,itemsPerPage:25}),a=r(n,2),o=a[0],f=a[1],p=d(["name","asc"]),v=r(p,2),w=v[0],D=v[1],y=i(o,500),A=i(w,500),N=_(y,A),H=b("omnichannel-departments"),M=T("context"),S=T("id"),O=c((function(e){var t=r(w,2),n=t[0],a=t[1];D(n!==e?[e,"asc"]:[e,"asc"===a?"desc":"asc"])})),z=c((function(e){return function(){return H.push({context:"edit",id:e})}})),B=P("livechat/department",N),I=B.value,J=void 0===I?{}:I,Y=B.reload,j=u((function(){return[l.createElement(k.HeaderCell,{key:"name",direction:w[1],active:"name"===w[0],onClick:O,sort:"name"},e("Name")),l.createElement(k.HeaderCell,{key:"description",direction:w[1],active:"description"===w[0],onClick:O,sort:"description"},e("Description")),l.createElement(k.HeaderCell,{key:"numAgents",direction:w[1],active:"numAgents"===w[0],onClick:O,sort:"numAgents"},e("Num_Agents")),l.createElement(k.HeaderCell,{key:"enabled",direction:w[1],active:"enabled"===w[0],onClick:O,sort:"enabled"},e("Enabled")),l.createElement(k.HeaderCell,{key:"showOnRegistration",direction:w[1],active:"showOnRegistration"===w[0],onClick:O,sort:"status"},e("Show_on_registration_page")),l.createElement(k.HeaderCell,{key:"remove",w:"x60"},e("Remove"))].filter(Boolean)}),[w,O,e]),q=s((function(t){var n=t.name,a=t._id,r=t.description,o=t.numAgents,i=t.enabled,c=t.showOnRegistration;return(l.createElement(m.Row,{key:a,tabIndex:0,role:"link",onClick:z(a),action:!0,"qa-user-id":a},l.createElement(m.Cell,{withTruncatedText:!0},n),l.createElement(m.Cell,{withTruncatedText:!0},r),l.createElement(m.Cell,{withTruncatedText:!0},o||"0"),l.createElement(m.Cell,{withTruncatedText:!0},e(i?"Yes":"No")),l.createElement(m.Cell,{withTruncatedText:!0},e(c?"Yes":"No")),l.createElement(R,{_id:a,reload:Y})))}),[z,e,Y]);return t?"edit"===M||"new"===M?l.createElement(C,{reload:Y,id:S,title:e("edit"===M?"Edit_Department":"New_Department")}):l.createElement(g,{setParams:f,params:o,onHeaderClick:O,data:J,useQuery:_,reload:Y,header:j,renderRow:q,title:e("Departments")}):l.createElement(E,null)}n.exportDefault(N)}

