function module(e,t,a){let n,l,i,o,u,r,c,s,d;a.link("react",{default(e){n=e},useMemo(e){l=e},useState(e){i=e}},0),a.link("@rocket.chat/fuselage",{Field(e){o=e}},1),a.link("../../../client/components/Page",{default(e){u=e}},2),a.link("./DateRangePicker",{default(e){r=e}},3),a.link("./AuditLogTable",{default(e){c=e}},4),a.link("../../../client/contexts/TranslationContext",{useTranslation(e){s=e}},5),a.link("../../../client/hooks/useMethodData",{useMethodData(e){d=e}},6);const m=()=>{const e=s(),[t,a]=i({start:"",end:""}),{start:m,end:f}=t,k=l(()=>[{startDate:new Date(m),endDate:new Date(f)}],[f,m]),{value:g}=d("auditGetAuditions",k);return n.createElement(u,null,n.createElement(u.Header,{title:e("Message_auditing_log")}),n.createElement(u.Content,null,n.createElement(o,{alignSelf:"stretch"},n.createElement(o.Label,null,e("Date")),n.createElement(o.Row,null,n.createElement(r,{display:"flex",flexGrow:1,onChange:a}))),n.createElement(c,{data:g})))};a.exportDefault(m)}

