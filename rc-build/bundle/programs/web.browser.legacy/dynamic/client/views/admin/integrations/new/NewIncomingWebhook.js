function module(n,e,t){var o,i,r,u,a,l,c,s,f,d,m,p,k,x,b;t.link("@babel/runtime/helpers/extends",{default:function(n){o=n}},0),t.link("@babel/runtime/regenerator",{default:function(n){i=n}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){r=n}},2),t.export({default:function(){return E}}),t.link("react",{default:function(n){u=n},useCallback:function(n){a=n},useMemo:function(n){l=n}},0),t.link("@rocket.chat/fuselage",{Field:function(n){c=n},Box:function(n){s=n},Margins:function(n){f=n},Button:function(n){d=n}},1),t.link("../../../../contexts/TranslationContext",{useTranslation:function(n){m=n}},2),t.link("../../../../contexts/RouterContext",{useRoute:function(n){p=n}},3),t.link("../../../../hooks/useEndpointAction",{useEndpointAction:function(n){k=n}},4),t.link("../../../../hooks/useForm",{useForm:function(n){x=n}},5),t.link("../IncomingWebhookForm",{default:function(n){b=n}},6);var h={enabled:!1,channel:"",username:"",name:"",alias:"",avatarUrl:"",emoji:"",scriptEnabled:!1,script:""};function E(n){var e=m(),t=p("admin-integrations"),E=x(h),g=E.values,w=E.handlers,v=E.reset,y=l((function(){return r(r({},g),{},{type:"webhook-incoming"})}),[g]),C=k("POST","integrations.create",y,e("Integration_added")),F=a(function(){function n(){var n;return i.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.awrap(C());case 2:(n=e.sent).success&&t.push({context:"edit",type:"incoming",id:n.integration._id});case 4:case"end":return e.stop()}}return e}(),null,null,null,Promise)}return n}(),[t,C]),R=l((function(){return u.createElement(c,null,u.createElement(c.Row,null,u.createElement(s,{display:"flex",flexDirection:"row",justifyContent:"space-between",w:"full"},u.createElement(f,{inlineEnd:"x4"},u.createElement(d,{flexGrow:1,type:"reset",onClick:v},e("Reset")),u.createElement(d,{mie:"none",flexGrow:1,onClick:F},e("Save"))))))}),[F,v,e]);return u.createElement(b,o({formValues:g,formHandlers:w,append:R},n))}}

