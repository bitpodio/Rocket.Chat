function module(t,e,s){let i,o;s.export({JitsiBridge:()=>n}),s.link("@rocket.chat/emitter",{Emitter(t){i=t}},0),s.link("./Jitsi",{JitsiMeetExternalAPI(t){o=t}},1);class n extends i{constructor(t,e){let{openNewWindow:s,ssl:i,domain:o,jitsiRoomName:n,accessToken:a,desktopSharingChromeExtId:c,name:r}=t;super(),this.openNewWindow=s,this.ssl=i,this.domain=o,this.jitsiRoomName=n,this.accessToken=a,this.desktopSharingChromeExtId=c,this.name=r,this.heartbeat=e}start(t){const e=setInterval(()=>this.emit("HEARTBEAT",!0),this.heartbeat);this.once("dispose",()=>clearTimeout(e));const{openNewWindow:s,ssl:i,domain:n,jitsiRoomName:a,accessToken:c,desktopSharingChromeExtId:r,name:h}=this,d=i?"https://":"http://",m={desktopSharingChromeExtId:r},p={};if(s){const t=c?"?jwt=".concat(c):"",e=window.open("".concat(d+n,"/").concat(a).concat(t),a);if(!e)return;const s=setInterval(()=>{e.closed&&this.dispose()},1e3);return this.once("dispose",()=>clearTimeout(s)),e.focus()}const l="auto",u=500,k=new o(n,a,l,500,t,m,p,!i,c);k.executeCommand("displayName",[h]),this.once("dispose",()=>k.dispose())}dispose(){clearInterval(this.timer),this.emit("dispose",!0)}}}
