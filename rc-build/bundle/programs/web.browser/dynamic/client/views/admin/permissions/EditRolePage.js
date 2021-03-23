function module(e,t,l){let n,a,s,o,r,c,i,u,m,d,k,p,h,g,E;l.link("react",{default(e){n=e}},0),l.link("@rocket.chat/fuselage",{Box(e){a=e},Field(e){s=e},FieldGroup(e){o=e},Button(e){r=e},Margins(e){c=e},Callout(e){i=e}},1),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){u=e}},2),l.link("./RoleForm",{default(e){m=e}},3),l.link("../../../contexts/RouterContext",{useRoute(e){d=e}},4),l.link("../../../hooks/useForm",{useForm(e){k=e}},5),l.link("../../../contexts/TranslationContext",{useTranslation(e){p=e}},6),l.link("../../../contexts/ServerContext",{useMethod(e){h=e}},7),l.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){g=e}},8),l.link("./useRole",{useRole(e){E=e}},9);const f=e=>{let{_id:t}=e;const l=p(),a=E(t);return a?n.createElement(x,{key:t,data:a}):n.createElement(i,{type:"danger"},l("error-invalid-role"))},x=e=>{let{data:t}=e;const l=p(),i=g(),E=d("admin-permissions"),f=d("admin-permissions"),{values:x,handlers:y,hasUnsavedChanges:R}=k({name:t.name,description:t.description||"",scope:t.scope||"Users",mandatory2fa:!!t.mandatory2fa}),C=h("authorization:saveRole"),v=h("authorization:deleteRole"),w=u(()=>{E.push({context:"users-in-role",_id:t.name})}),b=u(async()=>{try{await C(x),i({type:"success",message:l("Saved")})}catch(e){i({type:"error",message:e})}}),F=u(async()=>{try{await v(t.name),i({type:"success",message:l("Role_removed")}),f.push({})}catch(e){i({type:"error",message:e})}});return n.createElement(a,{w:"full",alignSelf:"center",mb:"neg-x8"},n.createElement(c,{block:"x8"},n.createElement(o,null,n.createElement(m,{values:x,handlers:y,editing:!0,isProtected:t.protected}),n.createElement(s,null,n.createElement(s.Row,null,n.createElement(r,{primary:!0,w:"full",disabled:!R,onClick:b},l("Save")))),!t.protected&&n.createElement(s,null,n.createElement(s.Row,null,n.createElement(r,{danger:!0,w:"full",onClick:F},l("Delete")))),n.createElement(s,null,n.createElement(s.Row,null,n.createElement(r,{w:"full",onClick:w},l("Users_in_role")))))))};l.exportDefault(f)}
