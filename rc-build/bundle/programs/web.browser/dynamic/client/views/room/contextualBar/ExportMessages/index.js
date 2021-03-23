function module(e,t,l){let a,n,s,o,r,c,m,i,u,d,E,h,p,g,_,b,C,k,f,x,y,T,M,v,w,F,S;function L(){const e=n(["\n\tcursor: pointer;\n"]);return L=function(){return e},e}l.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),l.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){n=e}},1),l.export({ExportMessages:()=>U}),l.link("react",{default(e){s=e},useState(e){o=e},useEffect(e){r=e},useMemo(e){c=e}},0),l.link("@rocket.chat/fuselage",{Field(e){m=e},TextInput(e){i=e},Select(e){u=e},ButtonGroup(e){d=e},Button(e){E=e},Box(e){h=e},Icon(e){p=e},Callout(e){g=e},FieldGroup(e){_=e}},1),l.link("@rocket.chat/css-in-js",{css(e){b=e}},2),l.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){C=e}},3),l.link("../../../../components/VerticalBar",{default(e){k=e}},4),l.link("../../../../components/AutoComplete",{UserAutoComplete(e){f=e}},5),l.link("../../../../contexts/TranslationContext",{useTranslation(e){x=e}},6),l.link("../../../../hooks/useForm",{useForm(e){y=e}},7),l.link("../../hooks/useUserRoom",{useUserRoom(e){T=e}},8),l.link("../../../../contexts/ServerContext",{useEndpoint(e){M=e}},9),l.link("../../../../../app/utils/client",{roomTypes(e){v=e},isEmail(e){w=e}},10),l.link("../../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){F=e}},11),l.link("../../providers/ToolboxProvider",{useTabBarClose(e){S=e}},12);const R=b(L()),j=e=>{let{onCancel:t,rid:l}=e;const n=x(),{values:o,handlers:r}=y({dateFrom:"",dateTo:"",format:"html"}),{dateFrom:h,dateTo:p,format:g}=o,{handleDateFrom:b,handleDateTo:C,handleFormat:k}=r,f=c(()=>[["html",n("HTML")],["json",n("JSON")]],[n]),T=M("POST","rooms.export"),v=F(),w=async()=>{try{await T(a(a(a({rid:l,type:"file"},h&&{dateFrom:new Date(h)}),p&&{dateTo:new Date(p)}),{},{format:g})),v({type:"success",message:n("Your_email_has_been_queued_for_sending")})}catch(e){v({type:"error",message:e})}};return s.createElement(_,null,s.createElement(m,null,s.createElement(m.Label,null,n("Date_From")),s.createElement(m.Row,null,s.createElement(i,{type:"date",value:h,onChange:b}))),s.createElement(m,null,s.createElement(m.Label,null,n("Date_to")),s.createElement(m.Row,null,s.createElement(i,{type:"date",value:p,onChange:C}))),s.createElement(m,null,s.createElement(m.Label,null,n("Output_format")),s.createElement(m.Row,null,s.createElement(u,{value:g,onChange:k,placeholder:n("Format"),options:f}))),s.createElement(d,{stretch:!0,mb:"x12"},s.createElement(E,{onClick:t},n("Cancel")),s.createElement(E,{primary:!0,onClick:()=>w()},n("Export"))))},D=e=>{let{onCancel:t,rid:l}=e;const a=x(),n=T(l),c=n&&n.t&&v.getRoomName(n.t,n),[u,b]=o([]),[k,S]=o(),{values:L,handlers:j}=y({dateFrom:"",dateTo:"",toUsers:"",additionalEmails:"",subject:a("Mail_Messages_Subject",c)}),D=F(),{toUsers:U,additionalEmails:B,subject:N}=L,O=C(()=>{b([]),$(".messages-box .message",$("#chat-window-".concat(l))).removeClass("selected")});r(()=>{const e=$("#chat-window-".concat(l));$(".messages-box",e).addClass("selectable");const t=function(){const{id:e}=this;this.classList.contains("selected")?(this.classList.remove("selected"),b(t=>t.filter(t=>t!==e))):(this.classList.add("selected"),b(t=>t.concat(e)))};return $(".messages-box .message",e).on("click",t),()=>{$(".messages-box",e).removeClass("selectable"),$(".messages-box .message",e).off("click",t).filter(".selected").removeClass("selected")}},[l]);const{handleToUsers:P,handleAdditionalEmails:A,handleSubject:I}=j,q=M("POST","rooms.export"),z=async()=>{if(0!==U.length||""!==B)if(""===B||w(B))if(0!==u.length){S(null);try{await q({rid:l,type:"email",toUsers:[U],toEmails:B.split(","),subject:N,messages:u}),D({type:"success",message:a("Your_email_has_been_queued_for_sending")})}catch(e){D({type:"error",message:e})}}else S(a("Mail_Message_No_messages_selected_select_all"));else S(a("Mail_Message_Invalid_emails",B));else S(a("Mail_Message_Missing_to"))};return s.createElement(_,null,s.createElement(m,null,s.createElement(g,{onClick:O,title:a("Messages selected"),type:u.length>0?"success":"info"},s.createElement("p",null,"".concat(u.length," Messages selected")),u.length>0&&s.createElement(h,{is:"p",className:R},a("Click here to clear the selection")),0===u.length&&s.createElement(h,{is:"p"},a("Click_the_messages_you_would_like_to_send_by_email")))),s.createElement(m,null,s.createElement(m.Label,null,a("To_users")),s.createElement(m.Row,null,s.createElement(f,{value:U,onChange:P}))),s.createElement(m,null,s.createElement(m.Label,null,a("To_additional_emails")),s.createElement(m.Row,null,s.createElement(i,{placeholder:a("Email_Placeholder_any"),value:B,onChange:A,addon:s.createElement(p,{name:"mail",size:"x20"})}))),s.createElement(m,null,s.createElement(m.Label,null,a("Subject")),s.createElement(m.Row,null,s.createElement(i,{value:N,onChange:I,addon:s.createElement(p,{name:"edit",size:"x20"})}))),k&&s.createElement(g,{type:"danger",title:k}),s.createElement(d,{stretch:!0,mb:"x12"},s.createElement(E,{onClick:t},a("Cancel")),s.createElement(E,{primary:!0,onClick:()=>z()},a("Send"))))},U=function e(t){let{rid:l}=t;const a=x(),n=S(),[r,i]=o("email"),d=c(()=>[["email",a("Send_via_email")],["file",a("Export_as_file")]],[a]);return s.createElement(s.Fragment,null,s.createElement(k.Header,null,a("Export_Messages"),s.createElement(k.Close,{onClick:n})),s.createElement(k.ScrollableContent,null,s.createElement(_,null,s.createElement(m,null,s.createElement(m.Label,null,a("Method")),s.createElement(m.Row,null,s.createElement(u,{value:r,onChange:e=>i(e),placeholder:a("Type"),options:d})))),r&&"file"===r&&s.createElement(j,{rid:l,onCancel:n}),r&&"email"===r&&s.createElement(D,{rid:l,onCancel:n})))};l.exportDefault(U)}

