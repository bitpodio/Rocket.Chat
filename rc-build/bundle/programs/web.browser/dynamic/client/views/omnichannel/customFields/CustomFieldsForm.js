function module(e,l,a){let t,n,c,o,i,r,m,s;a.link("react",{default(e){t=e},useMemo(e){n=e}},0),a.link("@rocket.chat/fuselage",{Box(e){c=e},Field(e){o=e},TextInput(e){i=e},ToggleSwitch(e){r=e},Select(e){m=e}},1),a.link("../../../contexts/TranslationContext",{useTranslation(e){s=e}},2);const d=e=>{let{values:l={},handlers:a={},className:d}=e;const u=s(),{id:E,field:h,label:b,scope:p,visibility:g,regexp:v}=l,{handleField:x,handleLabel:L,handleScope:f,handleVisibility:w,handleRegexp:R}=a,C=n(()=>[["visitor",u("Visitor")],["room",u("Room")]],[u]);return t.createElement(t.Fragment,null,t.createElement(o,{className:d},t.createElement(o.Label,null,u("Field"),"*"),t.createElement(o.Row,null,t.createElement(i,{disabled:E,value:h,onChange:x,placeholder:u("Field")}))),t.createElement(o,{className:d},t.createElement(o.Label,null,u("Label"),"*"),t.createElement(o.Row,null,t.createElement(i,{value:b,onChange:L,placeholder:u("Label")}))),t.createElement(o,{className:d},t.createElement(o.Label,null,u("Scope")),t.createElement(o.Row,null,t.createElement(m,{options:C,value:p,onChange:f}))),t.createElement(o,{className:d},t.createElement(c,{display:"flex",flexDirection:"row"},t.createElement(o.Label,{htmlFor:"visible"},u("Visible")),t.createElement(o.Row,null,t.createElement(r,{id:"visible",checked:g,onChange:w})))),t.createElement(o,{className:d},t.createElement(o.Label,null,u("Validation")),t.createElement(o.Row,null,t.createElement(i,{value:v,onChange:R,placeholder:u("Validation")}))))};a.exportDefault(d)}
