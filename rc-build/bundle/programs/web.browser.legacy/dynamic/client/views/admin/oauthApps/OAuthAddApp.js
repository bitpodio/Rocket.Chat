function module(e,t,n){var l,r,a,u,c,i,o,s,f,m,p,d,h,_,E,b,v,x,k;function g(e){var t=E(),n=x(),g=o({name:"",active:!1,redirectUri:""}),w=u(g,2),C=w[0],T=w[1],y=b("addOAuthApp"),A=v("admin-oauth-apps"),R=i((function(){return A.push({})}),[A]),S=i(function(){function e(){return a.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.awrap(y(C));case 3:R(),n({type:"success",message:t("Application_added")}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n({type:"error",message:e.t0});case 10:case"end":return e.stop()}}return e}(),null,null,[[0,7]],Promise)}return e}(),[R,n,C,y,t]),U=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e.currentTarget.value};return function(n){var l;return T(r(r({},C),{},((l={})[e]=t(n),l)))}},L=C.active,B=C.name,G=C.redirectUri;return c.createElement(k.ScrollableContent,l({w:"full"},e),c.createElement(_,{maxWidth:"x600",alignSelf:"center",w:"full"},c.createElement(p,null,c.createElement(p.Label,{display:"flex",justifyContent:"space-between",w:"full"},t("Active"),c.createElement(h,{checked:L,onChange:U("active",(function(){return!L}))}))),c.createElement(p,null,c.createElement(p.Label,null,t("Application_Name")),c.createElement(p.Row,null,c.createElement(m,{value:B,onChange:U("name")})),c.createElement(p.Hint,null,t("Give_the_application_a_name_This_will_be_seen_by_your_users"))),c.createElement(p,null,c.createElement(p.Label,null,t("Redirect_URI")),c.createElement(p.Row,null,c.createElement(d,{rows:5,value:G,onChange:U("redirectUri")})),c.createElement(p.Hint,null,t("After_OAuth2_authentication_users_will_be_redirected_to_this_URL"))),c.createElement(p,null,c.createElement(p.Row,null,c.createElement(f,{stretch:!0,w:"full"},c.createElement(s,{onClick:R},t("Cancel")),c.createElement(s,{primary:!0,onClick:S},t("Save")))))))}n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},1),n.link("@babel/runtime/regenerator",{default:function(e){a=e}},2),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},3),n.export({default:function(){return g}}),n.link("react",{default:function(e){c=e},useCallback:function(e){i=e},useState:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){s=e},ButtonGroup:function(e){f=e},TextInput:function(e){m=e},Field:function(e){p=e},TextAreaInput:function(e){d=e},ToggleSwitch:function(e){h=e},FieldGroup:function(e){_=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){E=e}},2),n.link("../../../contexts/ServerContext",{useMethod:function(e){b=e}},3),n.link("../../../contexts/RouterContext",{useRoute:function(e){v=e}},4),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){x=e}},5),n.link("../../../components/VerticalBar",{default:function(e){k=e}},6)}

