function module(e,n,t){var r,o,a,c,u,l,i,s,f,d,k,p,m,h,x,g,b;function E(e){var n=e.token,t=e.workspaceId,E=e.uniqueId,C=e.onRegisterStatusChange,v=c(e,["token","workspaceId","uniqueId","onRegisterStatusChange"]),w=x(),y=g(),T=b("cloud:connectWorkspace"),I=b("cloud:syncWorkspace"),S=k(h(!1)),_=a(S,2),B=_[0],M=_[1],R=h(n),q=a(R,2),A=q[0],W=q[1],D=function(e){var n=e.currentTarget.value;W(n)},F=function(){function e(){var e,n;return o.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return M(!0),t.prev=1,t.next=4,o.awrap(T(A));case 4:if(e=t.sent){t.next=7;break}throw Error(w("An error occured connecting"));case 7:return y({type:"success",message:w("Connected")}),t.next=10,o.awrap(I());case 10:if(n=t.sent){t.next=13;break}throw Error(w("An error occured syncing"));case 13:t.next=18;break;case 15:t.prev=15,t.t0=t.catch(1),y({type:"error",message:t.t0});case 18:return t.prev=18,t.next=21,o.awrap(C&&C());case 21:return M(!1),t.finish(18);case 23:case"end":return t.stop()}}return t}(),null,null,[[1,15,18,23]],Promise)}return e}(),P=p();return m.createElement(u,r({marginBlock:"neg-x24"},v),m.createElement(f,{block:"x24"},m.createElement(u,{withRichContent:!0,color:"neutral-800"},m.createElement("p",null,w("Cloud_token_instructions"))),m.createElement(s,null,m.createElement(s.Label,{htmlFor:P},w("Token")),m.createElement(s.Row,null,m.createElement(d,{id:P,disabled:B,value:A,onChange:D})),m.createElement(s.Hint,null,w("Cloud_manually_input_token"))),m.createElement(i,null,m.createElement(l,{primary:!0,disabled:B,onClick:F},w("Connect")))))}t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){o=e}},1),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},2),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){c=e}},3),t.link("@rocket.chat/fuselage",{Box:function(e){u=e},Button:function(e){l=e},ButtonGroup:function(e){i=e},Field:function(e){s=e},Margins:function(e){f=e},TextInput:function(e){d=e}},0),t.link("@rocket.chat/fuselage-hooks",{useSafely:function(e){k=e},useUniqueId:function(e){p=e}},1),t.link("react",{default:function(e){m=e},useState:function(e){h=e}},2),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){x=e}},3),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){g=e}},4),t.link("../../../contexts/ServerContext",{useMethod:function(e){b=e}},5),t.exportDefault(E)}

