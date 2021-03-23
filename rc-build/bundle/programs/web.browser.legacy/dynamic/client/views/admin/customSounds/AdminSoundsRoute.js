function module(e,n,t){var o,u,i,a,c,l,r,s,f,d,m,k,C,E,p,x,h,g,S,P;function b(){var e=E("custom-sounds"),n=p("context"),t=p("id"),b=C("manage-sounds"),w=x(),A=c((function(){return{text:"",current:0,itemsPerPage:25}})),_=u(A,2),v=_[0],D=_[1],N=c((function(){return["name","asc"]})),y=u(N,2),T=y[0],H=y[1],R=f(v,500),z=R.text,B=R.itemsPerPage,J=R.current,O=f(T,500),V=u(O,2),$=V[0],j=V[1],q=a((function(){var e;return o(o({query:JSON.stringify({name:{$regex:z||"",$options:"i"}}),sort:JSON.stringify((e={},e[$]="asc"===j?1:-1,e))},B&&{count:B}),J&&{offset:J})}),[z,B,J,$,j]),I=h("custom-sounds.list",q),M=I.value,F=I.reload,G=l((function(n){return function(){e.push({context:"edit",id:n})}}),[e]),K=function(e){H((function(n){var t=u(n,2),o=t[0],i=t[1];return o===e?[e,"asc"===i?"desc":"asc"]:[e,"asc"]}))},L=l((function(){e.push({context:"new"})}),[e]),Q=l((function(){e.push({})}),[e]),U=l((function(){F()}),[F]);return b?i.createElement(d,{flexDirection:"row"},i.createElement(d,{name:"admin-custom-sounds"},i.createElement(d.Header,{title:w("Custom_Sounds")},i.createElement(r,{small:!0,onClick:L,"aria-label":w("New")},i.createElement(s,{name:"plus"}))),i.createElement(d.Content,null,i.createElement(g,{setParams:D,params:v,onHeaderClick:K,data:M,onClick:G,sort:T}))),n&&i.createElement(m,{flexShrink:0},i.createElement(m.Header,null,"edit"===n&&w("Custom_Sound_Edit"),"new"===n&&w("Custom_Sound_Add"),i.createElement(m.Close,{onClick:Q})),"edit"===n&&i.createElement(S,{_id:t,close:Q,onChange:U}),"new"===n&&i.createElement(P,{goToNew:G,close:Q,onChange:U}))):i.createElement(k,null)}t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},1),t.link("react",{default:function(e){i=e},useMemo:function(e){a=e},useState:function(e){c=e},useCallback:function(e){l=e}},0),t.link("@rocket.chat/fuselage",{Button:function(e){r=e},Icon:function(e){s=e}},1),t.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){f=e}},2),t.link("../../../components/Page",{default:function(e){d=e}},3),t.link("../../../components/VerticalBar",{default:function(e){m=e}},4),t.link("../../../components/NotAuthorizedPage",{default:function(e){k=e}},5),t.link("../../../contexts/AuthorizationContext",{usePermission:function(e){C=e}},6),t.link("../../../contexts/RouterContext",{useRoute:function(e){E=e},useRouteParameter:function(e){p=e}},7),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){x=e}},8),t.link("../../../hooks/useEndpointData",{useEndpointData:function(e){h=e}},9),t.link("./AdminSounds",{default:function(e){g=e}},10),t.link("./EditCustomSound",{default:function(e){S=e}},11),t.link("./AddCustomSound",{default:function(e){P=e}},12),t.exportDefault(b)}

