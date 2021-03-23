function module(e,t,n){let l,a,r,o,s,i,c,u,m,d,k,p,h,f,E,y,C,x,g,w,v,b,M,A,S;n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.export({default:()=>F}),n.link("@rocket.chat/fuselage",{Box(e){r=e},Margins(e){o=e},Table(e){s=e},Avatar(e){i=e},Tag(e){c=e},Icon(e){u=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery(e){m=e},useAutoFocus(e){d=e}},1),n.link("react",{default(e){k=e},useMemo(e){p=e},useState(e){h=e},useCallback(e){f=e}},2),n.link("../../components/MarkdownText",{default(e){E=e}},3),n.link("../../components/FilterByText",{default(e){y=e}},4),n.link("../../components/GenericTable",{default(e){C=e}},5),n.link("../../components/NotAuthorizedPage",{default(e){x=e}},6),n.link("../../contexts/AuthorizationContext",{usePermission(e){g=e}},7),n.link("../../contexts/RouterContext",{useRoute(e){w=e}},8),n.link("../../contexts/TranslationContext",{useTranslation(e){v=e}},9),n.link("../../hooks/useEndpointData",{useEndpointData(e){b=e}},10),n.link("../../hooks/useFormatDate",{useFormatDate(e){M=e}},11),n.link("../../../app/utils/client",{roomTypes(e){A=e}},12),n.link("./hooks",{useQuery(e){S=e}},13);const T={whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"};function P(e){let{room:t}=e;const n=v();return(k.createElement(r,{mi:"x4",alignItems:"center",display:"flex"},k.createElement(o,{inline:"x2"},t.default&&k.createElement(c,{variant:"primary"},n("default")),t.featured&&k.createElement(c,{variant:"primary"},n("featured")))))}function D(){const e=v(),t=d(!0),[n,o]=h(["name","asc"]),[c,x]=h({current:0,itemsPerPage:25}),g=m("(min-width: 768px)"),D=S(c,n,"channels"),F=f(e=>{const[t,l]=n;o(t!==e?[e,"asc"]:[e,"asc"===l?"desc":"asc"])},[n]),I=p(()=>[k.createElement(C.HeaderCell,{key:"name",direction:n[1],active:"name"===n[0],onClick:F,sort:"name"},e("Name")),k.createElement(C.HeaderCell,{key:"usersCount",direction:n[1],active:"usersCount"===n[0],onClick:F,sort:"usersCount",style:{width:"100px"}},e("Users")),g&&k.createElement(C.HeaderCell,{key:"createdAt",direction:n[1],active:"createdAt"===n[0],onClick:F,sort:"createdAt",style:{width:"150px"}},e("Created_at")),g&&k.createElement(C.HeaderCell,{key:"lastMessage",direction:n[1],active:"lastMessage"===n[0],onClick:F,sort:"lastMessage",style:{width:"150px"}},e("Last_Message"))].filter(Boolean),[n,F,e,g]),R=w("channel"),{value:B={result:[]}}=b("directory",D),H=p(()=>e=>t=>{"click"!==t.type&&"Enter"!==t.key||R.push({name:e})},[R]),_=M(),z=f(e=>{const{_id:t,ts:n,t:l,name:a,fname:o,usersCount:c,lastMessage:m,topic:d}=e,p=A.getConfig(l).getAvatarPath(e);return k.createElement(s.Row,{key:t,onKeyDown:H(a),onClick:H(a),tabIndex:0,role:"link",action:!0},k.createElement(s.Cell,null,k.createElement(r,{display:"flex"},k.createElement(r,{flexGrow:0},k.createElement(i,{size:"x40",title:o||a,url:p})),k.createElement(r,{grow:1,mi:"x8",style:T},k.createElement(r,{display:"flex",alignItems:"center"},k.createElement(u,{name:A.getIcon(e),color:"hint"})," ",k.createElement(r,{fontScale:"p2",mi:"x4"},o||a),k.createElement(P,{room:e,style:T})),d&&k.createElement(E,{variant:"inlineWithoutBreaks",fontScale:"p1",color:"hint",style:T,content:d})))),k.createElement(s.Cell,{fontScale:"p1",color:"hint",style:T},c),g&&k.createElement(s.Cell,{fontScale:"p1",color:"hint",style:T},_(n)),g&&k.createElement(s.Cell,{fontScale:"p1",color:"hint",style:T},m&&_(m.ts)))},[_,g,H]);return k.createElement(C,{header:I,renderFilter:n=>{let{onChange:r}=n,o=a(n,["onChange"]);return(k.createElement(y,l({placeholder:e("Search_Channels"),inputRef:t,onChange:r},o)))},renderRow:z,results:B.result,setParams:x,total:B.total})}function F(e){const t=g("view-c-room");return t?k.createElement(D,e):k.createElement(x,null)}}

