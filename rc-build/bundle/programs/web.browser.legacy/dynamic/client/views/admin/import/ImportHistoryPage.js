function module(e,t,n){var r,a,l,o,i,s,c,u,p,d,m,f,_,g,h,v,E,k,w;function x(){var e,t=g(),n=h(),x=u(d(!0)),y=l(x,2),b=y[0],C=y[1],S=u(d()),T=l(S,2),F=T[0],P=T[1],D=u(d([])),I=l(D,2),O=I[0],L=I[1],M=E("GET","getCurrentImportOperation"),A=E("GET","getLatestImportOperations"),N=E("POST","downloadPendingFiles"),R=E("POST","downloadPendingAvatars"),B=v("admin-import-new"),G=v("admin-import-progress");m((function(){var e;(function(){function e(){var e,r,l;return a.async(function(){function o(o){for(;;)switch(o.prev=o.next){case 0:return C(!0),o.prev=1,o.next=4,a.awrap(M());case 4:e=o.sent,r=e.operation,P(r),o.next=12;break;case 9:o.prev=9,o.t0=o.catch(1),n({type:"error",message:t("Failed_To_Load_Import_Operation")});case 12:return o.prev=12,o.next=15,a.awrap(A());case 15:l=o.sent,L(l),o.next=22;break;case 19:o.prev=19,o.t1=o.catch(12),n({type:"error",message:t("Failed_To_Load_Import_History")});case 22:C(!1);case 23:case"end":return o.stop()}}return o}(),null,null,[[1,9],[12,19]],Promise)}return e})()()}),[n,M,A,P,L,C,t]);var H=f((function(){return null==O?void 0:O.some((function(e){var t=e.importerKey,n=e.status;return"slack"===t&&n===k.DONE}))}),[O]),U=function(){B.push()},K=function(){function e(){var e,r;return a.async(function(){function l(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,C(!0),l.next=4,a.awrap(N());case 4:if(e=l.sent,r=e.count){l.next=10;break}return n({type:"info",message:t("No_files_left_to_download")}),C(!1),l.abrupt("return");case 10:n({type:"info",message:t("File_Downloads_Started")}),G.push(),l.next=19;break;case 14:l.prev=14,l.t0=l.catch(0),console.error(l.t0),n({type:"error",message:t("Failed_To_Download_Files")}),C(!1);case 19:case"end":return l.stop()}}return l}(),null,null,[[0,14]],Promise)}return e}(),Q=function(){function e(){var e,r;return a.async(function(){function l(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,C(!0),l.next=4,a.awrap(R());case 4:if(e=l.sent,r=e.count){l.next=10;break}return n({type:"info",message:t("No_files_left_to_download")}),C(!1),l.abrupt("return");case 10:n({type:"info",message:t("File_Downloads_Started")}),G.push(),l.next=19;break;case 14:l.prev=14,l.t0=l.catch(0),console.error(l.t0),n({type:"error",message:t("Failed_To_Download_Files")}),C(!1);case 19:case"end":return l.stop()}}return l}(),null,null,[[0,14]],Promise)}return e}(),W=c("(max-width: 768px)");return p.createElement(_,null,p.createElement(_.Header,{title:t("Import")},p.createElement(i,null,p.createElement(o,{primary:!0,disabled:b,onClick:U},t("Import_New_File")),H&&p.createElement(o,{disabled:b,onClick:K},t("Download_Pending_Files")),H&&p.createElement(o,{disabled:b,onClick:Q},t("Download_Pending_Avatars")))),p.createElement(_.ScrollableContentWithShadow,null,p.createElement(s,{fixed:!0},p.createElement(s.Head,null,p.createElement(s.Row,null,p.createElement(s.Cell,{is:"th",rowSpan:2,width:"x140"},t("Import_Type")),p.createElement(s.Cell,{is:"th",rowSpan:2},t("Last_Updated")),!W&&p.createElement(p.Fragment,null,p.createElement(s.Cell,{is:"th",rowSpan:2},t("Last_Status")),p.createElement(s.Cell,{is:"th",rowSpan:2},t("File")),p.createElement(s.Cell,{is:"th",align:"center",colSpan:4,width:"x320"},t("Counters")))),!W&&p.createElement(s.Row,null,p.createElement(s.Cell,{is:"th",align:"center"},t("Users")),p.createElement(s.Cell,{is:"th",align:"center"},t("Channels")),p.createElement(s.Cell,{is:"th",align:"center"},t("Messages")),p.createElement(s.Cell,{is:"th",align:"center"},t("Total")))),p.createElement(s.Body,null,b?Array.from({length:20},(function(e,t){return p.createElement(w.Skeleton,{small:W,key:t})})):p.createElement(p.Fragment,null,(null==F?void 0:F.valid)&&p.createElement(w,r({},F,{small:W})),null==O?void 0:null===(e=O.filter((function(e){var t=e._id;return(null==F?void 0:F._id)!==t||!(null!=F&&F.valid)})))||void 0===e?void 0:e.map((function(e){return p.createElement(w,r({key:e._id},e,{valid:!1,small:W}))})))))))}n.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),n.link("@babel/runtime/regenerator",{default:function(e){a=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},2),n.link("@rocket.chat/fuselage",{Button:function(e){o=e},ButtonGroup:function(e){i=e},Table:function(e){s=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){c=e},useSafely:function(e){u=e}},1),n.link("react",{default:function(e){p=e},useState:function(e){d=e},useEffect:function(e){m=e},useMemo:function(e){f=e}},2),n.link("../../../components/Page",{default:function(e){_=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){g=e}},4),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){h=e}},5),n.link("../../../contexts/RouterContext",{useRoute:function(e){v=e}},6),n.link("../../../contexts/ServerContext",{useEndpoint:function(e){E=e}},7),n.link("../../../../app/importer/lib/ImporterProgressStep",{ProgressStep:function(e){k=e}},8),n.link("./ImportOperationSummary",{default:function(e){w=e}},9),n.exportDefault(x)}
