function module(e,t,n){let i,a,l,c,m;n.export({FileAttachment:()=>o,isFileAttachment:()=>u}),n.link("react",{default(e){i=e}},0),n.link("./AudioAttachment",{AudioAttachment(e){a=e}},1),n.link("./GenericFileAttachment",{GenericFileAttachment(e){l=e}},2),n.link("./ImageAttachment",{ImageAttachment(e){c=e}},3),n.link("./VideoAttachment",{VideoAttachment(e){m=e}},4);const A=e=>"image_url"in e,r=e=>"audio_url"in e,h=e=>"video_url"in e,o=e=>A(e)?i.createElement(c,e):r(e)?i.createElement(a,e):h(e)?i.createElement(m,e):i.createElement(l,e),u=e=>"type"in e&&"file"===e.type}

