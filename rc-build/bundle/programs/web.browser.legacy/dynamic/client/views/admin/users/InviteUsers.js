function module(e,n,t){var i,a,r,o,c,s,l,u,f,m,p,d,x,b,k;function h(e){var n=e.data,t=r(e,["data"]),h=p(),g=b(),v=s(""),E=a(v,2),S=E[0],C=E[1],T=d("sendInvitationEmail"),_=c((function(e){return e.split(/[\ ,;]+/i).filter((function(e){return x(e)}))}),[]),y=function(){function e(){return i.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.awrap(T(_(S)));case 3:g({type:"success",message:h("Emails_sent_successfully!")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),g({type:"error",message:e.t0.message});case 9:case"end":return e.stop()}}return e}(),null,null,[[0,6]],Promise)}return e}();return o.createElement(k.ScrollableContent,t,o.createElement(l,{is:"h2",fontScale:"h1",mb:"x8"},h("Send_invitation_email")),o.createElement(l,{fontScale:"p1",mb:"x8"},h("Send_invitation_email_info")),o.createElement(m,{rows:5,flexGrow:0,onChange:function(e){return C(e.currentTarget.value)}}),o.createElement(u,{primary:!0,onClick:y,disabled:!_(S).length,alignItems:"stretch",mb:"x8"},o.createElement(f,{name:"send",size:"x16"}),h("Send")))}t.link("@babel/runtime/regenerator",{default:function(e){i=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},2),t.export({InviteUsers:function(){return h}}),t.link("react",{default:function(e){o=e},useCallback:function(e){c=e},useState:function(e){s=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){l=e},Button:function(e){u=e},Icon:function(e){f=e},TextAreaInput:function(e){m=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){p=e}},2),t.link("../../../contexts/ServerContext",{useMethod:function(e){d=e}},3),t.link("../../../../app/utils/lib/isEmail.js",{isEmail:function(e){x=e}},4),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){b=e}},5),t.link("../../../components/VerticalBar",{default:function(e){k=e}},6)}

