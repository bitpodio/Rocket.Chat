function module(e,t,n){var o,c,a,l,r,u,i,f,m,s;n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){o=e}},0),n.link("react",{default:function(e){c=e},useMemo:function(e){a=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){l=e},Button:function(e){r=e},Icon:function(e){u=e},ButtonGroup:function(e){i=e},Modal:function(e){f=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){m=e}},2),n.link("../../../components/TextCopy",{default:function(e){s=e}},3);var _=function(e){var t=e.codes,n=e.onClose,_=o(e,["codes","onClose"]),d=m(),k=a((function(){return t.join(" ")}),[t]);return c.createElement(f,_,c.createElement(f.Header,null,c.createElement(u,{name:"info",size:20}),c.createElement(f.Title,null,d("Backup_codes")),c.createElement(f.Close,{onClick:n})),c.createElement(f.Content,{fontScale:"p1"},c.createElement(l,{mb:"x8",withRichContent:!0},d("Make_sure_you_have_a_copy_of_your_codes_1")),c.createElement(s,{text:k,wordBreak:"break-word",mb:"x8"}),c.createElement(l,{mb:"x8",withRichContent:!0},d("Make_sure_you_have_a_copy_of_your_codes_2"))),c.createElement(f.Footer,null,c.createElement(i,{align:"end"},c.createElement(r,{primary:!0,onClick:n},d("Ok")))))};n.exportDefault(_)}

