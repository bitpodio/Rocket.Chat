function module(e,s,t){let n,r,u;t.export({useUserData:()=>i}),t.link("react",{useMemo(e){n=e}},0),t.link("use-subscription",{useSubscription(e){r=e}},1),t.link("../lib/presence",{Presence(e){u=e}},2);const i=e=>{const s=n(()=>({getCurrentValue:()=>u.store.get(e),subscribe:s=>(u.listen(e,s),()=>{u.stop(e,s)})}),[e]);return r(s)}}

