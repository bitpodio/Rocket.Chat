function module(e,t,n){let l,i,r,a,o,c,s;function f(){const e=i(["\n\t\t\t&:hover,\n\t\t\t&:focus{\n\t\t\t\tcolor: "," !important;\n\t\t\t}\n\t\t\t&:visited{\n\t\t\t\tcolor: ",";\n\t\t\t}\n\t\t"]);return f=function(){return e},e}n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){i=e}},1),n.link("react",{default(e){r=e}},0),n.link("@rocket.chat/fuselage",{Box(e){a=e},Icon(e){o=e}},1),n.link("@rocket.chat/fuselage-tokens/colors",{default(e){c=e}},2),n.link("@rocket.chat/css-in-js",{css(e){s=e}},3);const m=()=>r.createElement(a,{display:"inline-block",fontScale:"s2",mi:"x4",fontWeight:"600",color:"neutral-500"},"/"),u=e=>{let{name:t,color:n,children:l}=e;return(r.createElement(a,{w:"x20",mi:"x2",display:"inline-flex",justifyContent:"center",color:n},t?r.createElement(o,{size:"x20",name:t}):l))},d=e=>r.createElement(x,l({is:"a"},e,{className:[s(f(),c.b500,c.n800)].filter(Boolean)})),x=e=>r.createElement(a,l({display:"inline",is:"span",mi:"x2",color:"default"},e)),k=e=>r.createElement(a,l({mi:"neg-x2",display:"inline-flex",flexDirection:"row",alignItems:"center",color:"info",fontScale:"s2"},e)),p=e=>{let{children:t}=e;return(r.createElement(a,{withTruncatedText:!0,mie:"x2",display:"flex",flexDirection:"row",alignItems:"center"},t))};Object.assign(p,{Text:x,Link:d,Icon:u,Separator:m,Item:k}),n.exportDefault(p)}
