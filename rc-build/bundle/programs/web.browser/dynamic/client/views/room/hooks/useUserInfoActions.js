function module(e,o,r){let n,t,a,s,l,i,c,m,_,u,d,b,g,k,f,p,h,U,v,x,E,w,y,A,M,R,T,S,C,I;r.link("@babel/runtime/helpers/objectSpread2",{default(e){n=e}},0),r.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){t=e}},1),r.export({useUserInfoActionsSpread:()=>D,useUserInfoActions:()=>H}),r.link("react",{default(e){a=e},useCallback(e){s=e},useMemo(e){l=e}},0),r.link("@rocket.chat/fuselage",{Button(e){i=e},ButtonGroup(e){c=e},Icon(e){m=e},Modal(e){_=e},Box(e){u=e}},1),r.link("@rocket.chat/fuselage-hooks",{useAutoFocus(e){d=e},useMutableCallback(e){b=e}},2),r.link("../../../contexts/TranslationContext",{useTranslation(e){g=e}},3),r.link("../../../hooks/useReactiveValue",{useReactiveValue(e){k=e}},4),r.link("../../../contexts/AuthorizationContext",{usePermission(e){f=e},useAllPermissions(e){p=e}},5),r.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){h=e}},6),r.link("../../../contexts/UserContext",{useUserId(e){U=e},useUserSubscription(e){v=e},useUserSubscriptionByName(e){x=e}},7),r.link("../../../contexts/ServerContext",{useMethod(e){E=e}},8),r.link("../../../../app/webrtc/client",{WebRTC(e){w=e}},9),r.link("../../../contexts/RouterContext",{useRoute(e){y=e}},10),r.link("../../../contexts/ModalContext",{useSetModal(e){A=e}},11),r.link("../../../../app/models/client",{RoomRoles(e){M=e}},12),r.link("../../../../app/utils",{roomTypes(e){R=e},RoomMemberActions(e){T=e}},13),r.link("../../../hooks/useEndpointAction",{useEndpointActionExperimental(e){S=e}},14),r.link("./useUserRoom",{useUserRoom(e){C=e}},15),r.link("../../../../lib/escapeHTML",{escapeHTML(e){I=e}},16);const O=(e,o,r)=>k(s(()=>!!M.findOne({rid:o,"u._id":e,roles:r}),[e,o,r])),B=(e,o,r,n)=>{const t=r||o,a=e&&e.name!==n;return t&&a},P=e=>{if(!e)return!1;const{localUrl:o,remoteItems:r}=e,n=r.get()||[];return null!==o.get()||0!==n.length},L=(e,o,r)=>e&&e.ro?(!Array.isArray(e.unmuted)||-1===e.unmuted.indexOf(o&&o.username))&&(!r||Array.isArray(e.muted)&&-1!==e.muted.indexOf(o&&o.username)):e&&Array.isArray(e.muted)&&e.muted.indexOf(o&&o.username)>-1,N=e=>{let{text:o,confirmText:r,close:n,confirm:s}=e,l=t(e,["text","confirmText","close","confirm"]);const u=d(!0),b=g();return a.createElement(_,l,a.createElement(_.Header,null,a.createElement(m,{color:"warning",name:"modal-warning",size:20}),a.createElement(_.Title,null,b("Are_you_sure")),a.createElement(_.Close,{onClick:n})),a.createElement(_.Content,{fontScale:"p1"},o),a.createElement(_.Footer,null,a.createElement(c,{align:"end"},a.createElement(i,{ghost:!0,onClick:n},b("Cancel")),a.createElement(i,{ref:u,primary:!0,danger:!0,onClick:s},r))))},j=e=>{let[o,{action:r,label:n,icon:t}]=e;return[o,{label:{label:n,icon:t},action:r}]},D=function(e){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return l(()=>{const r=Object.entries(e),n=r.slice(0,o),t=r.slice(o,r.length).map(j),a=t.length&&Object.fromEntries(r.slice(o,r.length).map(j));return{actions:n,menu:a}},[e,o])},H=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1?arguments[1]:void 0;const r=g(),t=h(),i=y("direct"),c=A(),{_id:m}=e,_=U(),d=b(()=>c(null)),M=C(o),j=v(o),D=x(e.username),H=O(m,o,"leader"),V=O(m,o,"moderator"),W=O(m,o,"owner"),z=s(()=>w.getInstanceByRoomId(o),[o]),F=k(z),G=p("post-readonly",o),J=j&&j.ignored&&j.ignored.indexOf(m)>-1,Y=L(M,e,G),K="p"===M.t?"groups":"channels",q=M&&M.t&&R.getConfig(M.t),[Q,X,Z,$,ee,oe,re]=[...q&&[q.allowMemberAction(M,T.SET_AS_OWNER),q.allowMemberAction(M,T.SET_AS_LEADER),q.allowMemberAction(M,T.SET_AS_MODERATOR),q.allowMemberAction(M,T.IGNORE),q.allowMemberAction(M,T.BLOCK),q.allowMemberAction(M,T.MUTE),q.allowMemberAction(M,T.REMOVE_USER)]],ne=M&&M.t&&I(R.getRoomName(M.t,M)),te=f("set-owner",o),ae=f("set-leader",o),se=f("set-moderator",o),le=f("mute-user",o),ie=f("remove-user",o),ce=f("create-d"),me=P(F),_e=k(s(()=>null==F?void 0:F.callInProgress.get(),[F])),ue=B(j,D,ce,e.username),de=b(()=>i.push({rid:e.username})),be=l(()=>ue&&{label:r("Direct_Message"),icon:"balloon",action:de},[de,ue,r]),ge=l(()=>{const e=()=>{F.joinCall({audio:!0,video:!0})},o=()=>{F.startCall({audio:!0,video:!0})},n=_e?e:o;return me&&{label:r(_e?"Join_video_call":"Start_video_call"),icon:"video",action:n}},[_e,me,r,F]),ke=l(()=>{const e=()=>{F.joinCall({audio:!0,video:!1})},o=()=>{F.startCall({audio:!0,video:!1})},n=_e?e:o;return me&&{label:r(_e?"Join_audio_call":"Start_audio_call"),icon:"mic",action:n}},[_e,me,r,F]),fe=W?"removeOwner":"addOwner",pe=W?"User__username__removed_from__room_name__owners":"User__username__is_now_a_owner_of__room_name_",he=S("POST","".concat(K,".").concat(fe),r(pe,{username:e.username,room_name:ne})),Ue=b(async()=>he({roomId:o,userId:m})),ve=l(()=>Q&&te&&{label:r(W?"Remove_as_owner":"Set_as_owner"),icon:"shield-check",action:Ue},[Ue,W,r,Q,te]),xe=H?"removeLeader":"addLeader",Ee=H?"User__username__removed_from__room_name__leaders":"User__username__is_now_a_leader_of__room_name_",we=S("POST","".concat(K,".").concat(xe),r(Ee,{username:e.username,room_name:ne})),ye=b(()=>we({roomId:o,userId:m})),Ae=l(()=>X&&ae&&{label:r(H?"Remove_as_leader":"Set_as_leader"),icon:"shield-alt",action:ye},[H,X,r,ae,ye]),Me=V?"removeModerator":"addModerator",Re=V?"User__username__removed_from__room_name__moderators":"User__username__is_now_a_moderator_of__room_name_",Te=S("POST","".concat(K,".").concat(Me),r(Re,{username:e.username,room_name:ne})),Se=b(()=>Te({roomId:o,userId:m})),Ce=l(()=>Z&&se&&{label:r(V?"Remove_as_moderator":"Set_as_moderator"),icon:"shield",action:Se},[Se,V,Z,r,se]),Ie=E("ignoreUser"),Oe=b(async()=>{try{await Ie({rid:o,userId:m,ignore:!J}),t(J?{type:"success",message:r("User_has_been_unignored")}:{type:"success",message:r("User_has_been_ignored")})}catch(e){t({type:"error",message:e})}}),Be=l(()=>$&&m!==_&&{label:r(J?"Unignore":"Ignore"),icon:"ban",action:Oe},[Oe,J,_,$,r,m]),Pe=j.blocker,Le=E(Pe?"unblockUser":"blockUser"),Ne=b(async()=>{try{await Le({rid:o,blocked:m}),t({type:"success",message:r(Pe?"User_is_unblocked":"User_is_blocked")})}catch(e){t({type:"error",message:e})}}),je=l(()=>ee&&m!==_&&{label:r(Pe?"Unblock":"Block"),icon:"ban",action:Ne},[Pe,_,ee,r,Ne,m]),De=E(Y?"unmuteUserInRoom":"muteUserInRoom"),He=l(()=>{const n=()=>{const n=async()=>{try{await De({rid:o,username:e.username}),d(),t({type:"success",message:r(Y?"User__username__unmuted_in_room__roomName__":"User__username__muted_in_room__roomName__",{username:e.username,roomName:ne})})}catch(n){t({type:"error",message:n})}};if(Y)return n();c(a.createElement(N,{text:r("The_user_wont_be_able_to_type_in_s",ne),close:d,confirmText:r("Yes_mute_user"),confirm:n}))};return oe&&le&&{label:r(Y?"Unmute_user":"Mute_user"),icon:Y?"mic":"mic-off",action:n}},[d,t,Y,De,o,oe,ne,c,r,e.username,le]),Ve=S("POST","".concat(K,".kick"),r("User_has_been_removed_from_s",ne)),We=b(()=>{c(a.createElement(N,{text:r("The_user_will_be_removed_from_s",ne),close:d,confirmText:r("Yes_remove_user"),confirm:()=>{Ve({roomId:o,userId:m}),d()}}))}),ze=l(()=>re&&ie&&{label:a.createElement(u,{color:"danger"},r("Remove_from_room")),icon:"sign-out",action:We},[re,ie,We,r]);return l(()=>n(n(n(n(n(n(n(n(n(n({},be&&{openDirectMessage:be}),ge&&{video:ge}),ke&&{audio:ke}),ve&&{changeOwner:ve}),Ae&&{changeLeader:Ae}),Ce&&{changeModerator:Ce}),Be&&{ignoreUser:Be}),He&&{muteUser:He}),ze&&{removeUser:ze}),je&&{toggleBlock:je}),[ke,Ae,Ce,ve,Be,He,be,ze,ge,je])}}
