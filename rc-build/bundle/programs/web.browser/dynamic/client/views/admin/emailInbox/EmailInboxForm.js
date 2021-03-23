function module(e,t,n){let l,a,r,o,m,c,s,u,i,p,d,E,h,v,w,S,C,b,g,_,f,k,x,I,y,P,L,D;n.export({EmailInboxEditWithData:()=>T,default:()=>U}),n.link("react",{default(e){l=e},useCallback(e){a=e},useState(e){r=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){o=e}},1),n.link("@rocket.chat/fuselage",{Accordion(e){m=e},Button(e){c=e},ButtonGroup(e){s=e},TextInput(e){u=e},TextAreaInput(e){i=e},Field(e){p=e},ToggleSwitch(e){d=e},FieldGroup(e){E=e},Box(e){h=e},Margins(e){v=e}},2),n.link("../../../components/AutoCompleteDepartment",{AutoCompleteDepartment(e){w=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation(e){S=e}},4),n.link("../../../contexts/RouterContext",{useRoute(e){C=e}},5),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){b=e}},6),n.link("../../../components/Page",{default(e){g=e}},7),n.link("../../../hooks/useForm",{useForm(e){_=e}},8),n.link("../../../hooks/useEndpointAction",{useEndpointAction(e){f=e}},9),n.link("../../../../app/utils",{isEmail(e){k=e}},10),n.link("../../../hooks/useEndpointData",{useEndpointData(e){x=e}},11),n.link("../../../hooks/useAsyncState",{AsyncStatePhase(e){I=e}},12),n.link("./Skeleton",{FormSkeleton(e){y=e}},13),n.link("../../../components/DeleteWarningModal",{default(e){P=e}},14),n.link("../../../contexts/ModalContext",{useSetModal(e){L=e}},15),n.link("../../../hooks/useComponentDidUpdate",{useComponentDidUpdate(e){D=e}},16);const R={active:!0,name:"",email:"",description:"",senderInfo:"",department:"",smtpServer:"",smtpPort:587,smtpUsername:"",smtpPassword:"",smtpSecure:!1,imapServer:"",imapPort:993,imapUsername:"",imapPassword:"",imapSecure:!1},A=e=>{var t,n,l,a,r,o,m,c,s,u;if(!e)return R;const{active:i,name:p,email:d,description:E,senderInfo:h,department:v,smtp:w,imap:S}=e;return{active:null==i||i,name:null!=p?p:"",email:null!=d?d:"",description:null!=E?E:"",senderInfo:null!=h?h:"",department:null!=v?v:"",smtpServer:null!==(t=w.server)&&void 0!==t?t:"",smtpPort:null!==(n=w.port)&&void 0!==n?n:587,smtpUsername:null!==(l=w.username)&&void 0!==l?l:"",smtpPassword:null!==(a=w.password)&&void 0!==a?a:"",smtpSecure:null!==(r=w.secure)&&void 0!==r&&r,imapServer:null!==(o=S.server)&&void 0!==o?o:"",imapPort:null!==(m=S.port)&&void 0!==m?m:993,imapUsername:null!==(c=S.username)&&void 0!==c?c:"",imapPassword:null!==(s=S.password)&&void 0!==s?s:"",imapSecure:null!==(u=S.secure)&&void 0!==u&&u}};function T(e){let{id:t}=e;const n=S(),{value:a,error:r,phase:o}=x("email-inbox/".concat(t));return[o].includes(I.LOADING)?l.createElement(y,null):r||!a?l.createElement(h,{mbs:"x16"},n("EmailInbox_not_found")):l.createElement(U,{id:t,data:a})}function U(e){let{id:t,data:n}=e;const x=S(),I=b(),y=L(),[R,T]=r(),{values:U,handlers:M,hasUnsavedChanges:F}=_(A(n)),{handleActive:O,handleName:W,handleEmail:B,handleDescription:G,handleSenderInfo:j,handleDepartment:N,handleSmtpServer:H,handleSmtpPort:V,handleSmtpUsername:Y,handleSmtpPassword:q,handleSmtpSecure:z,handleImapServer:J,handleImapPort:K,handleImapUsername:Q,handleImapPassword:X,handleImapSecure:Z}=M,{active:$,name:ee,email:te,description:ne,senderInfo:le,department:ae,smtpServer:re,smtpPort:oe,smtpUsername:me,smtpPassword:ce,smtpSecure:se,imapServer:ue,imapPort:ie,imapUsername:pe,imapPassword:de,imapSecure:Ee}=U,he=C("admin-email-inboxes"),ve=a(()=>he.push({}),[he]),we=f("POST","email-inbox"),Se=f("DELETE","email-inbox/".concat(t)),Ce=f("GET","email-inbox.search?email=".concat(te));D(()=>{T(k(te)?null:x("Validate_email_address"))},[x,te]),D(()=>{!te&&T(null)},[te]);const be=o(async()=>{const e=await Se();!0===e.success&&ve()}),ge=o(e=>{e.stopPropagation();const t=async()=>{try{await be(),I({type:"success",message:x("Removed")})}catch(e){I({type:"error",message:e})}y()};y(l.createElement(P,{onDelete:t,onCancel:()=>y()},x("You_will_not_be_able_to_recover_email_inbox")))}),_e=o(async()=>{const e={server:re,port:parseInt(oe),username:me,password:ce,secure:se},n={server:ue,port:parseInt(ie),username:pe,password:de,secure:Ee},l={active:$,name:ee,email:te,description:ne,senderInfo:le,department:ae,smtp:e,imap:n};t&&(l._id=t);try{await we(l),I({type:"success",message:x("Saved")}),ve()}catch(a){I({type:"error",message:a})}}),fe=o(async()=>{if(!te&&!k(te))return;const{emailInbox:e}=await Ce();!e||t&&e._id===t||T(x("Email_already_exists"))}),ke=F&&ee&&te&&k(te)&&!R&&re&&oe&&me&&ce&&ue&&ie&&pe&&de;return l.createElement(g.ScrollableContentWithShadow,null,l.createElement(h,{maxWidth:"x600",w:"full",alignSelf:"center"},l.createElement(m,null,l.createElement(m.Item,{defaultExpanded:!0,title:x("Inbox_Info")},l.createElement(E,null,l.createElement(p,null,l.createElement(p.Label,{display:"flex",justifyContent:"space-between",w:"full"},x("Active"),l.createElement(d,{checked:$,onChange:O}))),l.createElement(p,null,l.createElement(p.Label,null,x("Name"),"*"),l.createElement(p.Row,null,l.createElement(u,{value:ee,onChange:W}))),l.createElement(p,null,l.createElement(p.Label,null,x("Email"),"*"),l.createElement(p.Row,null,l.createElement(u,{onBlur:fe,error:R,value:te,onChange:B})),l.createElement(p.Error,null,x(R))),l.createElement(p,null,l.createElement(p.Label,null,x("Description")),l.createElement(p.Row,null,l.createElement(i,{value:ne,rows:4,onChange:G}))),l.createElement(p,null,l.createElement(p.Label,null,x("Sender_Info")),l.createElement(p.Row,null,l.createElement(u,{value:le,onChange:j,placeholder:x("Optional")})),l.createElement(p.Hint,null,x("Will_Appear_In_From"))),l.createElement(p,null,l.createElement(p.Label,null,x("Department")),l.createElement(p.Row,null,l.createElement(w,{value:ae,onChange:N})),l.createElement(p.Hint,null,x("Only_Members_Selected_Department_Can_View_Channel"))))),l.createElement(m.Item,{title:x("Configure_Outgoing_Mail_SMTP")},l.createElement(E,null,l.createElement(p,null,l.createElement(p.Label,null,x("Server"),"*"),l.createElement(p.Row,null,l.createElement(u,{value:re,onChange:H}))),l.createElement(p,null,l.createElement(p.Label,null,x("Port"),"*"),l.createElement(p.Row,null,l.createElement(u,{type:"number",value:oe,onChange:V}))),l.createElement(p,null,l.createElement(p.Label,null,x("Username"),"*"),l.createElement(p.Row,null,l.createElement(u,{value:me,onChange:Y}))),l.createElement(p,null,l.createElement(p.Label,null,x("Password"),"*"),l.createElement(p.Row,null,l.createElement(u,{type:"password",value:ce,onChange:q}))),l.createElement(p,null,l.createElement(p.Label,{display:"flex",justifyContent:"space-between",w:"full"},x("Connect_SSL_TLS"),l.createElement(d,{checked:se,onChange:z}))))),l.createElement(m.Item,{title:x("Configure_Incoming_Mail_IMAP")},l.createElement(E,null,l.createElement(p,null,l.createElement(p.Label,null,x("Server"),"*"),l.createElement(p.Row,null,l.createElement(u,{value:ue,onChange:J}))),l.createElement(p,null,l.createElement(p.Label,null,x("Port"),"*"),l.createElement(p.Row,null,l.createElement(u,{type:"number",value:ie,onChange:K}))),l.createElement(p,null,l.createElement(p.Label,null,x("Username"),"*"),l.createElement(p.Row,null,l.createElement(u,{value:pe,onChange:Q}))),l.createElement(p,null,l.createElement(p.Label,null,x("Password"),"*"),l.createElement(p.Row,null,l.createElement(u,{type:"password",value:de,onChange:X}))),l.createElement(p,null,l.createElement(p.Label,{display:"flex",justifyContent:"space-between",w:"full"},x("Connect_SSL_TLS"),l.createElement(d,{checked:Ee,onChange:Z}))))),l.createElement(p,null,l.createElement(p.Row,null,l.createElement(s,{stretch:!0,w:"full"},l.createElement(c,{onClick:ve},x("Cancel")),l.createElement(c,{disabled:!ke,primary:!0,onClick:_e},x("Save")))),l.createElement(p.Row,null,l.createElement(v,{blockStart:"x16"},l.createElement(s,{stretch:!0,w:"full"},t&&l.createElement(c,{primary:!0,danger:!0,onClick:ge},x("Delete")))))))))}}

