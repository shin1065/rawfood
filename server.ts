import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Path to persistent order & user JSON files
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Helper: Ensure data directory and files exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    const initialOrders = [
      {
        orderNumber: 'ORD-20261006-1001',
        customerName: '김민준',
        phone: '010-8921-3410',
        address: '서울특별시 강남구 테헤란로 152, 801호',
        productName: '2개월 실속 세트 (60포)',
        boxCount: 2,
        quantity: 1,
        totalPrice: 59800,
        paymentMethod: '카카오페이',
        bonusGift: '친환경 쉐이커 보틀 + 계량 스쿱 증정',
        status: '배송중',
        trackingNumber: '우체국 609281749102',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        orderNumber: 'ORD-20261006-1002',
        customerName: '이지은',
        phone: '010-3490-1182',
        address: '경기도 성남시 분당구 판교역로 235',
        productName: '1개월 세트 (30포)',
        boxCount: 1,
        quantity: 1,
        totalPrice: 32900,
        paymentMethod: '네이버페이',
        bonusGift: '친환경 쉐이커 보틀 1개 무료증정',
        status: '신규접수',
        trackingNumber: '',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), 'utf-8');
  }

  if (!fs.existsSync(USERS_FILE)) {
    // Seed initial demo user for convenient testing
    const initialUsers = [
      {
        email: 'sungmi@example.com',
        password: 'password123',
        name: '윤성미',
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
  }
}

interface User {
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

function readUsers(): User[] {
  ensureDataFile();
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveUsers(users: User[]): void {
  ensureDataFile();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users file:', err);
  }
}

interface Order {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  productName: string;
  boxCount: number;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  bonusGift: string;
  status: '신규접수' | '배송준비' | '배송중' | '배송완료' | '주문취소';
  trackingNumber?: string;
  createdAt: string;
  memo?: string;
}

function readOrders(): Order[] {
  ensureDataFile();
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

function saveOrders(orders: Order[]): void {
  ensureDataFile();
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders file:', err);
  }
}

// REST API Endpoints

// Authentication API: Sign Up
app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: '성함을 입력해 주세요.' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: '올바른 이메일 주소를 입력해 주세요. (예: name@example.com)' });
  }

  if (!password || password.trim().length < 6) {
    return res.status(400).json({ success: false, message: '비밀번호가 너무 짧습니다. 6자 이상으로 입력해 주세요.' });
  }

  const users = readUsers();
  const trimmedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
    return res.status(400).json({ success: false, message: '이미 가입된 이메일 주소입니다. 로그인해 주세요.' });
  }

  const newUser: User = {
    email: trimmedEmail,
    password: password.trim(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return res.status(201).json({
    success: true,
    message: '회원가입이 완료되었습니다!',
    user: { email: newUser.email, name: newUser.name },
  });
});

// Authentication API: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, message: '이메일을 입력해 주세요.' });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({ success: false, message: '비밀번호를 입력해 주세요.' });
  }

  if (password.trim().length < 6) {
    return res.status(400).json({ success: false, message: '비밀번호가 너무 짧습니다. 6자 이상으로 입력해 주세요.' });
  }

  const users = readUsers();
  const trimmedEmail = email.trim().toLowerCase();
  const foundUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (!foundUser) {
    return res.status(400).json({ success: false, message: '가입되지 않은 이메일 주소입니다. 먼저 회원가입을 해주세요.' });
  }

  if (foundUser.password !== password.trim()) {
    return res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다. 입력하신 비밀번호를 다시 확인해 주세요.' });
  }

  return res.json({
    success: true,
    message: '로그인되었습니다.',
    user: { email: foundUser.email, name: foundUser.name },
  });
});

// 1. Submit New Real Order
app.post('/api/orders', (req: Request, res: Response) => {
  const {
    customerName,
    phone,
    address,
    productName,
    boxCount = 1,
    quantity = 1,
    totalPrice,
    paymentMethod,
    bonusGift = '친환경 쉐이커 보틀 증정',
    memo = '',
  } = req.body;

  if (!customerName || !phone || !address || !totalPrice) {
    return res.status(400).json({ error: '필수 주문 정보가 누락되었습니다.' });
  }

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `ORD-${dateStr}-${randomSuffix}`;

  const newOrder: Order = {
    orderNumber,
    customerName: customerName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    productName: productName || '국내산 50 곡물채소 생식',
    boxCount: Number(boxCount) || 1,
    quantity: Number(quantity) || 1,
    totalPrice: Number(totalPrice),
    paymentMethod: paymentMethod || '신용카드',
    bonusGift,
    status: '신규접수',
    trackingNumber: '',
    createdAt: new Date().toISOString(),
    memo: memo.trim(),
  };

  const orders = readOrders();
  orders.unshift(newOrder); // newest first
  saveOrders(orders);

  console.log(`[REAL ORDER PLACED] ${orderNumber} - ${customerName} (${totalPrice}원)`);

  return res.status(201).json({
    success: true,
    message: '주문이 성공적으로 접수되었습니다.',
    order: newOrder,
  });
});

// 2. Get All Orders (Admin Dashboard)
app.get('/api/orders', (req: Request, res: Response) => {
  const orders = readOrders();
  const { search, status } = req.query;

  let filtered = orders;

  if (status && typeof status === 'string' && status !== '전체') {
    filtered = filtered.filter((o) => o.status === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.address.toLowerCase().includes(q)
    );
  }

  return res.json({
    success: true,
    totalCount: orders.length,
    filteredCount: filtered.length,
    orders: filtered,
  });
});

// 3. Lookup Specific Order by Order Number or Phone Number
app.get('/api/orders/lookup', (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: '조회할 주문번호 또는 전화번호를 입력하세요.' });
  }

  const orders = readOrders();
  const q = query.trim().toLowerCase();

  const found = orders.filter(
    (o) => o.orderNumber.toLowerCase() === q || o.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''))
  );

  return res.json({
    success: true,
    orders: found,
  });
});

// 4. Update Order Status / Tracking Number (Admin Action)
app.patch('/api/orders/:orderNumber', (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  const { status, trackingNumber, memo } = req.body;

  const orders = readOrders();
  const index = orders.findIndex((o) => o.orderNumber === orderNumber);

  if (index === -1) {
    return res.status(404).json({ error: '해당 주문을 찾을 수 없습니다.' });
  }

  if (status) orders[index].status = status;
  if (trackingNumber !== undefined) orders[index].trackingNumber = trackingNumber;
  if (memo !== undefined) orders[index].memo = memo;

  saveOrders(orders);

  return res.json({
    success: true,
    message: '주문 상태가 업데이트되었습니다.',
    order: orders[index],
  });
});

// 5. Delete Order (Admin Action)
app.delete('/api/orders/:orderNumber', (req: Request, res: Response) => {
  const { orderNumber } = req.params;
  let orders = readOrders();
  const initialLength = orders.length;

  orders = orders.filter((o) => o.orderNumber !== orderNumber);

  if (orders.length === initialLength) {
    return res.status(404).json({ error: '삭제할 주문이 존재하지 않습니다.' });
  }

  saveOrders(orders);

  return res.json({
    success: true,
    message: '주문이 삭제되었습니다.',
  });
});

// 6. Get Admin Dashboard Summary Stats
app.get('/api/stats', (req: Request, res: Response) => {
  const orders = readOrders();

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== '주문취소')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const newOrdersCount = orders.filter((o) => o.status === '신규접수').length;
  const preparingCount = orders.filter((o) => o.status === '배송준비').length;
  const shippingCount = orders.filter((o) => o.status === '배송중').length;
  const completedCount = orders.filter((o) => o.status === '배송완료').length;

  return res.json({
    totalOrders,
    totalRevenue,
    newOrdersCount,
    preparingCount,
    shippingCount,
    completedCount,
  });
});

// Setup Vite Dev Server / Static Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Full-Stack Server] running at http://localhost:${PORT}`);
  });
}

startServer();
