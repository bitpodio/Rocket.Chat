function module(e,t,n){var r,o,l,i,a,c,u,f,m,d,s;n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){r=e}},0),n.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},1),n.export({Attachment:function(){return C}}),n.link("react",{default:function(e){l=e},memo:function(e){i=e}},0),n.link("@rocket.chat/fuselage",{ActionButton:function(e){a=e},Box:function(e){c=e},Avatar:function(e){u=e}},1),n.link("../../../hooks/useFormatMemorySize",{useFormatMemorySize:function(e){f=e}},2),n.link("./components/Image",{default:function(e){m=e}},3),n.link("./context/AttachmentContext",{useAttachmentDimensions:function(e){d=e}},4),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){s=e}},5);var x=function(e){return l.createElement(c,o({mi:"neg-x2",mbe:"x2","rcx-message-attachment":!0,display:"flex",alignItems:"center"},e))},h=function(e){return l.createElement(c,o({withTruncatedText:!0,mi:"x2",fontScale:"c1",color:"hint"},e))},p=function(e){var t=e.link,n=e.title;return(l.createElement(h,{is:"a",href:t+"?donwload",color:void 0,target:"_blank",download:n,rel:"noopener noreferrer"},n))},v=function(e){return l.createElement(c,o({mbe:"x4",mi:"x2",fontScale:"p1",color:"default"},e))},b=function(e){var t=e.size,n=r(e,["size"]),i=f();return l.createElement(h,o({flexShrink:0},n),"(",i(t),")")},E=function(e){return l.createElement(a,o({mi:"x2",mini:!0,ghost:!0},e))},w=function(e){var t=e.collapsed,n=void 0!==t&&t,i=r(e,["collapsed"]),a=s();return l.createElement(E,o({title:a(n?"Uncollapse":"Collapse"),icon:n?"chevron-left":"chevron-down"},i))},k=function(e){var t=e.title,n=e.href,i=r(e,["title","href"]),a=s();return l.createElement(E,o({icon:"download",href:n+"?download",title:a("Download"),is:"a",target:"_blank",rel:"noopener noreferrer",download:t},i))},g=function(e){var t=o({},e);return(l.createElement(c,o({"rcx-attachment__content":!0,width:"full",mb:"x4"},t)))},S=function(e){var t=o({},e);return(l.createElement(c,o({"rcx-attachment__details":!0,fontScale:"p1",color:"info",bg:"neutral-100",pi:"x16",pb:"x16"},t)))},T=function(e){var t=o({},e);return(l.createElement(c,t))},A=function(e){var t=e.pre,n=e.color,r=void 0===n?"neutral-600":n,o=e.children;return(l.createElement(C,null,t,l.createElement(c,{display:"flex",flexDirection:"row",pis:"x16",borderRadius:"x2",borderInlineStartStyle:"solid",borderInlineStartWidth:"x2",borderInlineStartColor:r,children:o})))},I=function(e){return l.createElement(c,o({display:"flex",flexDirection:"row",alignItems:"center",mbe:"x4"},e))},y=function(e){var t=e.url;return(l.createElement(u,{url:t,size:"x24"}))},z=function(e){return l.createElement(c,o({withTruncatedText:!0,fontScale:"p2",mi:"x8"},e))},D=i((function(e){var t=e.url;return(l.createElement(c,{mis:"x8"},l.createElement(u,{url:t,size:"x48"})))})),C=function(e){var t,n=d().width;return(l.createElement(c,o({"rcx-message-attachment":!0,mb:"x4",maxWidth:n,width:"full",display:"flex",overflow:"hidden",flexDirection:"column"},e)))};C.Image=m,C.Row=x,C.Title=h,C.Text=v,C.TitleLink=p,C.Size=b,C.Thumb=D,C.Collapse=w,C.Download=k,C.Content=g,C.Details=S,C.Inner=T,C.Block=A,C.Author=I,C.AuthorAvatar=y,C.AuthorName=z}

