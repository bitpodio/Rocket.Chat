function module(e,t,l){let a,n,u,o,i,r;l.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},1),l.link("@rocket.chat/fuselage",{MultiSelect(e){u=e}},0),l.link("react",{default(e){o=e},useMemo(e){i=e}},1),l.link("../../../../client/hooks/useEndpointData",{useEndpointData(e){r=e}},2);const s=e=>{let{value:t,handler:l}=e,s=n(e,["value","handler"]);const{value:c}=r("livechat/tags.list"),d=i(()=>c&&c.tags?c.tags.map(e=>{let{name:t}=e;return[t,t]}):[],[c]);return o.createElement(u,a({options:d,value:t,onChange:l,flexGrow:1},s))};l.exportDefault(s)}

