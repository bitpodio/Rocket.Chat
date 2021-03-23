function module(e,n,t){var l,i,o,c,r,a,u,s,f,k,d,h,m,E,C,_,b;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},0),t.export({OTR:function(){return T}}),t.link("react",{default:function(e){i=e},useEffect:function(e){o=e},useMemo:function(e){c=e},useCallback:function(e){r=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){a=e}},1),t.link("@rocket.chat/fuselage",{Box:function(e){u=e},Button:function(e){s=e},ButtonGroup:function(e){f=e},Throbber:function(e){k=e}},2),t.link("../../../../contexts/ModalContext",{useSetModal:function(e){d=e}},3),t.link("./OTRModal",{default:function(e){h=e}},4),t.link("../../../../../app/otr/client/rocketchat.otr",{OTR:function(e){m=e}},5),t.link("../../../../contexts/TranslationContext",{useTranslation:function(e){E=e}},6),t.link("../../../../components/VerticalBar",{default:function(e){C=e}},7),t.link("../../../../hooks/useReactiveValue",{useReactiveValue:function(e){_=e}},8),t.link("../../../../hooks/usePresence",{usePresence:function(e){b=e}},9);var T=function(e){var n=e.isEstablishing,t=e.isEstablished,l=e.isOnline,o=e.onClickClose,c=e.onClickStart,r=e.onClickEnd,a=e.onClickRefresh,d=E();return i.createElement(i.Fragment,null,i.createElement(C.Header,null,i.createElement(C.Icon,{name:"key"}),i.createElement(C.Text,null,d("OTR")),o&&i.createElement(C.Close,{onClick:o})),i.createElement(C.ScrollableContent,{p:"x24"},i.createElement(u,{fontScale:"s2"},d("Off_the_record_conversation")),!n&&!t&&l&&i.createElement(s,{onClick:c,primary:!0},d("Start_OTR")),n&&!t&&l&&i.createElement(i.Fragment,null," ",i.createElement(u,{fontScale:"p1"},d("Please_wait_while_OTR_is_being_established"))," ",i.createElement(k,{inheritColor:!0})," "),t&&l&&i.createElement(f,{stretch:!0},a&&i.createElement(s,{width:"50%",onClick:a},d("Refresh_keys")),r&&i.createElement(s,{width:"50%",danger:!0,onClick:r},d("End_OTR"))),!l&&i.createElement(u,{fontScale:"p2"},d("OTR_is_only_available_when_both_users_are_online"))))};t.exportDefault((function(e){var n=e.rid,t=e.tabBar,u=a((function(){return t&&t.close()})),s=d(),f=a((function(){return s()})),k=c((function(){return m.getInstanceByRoomId(n)}),[n]),E=_(r((function(){return k?[k.established.get(),k.establishing.get()]:[!1,!1]}),[k])),C=l(E,2),R=C[0],g=C[1],p=b(k.peerId),O=!["offline","loading"].includes(p),v=function(){k.handshake()},x=function(){return null==k?void 0:k.end()},S=function(){k.reset(),k.handshake(!0)};return o((function(){if(R)return f();if(g){var e=setTimeout((function(){s(i.createElement(h,{onConfirm:f,onCancel:f}))}),1e4);return function(){return clearTimeout(e)}}}),[f,R,g,s]),i.createElement(T,{isOnline:O,isEstablishing:g,isEstablished:R,onClickClose:u,onClickStart:v,onClickEnd:x,onClickRefresh:S})}))}

