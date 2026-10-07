export interface Ingredient {
  id: number;
  name: string;
  category: '곡물류' | '채소&야채류' | '버섯&해조류' | '구근&과일';
  origin: string;
  iconName?: string;
}

export const DOMESTIC_50_INGREDIENTS: Ingredient[] = [
  // 곡물류 (18가지)
  { id: 1, name: '현미', category: '곡물류', origin: '전남 해남 100%' },
  { id: 2, name: '발아현미', category: '곡물류', origin: '전북 김제 100%' },
  { id: 3, name: '보리', category: '곡물류', origin: '전남 영광 100%' },
  { id: 4, name: '찹쌀', category: '곡물류', origin: '충남 당진 100%' },
  { id: 5, name: '찰보리', category: '곡물류', origin: '경북 영주 100%' },
  { id: 6, name: '흑미', category: '곡물류', origin: '전남 진도 100%' },
  { id: 7, name: '수수', category: '곡물류', origin: '강원 영월 100%' },
  { id: 8, name: '조', category: '곡물류', origin: '충북 제천 100%' },
  { id: 9, name: '기장', category: '곡물류', origin: '경북 봉화 100%' },
  { id: 10, name: '노란콩(백태)', category: '곡물류', origin: '경기 파주 100%' },
  { id: 11, name: '쥐눈이콩(약콩)', category: '곡물류', origin: '강원 정선 100%' },
  { id: 12, name: '팥', category: '곡물류', origin: '충남 청양 100%' },
  { id: 13, name: '녹두', category: '곡물류', origin: '전북 고창 100%' },
  { id: 14, name: '메밀', category: '곡물류', origin: '강원 평창 100%' },
  { id: 15, name: '옥수수', category: '곡물류', origin: '강원 홍천 100%' },
  { id: 16, name: '검은깨(흑임자)', category: '곡물류', origin: '경북 안동 100%' },
  { id: 17, name: '참깨', category: '곡물류', origin: '전남 무안 100%' },
  { id: 18, name: '율무', category: '곡물류', origin: '경기 연천 100%' },

  // 채소 & 야채류 (16가지)
  { id: 19, name: '케일', category: '채소&야채류', origin: '제주 한림 100%' },
  { id: 20, name: '시금치', category: '채소&야채류', origin: '경남 남해 100%' },
  { id: 21, name: '양배추', category: '채소&야채류', origin: '전남 무안 100%' },
  { id: 22, name: '브로콜리', category: '채소&야채류', origin: '제주 애월 100%' },
  { id: 23, name: '당근', category: '채소&야채류', origin: '제주 구좌 100%' },
  { id: 24, name: '단호박', category: '채소&야채류', origin: '충남 청양 100%' },
  { id: 25, name: '솔잎', category: '채소&야채류', origin: '경북 봉화 100%' },
  { id: 26, name: '쑥', category: '채소&야채류', origin: '전남 거문도 100%' },
  { id: 27, name: '무청(시래기)', category: '채소&야채류', origin: '강원 양구 100%' },
  { id: 28, name: '신선초', category: '채소&야채류', origin: '충북 괴산 100%' },
  { id: 29, name: '미나리', category: '채소&야채류', origin: '경북 청도 100%' },
  { id: 30, name: '부추', category: '채소&야채류', origin: '경북 포항 100%' },
  { id: 31, name: '양파', category: '채소&야채류', origin: '전남 창녕 100%' },
  { id: 32, name: '대파', category: '채소&야채류', origin: '전남 진도 100%' },
  { id: 33, name: '파프리카', category: '채소&야채류', origin: '강원 철원 100%' },
  { id: 34, name: '새싹보리', category: '채소&야채류', origin: '전남 영광 100%' },

  // 버섯 & 해조류 (8가지)
  { id: 35, name: '표고버섯', category: '버섯&해조류', origin: '충남 부여 100%' },
  { id: 36, name: '느타리버섯', category: '버섯&해조류', origin: '경기 여주 100%' },
  { id: 37, name: '팽이버섯', category: '버섯&해조류', origin: '경북 청도 100%' },
  { id: 38, name: '다시마', category: '버섯&해조류', origin: '전남 완도 100%' },
  { id: 39, name: '미역', category: '버섯&해조류', origin: '전남 고흥 100%' },
  { id: 40, name: '톳', category: '버섯&해조류', origin: '전남 완도 100%' },
  { id: 41, name: '김', category: '버섯&해조류', origin: '충남 서천 100%' },
  { id: 42, name: '파래', category: '버섯&해조류', origin: '전남 신안 100%' },

  // 구근 & 과일 (8가지)
  { id: 43, name: '고구마', category: '구근&과일', origin: '전남 해남 100%' },
  { id: 44, name: '감자', category: '구근&과일', origin: '강원 평창 100%' },
  { id: 45, name: '우엉', category: '구근&과일', origin: '경북 안동 100%' },
  { id: 46, name: '마', category: '구근&과일', origin: '경북 안동 100%' },
  { id: 47, name: '사과', category: '구근&과일', origin: '경북 청송 100%' },
  { id: 48, name: '배', category: '구근&과일', origin: '전남 나주 100%' },
  { id: 49, name: '유자', category: '구근&과일', origin: '전남 고흥 100%' },
  { id: 50, name: '연근', category: '구근&과일', origin: '대구 달성 100%' },
];

export interface ProductOption {
  id: string;
  name: string;
  subText: string;
  boxCount: number;
  originalPrice: number;
  discountPrice: number;
  popular?: boolean;
  bonusGift: string;
}

export const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: 'single',
    name: '1개월 세트 (30포)',
    subText: '매일 아침 든든한 1달 식사 케어',
    boxCount: 1,
    originalPrice: 45000,
    discountPrice: 32900,
    bonusGift: '친환경 쉐이커 보틀 1개 무료증정',
  },
  {
    id: 'double',
    name: '2개월 실속 세트 (60포)',
    subText: '가장 많이 찾는 베스트 인기 구성 (추가 6,000원 할인)',
    boxCount: 2,
    originalPrice: 90000,
    discountPrice: 59800,
    popular: true,
    bonusGift: '친환경 쉐이커 보틀 + 계량 스쿱 증정',
  },
  {
    id: 'family',
    name: '3개월 대용량 세트 (90포)',
    subText: '온 가족이 함께 즐기는 가성비 최고 세트 (무료배송)',
    boxCount: 3,
    originalPrice: 135000,
    discountPrice: 84000,
    bonusGift: '친환경 쉐이커 보틀 2개 + 계량 스쿱 증정',
  },
];
