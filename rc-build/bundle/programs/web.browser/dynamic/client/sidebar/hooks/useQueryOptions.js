function module(e,t,n){let s,r,i,o;n.link("@babel/runtime/helpers/objectSpread2",{default(e){s=e}},0),n.export({useQueryOptions:()=>a}),n.link("react",{useMemo(e){r=e}},0),n.link("../../contexts/SettingsContext",{useSetting(e){i=e}},1),n.link("../../contexts/UserContext",{useUserPreference(e){o=e}},2);const a=()=>{const e=o("sidebarSortby"),t=i("UI_Use_Real_Name");return r(()=>({sort:s(s({},"activity"===e&&{lm:-1}),"activity"!==e&&s(s({},t&&{lowerCaseFName:/descending/.test(e)?-1:1}),!t&&{lowerCaseName:/descending/.test(e)?-1:1}))}),[e,t])}}

