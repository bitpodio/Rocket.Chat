function module(n,e,t){var r,o,i,a,c,u,l,s,f,k,d,m,b;function x(n){return function(e){var t=e.confirm,x=e.dontAskAgain,h=c(e,["confirm","dontAskAgain"]),A=d(),g=m("dontAskAgainList"),p=x.action,v=x.label,_=null==g?void 0:g.filter((function(n){var e=n.action;return p===e})).length,C=b("saveUserPreferences"),E=k(!1),w=a(E,2),y=w[0],P=w[1];f((function(){_&&t()}),[_,t]);var D=function(){function n(){return o.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,!y){n.next=4;break}return n.next=4,o.awrap(C({dontAskAgainList:[].concat(i(g||[]),[{action:p,label:v}])}));case 4:t(),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.error(n.t0);case 10:case"end":return n.stop()}}return n}(),null,null,[[0,7]],Promise)}return n}(),T=function(){P(!y)};return s.createElement(n,r({},h,{dontAskAgain:s.createElement(u,{display:"flex",flexDirection:"row"},s.createElement(l,{checked:y,onChange:T,mie:"x4",name:"dont_ask_again"}),s.createElement("label",{htmlFor:"dont_ask_again"},A("Dont_ask_me_again"))),confirm:D}))}}t.link("@babel/runtime/helpers/extends",{default:function(n){r=n}},0),t.link("@babel/runtime/regenerator",{default:function(n){o=n}},1),t.link("@babel/runtime/helpers/toConsumableArray",{default:function(n){i=n}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(n){a=n}},3),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(n){c=n}},4),t.export({withDoNotAskAgain:function(){return x}}),t.link("@rocket.chat/fuselage",{Box:function(n){u=n},CheckBox:function(n){l=n}},0),t.link("react",{default:function(n){s=n},useEffect:function(n){f=n},useState:function(n){k=n}},1),t.link("../contexts/TranslationContext",{useTranslation:function(n){d=n}},2),t.link("../contexts/UserContext",{useUserPreference:function(n){m=n}},3),t.link("../contexts/ServerContext",{useMethod:function(n){b=n}},4)}

