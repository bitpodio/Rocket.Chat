function module(r,n,o){let e,i;async function t(r){return new Promise((n,o)=>{const e=new FileReader;e.onload=r=>n(new Uint8Array(r.target.result)),e.onerror=r=>o(r),e.readAsArrayBuffer(r)})}function s(r){return e(r)}function a(r){if(!r["app.json"])throw new Error("No app.json file found in the zip");try{return JSON.parse(i(r["app.json"]))}catch(n){throw new Error("Failed to parse app.json",n)}}function p(r){if(r.permissions){if(!Array.isArray(r.permissions))throw new Error('The "permissions" property from app.json is invalid');return r.permissions}}async function c(r){try{r instanceof File&&(r=await t(r));const n=s(r),o=a(n),e=p(o);return e}catch(n){throw console.error(n),n}}o.export({getPermissionsFromZippedApp:()=>c}),o.link("fflate",{unzipSync(r){e=r},strFromU8(r){i=r}},0)}
