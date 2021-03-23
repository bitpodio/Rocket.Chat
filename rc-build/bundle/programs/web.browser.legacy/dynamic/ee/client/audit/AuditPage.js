function module(e,n,t){var l,r,a,i,o,c,u,s,m,d,f,E,h,g,p,k,C,_,x,v,b,w,R;t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),t.link("react",{default:function(e){a=e},useRef:function(e){i=e},useState:function(e){o=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){c=e},Field:function(e){u=e},TextInput:function(e){s=e},ButtonGroup:function(e){m=e},Button:function(e){d=e},Margins:function(e){f=e},Tabs:function(e){E=e},Flex:function(e){h=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){g=e}},2),t.link("../../../client/components/Page",{default:function(e){p=e}},3),t.link("./DateRangePicker",{default:function(e){k=e}},4),t.link("./RoomAutoComplete",{default:function(e){C=e}},5),t.link("./UserAutoCompleteMultiple",{default:function(e){_=e}},6),t.link("./VisitorAutoComplete",{default:function(e){x=e}},7),t.link("./Result",{default:function(e){v=e}},8),t.link("../../../client/components/AutoCompleteAgent",{AutoCompleteAgent:function(e){b=e}},9),t.link("../../../client/contexts/TranslationContext",{useTranslation:function(e){w=e}},10),t.link("../../../client/hooks/useForm",{useForm:function(e){R=e}},11);var A={msg:"",type:"",dateRange:{start:"",end:""},visitor:"",agent:"all",rid:"",users:[]},y=function(){var e=w(),n=R(A),t=n.values,y=n.handlers,D=i((function(){})),T=o({}),U=r(T,2),I=U[0],L=U[1],M=t.msg,P=t.type,F=t.dateRange,S=F.start,G=F.end,V=t.visitor,q=t.agent,B=t.users,j=t.rid,H=y.handleMsg,N=y.handleType,O=y.handleVisitor,W=y.handleAgent,z=y.handleUsers,J=y.handleRid,K=y.handleDateRange,Q=function(e){return g((function(){O(""),W(),J(""),z([]),N(e)}))},X=g((function(e,n){if(!n){if(B.includes(e))return;return z([].concat(l(B),[e]))}z(B.filter((function(n){return n!==e})))})),Y=g((function(){if(!j&&""===P)return L({rid:e("The_field_is_required",e("Channel_name"))});if(B.length<2&&"d"===P)return L({users:e("Select_at_least_two_users")});if("l"===P){var n={};if(""===q&&(n.agent=e("The_field_is_required",e("Agent"))),""===V&&(n.visitor=e("The_field_is_required",e("Visitor"))),n.visitor||n.agent)return L(n)}L({}),D.current({msg:M,type:P,startDate:new Date(S),endDate:new Date(G+"T23:59:00"),visitor:V,agent:q,users:B,rid:j})}));return a.createElement(p,null,a.createElement(p.Header,{title:e("Message_auditing")}),a.createElement(E,null,a.createElement(E.Item,{selected:""===P,onClick:Q("")},e("Channels")),a.createElement(E.Item,{selected:"u"===P,onClick:Q("u")},e("Users")),a.createElement(E.Item,{selected:"d"===P,onClick:Q("d")},e("Direct_Messages")),a.createElement(E.Item,{selected:"l"===P,onClick:Q("l")},e("Omnichannel"))),a.createElement(p.ScrollableContentWithShadow,{mb:"neg-x4"},a.createElement(f,{block:"x4"},a.createElement(c,{display:"flex",flexDirection:"row",mi:"neg-x4",justifyContent:"stretch"},a.createElement(f,{inline:"x4"},a.createElement(h.Item,{shrink:1},a.createElement(u,null,a.createElement(u.Label,null,e("Message")),a.createElement(u.Row,null,a.createElement(s,{value:M,onChange:H,placeholder:e("Search")}))),a.createElement(u,null,a.createElement(u.Label,null,e("Date")),a.createElement(u.Row,null,a.createElement(k,{onChange:K,display:"flex",flexGrow:1})))))),a.createElement(c,{display:"flex",flexDirection:"row",alignItems:"flex-end"},a.createElement(h.Item,{shrink:1},""===P&&a.createElement(u,null,a.createElement(u.Label,null,e("Channel_name")),a.createElement(u.Row,null,a.createElement(C,{error:I.rid,value:j,onChange:J,placeholder:e("Channel_Name_Placeholder")})),I.rid&&a.createElement(u.Error,null,I.rid)),"u"===P&&a.createElement(u,null,a.createElement(u.Label,null,e("Users")),a.createElement(u.Row,null,a.createElement(_,{error:I.users,value:B,onChange:X,placeholder:e("Username_Placeholder")})),I.users&&a.createElement(u.Error,null,I.users)),"d"===P&&a.createElement(u,null,a.createElement(u.Label,null,e("Users")),a.createElement(u.Row,null,a.createElement(_,{error:I.users,value:B,onChange:X,placeholder:e("Username_Placeholder")})),I.users&&a.createElement(u.Error,null,I.users)),"l"===P&&a.createElement(a.Fragment,null,a.createElement(f,{inline:"x4"},a.createElement(u,null,a.createElement(u.Label,{flexGrow:0},e("Visitor")),a.createElement(u.Row,null,a.createElement(x,{error:I.visitor,value:V,onChange:O,placeholder:e("Username_Placeholder")})),I.visitor&&a.createElement(u.Error,null,I.visitor)),a.createElement(u,null,a.createElement(u.Label,{flexGrow:0},e("Agent")),a.createElement(u.Row,null,a.createElement(b,{error:I.agent,value:q,onChange:W,placeholder:e("Username_Placeholder")})),I.agent&&a.createElement(u.Error,null,I.agent)))),a.createElement(m,{mis:"x8",align:"end"},a.createElement(d,{primary:!0,onClick:Y},e("Apply"))))),a.createElement(v,{setDataRef:D}))))};t.exportDefault(y)}

