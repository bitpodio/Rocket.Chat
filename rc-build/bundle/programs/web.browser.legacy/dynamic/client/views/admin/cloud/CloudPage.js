function module(e,n,t){var r,o,a,u,c,l,i,s,f,d,k,p,m,g,h,x,v,C,b,E,S,y,w,R,_,M;function T(){var e=m(),n=h(),t=v("cloud"),T=C("page"),I=x("error_code"),W=x("code"),P=x("state"),A=x("token"),B=g("cloud:finishOAuthAuthorization"),q=g("cloud:checkRegisterStatus"),D=g("cloud:connectWorkspace");k((function(){var r;(function(){function r(){return o.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:if("oauth-callback"===T){r.next=2;break}return r.abrupt("return");case 2:if(!I){r.next=6;break}return n({type:"error",title:e("Cloud_error_in_authenticating"),message:e("Cloud_error_code",{errorCode:I})}),t.push(),r.abrupt("return");case 6:return r.prev=6,r.next=9,o.awrap(B(W,P));case 9:r.next=14;break;case 11:r.prev=11,r.t0=r.catch(6),n({type:"error",message:r.t0});case 14:return r.prev=14,t.push(),r.finish(14);case 17:case"end":return r.stop()}}return r}(),null,null,[[6,11,14,17]],Promise)}return r})()()}),[I,W,P,T,n,e,t,B]);var F=s(d()),z=r(F,2),G=z[0],H=z[1],L=_(),O=i(function(){function e(){var e;return o.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.awrap(q());case 3:e=t.sent,H(e),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n({type:"error",message:t.t0});case 10:case"end":return t.stop()}}return t}(),null,null,[[0,7]],Promise)}return e}());k((function(){var t;(function(){function t(){var t;return o.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,!A){r.next=8;break}return r.next=4,o.awrap(D(A));case 4:if(t=r.sent){r.next=7;break}throw Error(e("An error occured connecting"));case 7:n({type:"success",message:e("Connected")});case 8:r.next=13;break;case 10:r.prev=10,r.t0=r.catch(0),n({type:"error",message:r.t0});case 13:return r.prev=13,r.next=16,o.awrap(O());case 16:return r.finish(13);case 17:case"end":return r.stop()}}return r}(),null,null,[[0,10,13,17]],Promise)}return t})()()}),[D,n,O,e,A]);var Q=function(){var e=function(){L(null),O()};L(f.createElement(R,{onClose:e}))},U=null==G?void 0:G.connectToCloud,j=null==G?void 0:G.workspaceRegistered;return f.createElement(p,null,f.createElement(p.Header,{title:e("Connectivity_Services")},f.createElement(c,null,!j&&f.createElement(u,{onClick:Q},e("Cloud_Register_manually")),f.createElement(u,{is:"a",primary:!0,href:M,target:"_blank",rel:"noopener noreferrer"},e("Cloud_console")))),f.createElement(p.ScrollableContentWithShadow,null,f.createElement(a,{marginInline:"auto",marginBlock:"neg-x24",width:"full",maxWidth:"x580"},f.createElement(l,{block:"x24"},f.createElement(b,null),U&&f.createElement(f.Fragment,null,j?f.createElement(f.Fragment,null,f.createElement(w,{onRegisterStatusChange:O}),f.createElement(S,{onRegisterStatusChange:O})):f.createElement(y,{email:null==G?void 0:G.email,token:null==G?void 0:G.token,workspaceId:null==G?void 0:G.workspaceId,uniqueId:null==G?void 0:G.uniqueId,onRegisterStatusChange:O})),!U&&f.createElement(E,{onRegisterStatusChange:O})))))}t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){o=e}},1),t.link("@rocket.chat/fuselage",{Box:function(e){a=e},Button:function(e){u=e},ButtonGroup:function(e){c=e},Margins:function(e){l=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){i=e},useSafely:function(e){s=e}},1),t.link("react",{default:function(e){f=e},useState:function(e){d=e},useEffect:function(e){k=e}},2),t.link("../../../components/Page",{default:function(e){p=e}},3),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){m=e}},4),t.link("../../../contexts/ServerContext",{useMethod:function(e){g=e}},5),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){h=e}},6),t.link("../../../contexts/RouterContext",{useQueryStringParameter:function(e){x=e},useRoute:function(e){v=e},useRouteParameter:function(e){C=e}},7),t.link("./WhatIsItSection",{default:function(e){b=e}},8),t.link("./ConnectToCloudSection",{default:function(e){E=e}},9),t.link("./TroubleshootingSection",{default:function(e){S=e}},10),t.link("./WorkspaceRegistrationSection",{default:function(e){y=e}},11),t.link("./WorkspaceLoginSection",{default:function(e){w=e}},12),t.link("./ManualWorkspaceRegistrationModal",{default:function(e){R=e}},13),t.link("../../../contexts/ModalContext",{useSetModal:function(e){_=e}},14),t.link("./constants",{cloudConsoleUrl:function(e){M=e}},15),t.exportDefault(T)}
