function module(e,t,l){let n,i,o,a,c;l.export({TooltipComponent:()=>r}),l.link("react",{default(e){n=e},useRef(e){i=e}},0),l.link("@rocket.chat/fuselage",{Tooltip(e){o=e},PositionAnimated(e){a=e},AnimatedVisibility(e){c=e}},1);const r=e=>{let{title:t,anchor:l}=e;const r=i(l);return(n.createElement(a,{anchor:r,placement:"top-middle",margin:8,visible:c.UNHIDING,children:t},n.createElement(o,null,t)))};l.exportDefault(r)}
