function module(e,n,t){var r,a,c,u,i,l,s,o,p,f,m,d,x,b,E,k,h,v,_,g,w;function y(e){var n=e.app,t=u(e,["app"]),y=E(),M=m(),T=d("admin-apps"),P=x("cloud:checkUserLoggedIn"),A=b("POST","/apps/"+n.id+"/status"),I=b("GET","/apps"),S=b("POST","/apps/"+n.id+"/sync"),C=b("DELETE","/apps/"+n.id),U="subscription"===n.purchaseType,z=n.subscriptionInfo&&["active","trialing"].includes(n.subscriptionInfo.status),L=k.includes(n.status),D=f((function(){M(null)}),[M]),j=f(function(){function e(){var e,t;return c.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,c.awrap(A({status:"manually_enabled"}));case 3:e=r.sent,t=e.status,h(n.name,t),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),v(r.t0);case 11:case"end":return r.stop()}}return r}(),null,null,[[0,8]],Promise)}return e}(),[n.name,A]),O=f((function(){T.push({context:"logs",id:n.id})}),[n.id,T]),R=f(function(){function e(){var e,t;return c.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,c.awrap(P());case 2:if(r.sent){r.next=5;break}return M(o.createElement(_,null)),r.abrupt("return");case 5:return r.prev=5,r.next=8,c.awrap(I({buildExternalUrl:"true",appId:n.id,purchaseType:n.purchaseType,details:!0}));case 8:e=r.sent,r.next=15;break;case 11:return r.prev=11,r.t0=r.catch(5),v(r.t0),r.abrupt("return");case 15:t=function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.awrap(S());case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),v(e.t0);case 8:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}(),M(o.createElement(g,{url:e.url,confirm:t,cancel:D}));case 17:case"end":return r.stop()}}return r}(),null,null,[[5,11]],Promise)}return e}(),[P,M,D,I,n.id,n.purchaseType,S]),W=f((function(){var e=function(){function e(){var e,t;return c.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return D(),r.prev=1,r.next=4,c.awrap(A({status:"manually_disabled"}));case 4:e=r.sent,t=e.status,h(n.name,t),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(1),v(r.t0);case 12:case"end":return r.stop()}}return r}(),null,null,[[1,9]],Promise)}return e}();M(o.createElement(w,{close:D,confirm:e,text:y("Apps_Marketplace_Deactivate_App_Prompt"),confirmText:y("Yes")}))}),[n.name,D,A,M,y]),Y=f((function(){var e=function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return D(),e.prev=1,e.next=4,c.awrap(C());case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),v(e.t0);case 9:case"end":return e.stop()}}return e}(),null,null,[[1,6]],Promise)}return e}();if(z){var n=function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.awrap(R());case 2:case"end":return e.stop()}}return e}(),null,null,null,Promise)}return e}();M(o.createElement(w,{close:D,cancel:e,confirm:n,text:y("Apps_Marketplace_Uninstall_Subscribed_App_Prompt"),confirmText:y("Apps_Marketplace_Modify_App_Subscription"),cancelText:y("Apps_Marketplace_Uninstall_Subscribed_App_Anyway")}))}M(o.createElement(w,{close:D,confirm:e,text:y("Apps_Marketplace_Uninstall_App_Prompt"),confirmText:y("Yes")}))}),[D,R,z,M,y,C]),B=p((function(){return a(a(a(a({},U&&{subscribe:{label:o.createElement(i,null,o.createElement(l,{name:"card",size:"x16",marginInlineEnd:"x4"}),y("Subscription")),action:R}}),{},{viewLogs:{label:o.createElement(i,null,o.createElement(l,{name:"list-alt",size:"x16",marginInlineEnd:"x4"}),y("View_Logs")),action:O}},L&&{disable:{label:o.createElement(i,{color:"warning"},o.createElement(l,{name:"ban",size:"x16",marginInlineEnd:"x4"}),y("Disable")),action:W}}),!L&&{enable:{label:o.createElement(i,null,o.createElement(l,{name:"check",size:"x16",marginInlineEnd:"x4"}),y("Enable")),action:j}}),{},{uninstall:{label:o.createElement(i,{color:"danger"},o.createElement(l,{name:"trash",size:"x16",marginInlineEnd:"x4"}),y("Uninstall")),action:Y}})}),[U,y,R,O,L,W,j,Y]);return o.createElement(s,r({options:B,placement:"bottom-start"},t))}t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},1),t.link("@babel/runtime/regenerator",{default:function(e){c=e}},2),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},3),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Icon:function(e){l=e},Menu:function(e){s=e}},0),t.link("react",{default:function(e){o=e},useMemo:function(e){p=e},useCallback:function(e){f=e}},1),t.link("../../../contexts/ModalContext",{useSetModal:function(e){m=e}},2),t.link("../../../contexts/RouterContext",{useRoute:function(e){d=e}},3),t.link("../../../contexts/ServerContext",{useMethod:function(e){x=e},useEndpoint:function(e){b=e}},4),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){E=e}},5),t.link("./helpers",{appEnabledStatuses:function(e){k=e},warnStatusChange:function(e){h=e},handleAPIError:function(e){v=e}},6),t.link("./CloudLoginModal",{default:function(e){_=e}},7),t.link("./IframeModal",{default:function(e){g=e}},8),t.link("./WarningModal",{default:function(e){w=e}},9),t.exportDefault(y)}
