function module(e,t,n){let l,a,r,s,o,i,c,m,u,d,E,h,x,p,f,C,k,w;function g(e){let{_id:t,createdAt:n,expires:l,days:a,uses:u,maxUses:d,onRemove:h}=e;const k=p(),g=w(),y=x(),T=C(),_=f("DELETE","removeInvite/".concat(t)),D=e=>{let{expires:t,days:n}=e;return n>0?t<Date.now()?k("Expired"):E(t).fromNow(!0):k("Never")},v=e=>{let{maxUses:t,uses:n}=e;return t>0?n>=t?0:t-n:k("Unlimited")},b=async e=>{e.stopPropagation(),y.open({text:k("Are_you_sure_you_want_to_delete_this_record"),type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:k("Yes"),cancelButtonText:k("No"),closeOnConfirm:!0,html:!1},async e=>{if(e)try{await _(),h&&h(t)}catch(n){T({type:"error",message:n})}})},B=c("(min-width: 768px)");return m.createElement(o.Row,null,m.createElement(o.Cell,null,m.createElement(i,{color:"hint",fontScale:"p1"},t)),B&&m.createElement(m.Fragment,null,m.createElement(o.Cell,null,g(n)),m.createElement(o.Cell,null,D({expires:l,days:a})),m.createElement(o.Cell,null,u),m.createElement(o.Cell,null,v({maxUses:d,uses:u}))),m.createElement(o.Cell,null,m.createElement(r,{ghost:!0,danger:!0,small:!0,square:!0,onClick:b},m.createElement(s,{name:"cross",size:"x20"}))))}function y(){const e=p(),[t,n]=u([]),r=f("GET","listInvites");d(()=>{const e=async()=>{const e=await r()||[],t=e.map(e=>a(a({},e),{},{createdAt:new Date(e.createdAt),expires:e.expires?new Date(e.expires):""}));n(t)};e()},[r]);const s=e=>{n((function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.filter(t=>t._id!==e)}))},i=c("(min-width: 768px)");return m.createElement(h,null,m.createElement(h.Header,{title:e("Invites")}),m.createElement(h.Content,null,m.createElement(k,{results:t,header:m.createElement(m.Fragment,null,m.createElement(o.Cell,{is:"th",width:i?"20%":"80%"},e("Token")),i&&m.createElement(m.Fragment,null,m.createElement(o.Cell,{is:"th",width:"35%"},e("Created_at")),m.createElement(o.Cell,{is:"th",width:"20%"},e("Expiration")),m.createElement(o.Cell,{is:"th",width:"10%"},e("Uses")),m.createElement(o.Cell,{is:"th",width:"10%"},e("Uses_left"))),m.createElement(o.Cell,{is:"th"})),renderRow:e=>m.createElement(g,l({key:e._id},e,{onRemove:s}))})))}n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},1),n.link("@rocket.chat/fuselage",{Button(e){r=e},Icon(e){s=e},Table(e){o=e},Box(e){i=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery(e){c=e}},1),n.link("react",{default(e){m=e},useState(e){u=e},useEffect(e){d=e}},2),n.link("moment",{default(e){E=e}},3),n.link("../../../components/Page",{default(e){h=e}},4),n.link("../../../contexts/ModalContext",{useModal(e){x=e}},5),n.link("../../../contexts/TranslationContext",{useTranslation(e){p=e}},6),n.link("../../../contexts/ServerContext",{useEndpoint(e){f=e}},7),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){C=e}},8),n.link("../../../components/GenericTable",{default(e){k=e}},9),n.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime(e){w=e}},10),n.exportDefault(y)}

