function module(e,t,n){let a,l,s,r,i,o,c,p,u,m,d,h,f,k,b,E,x,y,g,w,S,v,C;n.link("@babel/runtime/helpers/objectSpread2",{default(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},1),n.link("@rocket.chat/fuselage",{Box(e){s=e},Button(e){r=e},Icon(e){i=e},Throbber(e){o=e}},0),n.link("@rocket.chat/fuselage-hooks",{useSafely(e){c=e}},1),n.link("react",{default(e){p=e},useCallback(e){u=e},useState(e){m=e},memo(e){d=e}},2),n.link("../../../contexts/TranslationContext",{useTranslation(e){h=e}},3),n.link("./helpers",{appButtonProps(e){f=e},appStatusSpanProps(e){k=e},handleAPIError(e){b=e},warnStatusChange(e){E=e},handleInstallError(e){x=e}},4),n.link("../../../../app/apps/client/orchestrator",{Apps(e){y=e}},5),n.link("./IframeModal",{default(e){g=e}},6),n.link("./CloudLoginModal",{default(e){w=e}},7),n.link("./AppPermissionsReviewModal",{default(e){S=e}},8),n.link("../../../contexts/ModalContext",{useSetModal(e){v=e}},9),n.link("../../../contexts/ServerContext",{useMethod(e){C=e}},10);const P=async e=>{let{id:t,name:n,version:a,permissionsGranted:l}=e;try{const{status:e}=await y.installApp(t,a,l);E(n,e)}catch(s){b(s)}},A={purchase:P,install:P,update:async e=>{let{id:t,name:n,marketplaceVersion:a,permissionsGranted:l}=e;try{const{status:e}=await y.updateApp(t,a,l);E(n,e)}catch(s){b(s)}}},I=e=>{let{app:t,showStatus:n=!0}=e,d=l(e,["app","showStatus"]);const E=h(),[P,I]=c(m()),[M,T]=c(m(t.isPurchased)),B=v(),D=f(t),G=!D&&k(t),j=(null==D?void 0:D.action)||"",L=u(e=>{B(null),A[j](a(a({},t),{},{permissionsGranted:e})).then(()=>{I(!1)})},[B,j,t,I]),U=u(()=>{I(!1),B(null)},[I,B]),z=()=>(M||T(!0),t.permissions&&0!==t.permissions.length?(Array.isArray(t.permissions)||x(new Error('The "permissions" property from the app manifest is invalid')),B(p.createElement(S,{appPermissions:t.permissions,cancel:U,confirm:L}))):L(t.permissions)),F=C("cloud:checkUserLoggedIn"),H=async e=>{e.preventDefault(),e.stopPropagation(),I(!0);const n=await F();if(!n)return I(!1),void B(p.createElement(w,null));if("purchase"!==j||M)z();else try{const e=await y.buildExternalUrl(t.id,t.purchaseType,!1);B(p.createElement(g,{url:e.url,cancel:U,confirm:z}))}catch(a){b(a)}};return p.createElement(s,d,D&&p.createElement(r,{primary:!0,disabled:P,invisible:!n&&!P,minHeight:"x40",onClick:H},P?p.createElement(o,{inheritColor:!0}):p.createElement(p.Fragment,null,D.icon&&p.createElement(i,{name:D.icon}),E(D.label))),G&&p.createElement(s,{color:"Disabled"===G.label?"warning":"hint",display:"flex",alignItems:"center"},p.createElement(i,{size:"x20",name:G.icon,mie:"x4"}),E(G.label)))};n.exportDefault(d(I))}
