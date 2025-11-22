// File: sw.js
// Service Worker cho ứng dụng học từ vựng

self.addEventListener('install', (event) => {
  // Bỏ qua giai đoạn chờ, kích hoạt ngay lập tức
  self.skipWaiting(); 
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  // Yêu cầu quyền kiểm soát các client (tab trình duyệt) ngay lập tức
  event.waitUntil(self.clients.claim()); 
  console.log('Service Worker activated');
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Khi người dùng bấm vào thông báo, đưa họ về tab ứng dụng
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Tìm tab ứng dụng đang mở để focus
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      // Nếu không có, mở tab mới
      if (clients.openWindow) {
        return clients.openWindow(self.registration.scope);
      }
    })
  );
});
