function module(e,n,t){var a,l,o,r,i,c,u,s,d;function f(e){var n,t,f=e.data,m=e.sort,k=e.onClick,C=e.onHeaderClick,x=e.setParams,h=e.params,p=d(),v=r((function(){return[o.createElement(s.HeaderCell,{key:"name",direction:m[1],active:"name"===m[0],onClick:C,sort:"name",w:"x200"},p("Name")),o.createElement(s.HeaderCell,{key:"aliases",w:"x200"},p("Aliases"))]}),[C,m,p]),E=function(e){var n=e._id,t=e.name,a=e.aliases;return(o.createElement(c.Row,{key:n,onKeyDown:k(n,e),onClick:k(n,e),tabIndex:0,role:"link",action:!0,"qa-user-id":n},o.createElement(c.Cell,{fontScale:"p1",color:"default"},o.createElement(i,{withTruncatedText:!0},t)),o.createElement(c.Cell,{fontScale:"p1",color:"default"},o.createElement(i,{withTruncatedText:!0},a))))};return o.createElement(s,{header:v,renderRow:E,results:null!==(n=null==f?void 0:f.emojis)&&void 0!==n?n:[],total:null!==(t=null==f?void 0:f.total)&&void 0!==t?t:0,setParams:x,params:h,renderFilter:function(e){var n=e.onChange,t=l(e,["onChange"]);return(o.createElement(u,a({onChange:n},t)))}})}t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},1),t.link("react",{default:function(e){o=e},useMemo:function(e){r=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Table:function(e){c=e}},1),t.link("../../../components/FilterByText",{default:function(e){u=e}},2),t.link("../../../components/GenericTable",{default:function(e){s=e}},3),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){d=e}},4),t.exportDefault(f)}

