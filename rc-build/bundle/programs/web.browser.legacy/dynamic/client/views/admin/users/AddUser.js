function module(e,n,t){var r,i,u,o,l,a,s,c,f,d,m,k,h,p,v,b,x,_,w;function E(e){var n=e.roles,t=l(e,["roles"]),E=p(),C=x("admin-users"),g,T=v("roles.list","").value,y=f({}),j=o(y,2),q=j[0],F=j[1],P={name:function(e){return F((function(n){return u(u({},n),{},{name:e.trim().length?void 0:E("The_field_is_required",E("name"))})}))},username:function(e){return F((function(n){return u(u({},n),{},{username:e.trim().length?void 0:E("The_field_is_required",E("username"))})}))},email:function(e){return F((function(n){return u(u({},n),{},{email:e.trim().length?void 0:E("The_field_is_required",E("email"))})}))},password:function(e){return F((function(n){return u(u({},n),{},{password:e.trim().length?void 0:E("The_field_is_required",E("password"))})}))}},R=function(e){var n=e.key,t=e.value;P[n]&&P[n](t)},A=_({roles:[],name:"",username:"",statusText:"",bio:"",nickname:"",email:"",password:"",verified:!1,requirePasswordChange:!1,setRandomPassword:!1,sendWelcomeEmail:!0,joinDefaultChannels:!0,customFields:{}},R),D=A.values,S=A.handlers,U=A.reset,B=A.hasUnsavedChanges,G=c((function(e){return C.push({context:"info",id:e})}),[C]),M=b("POST","users.create",D,E("User_created_successfully!")),O=h(function(){function e(){var e,n,t,r,u;return i.async(function(){function l(l){for(;;)switch(l.prev=l.next){case 0:if(Object.entries(D).forEach((function(e){var n=o(e,2),t=n[0],r=n[1];R({key:t,value:r})})),e=D.name,n=D.username,t=D.password,r=D.email,""!==e&&""!==n&&""!==t&&""!==r){l.next=4;break}return l.abrupt("return",!1);case 4:return l.next=6,i.awrap(M());case 6:(u=l.sent).success&&G(u.user._id);case 8:case"end":return l.stop()}}return l}(),null,null,null,Promise)}return e}()),W=s((function(){var e,n;return null!==(e=null==T?void 0:null===(n=T.roles)||void 0===n?void 0:n.map((function(e){var n=e._id,t;return[n,e.description||n]})))&&void 0!==e?e:[]}),[T]),H=s((function(){return a.createElement(d,null,a.createElement(d.Row,null,a.createElement(m,{display:"flex",flexDirection:"row",justifyContent:"space-between",w:"full"},a.createElement(k,{flexGrow:1,disabled:!B,onClick:U,mie:"x4"},E("Cancel")),a.createElement(k,{flexGrow:1,disabled:!B,onClick:O},E("Save")))))}),[B,U,E,O]);return a.createElement(w,r({errors:q,formValues:D,formHandlers:S,availableRoles:W,append:H},t))}t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){i=e}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){u=e}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},3),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},4),t.export({AddUser:function(){return E}}),t.link("react",{default:function(e){a=e},useMemo:function(e){s=e},useCallback:function(e){c=e},useState:function(e){f=e}},0),t.link("@rocket.chat/fuselage",{Field:function(e){d=e},Box:function(e){m=e},Button:function(e){k=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){h=e}},2),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){p=e}},3),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){v=e}},4),t.link("../../../hooks/useEndpointAction",{useEndpointAction:function(e){b=e}},5),t.link("../../../contexts/RouterContext",{useRoute:function(e){x=e}},6),t.link("../../../hooks/useForm",{useForm:function(e){_=e}},7),t.link("./UserForm",{default:function(e){w=e}},8)}
