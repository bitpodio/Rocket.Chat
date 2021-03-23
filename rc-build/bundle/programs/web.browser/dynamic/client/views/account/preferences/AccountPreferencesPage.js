function module(e,t,n){let a,l,s,i,c,r,o,u,f,g,m,h,d,k,S,E,C,x,A,P,p;n.link("react",{default(e){a=e},useState(e){l=e},useCallback(e){s=e},useRef(e){i=e}},0),n.link("@rocket.chat/fuselage",{ButtonGroup(e){c=e},Button(e){r=e},Box(e){o=e},Accordion(e){u=e}},1),n.link("../../../contexts/TranslationContext",{useTranslation(e){f=e}},2),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){g=e}},3),n.link("../../../contexts/SettingsContext",{useSetting(e){m=e}},4),n.link("../../../contexts/ServerContext",{useMethod(e){h=e}},5),n.link("../../../components/Page",{default(e){d=e}},6),n.link("./PreferencesLocalizationSection",{default(e){k=e}},7),n.link("./PreferencesUserPresenceSection",{default(e){S=e}},8),n.link("./PreferencesNotificationsSection",{default(e){E=e}},9),n.link("./PreferencesMessagesSection",{default(e){C=e}},10),n.link("./PreferencesHighlightsSection",{default(e){x=e}},11),n.link("./PreferencesSoundSection",{default(e){A=e}},12),n.link("./PreferencesMyDataSection",{default(e){P=e}},13),n.link("./PreferencesGlobalSection",{default(e){p=e}},14);const y=()=>{const e=f(),t=g(),[n,y]=l(!1),b=i({}),R=i({}),v=m("UserData_EnableDownload"),L=s(e=>{let{initialValue:t,value:a,key:l}=e;const{current:s}=b;JSON.stringify(t)!==JSON.stringify(a)?s[l]=a:delete s[l];const i=!!Object.values(s).length;i!==n&&y(i)},[n]),O=h("saveUserPreferences"),D=s(async()=>{try{const{current:n}=b;if((n.highlights||""===n.highlights)&&Object.assign(n,{highlights:n.highlights.split(/,|\n/).map(e=>e.trim()).filter(Boolean)}),n.dontAskAgainList){const e=Array.isArray(n.dontAskAgainList)&&n.dontAskAgainList.length>0?n.dontAskAgainList.map(e=>{let[t,n]=e;return{action:t,label:n}}):[];Object.assign(n,{dontAskAgainList:e})}await O(n),b.current={},y(!1),Object.values(R.current).forEach(e=>e()),t({type:"success",message:e("Preferences_saved")})}catch(n){t({type:"error",message:n})}},[t,O,e]);return a.createElement(d,null,a.createElement(d.Header,{title:e("Preferences")},a.createElement(c,null,a.createElement(r,{primary:!0,disabled:!n,onClick:D},e("Save_changes")))),a.createElement(d.ScrollableContentWithShadow,null,a.createElement(o,{maxWidth:"x600",w:"full",alignSelf:"center"},a.createElement(u,null,a.createElement(k,{commitRef:R,onChange:L,defaultExpanded:!0}),a.createElement(p,{commitRef:R,onChange:L}),a.createElement(S,{commitRef:R,onChange:L}),a.createElement(E,{commitRef:R,onChange:L}),a.createElement(C,{commitRef:R,onChange:L}),a.createElement(x,{commitRef:R,onChange:L}),a.createElement(A,{commitRef:R,onChange:L}),v&&a.createElement(P,{onChange:L})))))};n.exportDefault(y)}

