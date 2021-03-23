function module(e,n,t){var l,o,r,a,i,u,c,s,d,f,p,m,C,v,b,k;t.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){o=e}},1),t.export({CallBBB:function(){return _}}),t.link("react",{default:function(e){r=e},useEffect:function(e){a=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Button:function(e){u=e},ButtonGroup:function(e){c=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){s=e}},2),t.link("../../../../../contexts/TranslationContext",{useTranslation:function(e){d=e}},3),t.link("../../../../../components/VerticalBar",{default:function(e){f=e}},4),t.link("../../../providers/ToolboxProvider",{useTabBarClose:function(e){p=e}},5),t.link("../../../../../contexts/SettingsContext",{useSetting:function(e){m=e}},6),t.link("../../../providers/RoomProvider",{useRoom:function(e){C=e}},7),t.link("../../../../../contexts/AuthorizationContext",{usePermission:function(e){v=e}},8),t.link("../../../../../contexts/ServerContext",{useMethod:function(e){b=e}},9),t.link("../../../../../../app/ui-utils/client",{popout:function(e){k=e}},10);var _=function(e){var n=e.handleClose,t=e.canManageCall,l=e.live,a=e.startCall,s=e.endCall,p=e.openNewWindow,m=o(e,["handleClose","canManageCall","live","startCall","endCall","openNewWindow"]),C=d();return r.createElement(r.Fragment,null,r.createElement(f.Header,null,r.createElement(f.Icon,{name:"phone"}),r.createElement(f.Text,null,C("Call")),n&&r.createElement(f.Close,{onClick:n})),r.createElement(f.ScrollableContent,m,p?r.createElement(r.Fragment,null,r.createElement(i,{fontScale:"p2"},C("Video_Conference")),r.createElement(i,{fontScale:"p1",color:"neutral-700"},C("Opened_in_a_new_window"))):null,r.createElement(c,{stretch:!0},l&&r.createElement(u,{primary:!0,onClick:a},C("BBB_Join_Meeting")),l&&t&&r.createElement(u,{danger:!0,onClick:s},C("BBB_End_Meeting")),!l&&t&&r.createElement(u,{primary:!0,onClick:a},C("BBB_Start_Meeting")),!l&&!t&&r.createElement(u,{primary:!0},C("BBB_You_have_no_permission_to_start_a_call")))))},g=function(e){var n,t,o=e.rid,i=p(),u=!!m("bigbluebutton_Open_New_Window"),c=v("call-management",o),d=C(),f=b("bbbJoin"),g=b("bbbEnd"),B=s((function(){g({rid:o})})),x=s(function(){function e(){var e;return l.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.awrap(f({rid:o}));case 2:if(e=n.sent){n.next=5;break}return n.abrupt("return");case 5:if(!u){n.next=7;break}return n.abrupt("return",window.open(e.url));case 7:k.open({content:"bbbLiveView",data:{source:e.url,streamingOptions:e,canOpenExternal:!0,showVideoControls:!1},onCloseCallback:function(){return!1}});case 8:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return e}());a((function(){var e;if("call"===(null==d?void 0:null===(e=d.streamingOptions)||void 0===e?void 0:e.type)&&!k.context)return x(),function(){k.close()}}),[null==d?void 0:null===(n=d.streamingOptions)||void 0===n?void 0:n.type,x]);var E="d"===(null==d?void 0:d.t)||c;return(r.createElement(_,{handleClose:i,openNewWindow:u,live:"call"===(null==d?void 0:null===(t=d.streamingOptions)||void 0===t?void 0:t.type),endCall:B,startCall:x,canManageCall:E}))};t.exportDefault(g)}
