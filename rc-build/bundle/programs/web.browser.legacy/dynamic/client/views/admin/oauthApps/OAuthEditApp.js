function module(e,t,n){var l,r,a,c,u,o,i,s,m,f,d,p,E,h,b,_,x,k,v,w,C,g,A,y,S,R,T,L,U,I,D,M;function B(e){var t=e._id,n=u(e,["_id"]),l=g(),r=m((function(){return{appId:t}}),[t]),a=D("oauth-apps.get",r),s=a.value,E=a.phase,h=a.error,b=a.reload,v=i((function(){b()}),[b]);return E===M.LOADING?o.createElement(f,{pb:"x20",maxWidth:"x600",w:"full",alignSelf:"center"},o.createElement(_,{mbs:"x8"}),o.createElement(k.Skeleton,{w:"full"}),o.createElement(_,{mbs:"x8"}),o.createElement(k.Skeleton,{w:"full"}),o.createElement(p,{stretch:!0,w:"full",mbs:"x8"},o.createElement(d,{disabled:!0},o.createElement(x,{inheritColor:!0})),o.createElement(d,{primary:!0,disabled:!0},o.createElement(x,{inheritColor:!0}))),o.createElement(p,{stretch:!0,w:"full",mbs:"x8"},o.createElement(d,{primary:!0,danger:!0,disabled:!0},o.createElement(x,{inheritColor:!0})))):!h&&s&&t?o.createElement(j,c({data:s.oauthApp,onChange:v},n)):o.createElement(f,{fontScale:"h1",pb:"x20"},l("error-application-not-found"))}function j(e){var t=e.onChange,n=e.data,f=u(e,["onChange","data"]),_=g(),x=T(),k=s({name:n.name,active:n.active,redirectUri:Array.isArray(n.redirectUri)?n.redirectUri.join("\n"):n.redirectUri}),D=a(k,2),M=D[0],B=D[1],j=R(),G=S("admin-oauth-apps"),O=i((function(){return G.push({})}),[G]),P=y(),W=m((function(){return P("oauth/authorize")}),[P]),z=m((function(){return P("oauth/token")}),[P]),F=A("updateOAuthApp"),H=A("deleteOAuthApp"),N=i(function(){function e(){return r.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.awrap(F(n._id,M));case 3:x({type:"success",message:_("Application_updated")}),t(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),x({type:"error",message:e.t0});case 10:case"end":return e.stop()}}return e}(),null,null,[[0,7]],Promise)}return e}(),[n._id,x,M,t,F,_]),V=i(function(){function e(){return r.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.awrap(H(n._id));case 3:j((function(){return o.createElement(U,{children:_("Your_entry_has_been_deleted"),onClose:function(){j(),O()}})})),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),x({type:"error",message:e.t0});case 9:case"end":return e.stop()}}return e}(),null,null,[[0,6]],Promise)}return e}(),[O,n._id,H,x,j,_]),Y=function(){return j((function(){return o.createElement(I,{children:_("Application_delete_warning"),onDelete:V,onCancel:function(){return j(void 0)}})}))},q=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e.currentTarget.value};return function(n){var r;return B(l(l({},M),{},((r={})[e]=t(n),r)))}},J=M.active,K=M.name,Q=M.redirectUri;return o.createElement(L.ScrollableContent,c({w:"full"},f),o.createElement(C,{maxWidth:"x600",alignSelf:"center",w:"full"},o.createElement(h,null,o.createElement(h.Label,{display:"flex",justifyContent:"space-between",w:"full"},_("Active"),o.createElement(w,{checked:J,onChange:q("active",(function(){return!J}))}))),o.createElement(h,null,o.createElement(h.Label,null,_("Application_Name")),o.createElement(h.Row,null,o.createElement(E,{value:K,onChange:q("name")})),o.createElement(h.Hint,null,_("Give_the_application_a_name_This_will_be_seen_by_your_users"))),o.createElement(h,null,o.createElement(h.Label,null,_("Redirect_URI")),o.createElement(h.Row,null,o.createElement(v,{rows:5,value:Q,onChange:q("redirectUri")})),o.createElement(h.Hint,null,_("After_OAuth2_authentication_users_will_be_redirected_to_this_URL"))),o.createElement(h,null,o.createElement(h.Label,null,_("Client_ID")),o.createElement(h.Row,null,o.createElement(E,{value:n.clientId,onChange:q("clientId")}))),o.createElement(h,null,o.createElement(h.Label,null,_("Client_Secret")),o.createElement(h.Row,null,o.createElement(E,{value:n.clientSecret}))),o.createElement(h,null,o.createElement(h.Label,null,_("Authorization_URL")),o.createElement(h.Row,null,o.createElement(E,{value:W}))),o.createElement(h,null,o.createElement(h.Label,null,_("Access_Token_URL")),o.createElement(h.Row,null,o.createElement(E,{value:z}))),o.createElement(h,null,o.createElement(h.Row,null,o.createElement(p,{stretch:!0,w:"full"},o.createElement(d,{onClick:O},_("Cancel")),o.createElement(d,{primary:!0,onClick:N},_("Save"))))),o.createElement(h,null,o.createElement(h.Row,null,o.createElement(p,{stretch:!0,w:"full"},o.createElement(d,{primary:!0,danger:!0,onClick:Y},o.createElement(b,{name:"trash",mie:"x4"}),_("Delete")))))))}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){l=e}},0),n.link("@babel/runtime/regenerator",{default:function(e){r=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},2),n.link("@babel/runtime/helpers/extends",{default:function(e){c=e}},3),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},4),n.export({default:function(){return B}}),n.link("react",{default:function(e){o=e},useCallback:function(e){i=e},useState:function(e){s=e},useMemo:function(e){m=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){f=e},Button:function(e){d=e},ButtonGroup:function(e){p=e},TextInput:function(e){E=e},Field:function(e){h=e},Icon:function(e){b=e},Skeleton:function(e){_=e},Throbber:function(e){x=e},InputBox:function(e){k=e},TextAreaInput:function(e){v=e},ToggleSwitch:function(e){w=e},FieldGroup:function(e){C=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){g=e}},2),n.link("../../../contexts/ServerContext",{useMethod:function(e){A=e},useAbsoluteUrl:function(e){y=e}},3),n.link("../../../contexts/RouterContext",{useRoute:function(e){S=e}},4),n.link("../../../contexts/ModalContext",{useSetModal:function(e){R=e}},5),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){T=e}},6),n.link("../../../components/VerticalBar",{default:function(e){L=e}},7),n.link("../../../components/DeleteSuccessModal",{default:function(e){U=e}},8),n.link("../../../components/DeleteWarningModal",{default:function(e){I=e}},9),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){D=e}},10),n.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){M=e}},11)}

