function module(t,e,a){let r,n,c,l,o,i,u;a.link("@babel/runtime/helpers/objectSpread2",{default(t){r=t}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(t){n=t}},1),a.link("react",{default(t){c=t},useMemo(t){l=t}},0),a.link("../contexts/SettingsContext",{useSetting(t){o=t}},1),a.link("../contexts/AvatarUrlContext",{AvatarUrlContext(t){i=t}},2),a.link("../../app/utils/client",{roomTypes(t){u=t}},3);const s=t=>{let{children:e}=t;const a=String(o("CDN_PREFIX")||""),s=String(o("Accounts_AvatarExternalProviderUrl")||""),p=l(()=>({getUserPathAvatar:(()=>s?t=>s.trim().replace(/\/+$/,"").replace("{username}",t):a?(t,e)=>"".concat(a,"/avatar/").concat(t).concat(e?"?etag=".concat(e):""):(t,e)=>"/avatar/".concat(t).concat(e?"?etag=".concat(e):""))(),getRoomPathAvatar:t=>{let{type:e}=t,a=n(t,["type"]);return u.getConfig(e||a.t).getAvatarPath(r({username:a._id},a))}}),[s,a]);return c.createElement(i.Provider,{children:e,value:p})};a.exportDefault(s)}

