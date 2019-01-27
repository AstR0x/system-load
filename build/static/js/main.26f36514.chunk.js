(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,a){e.exports=a(78)},31:function(e,t,a){},76:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(24),r=a.n(o),s=(a(31),a(10)),l=a(11),c=a(13),u=a(12),m=a(14),d=function(e){function t(e){var a;Object(s.a)(this,t);var n=(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).getData();return a.state={CPU:n.CPU,totalM:n.TotalMemory,freeM:n.FreeMemory,oneMin:n.oneMinute,fiveMin:n.fiveMinutes,fifteenMin:n.fifteenMinutes},a.changeData(),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"changeData",value:function(){var e=this;setInterval(function(){e.data=e.getData(),e.setState({CPU:e.data.CPU,totalM:e.data.TotalMemory,freeM:e.data.FreeMemory,oneMin:e.data.oneMinute,fiveMin:e.data.fiveMinutes,fifteenMin:e.data.fifteenMinutes})},2e3)}},{key:"getData",value:function(){var e=new XMLHttpRequest;if(e.open("GET","http://77.246.159.121/core/data.php",!1),e.send(),200==e.status)return JSON.parse(e.responseText);console.log(e.status)}},{key:"render",value:function(){return i.a.createElement("table",{className:"system-load-table"},i.a.createElement("tbody",null,i.a.createElement("tr",{className:"first_row"},i.a.createElement("th",null,"CPU"),i.a.createElement("th",null,"Total memory"),i.a.createElement("th",null,"Free memory"),i.a.createElement("th",null,"1 minute"),i.a.createElement("th",null,"5 minutes"),i.a.createElement("th",null,"15 minutes")),i.a.createElement("tr",{className:"second-row"},i.a.createElement("th",null,this.state.CPU,"%"),i.a.createElement("th",null,this.state.totalM.toFixed(2)+" \u041c\u0411"),i.a.createElement("th",null,this.state.freeM.toFixed(2)+" \u041c\u0411"),i.a.createElement("th",null,this.state.oneMin),i.a.createElement("th",null,this.state.fiveMin),i.a.createElement("th",null,this.state.fifteenMin))))}}]),t}(i.a.Component),h=a(15),f=a.n(h),b=function(e){function t(e){var a;Object(s.a)(this,t);var n=(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).getData();return a.state={cpuData:[n.CPU],memoryData:[n.FreeMemory],timeData:[(new Date).toLocaleTimeString()],oneMinuteData:[n.oneMinute],fiveMinutesData:[n.fiveMinutes],fifteenMinutesData:[n.fifteenMinutes],data:n},a.changeCharts(),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("cpuChart").getContext("2d"),t=document.getElementById("memoryChart").getContext("2d"),a=document.getElementById("loadAverageChart").getContext("2d");this.cpuChart=new f.a(e,{type:"line",data:{labels:this.state.timeData,datasets:[{label:"CPU",backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgb(255, 99, 132)",data:this.state.cpuData}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{xAxes:[{gridLines:{color:"rgba(171,171,171,1)",lineWidth:.5},ticks:{fontColor:"white",fontSize:12}}],yAxes:[{gridLines:{color:"rgba(171,171,171,1)",lineWidth:.5},ticks:{fontColor:"white",fontSize:12,min:0,max:100,stepSize:20},scaleLabel:{display:!0,labelString:"PERCENTAGES",fontColor:"#c0c0c0"}}]}}}),this.memoryChart=new f.a(t,{type:"line",data:{labels:this.state.timeData,datasets:[{label:"Free memory",backgroundColor:"rgba(16, 115, 181, 0.2)",borderColor:"rgb(16, 115, 181)",data:this.state.memoryData}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{xAxes:[{ticks:{fontColor:"white",fontSize:12},gridLines:{color:"rgba(171,171,171,1)",lineWidth:.5}}],yAxes:[{gridLines:{color:"rgba(171,171,171,1)",lineWidth:.5},ticks:{fontColor:"white",fontSize:12,min:0,max:this.state.data.TotalMemory,stepSize:this.state.data.TotalMemory/4},scaleLabel:{display:!0,labelString:"MEGABYTES",fontColor:"#c0c0c0"}}]}}}),this.loadAverageChart=new f.a(a,{type:"line",data:{labels:this.state.timeData,datasets:[{label:"1 minute",backgroundColor:"rgba(255, 99, 132, 0.05)",borderColor:"rgb(255, 99, 132)",data:this.state.oneMinuteData},{label:"5 minutes",backgroundColor:"rgba(65, 99, 222, 0.05)",borderColor:"rgb(65, 99, 222)",data:this.state.fiveMinutesData},{label:"15 minutes",backgroundColor:"rgba(145, 44, 132, 0.05)",borderColor:"rgb(145, 44, 132)",data:this.state.fifteenMinutesData}]},options:{legend:{labels:{fontColor:"white",fontSize:18}},scales:{xAxes:[{ticks:{fontColor:"white",fontSize:12},gridLines:{color:"rgba(171,171,171,1)",lineWidth:.5}}],yAxes:[{gridLines:{color:"rgba(171,171,171,1)",lineWidth:.5},ticks:{fontColor:"white",fontSize:12,min:0,stepSize:.5}}]}}})}},{key:"getData",value:function(){var e=new XMLHttpRequest;if(e.open("GET","http://77.246.159.121/core/data.php",!1),e.send(),200==e.status)return JSON.parse(e.responseText);console.log(e.status)}},{key:"changeCharts",value:function(){var e=this;setInterval(function(){e.data=e.getData(),e.state.timeData.length>=10&&(e.state.timeData.shift(),e.state.cpuData.shift(),e.state.memoryData.shift(),e.state.oneMinuteData.shift(),e.state.fiveMinutesData.shift(),e.state.fifteenMinutesData.shift()),e.state.cpuData.push(e.data.CPU/1),e.state.memoryData.push(e.data.FreeMemory.toFixed(2)),e.state.timeData.push((new Date).toLocaleTimeString()),e.state.oneMinuteData.push(e.data.oneMinute),e.state.fiveMinutesData.push(e.data.fiveMinutes),e.state.fifteenMinutesData.push(e.data.fifteenMinutes),e.loadAverageChart.update(),e.cpuChart.update(),e.memoryChart.update()},2e3)}},{key:"render",value:function(){return i.a.createElement("div",{className:"canvas-block"},i.a.createElement("div",{className:"cpu-and-memory-charts"},i.a.createElement("div",{className:"canvasCpu-block"},i.a.createElement("canvas",{id:"cpuChart"})),i.a.createElement("div",{className:"canvasMemory-block"},i.a.createElement("canvas",{id:"memoryChart"}))),i.a.createElement("div",{className:"loadAver"},i.a.createElement("canvas",{id:"loadAverageChart"})))}}]),t}(i.a.Component);a(76);var g=function(){return[i.a.createElement(d,null),i.a.createElement(b,null)]};r.a.render(i.a.createElement(g,null),document.getElementById("root"))}},[[25,2,1]]]);
//# sourceMappingURL=main.26f36514.chunk.js.map