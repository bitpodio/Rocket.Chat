function module(e,t,r){let n,i,o,l,s,a,u,c;r.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},0),r.link("@babel/runtime/helpers/objectSpread2",{default(e){i=e}},1),r.link("@babel/runtime/helpers/extends",{default(e){o=e}},2),r.export({useUIKitStateManager:()=>f}),r.link("react",{useEffect(e){l=e},useState(e){s=e}},0),r.link("@rocket.chat/fuselage-hooks",{useSafely(e){a=e}},1),r.link("../../../definition/UIKit",{isErrorType(e){u=e}},2),r.link("../../../app/ui-message/client/ActionManager",{"*"(e){c=e}},3);const f=e=>{const[t,r]=a(s(e)),{viewId:f}=t;return l(()=>{const e=e=>{let t=o({},e);if(u(t)){const{errors:e}=t;return void r(t=>i(i({},t),{},{errors:e}))}const{type:l}=t,s=n(t,["type"]);r(s)};return c.on(f,e),()=>{c.off(f,e)}},[r,f]),t}}
