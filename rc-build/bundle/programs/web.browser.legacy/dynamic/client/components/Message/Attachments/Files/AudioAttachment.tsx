function module(e,t,n){var l,i,o,a,r;n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},0),n.export({AudioAttachment:function(){return c}}),n.link("react",{default:function(e){i=e}},0),n.link("../hooks/useCollapse",{useCollapse:function(e){o=e}},1),n.link("../Attachment",{Attachment:function(e){a=e}},2),n.link("../context/AttachmentContext",{useMediaUrl:function(e){r=e}},3);var c=function(e){var t=e.title,n=e.audio_url,c=e.audio_type,u=e.collapsed,d=void 0!==u&&u,s=e.audio_size,m=e.description,f=e.title_link,p=e.title_link_download,E=o(d),k=l(E,2),h=k[0],A=k[1],_=r();return i.createElement(a,null,i.createElement(a.Row,null,i.createElement(a.Title,null,t),s&&i.createElement(a.Size,{size:s}),A,p&&f&&i.createElement(a.Download,{title:t,href:_(f)})),!h&&i.createElement(a.Content,{border:"none"},i.createElement("audio",{controls:!0},i.createElement("source",{src:_(n),type:c})),m&&i.createElement(a.Details,{is:"figcaption"},m)))}}

