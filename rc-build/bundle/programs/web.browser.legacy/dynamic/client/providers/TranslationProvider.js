function module(n,e,t){var r,u,a,o,i,l,c,f,s,g;t.link("@babel/runtime/helpers/slicedToArray",{default:function(n){r=n}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(n){u=n}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){a=n}},2),t.link("@babel/runtime/helpers/typeof",{default:function(n){o=n}},3),t.link("react",{default:function(n){i=n},useMemo:function(n){l=n}},0),t.link("meteor/rocketchat:tap-i18n",{TAPi18n:function(n){c=n},TAPi18next:function(n){f=n}},1),t.link("../contexts/TranslationContext",{TranslationContext:function(n){s=n}},2),t.link("../hooks/useReactiveValue",{useReactiveValue:function(n){g=n}},3);var p=function(n){var e=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),u=1;u<t;u++)r[u-1]=arguments[u];if("object"===o(r[0])){var i=r[0],l=r[1],c=void 0===l?n:l;return f.t(e,a({ns:"project",lng:c},i))}return 0===r.length?f.t(e,{ns:"project",lng:n}):f.t(e,{postProcess:"sprintf",sprintf:r,ns:"project",lng:n})};return e.has=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.lng,o=void 0===r?n:r,i=u(t,["lng"]);return!!e&&f.exists(e,a({ns:"project",lng:o},i))},e},d=function(){var n=Object.entries(c.getLanguages()).map((function(n){var e=r(n,2),t=e[0],u=e[1];return a(a({},u),{},{key:t.toLowerCase()})})).sort((function(n,e){return n.key-e.key}));return n.unshift({name:"Default",en:"Default",key:""}),n},v=function(){return c.getLanguage()},h=function(n){return c._loadLanguage(n)};function k(n){var e=n.children,t=g(d),r=g(v),u=l((function(){return p(r)}),[r]),a=l((function(){return{languages:t,language:r,loadLanguage:h,translate:u}}),[t,r,u]);return i.createElement(s.Provider,{children:e,value:a})}t.exportDefault(k)}

