/*

JSON-stat Javascript Utilities Suite v. 2.1.3 (requires JJT 0.10+)
http://json-stat.com
https://github.com/badosa/JSON-stat/tree/master/utils

Copyright 2016 Xavier Badosa (http://xavierbadosa.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied. See the License for the specific language governing
permissions and limitations under the License.

*/

//Polyfills forEach, querySelector, querySelectorAll, toLocaleString (fallback: toFixed, locale ignored)

var JSONstatUtils=function(){"use strict";function e(e,t,n){function r(e){void 0!==t?t.innerHTML=v[e]:window.alert(v[e])}function l(e,t,n){var r={filter:{}};return n.forEach(function(e){"rows"===e.name||"cols"===e.name?r[e.name]=e.value:r.filter[e.name]=e.value}),"rowscols"===t&&e.id.forEach(function(t,n){t!==r.rows&&t!==r.cols?void 0===r.filter[t]&&(r.filter[t]=e.Dimension(n).id[0]):delete r.filter[t]}),r}function a(e,t){var n,r,l={},i=[],a=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach(function(e,t){i.push({id:a[t],len:e.length})}),i.sort(o),n=i[0].id,r=i[1].id}else n=a[0],r=a[1];return e.Dimension(n).length<e.Dimension(r).length&&(n=r+(r=n,"")),a.forEach(function(t){t!==n&&t!==r&&(l[t]=e.Dimension(t).id[0])}),{rows:n,cols:r,filter:l}}function u(e){var t=[],n=[].slice.call(e.querySelectorAll("select, input"));return n.forEach(function(e){t.push({name:e.name,value:e.value})}),t}function c(e,t){var n=function(e,t){return e&&"metric"===e.role&&t.unit&&t.unit.hasOwnProperty("label")?" ("+t.unit.label+")":""};return t.label.capitalize()+n(e,t)}function f(e,t,n){var r,l='<select name="'+t+'">',i=[];if(null!==n[1]){if(r=e.id,i=e.Dimension(),2===r.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var a=e.Dimension(t);if(r=a.id,i=a.Category(),1===r.length)return}return r.forEach(function(e,t){var r=e!==n[0]?"":'selected="selected" ';(null===n[1]||e!==n[1])&&(l+="<option "+r+'value="'+e+'">'+c(a,i[t])+"</option>")}),l+="</select>"}function d(e,t,n,r){var i="",a="",o="",s="",p=n.rows,b=t.Dimension(p),y=b.id,E=n.cols,w=t.Dimension(E),D=w.id,O=t.role&&t.role.metric?t.role.metric[0]:null,C=null!==O?t.Dimension(O):null,N=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},x=n.filter,z=JSON.parse(JSON.stringify(x)),L=[],R="",A="",j=t.source?v.source+": "+t.source:"",J=null!==t.label?'<span class="label">'+t.label.capitalize()+"</span>":"";m&&S.length&&(J='<span class="label">'+S.join(". ")+"</span>"),""!==j&&"."!==j.slice(-1)&&(j+="."),o+="<caption>"+J+"<form>";for(var T in x){var q=t.Dimension(T),F=q.label.capitalize();q.length>1?R+="<p>"+f(t,T,[x[T],null])+" <strong>"+F+"</strong></p>":L.push({label:F,value:c(q,q.Category(0)),name:T,id:q.id[0]})}""!==R&&(R='<fieldset id="filters"><legend>'+v.filters+"</legend>"+R+"</fieldset>"),L.forEach(function(e){A+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'}),""!==A&&(A='<fieldset id="constants"><legend>'+v.constants+"</legend>"+A+"</fieldset>"),o+=A+R+'<fieldset id="rowscols"><legend>'+v.rc+"</legend>"+f(t,"rows",[p,E])+" <a>&#x2194;</a> "+f(t,"cols",[E,p])+"</fieldset></form></caption>",s+="<tbody>";var U=Number.toLocaleString?function(e,t){return null===t?e.toLocaleString(h):e.toLocaleString(h,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};return y.forEach(function(e){z[p]=e;var n=t.Data(z),r=function(e,t){var n,r=E!==O?null===C?null:N(C.Category(z[O])):N(w.Category(t));null!==e.value?(n=U(e.value,r),g&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||v.na,s+="<td>"+n+"</td>"};return null===n?void(s="ERROR"):(s+='<tr><th scope="row">'+c(b,b.Category(e))+"</th>","[object Array]"===Object.prototype.toString.call(n)?n.forEach(function(e,t){r(e,t)}):r(n,0),void(s+="</tr>"))}),"ERROR"===s?v.dataerror:(s+="</tbody>",i+="<thead><tr><th></th>",D.forEach(function(e){i+='<th scope="col">'+c(w,w.Category(e))+"</th>"}),i+="</tr></thead>",""!==j&&(a='<tfoot><tr><td colspan="'+(D.length+1)+'">'+j+"</td></tr></tfoot>"),e.innerHTML='<table class="'+r+'">'+o+i+a+s+"</table>",[].slice.call(e.querySelectorAll("select")).forEach(function(n){n.addEventListener("change",function(n){d(e,t,l(t,n.target.parentElement.getAttribute("id"),u(e)),r)},!1)}),void e.querySelector("a").addEventListener("click",function(){n.cols=p,n.rows=E,d(e,t,n,r)},!1))}if(void 0===e)return void r("urierror");if(void 0===t)return void r("selerror");void 0===n&&(n={});var v=void 0===n.i18n||void 0===n.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:n.i18n.msgs,h=void 0===n.i18n||void 0===n.i18n.locale?"en-US":n.i18n.locale,p=n.dsid||0,g=n.status||!1,b=n.tblclass||"",m=n.nonconst||!1,y=o(e,p);if(null===y||!i(y))return void r("jsonerror");if(m)var S=s(y);return 1===y.length?void r("dimerror"):void d(t,y,a(y,n.preset),b)}function t(e,t){if(void 0===e)return null;void 0===t&&(t={});var n="",r="",l=0,a=t.na||"n/a",s=t.dsid||0,u=t.vlabel||null,c=t.slabel||null,f=t.counter||!1,d=t.tblclass||"",v=t.numclass||"",h=t.valclass||"",p=t.status||!1,g=t.locale||"en-US",b=t.source||"Source",m=o(e,s),y=Number.toLocaleString?function(e){return e.toLocaleString(g)}:function(e){return e},S=f?function(e,t){n+=t?'<tr><td class="'+v+'">'+t+"</td>":'<tr><th class="'+v+'">#</th>',e.forEach(function(e,r){var l=w===r?' class="'+v+" "+h+'"':"",i=null===e?a:y(e);n+=t?"<td"+l+">"+i+"</td>":"<th"+l+">"+i+"</th>"}),n+="</tr>"}:function(e,t){n+="<tr>",e.forEach(function(e,r){var l=w===r?' class="'+v+" "+h+'"':"",i=null===e?a:y(e);n+=t?"<td"+l+">"+i+"</td>":"<th"+l+">"+i+"</th>"}),n+="</tr>"};if(null===m||!i(m))return null;var E=m.toTable({status:p,vlabel:u,slabel:c}),w=E[0].length-1;return E.forEach(function(e,t){S(e,t)}),m.source&&(l=m.length+1,f&&l++,p&&l++,b+=": "+m.source,"."!==b.slice(-1)&&(b+="."),r='<tfoot><td colspan="'+l+'">'+b+"</td></tfoot>"),'<table class="'+d+'"><caption>'+(t.caption||m.label||"")+"</caption>"+r+"<tbody>"+n+"</tbody></table>"}function n(e,t){if(void 0===e)return null;void 0===t&&(t={});var n=t.vlabel||"Value",r=t.slabel||"Status",l=t.type||"array",i=t.label||"",a=[],o=[],s=[],u=[],c={},f={},d=function(e,t){for(var n=1,r=0,l=0;m>l;l++)n*=l>0?t[m-l]:1,r+=n*e[m-l-1];return r},v=function(){var t=e[y][n];s[d(S,o)]=isNaN(t)?null:t};switch(l){case"array":e=function(e){for(var t=e[0],n=e.slice(1),r=[],l=0,i=n.length;i>l;l++){for(var a=0,o=t.length,s={};o>a;a++)s[t[a]]=n[l][a];r.push(s)}return r}(e);break;case"object":e=function(e){for(var t=e.cols.map(function(e){return e.id}),n=e.rows,r=[],l=0,i=n.length;i>l;l++){for(var a=0,o=t.length,s={};o>a;a++)s[t[a]]=n[l].c[a].v;r.push(s)}return r}(e)}var h=e.length;for(var p in e[0])if(p!==n)if(p!==r){a.push(p),c[p]=[];for(var g=0;h>g;g++){var b=e[g][p];-1===c[p].indexOf(b)&&c[p].push(b)}o.push(c[p].length),f[p]={label:p,category:{index:c[p]}}}else v=function(){var t=e[y][n];s[d(S,o)]=isNaN(t)?null:t,u[d(S,o)]=e[y][r]};for(var m=a.length,y=0;h>y;y++){for(var S=[],E=0;m>E;E++){var w=a[E];S.push(c[w].indexOf(e[y][w]))}v()}return{version:"2.0","class":"dataset",label:i,value:s,status:u,dimension:f,id:a,size:o}}function r(e,t){if(void 0===e)return null;void 0===t&&(t={});var n=[],r=t.vlabel||"Value",l=t.slabel||"Status",a=t.status||!1,s=t.na||"n/a",u=t.delimiter||",",c=";"===u?t.decimal||",":t.decimal||".",f=t.dsid||0,d=o(e,f);if(null===d||!i(d))return null;for(var v=d.toTable({vlabel:r,slabel:l,status:a,type:"array"}),h=v[0].indexOf(r),p=1,g=v.length;g>p;p++)null===v[p][h]?v[p][h]=s:"."!==c&&(v[p][h]=(v[p][h]+"").replace(".",c));return v.forEach(function(e){n+=e.join(u)+"\n"}),n}function l(e,t){if(void 0===e)return null;void 0===t&&(t={});var r=null,l=t.delimiter||",",i=t.vlabel,o=";"===l?t.decimal||",":t.decimal||".",s=a(e,l),u=s.length,c=s[0].length;if(void 0!==i){for(;c--;)if(s[0][c]===i){r=c;break}if(null===r)return null}else r=c-1,i=s[0][r];if(","===o)for(c=1;u>c;c++)s[c][r]=+s[c][r].replace(",",".");else for(c=1;u>c;c++)s[c][r]=+s[c][r];return n(s,{vlabel:i,slabel:t.slabel||"Status",type:"array",label:t.label||""})}function i(e){for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n!==e.n?!1:!0}function a(e,t){t=t||",";for(var n,r,l=RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),i=[[]],a=null;a=l.exec(e);)r=a[1],r.length&&r!=t&&i.push([]),n=a[2]?a[2].replace(RegExp('""',"g"),'"'):a[3],i[i.length-1].push(n);return i}function o(e,t){return void 0===e?null:(("string"==typeof e||void 0===e.length)&&(e=JSONstat(e)),0===e.length||"dataset"!==e["class"]&&"collection"!==e["class"]&&"bundle"!==e["class"]?null:"dataset"===e["class"]?e:e.Dataset(t))}function s(e){var t=0,n=e.size.slice(0),r=[];return n.forEach(function(n,l){var i=l-t,a=e.Dimension(i);1===n&&(delete e.__tree__.dimension[e.id[i]],e.size.splice(i,1),e.id.splice(i,1),e.length--,t++,r.push(a.label.capitalize()+": "+a.Category(0).label.capitalize()))}),r}return String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},{tbrowser:e,datalist:t,fromTable:n,fromCSV:l,toCSV:r,version:"2.1.3"}}();
