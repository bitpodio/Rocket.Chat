function module(e,t,n){let l,a,r,c,u,m,o,s;n.link("react",{default(e){l=e}},0),n.link("@rocket.chat/fuselage",{Modal(e){a=e},ButtonGroup(e){r=e},Button(e){c=e},Accordion(e){u=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){m=e}},2),n.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime(e){o=e}},3),n.link("./DescriptionList",{default(e){s=e}},4);const E=e=>{let{instances:t=[],onClose:n}=e;const E=m(),d=o();return l.createElement(a,{width:"x600"},l.createElement(a.Header,null,l.createElement(a.Title,null,E("Instances")),l.createElement(a.Close,{onClick:n})),l.createElement(a.Content,null,l.createElement(u,null,t.map(e=>{let{address:t,broadcastAuth:n,currentStatus:a,instanceRecord:r}=e;return(l.createElement(u.Item,{title:t,key:t},l.createElement(s,null,l.createElement(s.Entry,{label:E("Address")},t),l.createElement(s.Entry,{label:E("Auth")},n?"true":"false"),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Current_Status")," > ",E("Connected"))},a.connected?"true":"false"),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Current_Status")," > ",E("Retry_Count"))},a.retryCount),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Current_Status")," > ",E("Status"))},a.status),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Instance_Record")," > ",E("ID"))},r._id),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Instance_Record")," > ",E("PID"))},r.pid),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Instance_Record")," > ",E("Created_at"))},d(r._createdAt)),l.createElement(s.Entry,{label:l.createElement(l.Fragment,null,E("Instance_Record")," > ",E("Updated_at"))},d(r._updatedAt)))))}))),l.createElement(a.Footer,null,l.createElement(r,{align:"end"},l.createElement(c,{primary:!0,onClick:n},E("Close")))))};n.exportDefault(E)}
