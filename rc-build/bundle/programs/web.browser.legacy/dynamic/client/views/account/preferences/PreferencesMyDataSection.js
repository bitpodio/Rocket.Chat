function module(e,t,n){var a,r,o,l,u,i,c,s,d,f,p,x,m,D,_,E,k;n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),n.link("@babel/runtime/regenerator",{default:function(e){r=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){o=e}},2),n.link("react",{default:function(e){l=e},useCallback:function(e){u=e}},0),n.link("@rocket.chat/fuselage",{Accordion:function(e){i=e},Field:function(e){c=e},FieldGroup:function(e){s=e},ButtonGroup:function(e){d=e},Button:function(e){f=e},Icon:function(e){p=e},Box:function(e){x=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){m=e}},2),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){D=e}},3),n.link("../../../contexts/ServerContext",{useMethod:function(e){_=e}},4),n.link("../../../contexts/ModalContext",{useSetModal:function(e){E=e}},5),n.link("./MyDataModal",{default:function(e){k=e}},6);var w=function(e){var t=e.onChange,n=o(e,["onChange"]),w=m(),b=E(),h=_("requestDataDownload"),C=D(),M=u((function(){return b(null)}),[b]),g=u(function(){function e(e){var t,n,a,o;return r.async(function(){function u(u){for(;;)switch(u.prev=u.next){case 0:return u.prev=0,u.next=3,r.awrap(h({fullExport:e}));case 3:if(!(t=u.sent).requested){u.next=8;break}return n=w("UserDataDownload_Requested_Text",{pending_operations:t.pendingOperationsBeforeMyRequest}),b(l.createElement(k,{title:w("UserDataDownload_Requested"),text:l.createElement(x,{dangerouslySetInnerHTML:{__html:n}}),onCancel:M})),u.abrupt("return");case 8:if(!t.exportOperation){u.next=16;break}if("completed"!==t.exportOperation.status){u.next=13;break}return a=t.url?w("UserDataDownload_CompletedRequestExistedWithLink_Text",{download_link:t.url}):w("UserDataDownload_CompletedRequestExisted_Text"),b(l.createElement(k,{title:w("UserDataDownload_Requested"),text:l.createElement(x,{dangerouslySetInnerHTML:{__html:a}}),onCancel:M})),u.abrupt("return");case 13:return o=w("UserDataDownload_RequestExisted_Text",{pending_operations:t.pendingOperationsBeforeMyRequest}),b(l.createElement(k,{title:w("UserDataDownload_Requested"),text:l.createElement(x,{dangerouslySetInnerHTML:{__html:o}}),onCancel:M})),u.abrupt("return");case 16:b(l.createElement(k,{title:w("UserDataDownload_Requested"),onCancel:M})),u.next=22;break;case 19:u.prev=19,u.t0=u.catch(0),C({type:"error",message:u.t0});case 22:case"end":return u.stop()}}return u}(),null,null,[[0,19]],Promise)}return e}(),[M,C,h,b,w]),q=u((function(){return g(!1)}),[g]),y=u((function(){return g(!0)}),[g]);return l.createElement(i.Item,a({title:w("My Data")},n),l.createElement(s,null,l.createElement(c,null,l.createElement(c.Row,null,l.createElement(d,{stretch:!0,flexGrow:1},l.createElement(f,{onClick:q},l.createElement(p,{name:"download",size:20}),w("Download_My_Data")),l.createElement(f,{onClick:y},l.createElement(p,{name:"download",size:20}),w("Export_My_Data")))))))};n.exportDefault(w)}
