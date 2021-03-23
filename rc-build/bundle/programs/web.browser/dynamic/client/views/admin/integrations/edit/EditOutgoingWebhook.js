function module(e,t,n){let l,r,o,a,i,s,u,d,c,m,g,p,k,h,x,v,E,b,f,y,C,w,_,D,W;function S(e){let{integrationId:t}=e,n=o(e,["integrationId"]);const l=p(),s=i(()=>({integrationId:t}),[t]),{value:u,phase:m,error:g,reload:k}=w("integrations.get",s),h=()=>{k()};return m===_.LOADING?a.createElement(d,r({w:"full",pb:"x24"},n),a.createElement(c,{mbe:"x4"}),a.createElement(c,{mbe:"x8"}),a.createElement(c,{mbe:"x4"}),a.createElement(c,{mbe:"x8"}),a.createElement(c,{mbe:"x4"}),a.createElement(c,{mbe:"x8"})):g?a.createElement(d,r({mbs:"x16"},n),l("Oops_page_not_found")):a.createElement(M,r({data:u.integration,onChange:h},n))}n.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),n.link("@babel/runtime/helpers/extends",{default(e){r=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},2),n.export({default:()=>S}),n.link("react",{default(e){a=e},useMemo(e){i=e},useCallback(e){s=e}},0),n.link("@rocket.chat/fuselage",{Field(e){u=e},Box(e){d=e},Skeleton(e){c=e},Margins(e){m=e},Button(e){g=e}},1),n.link("../../../../contexts/TranslationContext",{useTranslation(e){p=e}},2),n.link("../../../../hooks/useEndpointAction",{useEndpointAction(e){k=e}},3),n.link("../../../../contexts/RouterContext",{useRoute(e){h=e}},4),n.link("../../../../contexts/ServerContext",{useMethod(e){x=e}},5),n.link("../../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){v=e}},6),n.link("../../../../contexts/ModalContext",{useSetModal(e){E=e}},7),n.link("../OutgoiongWebhookForm",{default(e){b=e}},8),n.link("../../../../hooks/useForm",{useForm(e){f=e}},9),n.link("../../../../components/DeleteSuccessModal",{default(e){y=e}},10),n.link("../../../../components/DeleteWarningModal",{default(e){C=e}},11),n.link("../../../../hooks/useEndpointData",{useEndpointData(e){w=e}},12),n.link("../../../../hooks/useAsyncState",{AsyncStatePhase(e){_=e}},13),n.link("../helpers/triggerWords",{triggerWordsToArray(e){D=e},triggerWordsToString(e){W=e}},14);const A=e=>{var t,n,l,r,o,a,i,s,u,d,c,m,g,p,k,h;const x={enabled:null===(t=e.enabled)||void 0===t||t,impersonateUser:e.impersonateUser,event:e.event,token:e.token,urls:null!==(n=e.urls.join("\n"))&&void 0!==n?n:"",triggerWords:W(e.triggerWords),targetRoom:null!==(l=e.targetRoom)&&void 0!==l?l:"",channel:null!==(r=e.channel.join(", "))&&void 0!==r?r:"",username:null!==(o=e.username)&&void 0!==o?o:"",name:null!==(a=e.name)&&void 0!==a?a:"",alias:null!==(i=e.alias)&&void 0!==i?i:"",avatarUrl:null!==(s=e.avatarUrl)&&void 0!==s?s:"",emoji:null!==(u=e.emoji)&&void 0!==u?u:"",scriptEnabled:null!==(d=e.scriptEnabled)&&void 0!==d&&d,script:null!==(c=e.script)&&void 0!==c?c:"",retryFailedCalls:null===(m=e.retryFailedCalls)||void 0===m||m,retryCount:null!==(g=e.retryCount)&&void 0!==g?g:5,retryDelay:null!==(p=e.retryDelay)&&void 0!==p?p:"power-of-ten",triggerrWordAnywhere:null!==(k=e.triggerrWordAnywhere)&&void 0!==k&&k,runOnEdits:null===(h=e.runOnEdits)||void 0===h||h};return x};function M(e){let{data:t,onChange:n,setSaveAction:c}=e,w=o(e,["data","onChange","setSaveAction"]);const _=p(),W=v(),{handlers:S,values:M,reset:I}=f(A(t)),j=E(),O=x("updateOutgoingIntegration"),T=h("admin-integrations"),F=i(()=>({type:"webhook-outgoing",integrationId:t._id}),[t._id]),R=k("POST","integrations.remove",F),U=s(()=>{const e=()=>j(),t=async()=>{const t=await R();t.success&&j(a.createElement(y,{children:_("Your_entry_has_been_deleted"),onClose:()=>{e(),T.push({})}}))};j(a.createElement(C,{children:_("Integration_Delete_Warning"),onDelete:t,onCancel:e}))},[R,T,j,_]),{urls:G,triggerWords:P}=M,B=s(async()=>{try{await O(t._id,l(l({},M),{},{triggerWords:D(P),urls:G.split("\n")})),W({type:"success",message:_("Integration_updated")}),n()}catch(e){W({type:"error",message:e})}},[t._id,W,M,n,O,_,P,G]),H=i(()=>a.createElement(u,null,a.createElement(u.Row,{display:"flex",flexDirection:"column"},a.createElement(d,{display:"flex",flexDirection:"row",justifyContent:"space-between",w:"full"},a.createElement(m,{inlineEnd:"x4"},a.createElement(g,{flexGrow:1,type:"reset",onClick:I},_("Reset")),a.createElement(g,{mie:"none",flexGrow:1,onClick:B},_("Save")))),a.createElement(g,{mbs:"x4",primary:!0,danger:!0,w:"full",onClick:U},_("Delete")))),[U,B,I,_]);return a.createElement(b,r({formValues:M,formHandlers:S,append:H},w))}}

