function module(e,t,l){let n,a,u,i,r,c,o,s,k;l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("react",{default(e){a=e},useState(e){u=e},useEffect(e){i=e}},0),l.link("@rocket.chat/fuselage",{Sidebar(e){r=e}},1),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){c=e}},2),l.link("tinykeys",{default(e){o=e}},3),l.link("../../../hooks/useOutsideClick",{useOutsideClick(e){s=e}},4),l.link("../../search/SearchList",{default(e){k=e}},5);const f=e=>{const[t,l]=u(!1),f=c(()=>{l(!1)}),d=c(()=>{l(!0)}),m=s(f);return i(()=>{const e=o(window,{"$mod+K":e=>{e.preventDefault(),d()},"$mod+P":e=>{e.preventDefault(),d()}});return()=>{e()}},[d]),a.createElement(a.Fragment,null,a.createElement(r.TopBar.Action,n({icon:"magnifier",onClick:d},e)),t&&a.createElement(k,{ref:m,onClose:f}))};l.exportDefault(f)}

