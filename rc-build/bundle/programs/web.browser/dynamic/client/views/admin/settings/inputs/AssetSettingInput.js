function module(e,t,n){let a,s,l,r,c,i,o,m;function u(e){let{_id:t,label:n,value:u={},asset:d,fileConstraints:g={}}=e;const p=m(),f=o(),y=i("setAsset"),E=i("unsetAsset"),h=e=>{e=e.originalEvent||e;let{files:t}=e.target;t&&0!==t.length||(t=e.dataTransfer&&e.dataTransfer.files?e.dataTransfer.files:[]),Object.values(t).forEach(e=>{f({type:"info",message:p("Uploading_file")});const t=new FileReader;t.readAsBinaryString(e),t.onloadend=async()=>{try{await y(t.result,e.type,d),f({type:"success",message:p("File_uploaded")})}catch(n){f({type:"error",message:n})}}})},v=async()=>{try{await E(d)}catch(e){f({type:"error",message:e})}};return c.createElement(c.Fragment,null,c.createElement(s.Label,{htmlFor:t,title:t},n),c.createElement(s.Row,null,c.createElement("div",{className:"settings-file-preview"},u.url?c.createElement("div",{className:"preview",style:{backgroundImage:"url(".concat(u.url,"?_dc=").concat(r.id(),")")}}):c.createElement("div",{className:"preview no-file background-transparent-light secondary-font-color"},c.createElement(l,{name:"upload"})),c.createElement("div",{className:"action"},u.url?c.createElement(a,{onClick:v},c.createElement(l,{name:"trash"}),p("Delete")):c.createElement("div",{className:"rc-button rc-button--primary"},p("Select_file"),c.createElement("input",{className:"AssetSettingInput__input",type:"file",accept:g.extensions&&g.extensions.length&&".".concat(g.extensions.join(", .")),onChange:h}))))))}n.export({AssetSettingInput:()=>u}),n.link("@rocket.chat/fuselage",{Button(e){a=e},Field(e){s=e},Icon(e){l=e}},0),n.link("meteor/random",{Random(e){r=e}},1),n.link("react",{default(e){c=e}},2),n.link("../../../../contexts/ServerContext",{useMethod(e){i=e}},3),n.link("../../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){o=e}},4),n.link("../../../../contexts/TranslationContext",{useTranslation(e){m=e}},5),n.link("./AssetSettingInput.css")}

