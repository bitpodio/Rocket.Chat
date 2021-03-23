function module(e,n,t){let a,l,s,r,o,i,u,c,m,d,g,p,k,h,E,v,f,x;t.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),t.link("react",{default(e){s=e}},0),t.link("@rocket.chat/fuselage",{Margins(e){r=e},Callout(e){o=e},FieldGroup(e){i=e},Box(e){u=e},Button(e){c=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){m=e}},2),t.link("./TriggersForm",{default(e){d=e}},3),t.link("../../../components/PageSkeleton",{default(e){g=e}},4),t.link("../../../contexts/TranslationContext",{useTranslation(e){p=e}},5),t.link("../../../contexts/ServerContext",{useMethod(e){k=e}},6),t.link("../../../hooks/useForm",{useForm(e){h=e}},7),t.link("../../../contexts/RouterContext",{useRoute(e){E=e}},8),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){v=e}},9),t.link("../../../hooks/useEndpointData",{useEndpointData(e){f=e}},10),t.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){x=e}},11);const b=e=>{let{id:n,onSave:t}=e;const a=p(),{value:l,phase:r}=f("livechat/triggers/".concat(n));return r===x.LOADING?s.createElement(g,null):r!==x.REJECTED&&null!=l&&l.trigger?s.createElement(S,{data:l.trigger,onSave:t}):s.createElement(o,null,a("Error"),": error")},C=e=>{let{name:n,description:t,enabled:a,runOnce:l,conditions:[{name:s,value:r}],actions:[{action:o,params:{sender:i,msg:u,name:c}}]}=e;return{name:null!=n?n:"",description:null!=t?t:"",enabled:!!a,runOnce:!!l,conditions:{name:null!=s?s:"page-url",value:null!=r?r:""},actions:{name:null!=o?o:"",params:{sender:null!=i?i:"queue",msg:null!=u?u:"",name:null!=c?c:""}}}},S=e=>{let{data:n,onSave:t}=e;const o=v(),g=p(),f=E("omnichannel-triggers"),x=k("livechat:saveTrigger"),{values:b,handlers:S,hasUnsavedChanges:y}=h(C(n)),D=m(async()=>{try{const{actions:{params:{sender:e,msg:s,name:r}}}=b,i=l(b,["actions"]);await x(a(a({_id:n._id},i),{},{conditions:[b.conditions],actions:[{name:"send-message",params:a({sender:e,msg:s},"custom"===e&&{name:r})}]})),o({type:"success",message:g("Saved")}),t(),f.push({})}catch(e){o({type:"error",message:e})}}),{name:T}=b,w=T&&y;return s.createElement(s.Fragment,null,s.createElement(i,null,s.createElement(d,{values:b,handlers:S})),s.createElement(u,{display:"flex",flexDirection:"row",justifyContent:"space-between",w:"full"},s.createElement(r,{inlineEnd:"x4"},s.createElement(c,{flexGrow:1,primary:!0,onClick:D,disabled:!w},g("Save")))))};t.exportDefault(b)}

