function module(e,r,t){let u,o,a,n;t.link("meteor/kadira:flow-router",{FlowRouter(e){u=e}},0),t.link("meteor/tracker",{Tracker(e){o=e}},1),t.link("react",{default(e){a=e}},2),t.link("../contexts/RouterContext",{RouterContext(e){n=e}},3);const l=function(e){let r=o.nonreactive(e);return{getCurrentValue:()=>r,subscribe:t=>{const u=o.autorun(()=>{r=e(),t()});return()=>{u.stop()}}}},c=(e,r,t)=>l(()=>u.path(e,r,t)),i=(e,r,t)=>l(()=>u.url(e,r,t)),m=(e,r,t)=>{u.go(e,r,t)},d=(e,r,t)=>{u.withReplaceState(()=>{u.go(e,r,t)})},s=e=>l(()=>u.getParam(e)),R=e=>l(()=>u.getQueryParam(e)),h=()=>l(()=>{var e;u.watchPathChange();const{route:r,params:t,queryParams:o}=u.current();return[null==r?void 0:r.name,t,o,null==r?void 0:null===(e=r.group)||void 0===e?void 0:e.name]}),g={queryRoutePath:c,queryRouteUrl:i,pushRoute:m,replaceRoute:d,queryRouteParameter:s,queryQueryStringParameter:R,queryCurrentRoute:h},p=e=>{let{children:r}=e;return(a.createElement(n.Provider,{children:r,value:g}))};t.exportDefault(p)}

