self.addEventListener("push",(function(t){const{title:i,body:n}=JSON.parse(t.data.text());if(t.data){const e={body:n,icon:"/icon-128x128.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:"2"}};t.waitUntil(self.registration.showNotification(i,e))}})),self.addEventListener("notificationclick",(async t=>{t.notification.close(),t.waitUntil(clients.matchAll({type:"window"}).then((t=>{for(const i of t)if("/"===i.url&&"focus"in i)return i.focus();if(clients.openWindow)return clients.openWindow("/")})))}));