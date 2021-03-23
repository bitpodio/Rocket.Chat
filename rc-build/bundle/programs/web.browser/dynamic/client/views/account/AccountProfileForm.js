function module(e,a,l){let t,n,r,s,i,o,m,c,u,d,E,f,h,g,x,w,b,C,v,k,p,S,_,y,D,G,U,R;l.link("@babel/runtime/helpers/extends",{default(e){t=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},1),l.link("react",{default(e){r=e},useCallback(e){s=e},useMemo(e){i=e},useEffect(e){o=e},useState(e){m=e}},0),l.link("@rocket.chat/fuselage",{Field(e){c=e},FieldGroup(e){u=e},TextInput(e){d=e},TextAreaInput(e){E=e},Box(e){f=e},Icon(e){h=e},AnimatedVisibility(e){g=e},PasswordInput(e){x=e},Button(e){w=e},Grid(e){b=e},Margins(e){C=e}},1),l.link("@rocket.chat/fuselage-hooks",{useDebouncedCallback(e){v=e},useSafely(e){k=e}},2),l.link("../../contexts/TranslationContext",{useTranslation(e){p=e}},3),l.link("../../../app/utils/lib/isEmail.js",{isEmail(e){S=e}},4),l.link("../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){_=e}},5),l.link("../../contexts/ServerContext",{useMethod(e){y=e}},6),l.link("../../lib/getUserEmailAddress",{getUserEmailAddress(e){D=e}},7),l.link("../../components/avatar/UserAvatarEditor",{UserAvatarEditor(e){G=e}},8),l.link("../../components/CustomFieldsForm",{default(e){U=e}},9),l.link("../../components/UserStatusMenu",{default(e){R=e}},10);const T=120;function A(e){let{values:a,handlers:l,user:A,settings:M,onSaveStateChange:F}=e,I=n(e,["values","handlers","user","settings","onSaveStateChange"]);const L=p(),P=_(),N=y("checkUsernameAvailability"),z=y("getAvatarSuggestion"),B=y("sendConfirmationEmail"),[H,j]=m(),[V,q]=k(m()),{allowRealNameChange:O,allowUserStatusMessageChange:W,allowEmailChange:J,allowPasswordChange:K,allowUserAvatarChange:Q,canChangeUsername:X,namesRegex:Y,requireName:Z}=M,{realname:$,email:ee,username:ae,password:le,confirmationPassword:te,statusText:ne,bio:re,statusType:se,customFields:ie,nickname:oe}=a,{handleRealname:me,handleEmail:ce,handleUsername:ue,handlePassword:de,handleConfirmationPassword:Ee,handleAvatar:fe,handleStatusText:he,handleStatusType:ge,handleBio:xe,handleCustomFields:we,handleNickname:be}=l,Ce=D(A),ve=s(async()=>{if(ee===Ce)try{await B(ee),P({type:"success",message:L("Verification_email_sent")})}catch(e){P({type:"error",message:e})}},[P,ee,Ce,B,L]),ke=i(()=>le&&te&&le!==te?L("Passwords_do_not_match"):void 0,[L,le,te]),pe=i(()=>S(ee)?void 0:"error-invalid-email-address",[ee]),Se=v(async e=>{if(A.username===e)return j(void 0);if(!Y.test(e))return j(L("error-invalid-username"));const a=await N(e);if(!a)return j(L("Username_already_exist"));j(void 0)},400,[Y,L,A.username,N,j]);o(()=>{const e=async()=>{const e=await z();q(e)};e()},[z,q]),o(()=>{Se(ae)},[Se,ae]),o(()=>{le||Ee("")},[le,Ee]);const _e=i(()=>{if(A.name!==$)return!$&&Z?L("Field_required"):void 0},[$,Z,L,A.name]),ye=i(()=>!ne||ne.length<=T||0===ne.length?void 0:L("Max_length_is",T),[ne,L]),{emails:[{verified:De=!1}]}=A,Ge=!![!!ke,!!pe,!!H,!!_e,!!ye].filter(Boolean);o(()=>{F(Ge)},[Ge,F]);const Ue=s(e=>{e.preventDefault()},[]);return(r.createElement(u,t({is:"form",autoComplete:"off",onSubmit:Ue},I),i(()=>r.createElement(c,null,r.createElement(G,{etag:A.avatarETag,currentUsername:A.username,username:ae,setAvatarObj:fe,disabled:!Q,suggestions:V})),[ae,A.username,fe,Q,V,A.avatarETag]),r.createElement(f,{display:"flex",flexDirection:"row",justifyContent:"space-between"},i(()=>r.createElement(c,{mie:"x8",flexShrink:1},r.createElement(c.Label,{flexGrow:0},L("Name")),r.createElement(c.Row,null,r.createElement(d,{error:_e,disabled:!O,flexGrow:1,value:$,onChange:me})),!O&&r.createElement(c.Hint,null,L("RealName_Change_Disabled")),r.createElement(c.Error,null,_e)),[L,$,me,O,_e]),i(()=>r.createElement(c,{mis:"x8",flexShrink:1},r.createElement(c.Label,{flexGrow:0},L("Username")),r.createElement(c.Row,null,r.createElement(d,{error:H,disabled:!X,flexGrow:1,value:ae,onChange:ue,addon:r.createElement(h,{name:"at",size:"x20"})})),!X&&r.createElement(c.Hint,null,L("Username_Change_Disabled")),r.createElement(c.Error,null,H)),[L,ae,ue,X,H])),i(()=>r.createElement(c,null,r.createElement(c.Label,null,L("StatusMessage")),r.createElement(c.Row,null,r.createElement(d,{error:ye,disabled:!W,flexGrow:1,value:ne,onChange:he,addon:r.createElement(R,{margin:"neg-x2",onChange:ge,initialStatus:se})})),!W&&r.createElement(c.Hint,null,L("StatusMessage_Change_Disabled")),r.createElement(c.Error,null,ye)),[L,ye,W,ne,he,ge,se]),i(()=>r.createElement(c,null,r.createElement(c.Label,null,L("Nickname")),r.createElement(c.Row,null,r.createElement(d,{flexGrow:1,value:oe,onChange:be,addon:r.createElement(h,{name:"edit",size:"x20",alignSelf:"center"})}))),[oe,be,L]),i(()=>r.createElement(c,null,r.createElement(c.Label,null,L("Bio")),r.createElement(c.Row,null,r.createElement(E,{rows:3,flexGrow:1,value:re,onChange:xe,addon:r.createElement(h,{name:"edit",size:"x20",alignSelf:"center"})}))),[re,xe,L]),r.createElement(c,null,r.createElement(b,null,r.createElement(b.Item,null,r.createElement(u,{display:"flex",flexDirection:"column",flexGrow:1,flexShrink:0},i(()=>r.createElement(c,null,r.createElement(c.Label,null,L("Email")),r.createElement(c.Row,null,r.createElement(d,{flexGrow:1,value:ee,error:pe,onChange:ce,addon:r.createElement(h,{name:De?"circle-check":"mail",size:"x20"}),disabled:!J})),!J&&r.createElement(c.Hint,null,L("Email_Change_Disabled")),r.createElement(c.Error,null,L(pe))),[L,ee,ce,De,J,pe]),i(()=>!De&&r.createElement(c,null,r.createElement(C,{blockEnd:"x28"},r.createElement(w,{disabled:ee!==Ce,onClick:ve},L("Resend_verification_email")))),[De,L,ee,Ce,ve]))),r.createElement(b.Item,null,r.createElement(u,{display:"flex",flexDirection:"column",flexGrow:1,flexShrink:0},i(()=>r.createElement(c,null,r.createElement(c.Label,null,L("Password")),r.createElement(c.Row,null,r.createElement(x,{autoComplete:"off",disabled:!K,error:ke,flexGrow:1,value:le,onChange:de,addon:r.createElement(h,{name:"key",size:"x20"})})),!K&&r.createElement(c.Hint,null,L("Password_Change_Disabled"))),[L,le,de,ke,K]),i(()=>r.createElement(c,null,r.createElement(g,{visibility:le?g.VISIBLE:g.HIDDEN},r.createElement(c.Label,null,L("Confirm_password")),r.createElement(c.Row,null,r.createElement(x,{autoComplete:"off",error:ke,flexGrow:1,value:te,onChange:Ee,addon:r.createElement(h,{name:"key",size:"x20"})})),ke&&r.createElement(c.Error,null,ke))),[L,te,Ee,le,ke]))))),r.createElement(U,{customFieldsData:ie,setCustomFieldsData:we})))}l.exportDefault(A)}
