(()=>{"use strict";chrome.runtime.onMessage.addListener((function(e,t,o){console.log("BG send data ✅");let n={datsy:e.dataRed.datsy,voxi:e.dataRed.redAshVoxi,voxiTask:e.dataRed.redAshVoxiTask,crm:e.dataRed.redAshCrm};console.group("Data in BG"),console.log("Datsy:",n.datsy),console.log("Voxi:",n.voxi),console.log("VoxiTask:",n.voxiTask),console.groupEnd(),o({response:"ok"}),console.log("Metrics calc in ready"),r.datsy(n.datsy),r.voxi(n.voxi,n.voxiTask),r.crm2(n.crm)}));let e={startDate:null,endDate:null,userName:null},t={visible:!1},o='style="background-color: #7da5b7; width: 97%; font-size: 14px; outline-style: none; border: none; margin-left: auto; margin-right: auto" type="date"',n={buttonHtml:'<button class="mat-menu-trigger mat-button mat-button-base ng-star-inserted" id="closeOpenMet">Metrics ✅</button>',mainWindow:`\n    \t<div style="display: none;grid-template-rows: 22% 22% 22% 40%;width: 140px;height: 100px;gap: 3px;background-color: #2196f3;border: #10abff solid 3px;position: absolute;z-index: 1000;top: 4%;left: 58%;" id="metricsWindow">\n    \t    <input ${o} title="Start Date" id="startDate" />\n    \t    <input ${o} title="End Date" id="endDate" />\n    \t    <input style="background-color: #7da5b7; width: 95%; font-size: 14px; outline-style: none; border: none; margin-left: auto; margin-right: auto" title="Name Family" id="userInfo" />\n    \t    <button style="position: relative; height: 60%; width: 87%; background-color: darkcyan; border: none; border-radius: 5px 5px; margin-left: auto; margin-right: auto; cursor: pointer" title="Submit form" id="submitDate">Get Metrics 💡</button>\n    \t</div>`},a=function(){t.visible?(document.querySelector("#metricsWindow").style.display="none",t.visible=!1):t.visible||(document.querySelector("#metricsWindow").style.display="grid",t.visible=!0)},s=function(){e.startDate=document.querySelector("#startDate").value,e.endDate=document.querySelector("#endDate").value,e.userName=document.querySelector("#userInfo").value,async function(e,t){return console.log("response has already"),chrome.runtime.sendMessage({dataBg:e,name:"2ndMetrics"},(e=>{})),"send in bg is ok ✅"}(e).then((e=>console.log(e)))},r={datsy:t=>{let o={cnt:null,time:null,sla:null},n=[];for(const o in t)t[o].forEach((t=>{t.userName===e.userName&&n.push(t)}));n.forEach((e=>{e.assignEventsCnt?o.cnt=e.assignEventsCnt:e.assignTime?o.time=e.assignTime:e["cnt-assign-in-time-and-late"]&&(o.sla=e["cnt-assign-in-time-and-late"])})),console.group("Datsy"),console.log("Ивенты:",o.cnt),console.log("Скорость Взятия:",o.time),console.log("Взято до минуты:",o.sla),console.groupEnd()},voxi:async(e,t)=>{let o={offered:null,handled:null,failed:null,csat:null,rate:null,occ:null};o.offered=t.rows.length;let n=0;await t.rows.forEach((e=>{null===e.dialog_start_at&&++n})),o.handled=o.offered-n,o.failed=n;let a=[];await t.rows.forEach((e=>{null!==e.answered_csat&&a.push(e.answered_csat)}));try{o.csat=a.reduce(((e,t)=>e+t))/a.length}catch{o.csat="Empty"}let s=[];await t.rows.forEach((e=>{null===e.answered_csat&&e.dialog_start_at&&s.push(e)})),o.rate=(o.handled-s.length)/(o.handled/100);let r=[],l={},i={anyStatusTaskWork:0},c=[],d=[];await t.rows.forEach((e=>c.push(e.inservice))),await t.rows.forEach((e=>d.push(e.ready))),c=await Array.from(new Set(c)).reduce(((e,t)=>Number(e)+Number(t))),d=await Array.from(new Set(d)).reduce(((e,t)=>Number(e)+Number(t))),await e.rows.forEach((e=>r.push(e.user_status_name)));let u=Array.from(new Set(r));await e.rows.forEach((e=>{let t=0;for(;t<=u.length;)e.user_status_name===u[t]&&(l[u[t]]+=`+${e.duration}`),++t}));for(const e in l)i[e]=await l[e].split("undefined")[1].split("+").reduce(((e,t)=>Number(e)+Number(t)));for(const e in i)i.anyStatusTaskWork+=i[e];o.occ=await(i.anyStatusTaskWork+c)/(i.anyStatusTaskWork+c+d),console.group("Voxi"),console.log("Offered:",o.offered),console.log("Handled:",o.handled),console.log("Failed:",o.failed),console.log("Csat:",o.csat),console.log("RRate:",o.rate,"%"),console.log("Occ:",100*o.occ,"%"),console.groupEnd()},crm2:async e=>{let t={};t.compTask=e.rows.length;let o=[];await e.rows.forEach((e=>{o.push(e.task_execution_time)})),t.avgExec=await o.reduce(((e,t)=>e+t))/o.length,console.group("CRM"),console.log("Completed Task:",t.compTask),console.log("AHT:",t.avgExec,"Min"),console.log("AHT 24min: null"),console.log("SLA Ass: null"),console.groupEnd()}};window.addEventListener("load",(()=>{setTimeout((function(){let e=document.querySelector(".crm-spacer");e.insertAdjacentHTML("beforebegin",n.buttonHtml),e.insertAdjacentHTML("beforeend",n.mainWindow),document.querySelector("#closeOpenMet").addEventListener("click",a),document.querySelector("#submitDate").addEventListener("click",s)}),3300)}))})();