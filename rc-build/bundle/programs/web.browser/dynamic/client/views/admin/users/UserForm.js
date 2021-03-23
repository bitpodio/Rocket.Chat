function module(e,l,n){let t,a,r,o,m,c,s,i,u,d,E,f,w,h,p,x,C,g,b,R;function k(e){let{formValues:l,formHandlers:n,availableRoles:k,append:S,prepend:v,errors:_}=e,G=a(e,["formValues","formHandlers","availableRoles","append","prepend","errors"]);const y=C(),[F,D]=c(!1),{name:I,username:L,email:j,verified:P,statusText:T,bio:z,nickname:V,password:B,setRandomPassword:N,requirePasswordChange:q,roles:M,customFields:W,joinDefaultChannels:H,sendWelcomeEmail:J}=l,{handleName:U,handleUsername:A,handleEmail:K,handleVerified:O,handleStatusText:Q,handleBio:X,handleNickname:Y,handlePassword:Z,handleSetRandomPassword:$,handleRequirePasswordChange:ee,handleRoles:le,handleCustomFields:ne,handleJoinDefaultChannels:te,handleSendWelcomeEmail:ae}=n,re=o(e=>D(e),[]);return r.createElement(b.ScrollableContent,t({is:"form",onSubmit:o(e=>e.preventDefault(),[])},G),r.createElement(x,null,v,m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Name")),r.createElement(s.Row,null,r.createElement(i,{error:_&&_.name,flexGrow:1,value:I,onChange:U})),_&&_.name&&r.createElement(s.Error,null,_.name)),[y,I,U,_]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Username")),r.createElement(s.Row,null,r.createElement(i,{error:_&&_.username,flexGrow:1,value:L,onChange:A,addon:r.createElement(h,{name:"at",size:"x20"})})),_&&_.username&&r.createElement(s.Error,null,_.username)),[y,L,A,_]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Email")),r.createElement(s.Row,null,r.createElement(i,{error:_&&_.email,flexGrow:1,value:j,error:!g(j)&&j.length>0?"error":void 0,onChange:K,addon:r.createElement(h,{name:"mail",size:"x20"})})),_&&_.email&&r.createElement(s.Error,null,_.email),r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",mbs:"x4"},r.createElement(f,null,y("Verified")),r.createElement(w,{checked:P,onChange:O})))),[y,j,K,P,O,_]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("StatusMessage")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:T,onChange:Q,addon:r.createElement(h,{name:"edit",size:"x20"})}))),[y,T,Q]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Bio")),r.createElement(s.Row,null,r.createElement(u,{rows:3,flexGrow:1,value:z,onChange:X,addon:r.createElement(h,{name:"edit",size:"x20",alignSelf:"center"})}))),[z,X,y]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Nickname")),r.createElement(s.Row,null,r.createElement(i,{flexGrow:1,value:V,onChange:Y,addon:r.createElement(h,{name:"edit",size:"x20",alignSelf:"center"})}))),[V,Y,y]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Password")),r.createElement(s.Row,null,r.createElement(d,{errors:_&&_.password,autoComplete:"off",flexGrow:1,value:B,onChange:Z,addon:r.createElement(h,{name:"key",size:"x20"})})),_&&_.password&&r.createElement(s.Error,null,_.password)),[y,B,Z,_]),m(()=>r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,y("Require_password_change")),r.createElement(w,{disabled:N,checked:N||q,onChange:ee})))),[y,N,q,ee]),m(()=>r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,y("Set_random_password_and_send_by_email")),r.createElement(w,{checked:N,onChange:$})))),[y,N,$]),m(()=>r.createElement(s,null,r.createElement(s.Label,null,y("Roles")),r.createElement(s.Row,null,r.createElement(E,{options:k,value:M,onChange:le,placeholder:y("Select_role"),flexShrink:1}))),[k,le,M,y]),m(()=>te&&r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,y("Join_default_channels")),r.createElement(w,{checked:H,onChange:te})))),[te,y,H]),m(()=>ae&&r.createElement(s,null,r.createElement(s.Row,null,r.createElement(f,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},r.createElement(f,null,y("Send_welcome_email")),r.createElement(w,{checked:J,onChange:ae})))),[ae,y,J]),F&&r.createElement(r.Fragment,null,r.createElement(p,null),r.createElement(f,{fontScale:"s2"},y("Custom_Fields"))),r.createElement(R,{onLoadFields:re,customFieldsData:W,setCustomFieldsData:ne}),S))}n.link("@babel/runtime/helpers/extends",{default(e){t=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.export({default:()=>k}),n.link("react",{default(e){r=e},useCallback(e){o=e},useMemo(e){m=e},useState(e){c=e}},0),n.link("@rocket.chat/fuselage",{Field(e){s=e},TextInput(e){i=e},TextAreaInput(e){u=e},PasswordInput(e){d=e},MultiSelectFiltered(e){E=e},Box(e){f=e},ToggleSwitch(e){w=e},Icon(e){h=e},Divider(e){p=e},FieldGroup(e){x=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){C=e}},2),n.link("../../../../app/utils/lib/isEmail.js",{isEmail(e){g=e}},3),n.link("../../../components/VerticalBar",{default(e){b=e}},4),n.link("../../../components/CustomFieldsForm",{default(e){R=e}},5)}

