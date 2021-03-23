function module(e,t,s){let n,a,l,r,u,i;s.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),s.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),s.export({UserStatus:()=>c,Busy:()=>o,Away:()=>m,Online:()=>f,Offline:()=>d,Loading:()=>E,colors:()=>y,ReactiveUserStatus:()=>b}),s.link("react",{default(e){l=e}},0),s.link("@rocket.chat/fuselage",{StatusBullet(e){r=e}},1),s.link("../contexts/TranslationContext",{useTranslation(e){u=e}},2),s.link("../hooks/usePresence",{usePresence(e){i=e}},3);const c=l.memo(e=>{let{small:t,status:s}=e,i=a(e,["small","status"]);const c=t?"small":"large",o=u();switch(s){case"online":return l.createElement(r,n({size:c,status:s,title:o("Online")},i));case"busy":return l.createElement(r,n({size:c,status:s,title:o("Busy")},i));case"away":return l.createElement(r,n({size:c,status:s,title:o("Away")},i));case"offline":return l.createElement(r,n({size:c,status:s,title:o("Offline")},i));default:return l.createElement(r,n({size:c,title:o("Loading")},i))}}),o=e=>l.createElement(c,n({status:"busy"},e)),m=e=>l.createElement(c,n({status:"away"},e)),f=e=>l.createElement(c,n({status:"online"},e)),d=e=>l.createElement(c,n({status:"offline"},e)),E=e=>l.createElement(c,e),y={busy:"danger-500",away:"warning-600",online:"success-500",offline:"neutral-600"},b=l.memo(e=>{let{uid:t,presence:s}=e,r=a(e,["uid","presence"]);const u=i(t,s);return(l.createElement(c,n({status:u},r)))})}

