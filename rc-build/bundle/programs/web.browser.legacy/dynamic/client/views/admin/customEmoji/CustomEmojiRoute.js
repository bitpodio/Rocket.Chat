function module(e,t,n){var o,i,u,a,c,l,r,s,m,f,d,k,E,C,h,p,x,g,j,P;function b(){var e=C("emoji-custom"),t=h("context"),n=h("id"),b=E("manage-emoji"),D=p(),_=c((function(){return{text:"",current:0,itemsPerPage:25}})),v=i(_,2),w=v[0],A=v[1],S=c((function(){return["name","asc"]})),y=i(S,2),N=y[0],H=y[1],R=m(w,500),T=R.text,z=R.itemsPerPage,B=R.current,I=m(N,500),J=i(I,2),O=J[0],V=J[1],$=a((function(){var e;return o(o({query:JSON.stringify({name:{$regex:T||"",$options:"i"}}),sort:JSON.stringify((e={},e[O]="asc"===V?1:-1,e))},z&&{count:z}),B&&{offset:B})}),[T,z,B,O,V]),q=x("emoji-custom.all",$),M=q.value,W=q.reload,F=function(t){return function(){e.push({context:"edit",id:t})}},G=function(e){H((function(t){var n=i(t,2),o=n[0],u=n[1];return o===e?[e,"asc"===u?"desc":"asc"]:[e,"asc"]}))},K=l((function(){e.push({context:"new"})}),[e]),L=function(){e.push({})},Q=l((function(){W()}),[W]);return b?u.createElement(f,{flexDirection:"row"},u.createElement(f,{name:"admin-emoji-custom"},u.createElement(f.Header,{title:D("Custom_Emoji")},u.createElement(r,{small:!0,onClick:K,"aria-label":D("New")},u.createElement(s,{name:"plus"}))),u.createElement(f.Content,null,u.createElement(P,{setParams:A,params:w,onHeaderClick:G,data:M,onClick:F,sort:N}))),t&&u.createElement(d,{flexShrink:0},u.createElement(d.Header,null,"edit"===t&&D("Custom_Emoji_Info"),"new"===t&&D("Custom_Emoji_Add"),u.createElement(d.Close,{onClick:L})),"edit"===t&&u.createElement(g,{_id:n,close:L,onChange:Q}),"new"===t&&u.createElement(j,{close:L,onChange:Q}))):u.createElement(k,null)}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},1),n.link("react",{default:function(e){u=e},useMemo:function(e){a=e},useState:function(e){c=e},useCallback:function(e){l=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){r=e},Icon:function(e){s=e}},1),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){m=e}},2),n.link("../../../components/Page",{default:function(e){f=e}},3),n.link("../../../components/VerticalBar",{default:function(e){d=e}},4),n.link("../../../components/NotAuthorizedPage",{default:function(e){k=e}},5),n.link("../../../contexts/AuthorizationContext",{usePermission:function(e){E=e}},6),n.link("../../../contexts/RouterContext",{useRoute:function(e){C=e},useRouteParameter:function(e){h=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){p=e}},8),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){x=e}},9),n.link("./EditCustomEmojiWithData",{default:function(e){g=e}},10),n.link("./AddCustomEmoji",{default:function(e){j=e}},11),n.link("./CustomEmoji",{default:function(e){P=e}},12),n.exportDefault(b)}
