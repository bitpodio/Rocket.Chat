function module(e,t,n){let l,a,o,r,i,s,c,m,u,d,k,h,C,x,E,T;n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.export({MonitorsTable:()=>f}),n.link("@rocket.chat/fuselage",{Table(e){o=e},Icon(e){r=e},Button(e){i=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){s=e}},1),n.link("react",{default(e){c=e},memo(e){m=e}},2),n.link("../../../../client/components/DeleteWarningModal",{default(e){u=e}},3),n.link("../../../../client/components/FilterByText",{default(e){d=e}},4),n.link("../../../../client/components/GenericTable",{default(e){k=e}},5),n.link("../../../../client/contexts/ModalContext",{useSetModal(e){h=e}},6),n.link("../../../../client/contexts/ServerContext",{useMethod(e){C=e}},7),n.link("../../../../client/contexts/ToastMessagesContext",{useToastMessageDispatch(e){x=e}},8),n.link("../../../../client/contexts/TranslationContext",{useTranslation(e){E=e}},9),n.link("../../../../client/hooks/useResizeInlineBreakpoint",{useResizeInlineBreakpoint(e){T=e}},10);const p=m((function e(t){var n;const{_id:l,name:a,username:m,emails:d,onDelete:k}=t,T=h(),p=x(),f=E(),g=C("livechat:removeMonitor"),b=s(()=>{const e=async()=>{try{await g(m),p({type:"success",message:f("Monitor_removed")}),k()}catch(e){p({type:"error",message:e})}T()};T(c.createElement(u,{onDelete:e,onCancel:()=>T()}))});return c.createElement(o.Row,{key:l,role:"link",action:!0,tabIndex:0},c.createElement(o.Cell,{withTruncatedText:!0},a),c.createElement(o.Cell,{withTruncatedText:!0},m),c.createElement(o.Cell,{withTruncatedText:!0},null==d?void 0:null===(n=d.find(e=>{let{address:t}=e;return!!t}))||void 0===n?void 0:n.address),c.createElement(o.Cell,{withTruncatedText:!0},c.createElement(i,{small:!0,ghost:!0,title:f("Remove"),onClick:b},c.createElement(r,{name:"trash",size:"x16"}))))}));function f(e){let{monitors:t,totalMonitors:n,params:o,sort:r,onHeaderClick:i,onChangeParams:s,onDelete:m}=e;const u=E(),[h,C]=T([600],200);return c.createElement(k,{ref:h,header:c.createElement(c.Fragment,null,c.createElement(k.HeaderCell,{key:"name",sort:"name",active:"name"===r[0],direction:r[1],onClick:i},u("Name")),c.createElement(k.HeaderCell,null,u("Username")),c.createElement(k.HeaderCell,null,u("Email")),c.createElement(k.HeaderCell,{width:"x60"},u("Remove"))),results:t,total:n,params:o,setParams:s,renderFilter:e=>{let{onChange:t}=e,n=a(e,["onChange"]);return(c.createElement(d,l({onChange:t},n)))}},e=>c.createElement(p,l({key:e._id,medium:C,onDelete:m},e)))}n.exportDefault(f)}
