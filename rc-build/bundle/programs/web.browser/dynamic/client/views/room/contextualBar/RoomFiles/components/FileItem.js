function module(e,t,l){let n,a,o,r,i,c,s,d,m,u,f,k,p,x,h;function w(){const e=o(["\n\t&:hover{\n\t  \tcursor: pointer;\n    \tbackground-color: ",";\n  \t}\n"]);return w=function(){return e},e}l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},1),l.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){o=e}},2),l.export({FileItem:()=>g}),l.link("react",{default(e){r=e}},0),l.link("@rocket.chat/fuselage",{Box(e){i=e},Menu(e){c=e},Icon(e){s=e},Avatar(e){d=e}},1),l.link("@rocket.chat/css-in-js",{css(e){m=e}},2),l.link("@rocket.chat/fuselage-tokens/colors",{default(e){u=e}},3),l.link("../../../../../lib/download",{download(e){f=e}},4),l.link("../../../../../hooks/useFormatDateAndTime",{useFormatDateAndTime(e){k=e}},5),l.link("../../../../../../app/utils/client",{getURL(e){p=e}},6),l.link("./FileItemIcon",{default(e){x=e}},7),l.link("../../../../../contexts/TranslationContext",{useTranslation(e){h=e}},8);const b=m(w(),u.n100),E=r.memo(e=>{let{_id:t,name:l,url:n,onClickDelete:o}=e;const d=h(),m=a({downLoad:{label:r.createElement(i,{display:"flex",alignItems:"center"},r.createElement(s,{mie:"x4",name:"download",size:"x16"}),d("Download")),action:()=>{var e;const t=null!==(e=window.webkitURL)&&void 0!==e?e:window.URL,a=p(n);f(a,l),t.revokeObjectURL(n)}}},o&&{delete:{label:r.createElement(i,{display:"flex",alignItems:"center",color:"danger"},r.createElement(s,{mie:"x4",name:"trash",size:"x16"}),d("Delete")),action:()=>o(t)}});return r.createElement(c,{options:m})}),g=e=>{let{_id:t,name:l,url:a,uploadedAt:o,ts:c,user:s,type:m,typeGroup:u,style:f,onClickDelete:p,className:h,isDeletionAllowed:w}=e;const g=k();return(r.createElement(i,{display:"flex",p:"x12",style:f,className:[h,b]},r.createElement(i,n({is:"a",minWidth:0},"image"===u&&{className:"gallery-item"},{download:!0,rel:"noopener noreferrer",target:"_blank",title:l,display:"flex",flexGrow:1,flexShrink:1,href:a}),"image"===u?r.createElement(d,{size:"x48",url:a}):r.createElement(x,{type:m}),r.createElement(i,{mis:"x8",flexShrink:1,overflow:"hidden"},r.createElement(i,{withTruncatedText:!0,color:"default",fontScale:"p2"},l),r.createElement(i,{withTruncatedText:!0,color:"hint",fontScale:"p1"},"@",null==s?void 0:s.username),r.createElement(i,{color:"hint",fontScale:"micro"},g(o)))),r.createElement(E,{_id:t,name:l,url:a,onClickDelete:w({uid:null==s?void 0:s._id,ts:c})&&p})))};l.exportDefault(g)}

