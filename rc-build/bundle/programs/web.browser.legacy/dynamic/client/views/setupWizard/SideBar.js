function module(e,n,t){var a,i,l,r,o,c,s;function d(e){var n=e.logoSrc,t=void 0===n?"images/logo/logo.svg":n,d=e.currentStep,p=void 0===d?1:d,u=e.steps,f=void 0===u?[]:u,m=o(),x=l("(max-width: 760px)");return r.createElement(a,{is:"aside",className:"SetupWizard__SideBar",flexGrow:0,flexShrink:1,flexBasis:x?"auto":"350px",maxHeight:"sh",display:"flex",flexDirection:"column",flexWrap:"nowrap",style:{overflow:"hidden"}},r.createElement(a,{is:"header",marginBlockStart:x?"x16":"x32",marginBlockEnd:x?"none":"x32",marginInline:"x24",display:"flex",flexDirection:"row",flexWrap:"wrap",alignItems:"center"},r.createElement(c,{src:t,width:"auto",height:"x24",margin:"x4"}),r.createElement(a,{is:"span",margin:"x4",paddingBlock:"x4",paddingInline:"x8",color:"alternative",fontScale:"micro",style:{whiteSpace:"nowrap",textTransform:"uppercase",backgroundColor:"var(--color-dark, #2f343d)",borderRadius:"9999px"}},m("Setup_Wizard"))),!x&&r.createElement(s,null,r.createElement(a,{flexGrow:1,marginBlockEnd:"x16",paddingInline:"x32"},r.createElement(i,{blockEnd:"x16"},r.createElement(a,{is:"h2",fontScale:"h1",color:"default"},m("Setup_Wizard")),r.createElement(a,{is:"p",color:"hint",fontScale:"p1"},m("Setup_Wizard_Info"))),r.createElement(a,{is:"ol"},f.map((function(e){var n=e.step,t=e.title;return(r.createElement(a,{key:n,is:"li",className:["SetupWizard__SideBar-step",n<p&&"SetupWizard__SideBar-step--past"].filter(Boolean).join(" "),"data-number":n,marginBlock:"x32",marginInline:"neg-x8",display:"flex",alignItems:"center",fontScale:"p2",color:(n===p?"primary":n<p&&"default")||"disabled",style:{position:"relative"}},t))}))))))}t.link("@rocket.chat/fuselage",{Box:function(e){a=e},Margins:function(e){i=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){l=e}},1),t.link("react",{default:function(e){r=e}},2),t.link("../../contexts/TranslationContext",{useTranslation:function(e){o=e}},3),t.link("../../components/Logo",{default:function(e){c=e}},4),t.link("./SideBar.css"),t.link("../../components/ScrollableContentWrapper",{default:function(e){s=e}},5),t.exportDefault(d)}
