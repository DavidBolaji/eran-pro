self.addEventListener("push",(async n=>{const{message:i,body:t,icon:e}=JSON.parse(n.data.text());n.waitUntil(self.registration.showNotification(i,{body:t,icon:e}))})),self.addEventListener("notificationclick",(async n=>{n.notification.close(),n.waitUntil(clients.matchAll({type:"window"}).then((n=>{for(const i of n)if("/"===i.url&&"focus"in i)return i.focus();if(clients.openWindow)return clients.openWindow("/")})))}));