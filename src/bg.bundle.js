(()=>{"use strict";let e={sqlStatus:(e,t,a)=>`select duration, user_status_name, date_of_event\nfrom datasource.voxi_operator_status\nwhere operator_name = '${e.split(" ").reduce(((e,t)=>t+" "+e))}'\nand date_of_event BETWEEN '${t}%' AND '${a}%'\nand user_status_name LIKE '%_TaskWork'`,sqlTask:(e,t,a)=>`select answered_csat, call_start_at, task_cnt, call_duration, dialog_start_at, ready, inservice\nfrom datasource.voxi_call_event\nwhere operator_display_name = '${e.split(" ").reduce(((e,t)=>t+" "+e))}'\nand call_start_at BETWEEN '${t}%' AND '${a}%'`,sqlCrm:(e,t,a)=>`select task_status, task_assigned_at, task_completed_at, task_execution_time\nfrom datasource.communication_task_crm2\nwhere operator_name = '${e}'\nAND task_assigned_at BETWEEN '${t}%' AND '${a}%'\nAND task_status = 'completed'`};async function t(t){fetch("https://redash.skyeng.ru/api/query_results",{headers:{"content-type":"application/json;charset=UTF-8","x-csrf-token":`${localStorage.getItem("tokenRedash")}`},referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify({data_source_id:19,parameters:{},query:t,apply_auto_limit:!0,max_age:0}),method:"POST",credentials:"include"}).then((e=>e.json())).then((e=>e.job.id)).then((t=>{let a=setInterval((()=>{fetch(`https://redash.skyeng.ru/api/jobs/${t}`,{headers:{"x-csrf-token":`${localStorage.getItem("tokenRedash")}`},body:null,method:"GET",credentials:"include"}).then((e=>e.json())).then((t=>{t.job.result,null!==t.job.result&&(clearInterval(a),fetch(`https://redash.skyeng.ru/api/query_results/${t.job.result}`,{headers:{"x-csrf-token":`${localStorage.getItem("tokenRedash")}`},referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",credentials:"include"}).then((e=>e.json())).then((t=>{console.log(t),void 0===e.dataRed&&(e.dataRed=t.query_result.data)})))}))}),2e3)}))}chrome.runtime.onMessage.addListener((function(a,s,n){if("2ndMetrics"===a.name){let s={};return console.log("request getting ✅"),async function(e,t){let a;return await fetch("https://datsy.ru/reports/api.php",{headers:{"content-type":"application/json"},body:JSON.stringify({start:`${e}`,end:`${t}`}),method:"POST",credentials:"include"}).then((e=>e.json())).then((e=>a=e)),console.log("return fetch datsy"),chrome.cookies.get({url:"https://redash.skyeng.ru/",name:"csrf_token"},(e=>localStorage.setItem("tokenRedash",`${e.value}`))),a}(a.dataBg.startDate,a.dataBg.endDate).then((e=>(s.datsy=e,s))).then((n=>{t(e.sqlStatus(a.dataBg.userName,a.dataBg.startDate,a.dataBg.endDate)).then((n=>{let r=setInterval((()=>{void 0===e.dataRed?console.log("Waiting 1st job ⏲"):(clearInterval(r),s.redAshVoxi=e.dataRed,e.dataRed=void 0,t(e.sqlTask(a.dataBg.userName,a.dataBg.startDate,a.dataBg.endDate)).then((n=>{let r=setInterval((()=>{void 0===e.dataRed?console.log("Waiting 2nd job ⏲"):(clearInterval(r),s.redAshVoxiTask=e.dataRed,e.dataRed=void 0,t(e.sqlCrm(a.dataBg.userName,a.dataBg.startDate,a.dataBg.endDate)).then((t=>{let a=setInterval((()=>{void 0===e.dataRed?console.log("Waiting 2nd job ⏲"):(clearInterval(a),s.redAshCrm=e.dataRed,e.dataRed=void 0,function(e){chrome.tabs.query({active:!0,currentWindow:!0},(t=>{chrome.tabs.sendMessage(t[0].id,{dataRed:e},(function(e){console.log("Sender request ✅",e.response)}))}))}(s),console.log("sender in content"))}),2e3)})))}),2e3)})))}),2e3)}))})),!0}}))})();