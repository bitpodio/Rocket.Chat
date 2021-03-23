function module(e,t,o){let n,i,l,a,s,r,u,d,c,m,p,f,h,k,C,E;o.export({NotificationPreferences:()=>b}),o.link("react",{default(e){n=e}},0),o.link("@rocket.chat/fuselage",{Button(e){i=e},ButtonGroup(e){l=e},FieldGroup(e){a=e},Icon(e){s=e}},1),o.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){r=e}},2),o.link("../../../../hooks/useForm",{useForm(e){u=e}},3),o.link("../../../../contexts/UserContext",{useUserSubscription(e){d=e}},4),o.link("../../../../contexts/TranslationContext",{useTranslation(e){c=e}},5),o.link("../../../../contexts/CustomSoundContext",{useCustomSound(e){m=e}},6),o.link("../../../../hooks/useEndpointAction",{useEndpointActionExperimental(e){p=e}},7),o.link("../../../../components/VerticalBar",{default(e){f=e}},8),o.link("./components/Preferences",{Preferences(e){h=e}},9),o.link("./components/NotificationByDevice",{NotificationByDevice(e){k=e}},10),o.link("./components/NotificationToogle",{NotificationToogle(e){C=e}},11),o.link("../../providers/ToolboxProvider",{useTabBarClose(e){E=e}},12);const b=e=>{let{handleClose:t,formValues:o,formHandlers:r,formHasUnsavedChanges:u,handlePlaySound:d,handleOptions:m,handleSaveButton:p}=e;const E=c();return(n.createElement(n.Fragment,null,n.createElement(f.Header,null,n.createElement(f.Icon,{name:"bell"}),n.createElement(f.Text,null,E("Notifications_Preferences")),t&&n.createElement(f.Close,{onClick:t})),n.createElement(f.ScrollableContent,null,n.createElement(C,{label:E("Turn_ON"),description:E("Receive_alerts"),onChange:r.handleTurnOn,defaultChecked:o.turnOn}),n.createElement(C,{label:E("Mute_Group_Mentions"),onChange:r.handleMuteGroupMentions,defaultChecked:o.muteGroupMentions}),n.createElement(C,{label:E("Show_counter"),description:E("Display_unread_counter"),onChange:r.handleShowCounter,defaultChecked:o.showCounter}),n.createElement(a,null,n.createElement(k,{device:E("Desktop"),icon:"computer"},n.createElement(h,{id:"DesktopAlert",onChange:r.handleDesktopAlert,name:E("Alerts"),options:m.alerts,optionDefault:o.desktopAlert}),n.createElement(h,{id:"DesktopAudio",onChange:r.handleDesktopAudio,name:E("Audio"),options:m.audio,optionDefault:o.desktopAudio}),n.createElement(h,{id:"DesktopSound",onChange:r.handleDesktopSound,name:E("Sound"),options:m.sound,optionDefault:o.desktopSound},n.createElement(i,{mis:"x4",square:!0,ghost:!0,onClick:d},n.createElement(s,{name:"play",size:"x18"})))),n.createElement(k,{device:E("Mobile"),icon:"mobile"},n.createElement(h,{id:"MobileAlert",onChange:r.handleMobileAlert,name:E("Alerts"),options:m.alerts,optionDefault:o.mobileAlert})),n.createElement(k,{device:E("Email"),icon:"mail"},n.createElement(h,{id:"EmailAlert",onChange:r.handleEmailAlert,name:E("Alerts"),options:m.alerts,optionDefault:o.emailAlert})))),n.createElement(f.Footer,null,n.createElement(l,{stretch:!0},t&&n.createElement(i,{onClick:t},E("Cancel")),n.createElement(i,{primary:!0,disabled:!u,onClick:p},E("Save"))))))};o.exportDefault(n.memo(e=>{let{rid:t}=e;const o=c(),i=d(t),l=m(),a=E(),s=p("POST","rooms.saveNotification",o("Room_updated_successfully")),{values:f,handlers:h,hasUnsavedChanges:k,commit:C}=u({turnOn:!i.disableNotifications,muteGroupMentions:i.muteGroupMentions,showCounter:!i.hideUnreadStatus,desktopAlert:"subscription"===i.desktopPrefOrigin&&i.desktopNotifications||"default",desktopAudio:"subscription"===i.audioPrefOrigin&&i.audioNotifications||"default",desktopSound:i.audioNotificationValue||"default",mobileAlert:"subscription"===i.mobilePrefOrigin&&i.mobilePushNotifications||"default",emailAlert:"subscription"===i.emailPrefOrigin&&i.emailNotifications||"default"}),A=[["default",o("Default")],["all",o("All_messages")],["mentions",o("Mentions")],["nothing",o("Nothing")]],g=Object.entries(l.list.get()).map(e=>[e[0],e[1].name]),N={alerts:A,audio:A,sound:[["none None",o("None")],["default",o("Default")],...g]},S=()=>l.play(f.desktopSound),D=r(()=>{const e={};e.disableNotifications=f.turnOn?"0":"1",e.muteGroupMentions=f.muteGroupMentions?"1":"0",e.hideUnreadStatus=f.showCounter?"0":"1",e.desktopNotifications=f.desktopAlert,e.audioNotifications=f.desktopAudio,e.audioNotificationValue=f.desktopSound,e.mobilePushNotifications=f.mobileAlert,e.emailNotifications=f.emailAlert,s({roomId:t,notifications:e}),C()});return n.createElement(b,{handleClose:a,formValues:f,formHandlers:h,formHasUnsavedChanges:k,handlePlaySound:S,handleOptions:N,handleSaveButton:D})}))}

