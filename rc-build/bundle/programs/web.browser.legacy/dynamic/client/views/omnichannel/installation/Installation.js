function module(t,e,n){var a,l,c,o,i,r,u;n.link("react",{default:function(t){a=t}},0),n.link("@rocket.chat/fuselage",{Box:function(t){l=t}},1),n.link("../../../contexts/SettingsContext",{useSetting:function(t){c=t}},2),n.link("../../../contexts/TranslationContext",{useTranslation:function(t){o=t}},3),n.link("../../../components/Page",{default:function(t){i=t}},4),n.link("../../../components/RawText",{default:function(t){r=t}},5),n.link("../../../components/TextCopy",{default:function(t){u=t}},6);var s=function(t){return a.createElement(l,{fontFamily:"mono",alignSelf:"center",fontScale:"p1",style:{wordBreak:"break-all"},mie:"x4",flexGrow:1,withRichContent:!0},a.createElement("pre",null,a.createElement("code",null,t)))},f=function(){var t=o(),e=c("Site_Url").replace(/\/$/,""),n='\x3c!-- Start of Rocket.Chat Livechat Script --\x3e\n\t<script type="text/javascript">\n\t(function(w, d, s, u) {\n\t\tw.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;\n\t\tvar h = d.getElementsByTagName(s)[0], j = d.createElement(s);\n\t\tj.async = true; j.src = \''+e+"/livechat/rocketchat-livechat.min.js?_=201903270000';\n\t\th.parentNode.insertBefore(j, h);\n\t})(window, document, 'script', '"+e+"/livechat');\n\t<\/script>";return a.createElement(i,null,a.createElement(i.Header,{title:t("Installation")}),a.createElement(i.ScrollableContentWithShadow,null,a.createElement(l,{maxWidth:"x600",alignSelf:"center"},a.createElement("p",null,a.createElement(r,null,t("To_install_RocketChat_Livechat_in_your_website_copy_paste_this_code_above_the_last_body_tag_on_your_site"))),a.createElement(u,{pi:"none",text:n,wrapper:s}))))};n.exportDefault(f)}
