function module(e,t,n){var o,r,u,s,i,c,a,l;n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},0),n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){r=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){u=e}},2),n.export({useMethodData:function(){return d}}),n.link("react",{useCallback:function(e){s=e},useEffect:function(e){i=e}},0),n.link("../contexts/ServerContext",{useMethod:function(e){c=e}},1),n.link("../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){a=e}},2),n.link("./useAsyncState",{useAsyncState:function(e){l=e}},3);var f=[],d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f,n=arguments.length>2?arguments[2]:void 0,d=l(n),h=d.resolve,b=d.reject,p=d.reset,v=u(d,["resolve","reject","reset"]),k=a(),m=c(e),g=s((function(){p(),m.apply(void 0,r(t)).then(h).catch((function(e){console.error(e),k({type:"error",message:e}),b(e)}))}),[p,m,t,h,k,b]);return i((function(){g()}),[g]),o(o({},v),{},{reload:g})}}
