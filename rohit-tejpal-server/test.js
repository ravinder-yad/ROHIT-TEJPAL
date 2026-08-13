import http from 'http';

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Login Response:', res.statusCode, data);
    const cookies = res.headers['set-cookie'];
    if (cookies) {
      console.log('Got cookie:', cookies[0]);
      // Now test profile
      const req2 = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/admin/profile',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookies[0]
        }
      }, (res2) => {
        let data2 = '';
        res2.on('data', chunk => data2 += chunk);
        res2.on('end', () => {
          console.log('Profile Response:', res2.statusCode, data2);
        });
      });
      req2.write(JSON.stringify({ name: 'Rohit Tejpal' }));
      req2.end();
    }
  });
});
req.write(JSON.stringify({ email: 'tejpalrohit4@gmail.com', password: 'password123' }));
req.end();
