function module(e,t,n){var l,a,i,r,o,c,f,s,u,m,x,d,p,_,v,g,E;n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},0),n.link("react",{default:function(e){a=e},useMemo:function(e){i=e},useState:function(e){r=e},useEffect:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){c=e},Select:function(e){f=e},Margins:function(e){s=e},Field:function(e){u=e},Label:function(e){m=e}},1),n.link("../DepartmentAutoComplete",{default:function(e){x=e}},2),n.link("./DateRangePicker",{default:function(e){d=e}},3),n.link("./Overview",{default:function(e){p=e}},4),n.link("./AgentOverview",{default:function(e){_=e}},5),n.link("../../../components/Page",{default:function(e){v=e}},6),n.link("./InterchangeableChart",{default:function(e){g=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){E=e}},8);var h=function(e){var t=E();return i((function(){return"Conversations"===e?[["Total_conversations",t("Total_conversations")],["Avg_chat_duration",t("Avg_chat_duration")],["Total_messages",t("Total_messages")]]:[["Avg_first_response_time",t("Avg_first_response_time")],["Best_first_response_time",t("Best_first_response_time")],["Avg_response_time",t("Avg_response_time")],["Avg_reaction_time",t("Avg_reaction_time")]]}),[t,e])},k=function(){var e=E(),t=r("Conversations"),n=l(t,2),k=n[0],w=n[1],y=r(null),C=l(y,2),A=C[0],D=C[1],b=r({start:null,end:null}),S=l(b,2),T=S[0],R=S[1],G=r(),I=l(G,2),P=I[0],B=I[1],L=i((function(){return[["Conversations",e("Conversations")],["Productivity",e("Productivity")]]}),[e]),M=h(k);return o((function(){B(M[0][0])}),[M]),a.createElement(v,null,a.createElement(v.Header,{title:e("Analytics")}),a.createElement(v.ScrollableContentWithShadow,{display:"flex",flexDirection:"column"},a.createElement(s,{block:"x4"},a.createElement(c,{display:"flex",mi:"neg-x4",flexDirection:"row",flexWrap:"wrap"},a.createElement(c,{display:"flex",mi:"x4",flexGrow:1,flexDirection:"column"},a.createElement(m,{mb:"x4"},e("Type")),a.createElement(f,{flexShrink:0,options:L,value:k,onChange:w})),a.createElement(c,{display:"flex",mi:"x4",flexGrow:1,flexDirection:"column"},a.createElement(m,{mb:"x4"},e("Departments")),a.createElement(x,{flexShrink:0,placeholder:e("All"),value:A,onChange:D})),a.createElement(d,{mi:"x4",flexGrow:1,onChange:R})),a.createElement(c,null,a.createElement(p,{type:k,dateRange:T,departmentId:A})),a.createElement(c,{display:"flex",flexDirection:"row"},a.createElement(s,{inline:"x2"},a.createElement(u,null,a.createElement(u.Label,null,e("Chart")),a.createElement(u.Row,null,a.createElement(f,{options:M,value:P,onChange:B}))))),a.createElement(c,{display:"flex",flexDirection:"row",flexGrow:1,flexShrink:1},a.createElement(g,{flexShrink:1,w:"66%",h:"100%",chartName:P,departmentId:A,dateRange:T,alignSelf:"stretch"}),a.createElement(c,{display:"flex",w:"33%",flexDirection:"row",justifyContent:"stretch",p:"x10",mis:"x4"},a.createElement(_,{type:P,dateRange:T,departmentId:A}))))))};n.exportDefault(k)}
