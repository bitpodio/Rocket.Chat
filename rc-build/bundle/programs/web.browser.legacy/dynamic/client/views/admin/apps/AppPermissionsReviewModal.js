function module(e,n,t){var l,o,r,c,i,a;t.link("@rocket.chat/fuselage",{Button:function(e){l=e},ButtonGroup:function(e){o=e},Icon:function(e){r=e},Modal:function(e){c=e}},0),t.link("react",{default:function(e){i=e}},1),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){a=e}},2);var u=function(e){var n=e.appPermissions,t=e.cancel,u=e.confirm,s=e.modalProps,m=void 0===s?{}:s,f=a(),p=function(){t()},d=function(){t()},E=function(){u(n)};return i.createElement(c,m,i.createElement(c.Header,null,i.createElement(r,{color:"danger",name:"info-circled",size:20}),i.createElement(c.Title,null,f("Apps_Permissions_Review_Modal_Title")),i.createElement(c.Close,{onClick:p})),i.createElement(c.Content,{fontScale:"p1"},i.createElement("ul",null,n.length?n.map((function(e){return i.createElement("li",{key:e.name},i.createElement("b",null,f("Apps_Permissions_"+e.name.replace(".","_"))),e.required&&i.createElement("span",{style:{color:"red"}}," (",f("required"),")"))})):f("Apps_Permissions_No_Permissions_Required"))),i.createElement(c.Footer,null,i.createElement(o,{align:"end"},i.createElement(l,{ghost:!0,onClick:d},f("Cancel")),i.createElement(l,{primary:!0,onClick:E},f("Accept")))))};t.exportDefault(u)}

