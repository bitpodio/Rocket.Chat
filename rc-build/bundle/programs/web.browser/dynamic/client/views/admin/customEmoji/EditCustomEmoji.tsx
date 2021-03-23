function module(e,t,n){let l,a,o,c,s,i,r,u,m,d,p,E,C,k,h,f,x,j,g,b,v,_,w;n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},0),n.link("react",{default(e){a=e},useCallback(e){o=e},useState(e){c=e},useMemo(e){s=e},useEffect(e){i=e}},0),n.link("@rocket.chat/fuselage",{Box(e){r=e},Button(e){u=e},ButtonGroup(e){m=e},Margins(e){d=e},TextInput(e){p=e},Field(e){E=e},Icon(e){C=e}},1),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){k=e}},2),n.link("../../../contexts/TranslationContext",{useTranslation(e){h=e}},3),n.link("../../../hooks/useFileInput",{useFileInput(e){f=e}},4),n.link("../../../hooks/useEndpointUpload",{useEndpointUpload(e){x=e}},5),n.link("../../../contexts/ModalContext",{useSetModal(e){j=e}},6),n.link("../../../hooks/useEndpointAction",{useEndpointAction(e){g=e}},7),n.link("../../../components/VerticalBar",{default(e){b=e}},8),n.link("../../../components/DeleteSuccessModal",{default(e){v=e}},9),n.link("../../../components/DeleteWarningModal",{default(e){_=e}},10),n.link("../../../contexts/ServerContext",{useAbsoluteUrl(e){w=e}},11);const y=e=>{let{close:t,onChange:n,data:y}=e,D=l(e,["close","onChange","data"]);const S=h(),M=k(),T=j(),I=w(),{_id:R,name:U,aliases:A}=y||{},[B,F]=c(()=>{var e;return null!==(e=null==y?void 0:y.name)&&void 0!==e?e:""}),[L,W]=c(()=>{var e,t;return null!==(e=null==y?void 0:null===(t=y.aliases)||void 0===t?void 0:t.join(", "))&&void 0!==e?e:""}),[N,O]=c(),P=s(()=>N?URL.createObjectURL(N):y?I("/emoji-custom/".concat(encodeURIComponent(y.name),".").concat(y.extension)):null,[I,y,N]);i(()=>{F(U||""),W(A&&A.join(", ")||"")},[U,A,R]);const q=s(()=>U!==B||L!==A.join(", ")||!!N,[U,B,L,A,N]),z=x("emoji-custom.update",{},S("Custom_Emoji_Updated_Successfully")),G=o(async()=>{if(!N)return;const e=new FormData;e.append("emoji",N),e.append("_id",R),e.append("name",B),e.append("aliases",L);const t=await z(e);t.success&&n()},[N,R,B,L,z,n]),H=g("POST","emoji-custom.delete",s(()=>({emojiId:R}),[R])),V=o(()=>{const e=()=>{T(null),t(),n()},l=async()=>{try{await H(),T(()=>a.createElement(v,{children:S("Custom_Emoji_Has_Been_Deleted"),onClose:e}))}catch(t){M({type:"error",message:t}),n()}},o=()=>{T(null)};T(()=>a.createElement(_,{children:S("Custom_Emoji_Delete_Warning"),onDelete:l,onCancel:o}))},[t,H,M,n,T,S]),J=o(e=>W(e.currentTarget.value),[W]),[K]=f(O,"emoji");return a.createElement(b.ScrollableContent,D,a.createElement(E,null,a.createElement(E.Label,null,S("Name")),a.createElement(E.Row,null,a.createElement(p,{value:B,onChange:e=>F(e.currentTarget.value),placeholder:S("Name")}))),a.createElement(E,null,a.createElement(E.Label,null,S("Aliases")),a.createElement(E.Row,null,a.createElement(p,{value:L,onChange:J,placeholder:S("Aliases")}))),a.createElement(E,null,a.createElement(E.Label,{alignSelf:"stretch",display:"flex",justifyContent:"space-between",alignItems:"center"},S("Custom_Emoji"),a.createElement(u,{square:!0,onClick:K},a.createElement(C,{name:"upload",size:"x20"}))),P&&a.createElement(r,{display:"flex",flexDirection:"row",mbs:"none",justifyContent:"center"},a.createElement(d,{inline:"x4"},a.createElement(r,{is:"img",style:{objectFit:"contain"},w:"x120",h:"x120",src:P})))),a.createElement(E,null,a.createElement(E.Row,null,a.createElement(m,{stretch:!0,w:"full"},a.createElement(u,{onClick:t},S("Cancel")),a.createElement(u,{primary:!0,onClick:G,disabled:!q},S("Save"))))),a.createElement(E,null,a.createElement(E.Row,null,a.createElement(m,{stretch:!0,w:"full"},a.createElement(u,{primary:!0,danger:!0,onClick:V},a.createElement(C,{name:"trash",mie:"x4"}),S("Delete"))))))};n.exportDefault(y)}

