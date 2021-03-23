function module(e,t,a){let n,r,l,o,s,c,i,d,m,u,k,C,h,f,p,v,y,g,T,x,E,w;function D(e){let{_id:t,reload:a}=e;const n=p("livechat:removeRoom"),r=x(),s=E(),c=f(),i=l(async()=>{try{await n(t)}catch(e){console.log(e)}a()}),k=l(e=>{e.stopPropagation();const t=async()=>{try{await i(),s({type:"success",message:c("Chat_removed")})}catch(e){s({type:"error",message:e})}r()};r(o.createElement(T,{onDelete:t,onCancel:()=>r()}))});return o.createElement(d.Cell,{fontScale:"p1",color:"hint",withTruncatedText:!0},o.createElement(u,{small:!0,ghost:!0,title:c("Remove"),onClick:k},o.createElement(m,{name:"trash",size:"x16"})))}a.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),a.export({RemoveChatButton:()=>D}),a.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){r=e},useMutableCallback(e){l=e}},0),a.link("react",{default(e){o=e},useMemo(e){s=e},useCallback(e){c=e},useState(e){i=e}},1),a.link("@rocket.chat/fuselage",{Table(e){d=e},Icon(e){m=e},Button(e){u=e}},2),a.link("moment",{default(e){k=e}},3),a.link("meteor/kadira:flow-router",{FlowRouter(e){C=e}},4),a.link("../../../components/GenericTable",{default(e){h=e}},5),a.link("../../../contexts/TranslationContext",{useTranslation(e){f=e}},6),a.link("../../../contexts/ServerContext",{useMethod(e){p=e}},7),a.link("../../../contexts/AuthorizationContext",{usePermission(e){v=e}},8),a.link("../../../components/NotAuthorizedPage",{default(e){y=e}},9),a.link("./CurrentChatsPage",{default(e){g=e}},10),a.link("../../../components/DeleteWarningModal",{default(e){T=e}},11),a.link("../../../contexts/ModalContext",{useSetModal(e){x=e}},12),a.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){E=e}},13),a.link("../../../hooks/useEndpointData",{useEndpointData(e){w=e}},14);const M=e=>"asc"===e?1:-1,S=(e,t)=>{let{guest:a,servedBy:r,department:l,status:o,from:c,to:i,tags:d,customFields:m,itemsPerPage:u,current:C}=e,[h,f]=t;return s(()=>{const e=n(n(n({},a&&{roomName:a}),{},{sort:JSON.stringify({[h]:M(f),ts:"ts"===h?M(f):void 0})},u&&{count:u}),C&&{offset:C});return(c||i)&&(e.createdAt=JSON.stringify(n(n({},c&&{start:k(new Date(c)).set({hour:"00",minutes:"00",seconds:"00"}).format("YYYY-MM-DDTHH:mm:ss")}),i&&{end:k(new Date(i)).set({hour:"23",minutes:"59",seconds:"59"}).format("YYYY-MM-DDTHH:mm:ss")}))),"all"!==o&&(e.open="opened"===o),r&&"all"!==r&&(e.agents=[r]),l&&"all"!==l&&(e.departmentId=l),d&&d.length>0&&(e.tags=d),m&&Object.keys(m).length>0&&(e.customFields=JSON.stringify(m)),e},[a,h,f,u,C,c,i,o,r,l,d,m])};function H(){const e=f(),t=v("view-livechat-current-chats"),[a,n]=i({fname:"",servedBy:[],status:"",department:"",from:"",to:"",customFields:{},current:0,itemsPerPage:25}),[m,u]=i(["ts","desc"]),p=r(a,500),T=r(m,500),x=S(p,T),E=l(e=>{const[t,a]=m;u(t!==e?[e,"asc"]:[e,"asc"===a?"desc":"asc"])}),M=l(e=>{C.go("live",{id:e})}),{value:H,reload:b}=w("livechat/rooms",x),B=s(()=>[o.createElement(h.HeaderCell,{key:"name",direction:m[1],active:"name"===m[0],onClick:E,sort:"name"},e("Name")),o.createElement(h.HeaderCell,{key:"departmentId",direction:m[1],active:"departmentId"===m[0],onClick:E,sort:"departmentId"},e("Department")),o.createElement(h.HeaderCell,{key:"servedBy",direction:m[1],active:"servedBy"===m[0],onClick:E,sort:"servedBy"},e("Served_By")),o.createElement(h.HeaderCell,{key:"ts",direction:m[1],active:"ts"===m[0],onClick:E,sort:"ts"},e("Started_At")),o.createElement(h.HeaderCell,{key:"lm",direction:m[1],active:"lm"===m[0],onClick:E,sort:"lm"},e("Last_Message")),o.createElement(h.HeaderCell,{key:"status",direction:m[1],active:"status"===m[0],onClick:E,sort:"status",w:"x100"},e("Status")),o.createElement(h.HeaderCell,{key:"remove",w:"x60"},e("Remove"))].filter(Boolean),[m,E,e]),P=c(t=>{let{_id:a,fname:n,servedBy:r,ts:l,lm:s,department:c,open:i}=t;return(o.createElement(d.Row,{key:a,tabIndex:0,role:"link",onClick:()=>M(a),action:!0,"qa-user-id":a},o.createElement(d.Cell,{withTruncatedText:!0},n),o.createElement(d.Cell,{withTruncatedText:!0},c?c.name:""),o.createElement(d.Cell,{withTruncatedText:!0},r&&r.username),o.createElement(d.Cell,{withTruncatedText:!0},k(l).format("L LTS")),o.createElement(d.Cell,{withTruncatedText:!0},k(s).format("L LTS")),o.createElement(d.Cell,{withTruncatedText:!0},e(i?"Open":"Closed")),!i&&o.createElement(D,{_id:a,reload:b})))},[M,b,e]);return t?o.createElement(g,{setParams:n,params:a,onHeaderClick:E,data:H,useQuery:S,reload:b,header:B,renderRow:P,title:e("Current_Chats")}):o.createElement(y,null)}a.exportDefault(H)}

