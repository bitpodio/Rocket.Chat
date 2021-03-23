function module(e,n,l){var t,a,r,o,c,u,i,m,s,d,f,E,w,h,p,x,b,C,g,k,R;function v(e){var n=e.formValues,l=e.formHandlers,v=e.availableRoles,S=e.append,_=e.prepend,y=e.errors,G=r(e,["formValues","formHandlers","availableRoles","append","prepend","errors"]),F=C(),D=i(!1),I=a(D,2),L=I[0],j=I[1],P=n.name,T=n.username,z=n.email,V=n.verified,B=n.statusText,N=n.bio,q=n.nickname,M=n.password,W=n.setRandomPassword,A=n.requirePasswordChange,H=n.roles,J=n.customFields,U=n.joinDefaultChannels,K=n.sendWelcomeEmail,O=l.handleName,Q=l.handleUsername,X=l.handleEmail,Y=l.handleVerified,Z=l.handleStatusText,$=l.handleBio,ee=l.handleNickname,ne=l.handlePassword,le=l.handleSetRandomPassword,te=l.handleRequirePasswordChange,ae=l.handleRoles,re=l.handleCustomFields,oe=l.handleJoinDefaultChannels,ce=l.handleSendWelcomeEmail,ue=c((function(e){return j(e)}),[]);return o.createElement(k.ScrollableContent,t({is:"form",onSubmit:c((function(e){return e.preventDefault()}),[])},G),o.createElement(b,null,_,u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Name")),o.createElement(m.Row,null,o.createElement(s,{error:y&&y.name,flexGrow:1,value:P,onChange:O})),y&&y.name&&o.createElement(m.Error,null,y.name))}),[F,P,O,y]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Username")),o.createElement(m.Row,null,o.createElement(s,{error:y&&y.username,flexGrow:1,value:T,onChange:Q,addon:o.createElement(p,{name:"at",size:"x20"})})),y&&y.username&&o.createElement(m.Error,null,y.username))}),[F,T,Q,y]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Email")),o.createElement(m.Row,null,o.createElement(s,{error:y&&y.email,flexGrow:1,value:z,error:!g(z)&&z.length>0?"error":void 0,onChange:X,addon:o.createElement(p,{name:"mail",size:"x20"})})),y&&y.email&&o.createElement(m.Error,null,y.email),o.createElement(m.Row,null,o.createElement(w,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",mbs:"x4"},o.createElement(w,null,F("Verified")),o.createElement(h,{checked:V,onChange:Y}))))}),[F,z,X,V,Y,y]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("StatusMessage")),o.createElement(m.Row,null,o.createElement(s,{flexGrow:1,value:B,onChange:Z,addon:o.createElement(p,{name:"edit",size:"x20"})})))}),[F,B,Z]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Bio")),o.createElement(m.Row,null,o.createElement(d,{rows:3,flexGrow:1,value:N,onChange:$,addon:o.createElement(p,{name:"edit",size:"x20",alignSelf:"center"})})))}),[N,$,F]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Nickname")),o.createElement(m.Row,null,o.createElement(s,{flexGrow:1,value:q,onChange:ee,addon:o.createElement(p,{name:"edit",size:"x20",alignSelf:"center"})})))}),[q,ee,F]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Password")),o.createElement(m.Row,null,o.createElement(f,{errors:y&&y.password,autoComplete:"off",flexGrow:1,value:M,onChange:ne,addon:o.createElement(p,{name:"key",size:"x20"})})),y&&y.password&&o.createElement(m.Error,null,y.password))}),[F,M,ne,y]),u((function(){return o.createElement(m,null,o.createElement(m.Row,null,o.createElement(w,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},o.createElement(w,null,F("Require_password_change")),o.createElement(h,{disabled:W,checked:W||A,onChange:te}))))}),[F,W,A,te]),u((function(){return o.createElement(m,null,o.createElement(m.Row,null,o.createElement(w,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},o.createElement(w,null,F("Set_random_password_and_send_by_email")),o.createElement(h,{checked:W,onChange:le}))))}),[F,W,le]),u((function(){return o.createElement(m,null,o.createElement(m.Label,null,F("Roles")),o.createElement(m.Row,null,o.createElement(E,{options:v,value:H,onChange:ae,placeholder:F("Select_role"),flexShrink:1})))}),[v,ae,H,F]),u((function(){return oe&&o.createElement(m,null,o.createElement(m.Row,null,o.createElement(w,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},o.createElement(w,null,F("Join_default_channels")),o.createElement(h,{checked:U,onChange:oe}))))}),[oe,F,U]),u((function(){return ce&&o.createElement(m,null,o.createElement(m.Row,null,o.createElement(w,{flexGrow:1,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},o.createElement(w,null,F("Send_welcome_email")),o.createElement(h,{checked:K,onChange:ce}))))}),[ce,F,K]),L&&o.createElement(o.Fragment,null,o.createElement(x,null),o.createElement(w,{fontScale:"s2"},F("Custom_Fields"))),o.createElement(R,{onLoadFields:ue,customFieldsData:J,setCustomFieldsData:re}),S))}l.link("@babel/runtime/helpers/extends",{default:function(e){t=e}},0),l.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},1),l.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},2),l.export({default:function(){return v}}),l.link("react",{default:function(e){o=e},useCallback:function(e){c=e},useMemo:function(e){u=e},useState:function(e){i=e}},0),l.link("@rocket.chat/fuselage",{Field:function(e){m=e},TextInput:function(e){s=e},TextAreaInput:function(e){d=e},PasswordInput:function(e){f=e},MultiSelectFiltered:function(e){E=e},Box:function(e){w=e},ToggleSwitch:function(e){h=e},Icon:function(e){p=e},Divider:function(e){x=e},FieldGroup:function(e){b=e}},1),l.link("../../../contexts/TranslationContext",{useTranslation:function(e){C=e}},2),l.link("../../../../app/utils/lib/isEmail.js",{isEmail:function(e){g=e}},3),l.link("../../../components/VerticalBar",{default:function(e){k=e}},4),l.link("../../../components/CustomFieldsForm",{default:function(e){R=e}},5)}
