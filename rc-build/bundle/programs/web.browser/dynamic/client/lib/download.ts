function module(e,o,n){let t;n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){t=e}},0),n.export({download:()=>a,downloadAs:()=>d,downloadJsonAs:()=>c,downloadCsvAs:()=>l});const a=(e,o)=>{const n=document.createElement("a");n.download=o,n.href=e,n.target="_blank",document.body.appendChild(n),n.click(),document.body.removeChild(n)},d=(e,o)=>{var n;let{data:d}=e,c=t(e,["data"]);const l=new Blob(d,c);if(navigator.msSaveOrOpenBlob)return void navigator.msSaveOrOpenBlob(l);const i=null!==(n=window.webkitURL)&&void 0!==n?n:window.URL,r=i.createObjectURL(l);a(r,o),i.revokeObjectURL(r)},c=(e,o)=>{d({data:[decodeURIComponent(encodeURI(JSON.stringify(e,null,2)))],type:"application/json;charset=utf-8"},"".concat(o,".json"))},l=(e,o)=>{const n=e=>'"'.concat(String(e).replace(/"/g,'""'),'"'),t=e.reduce((e,o)=>"".concat(e+o.map(n).join(";"),"\n"),"");d({data:[decodeURIComponent(encodeURI(t))],type:"text/csv;charset=utf-8",endings:"native"},"".concat(o,".csv"))}}
