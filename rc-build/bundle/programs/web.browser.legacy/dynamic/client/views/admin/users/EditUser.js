function module(e,n,t){var r,a,u,i,s,o,l,c,d,f,m,p,v,k,h,b,_,x,E,g,w,y,A,T,U;function C(e){var n=e.uid,t=s(e,["uid"]),r=b(),a=T("roles.list",""),u=a.value,c=a.phase,d=a.error,m=T("users.info",l((function(){return{userId:n}}),[n])),p=m.value,v=m.phase,h=m.error;return[v,c].includes(U.LOADING)?o.createElement(f,{p:"x24"},o.createElement(A,null)):h||d?o.createElement(k,{m:"x16",type:"danger"},r("User_not_found")):o.createElement(S,i({data:p.user,roles:u.roles},t))}t.link("@babel/runtime/regenerator",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},2),t.link("@babel/runtime/helpers/extends",{default:function(e){i=e}},3),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){s=e}},4),t.export({EditUserWithData:function(){return C},EditUser:function(){return S}}),t.link("react",{default:function(e){o=e},useMemo:function(e){l=e},useState:function(e){c=e},useCallback:function(e){d=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){f=e},Field:function(e){m=e},Margins:function(e){p=e},Button:function(e){v=e},Callout:function(e){k=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){h=e}},2),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){b=e}},3),t.link("../../../hooks/useEndpointAction",{useEndpointAction:function(e){_=e}},4),t.link("../../../hooks/useEndpointUpload",{useEndpointUpload:function(e){x=e}},5),t.link("../../../contexts/RouterContext",{useRoute:function(e){E=e}},6),t.link("../../../components/avatar/UserAvatarEditor",{default:function(e){g=e}},7),t.link("../../../hooks/useForm",{useForm:function(e){w=e}},8),t.link("./UserForm",{default:function(e){y=e}},9),t.link("../../../components/Skeleton",{FormSkeleton:function(e){A=e}},10),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){T=e}},11),t.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){U=e}},12);var P=function(e){var n,t,r,a,u;return{roles:e.roles,name:null!==(n=e.name)&&void 0!==n?n:"",password:"",username:e.username,status:e.status,bio:null!==(t=e.bio)&&void 0!==t?t:"",nickname:null!==(r=e.nickname)&&void 0!==r?r:"",email:e.emails&&e.emails[0].address||"",verified:e.emails&&e.emails[0].verified||!1,setRandomPassword:!1,requirePasswordChange:e.setRandomPassword||!1,customFields:null!==(a=e.customFields)&&void 0!==a?a:{},statusText:null!==(u=e.statusText)&&void 0!==u?u:""}};function S(e){var n=e.data,t=e.roles,k=s(e,["data","roles"]),A=b(),T=c(),U=u(T,2),C=U[0],S=U[1],F=c({}),R=u(F,2),I=R[0],O=R[1],j={name:function(e){return O((function(n){return a(a({},n),{},{name:e.trim().length?void 0:A("The_field_is_required",A("name"))})}))},username:function(e){return O((function(n){return a(a({},n),{},{username:e.trim().length?void 0:A("The_field_is_required",A("username"))})}))},email:function(e){return O((function(n){return a(a({},n),{},{email:e.trim().length?void 0:A("The_field_is_required",A("email"))})}))}},D=function(e){var n=e.key,t=e.value;j[n]&&j[n](t)},q=w(P(n),D),G=q.values,M=q.handlers,B=q.reset,W=q.hasUnsavedChanges,H=E("admin-users"),L=d((function(e){return H.push({context:"info",id:e})}),[H]),N=l((function(){return{userId:n._id,data:G}}),[n._id,G]),V=l((function(){return{userId:n._id,avatarUrl:C&&C.avatarUrl}}),[n._id,C]),z=l((function(){return{userId:n._id}}),[n._id]),J=_("POST","users.update",N,A("User_updated_successfully")),K=x("users.setAvatar",V,A("Avatar_changed_successfully")),Q=_("POST","users.setAvatar",V,A("Avatar_changed_successfully")),X=_("POST","users.resetAvatar",z,A("Avatar_changed_successfully")),Y=d(function(){function e(){return r.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:if("reset"!==C){e.next=2;break}return e.abrupt("return",X());case 2:if(!C.avatarUrl){e.next=4;break}return e.abrupt("return",Q());case 4:return C.set("userId",n._id),e.abrupt("return",K(C));case 6:case"end":return e.stop()}}return e}(),null,null,null,Promise)}return e}(),[C,X,K,Q,n._id]),Z=h(function(){function e(){var e,t,a,i;return r.async(function(){function s(s){for(;;)switch(s.prev=s.next){case 0:if(Object.entries(G).forEach((function(e){var n=u(e,2),t=n[0],r=n[1];j[t]&&j[t](r)})),e=G.name,t=G.username,a=G.email,""!==e&&""!==t&&""!==a){s.next=4;break}return s.abrupt("return",!1);case 4:return s.next=6,r.awrap(J());case 6:if(!(i=s.sent).success){s.next=12;break}if(!C){s.next=11;break}return s.next=11,r.awrap(Y());case 11:L(n._id);case 12:case"end":return s.stop()}}return s}(),null,null,null,Promise)}return e}(),[C,n._id,L,J,Y,G,I,j]),$=t.map((function(e){var n=e._id,t;return[n,e.description||n]})),ee=W||C,ne=l((function(){return o.createElement(g,{currentUsername:n.username,username:G.username,etag:n.avatarETag,setAvatarObj:S})}),[n.username,n.avatarETag,G.username]),te=l((function(){return o.createElement(m,null,o.createElement(m.Row,null,o.createElement(f,{display:"flex",flexDirection:"row",justifyContent:"space-between",w:"full"},o.createElement(p,{inlineEnd:"x4"},o.createElement(v,{flexGrow:1,type:"reset",disabled:!ee,onClick:B},A("Reset")),o.createElement(v,{mie:"none",flexGrow:1,disabled:!ee,onClick:Z},A("Save"))))))}),[Z,ee,B,A]);return o.createElement(y,i({errors:I,formValues:G,formHandlers:M,availableRoles:$,prepend:ne,append:te},k))}}

