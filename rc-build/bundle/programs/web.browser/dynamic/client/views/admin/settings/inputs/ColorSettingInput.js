function module(e,t,l){let n,a,o,i,r,c,d,u,s,m,p;function g(e){let{_id:t,label:l,value:g,editor:C,allowedTypes:E=[],placeholder:h,readonly:f,autocomplete:x,disabled:b,hasResetButton:k,onChangeValue:v,onChangeEditor:y,onResetButtonClick:B}=e;const R=m(),T=s(e=>{v&&v(e.currentTarget.value)},[v]),q=s(e=>{y&&y(e)},[y]);return u.createElement(u.Fragment,null,u.createElement(o.Container,null,u.createElement(n,null,u.createElement(a.Label,{htmlFor:t,title:t},l),k&&u.createElement(p,{"data-qa-reset-setting-id":t,onClick:B}))),u.createElement(r,{inline:"x4"},u.createElement(a.Row,null,u.createElement(r,{inline:"x4"},u.createElement(o.Item,{grow:2},"color"===C&&u.createElement(i,{"data-qa-setting-id":t,type:"color",id:t,value:g,placeholder:h,disabled:b,readOnly:f,autoComplete:!1===x?"off":void 0,onChange:T}),"expression"===C&&u.createElement(c,{"data-qa-setting-id":t,id:t,value:g,placeholder:h,disabled:b,readOnly:f,autoComplete:!1===x?"off":void 0,onChange:T})),u.createElement(d,{"data-qa-setting-id":"".concat(t,"_editor"),type:"color",id:"".concat(t,"_editor"),value:C,disabled:b,readOnly:f,autoComplete:!1===x?"off":void 0,onChange:q,options:E.map(e=>[e,R(e)])})))),u.createElement(a.Hint,null,"Variable name: ",t.replace(/theme-color-/,"@")))}l.export({ColorSettingInput:()=>g}),l.link("@rocket.chat/fuselage",{Box(e){n=e},Field(e){a=e},Flex(e){o=e},InputBox(e){i=e},Margins(e){r=e},TextInput(e){c=e},Select(e){d=e}},0),l.link("react",{default(e){u=e},useCallback(e){s=e}},1),l.link("../../../../contexts/TranslationContext",{useTranslation(e){m=e}},2),l.link("../ResetSettingButton",{ResetSettingButton(e){p=e}},3)}

