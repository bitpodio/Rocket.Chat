function module(e,t,n){let l,o,a,r,c,i,s,u,m;n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},0),n.export({DeleteWarningModalDoNotAskAgain:()=>k}),n.link("@rocket.chat/fuselage",{Box(e){o=e},Button(e){a=e},ButtonGroup(e){r=e},Icon(e){c=e},Modal(e){i=e}},0),n.link("react",{default(e){s=e}},1),n.link("../contexts/TranslationContext",{useTranslation(e){u=e}},2),n.link("./withDoNotAskAgain",{withDoNotAskAgain(e){m=e}},3);const d=e=>{let{children:t,cancelText:n,deleteText:m,onCancel:d,onDelete:k,confirm:g=k,dontAskAgain:f}=e,x=l(e,["children","cancelText","deleteText","onCancel","onDelete","confirm","dontAskAgain"]);const A=u();return(s.createElement(i,x,s.createElement(i.Header,null,s.createElement(c,{color:"danger",name:"modal-warning",size:20}),s.createElement(i.Title,null,A("Are_you_sure")),s.createElement(i.Close,{onClick:d})),s.createElement(i.Content,{fontScale:"p1"},t),s.createElement(i.Footer,null,s.createElement(o,{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"},f,s.createElement(r,{align:"end"},s.createElement(a,{ghost:!0,onClick:d},null!=n?n:A("Cancel")),s.createElement(a,{primary:!0,danger:!0,onClick:g},null!=m?m:A("Delete")))))))},k=m(d);n.exportDefault(d)}
