function module(e,t,l){let n,a,r,o,i,s,c,u,m,d,f;l.link("@rocket.chat/fuselage",{Box(e){n=e},Button(e){a=e},ButtonGroup(e){r=e},Scrollable(e){o=e},Throbber(e){i=e},Modal(e){s=e}},0),l.link("react",{default(e){c=e},useState(e){u=e}},1),l.link("../../../contexts/TranslationContext",{useTranslation(e){m=e}},2),l.link("../../../contexts/ServerContext",{useEndpoint(e){d=e}},3),l.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){f=e}},4);const g=e=>{let{onBackButtonClick:t,onFinish:l}=e;const g=m(),h=f(),[C,p]=u(!1),[k,x]=u(""),E=e=>{x(e.currentTarget.value)},b=d("POST","cloud.manualRegister"),y=async()=>{p(!0);try{await b({},{cloudBlob:k}),h({type:"success",message:g("Cloud_register_success")})}catch(e){h({type:"error",message:g("Cloud_register_error")})}finally{p(!1),l&&l()}};return c.createElement(c.Fragment,null,c.createElement(s.Content,null,c.createElement(n,{withRichContent:!0},c.createElement("p",null,g("Cloud_register_offline_finish_helper"))),c.createElement(n,{display:"flex",flexDirection:"column",alignItems:"stretch",padding:"x16",flexGrow:1,backgroundColor:"neutral-800"},c.createElement(o,{vertical:!0},c.createElement(n,{is:"textarea",height:"x108",fontFamily:"mono",fontScale:"p1",color:"alternative",style:{wordBreak:"break-all",resize:"none"},placeholder:g("Paste_here"),disabled:C,value:k,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false",onChange:E})))),c.createElement(s.Footer,null,c.createElement(r,null,c.createElement(a,{disabled:C,onClick:t},g("Back")),c.createElement(a,{primary:!0,disabled:C||!k.trim(),marginInlineStart:"auto",onClick:y},C?c.createElement(i,{inheritColor:!0}):g("Finish Registration")))))};l.exportDefault(g)}

