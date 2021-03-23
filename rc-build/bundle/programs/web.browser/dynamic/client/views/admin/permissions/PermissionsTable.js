function module(e,t,n){let i,s,o,r,l,a,c,m,u,d,p,h,k,E,x,g,b,C,f,T,v,R,_,P,w,I,S,y,L,G,z,M;function N(){const e=i(["white-space: nowrap"]);return N=function(){return e},e}n.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){i=e}},0),n.link("@babel/runtime/helpers/extends",{default(e){s=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},2),n.link("react",{default(e){r=e},useState(e){l=e},useCallback(e){a=e},useEffect(e){c=e}},0),n.link("@rocket.chat/fuselage",{TextInput(e){m=e},Table(e){u=e},Margins(e){d=e},Box(e){p=e},Icon(e){h=e},CheckBox(e){k=e},Throbber(e){E=e},Tabs(e){x=e},Button(e){g=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){b=e},useDebouncedValue(e){C=e}},2),n.link("@rocket.chat/css-in-js",{css(e){f=e}},3),n.link("../../../components/Page",{default(e){T=e}},4),n.link("./PermissionsContextBar",{default(e){v=e}},5),n.link("../../../components/GenericTable",{default(e){R=e}},6),n.link("../../../hooks/useReactiveValue",{useReactiveValue(e){_=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation(e){P=e}},8),n.link("../../../contexts/ServerContext",{useMethod(e){w=e}},9),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){I=e}},10),n.link("../../../contexts/RouterContext",{useRoute(e){S=e}},11),n.link("../../../../app/authorization/client/lib/ChatPermissions",{ChatPermissions(e){y=e}},12),n.link("../../../../app/authorization/lib",{CONSTANTS(e){L=e},AuthorizationUtils(e){G=e}},13),n.link("../../../../app/models/client",{Roles(e){z=e}},14),n.link("../../../contexts/AuthorizationContext",{usePermission(e){M=e}},15);const V=e=>{let{onGrant:t,onRemove:n,permissionId:i}=e;const s=I();return b(async(e,o)=>{try{return o?await n(i,e):await t(i,e),!o}catch(r){s({type:"error",message:r})}return o})},H=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"permissions",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:25,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const s=a(()=>{const s=new RegExp(t,"i");return y.find({level:"permissions"===e?{$ne:L.SETTINGS_LEVEL}:L.SETTINGS_LEVEL,_id:s},{sort:{_id:1},skip:i,limit:n})},[t,n,i,e]),o=b(()=>z.find().fetch(),[]),r=_(s),l=_(o);return[r.fetch(),r.count(!1),l]},B=r.memo(e=>{let{grantedRoles:t=[],_id:n,description:i,onChange:s,lineHovered:o,permissionId:a}=e;const[c,m]=l(()=>!!t.includes(n)),[h,x]=l(!1),g=G.isPermissionRestrictedForRole(a,n),C=b(async()=>{x(!0);const e=await s(n,c);m(e),x(!1)}),f=!!h||!!g;return r.createElement(u.Cell,{withTruncatedText:!0},r.createElement(d,{inline:"x2"},r.createElement(k,{checked:c,onChange:C,disabled:f}),!h&&r.createElement(p,{display:"inline",color:"hint",invisible:!o},i||n),h&&r.createElement(E,{size:"x12",display:"inline-block"})))}),D=(e,t)=>{if(t.level===L.SETTINGS_LEVEL){let n="";return t.group&&(n="".concat(e(t.group)," > ")),t.section&&(n="".concat(n).concat(e(t.section)," > ")),"".concat(n).concat(e(t.settingId))}return e(t._id)},A=r.memo(e=>{let{permission:t,t:n,roleList:i,onGrant:a,onRemove:c}=e,m=o(e,["permission","t","roleList","onGrant","onRemove"]);const{_id:d,roles:p}=t,[h,k]=l(!1),E=b(()=>k(!0)),x=b(()=>k(!1)),g=V({onGrant:a,onRemove:c,permissionId:d});return r.createElement(u.Row,s({key:d,role:"link",action:!0,tabIndex:0,onMouseEnter:E,onMouseLeave:x},m),r.createElement(u.Cell,{maxWidth:"x300",withTruncatedText:!0,title:n("".concat(d,"_description"))},D(n,t)),i.map(e=>{let{_id:t,description:n}=e;return(r.createElement(B,{key:t,_id:t,description:n,grantedRoles:p,onChange:g,lineHovered:h,permissionId:t}))}))}),F=r.memo(e=>{let{router:t,_id:n,description:i}=e,l=o(e,["router","_id","description"]);const a=b(()=>{t.push({context:"edit",_id:n})});return(r.createElement(R.HeaderCell,s({clickable:!0,pi:"x4",p:"x8"},l),r.createElement(p,{className:f(N()),pb:"x8",pi:"x12",mi:"neg-x2",borderStyle:"solid",borderWidth:"x2",borderRadius:"x2",borderColor:"neutral-300",onClick:a},r.createElement(d,{inline:"x2"},r.createElement("span",null,i||n),r.createElement(h,{name:"edit",size:"x16"})))))}),W=e=>{let{onChange:t}=e;const n=P(),[i,s]=l(""),o=C(i,500);c(()=>{t(o)},[o,t]);const a=b(e=>{let{currentTarget:{value:t}}=e;s(t)});return(r.createElement(m,{value:i,onChange:a,placeholder:n("Search"),flexGrow:0}))},j=()=>{const e=P(),[t,n]=l(""),i=M("access-permissions"),s=M("access-setting-permissions"),o=i?"permissions":"settings",[c,m]=l(o),[u,p]=l({limit:25,skip:0}),k=S("admin-permissions"),E=w("authorization:addPermissionToRole"),C=w("authorization:removeRoleFromPermission"),f=H(c,t,u.limit,u.skip),[_,I,y]=f,L=b(e=>{let{current:t,itemsPerPage:n}=e;p({skip:t,limit:n})}),G=b(()=>{"permissions"!==c&&m("permissions")}),z=b(()=>{"settings"!==c&&m("settings")}),N=b(()=>{k.push({context:"new"})});return r.createElement(T,{flexDirection:"row"},r.createElement(T,null,r.createElement(T.Header,{title:e("Permissions")},r.createElement(g,{small:!0,square:!0,onClick:N},r.createElement(h,{name:"plus"}))),r.createElement(d,{blockEnd:"x8"},r.createElement(x,null,r.createElement(x.Item,{selected:"permissions"===c,onClick:G,disabled:!i},e("Permissions")),r.createElement(x.Item,{selected:"settings"===c,onClick:z,disabled:!s},e("Settings")))),r.createElement(T.Content,{mb:"neg-x8"},r.createElement(d,{block:"x8"},r.createElement(W,{onChange:n}),r.createElement(R,{header:r.createElement(r.Fragment,null,r.createElement(R.HeaderCell,{width:"x120"},e("Name")),y.map(e=>{let{_id:t,description:n}=e;return(r.createElement(F,{key:t,_id:t,description:n,router:k}))})),total:I,results:_,params:u,setParams:L,fixed:!1},a(t=>r.createElement(A,{key:t._id,permission:t,t:e,roleList:y,onGrant:E,onRemove:C}),[E,C,y,e]))))),r.createElement(v,null))};n.exportDefault(j)}

