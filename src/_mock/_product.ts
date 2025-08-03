// ----------------------------------------------------------------------

import { _mock } from "./_mock";

export const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'violet', label: 'Violet' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
];

export const PRODUCT_SIZE_OPTIONS = [
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '8.5', label: '8.5' },
  { value: '9', label: '9' },
  { value: '9.5', label: '9.5' },
  { value: '10', label: '10' },
  { value: '10.5', label: '10.5' },
  { value: '11', label: '11' },
  { value: '11.5', label: '11.5' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
];

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];

export const PRODUCT_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  {
    group: 'Clothing',
    classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'],
  },
  {
    group: 'Tailored',
    classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'],
  },
  {
    group: 'Accessories',
    classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'],
  },
];

export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

// ----------------------------------------------------------------------

export const _productReviews = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  rating: _mock.number.rating(index),
  comment: _mock.sentence(index),
  helpful: _mock.number.nativeL(index),
  avatarUrl: _mock.image.avatar(index),
  isPurchased: _mock.boolean(index),
  attachments: index % 2 ? [_mock.image.product(index)] : [],
  postedAt: _mock.time(index),
}));

export const _productRatings = [...Array(5)].map((_, index) => ({
  name: `${index + 1} Star`,
  starCount: _mock.number.nativeL(index),
  reviewCount: _mock.number.nativeM(index),
}));

export const _productList = [...Array(24)].map((_, index) => {
  const setIndex = index % 12;

  const colors = (setIndex === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (setIndex === 1 && ['#92140C', '#FFCF99']) ||
    (setIndex === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (setIndex === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  const gender = (setIndex === 0 && ['Men']) ||
    (setIndex === 1 && ['Women']) ||
    (setIndex === 2 && ['Kids']) ||
    (setIndex === 3 && ['Women', 'Kids']) ||
    (setIndex === 4 && ['Men', 'Women']) || ['Men', 'Women', 'Kids'];

  const category = (setIndex === 0 && 'Shose') ||
    (setIndex === 1 && 'Apparel') ||
    (setIndex === 2 && 'Accessories') ||
    (setIndex === 3 && 'Shose') ||
    (setIndex === 4 && 'Apparel') || 'Accessories';

  const inventoryType = (setIndex === 0 && 'in stock') ||
    (setIndex === 1 && 'low stock') ||
    (setIndex === 2 && 'out of stock') ||
    (setIndex === 3 && 'in stock') ||
    (setIndex === 4 && 'low stock') || 'out of stock';

  const publish = (setIndex === 0 && 'published') ||
    (setIndex === 1 && 'draft') ||
    (setIndex === 2 && 'published') ||
    (setIndex === 3 && 'draft') ||
    (setIndex === 4 && 'published') || 'draft';

  const available = (setIndex === 0 && 72) ||
    (setIndex === 1 && 10) ||
    (setIndex === 2 && 0) ||
    (setIndex === 3 && 72) ||
    (setIndex === 4 && 10) || 0;

  const priceSale = setIndex % 2 ? _mock.number.price(setIndex) : null;

  const newLabel = {
    enabled: setIndex % 3 === 0,
    content: 'NEW',
  };

  const saleLabel = {
    enabled: setIndex % 4 === 0,
    content: 'SALE',
  };

  return {
    id: _mock.id(index),
    sku: `WW75K52${index}YW/SV`,
    code: `38BEE27${index}`,
    name: _mock.productName(index),
    description: _mock.description(index),
    subDescription: _mock.sentence(index),
    price: _mock.number.price(index),
    priceSale,
    taxes: 10,
    quantity: 80,
    available,
    totalSold: _mock.number.nativeL(index),
    totalRatings: _mock.number.rating(index),
    totalReviews: _mock.number.nativeM(index),
    category,
    gender,
    colors,
    sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    inventoryType,
    publish,
    coverUrl: _mock.image.product(index),
    images: [
      _mock.image.product(index),
      _mock.image.product(index + 1),
      _mock.image.product(index + 2),
      _mock.image.product(index + 3),
      _mock.image.product(index + 4),
      _mock.image.product(index + 5),
      _mock.image.product(index + 6),
      _mock.image.product(index + 7),
    ],
    tags: ['Technology', 'Health and Wellness', 'Travel', 'Finance', 'Education'],
    reviews: _productReviews,
    ratings: _productRatings,
    newLabel,
    saleLabel,
    createdAt: _mock.time(index),
  };
});

export const _productBestSeller = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    colors,
    name: _mock.productName(index),
    price: _mock.number.price(index),
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _productNew = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    colors,
    name: _mock.productName(index),
    price: _mock.number.price(index),
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _productLatest = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    colors,
    name: _mock.productName(index),
    price: _mock.number.price(index),
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _productFeatured = [...Array(5)].map((_, index) => {
  const colors = (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  return {
    id: _mock.id(index),
    colors,
    name: _mock.productName(index),
    price: _mock.number.price(index),
    coverUrl: _mock.image.product(index),
    priceSale: [1, 3].includes(index) ? _mock.number.price(index) : 0,
  };
});

export const _productSearch = [...Array(24)].map((_, index) => {
  const setIndex = index % 12;

  const colors = (setIndex === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (setIndex === 1 && ['#92140C', '#FFCF99']) ||
    (setIndex === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (setIndex === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'];

  const gender = (setIndex === 0 && ['Men']) ||
    (setIndex === 1 && ['Women']) ||
    (setIndex === 2 && ['Kids']) ||
    (setIndex === 3 && ['Women', 'Kids']) ||
    (setIndex === 4 && ['Men', 'Women']) || ['Men', 'Women', 'Kids'];

  const category = (setIndex === 0 && 'Shose') ||
    (setIndex === 1 && 'Apparel') ||
    (setIndex === 2 && 'Accessories') ||
    (setIndex === 3 && 'Shose') ||
    (setIndex === 4 && 'Apparel') || 'Accessories';

  const inventoryType = (setIndex === 0 && 'in stock') ||
    (setIndex === 1 && 'low stock') ||
    (setIndex === 2 && 'out of stock') ||
    (setIndex === 3 && 'in stock') ||
    (setIndex === 4 && 'low stock') || 'out of stock';

  const publish = (setIndex === 0 && 'published') ||
    (setIndex === 1 && 'draft') ||
    (setIndex === 2 && 'published') ||
    (setIndex === 3 && 'draft') ||
    (setIndex === 4 && 'published') || 'draft';

  const available = (setIndex === 0 && 72) ||
    (setIndex === 1 && 10) ||
    (setIndex === 2 && 0) ||
    (setIndex === 3 && 72) ||
    (setIndex === 4 && 10) || 0;

  const priceSale = setIndex % 2 ? _mock.number.price(setIndex) : null;

  const newLabel = {
    enabled: setIndex % 3 === 0,
    content: 'NEW',
  };

  const saleLabel = {
    enabled: setIndex % 4 === 0,
    content: 'SALE',
  };

  return {
    id: _mock.id(index),
    sku: `WW75K52${index}YW/SV`,
    code: `38BEE27${index}`,
    name: _mock.productName(index),
    description: _mock.description(index),
    subDescription: _mock.sentence(index),
    price: _mock.number.price(index),
    priceSale,
    taxes: 10,
    quantity: 80,
    available,
    totalSold: _mock.number.nativeL(index),
    totalRatings: _mock.number.rating(index),
    totalReviews: _mock.number.nativeM(index),
    category,
    gender,
    colors,
    sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    inventoryType,
    publish,
    coverUrl: _mock.image.product(index),
    images: [
      _mock.image.product(index),
      _mock.image.product(index + 1),
      _mock.image.product(index + 2),
      _mock.image.product(index + 3),
      _mock.image.product(index + 4),
      _mock.image.product(index + 5),
      _mock.image.product(index + 6),
      _mock.image.product(index + 7),
    ],
    tags: ['Technology', 'Health and Wellness', 'Travel', 'Finance', 'Education'],
    reviews: _productReviews,
    ratings: _productRatings,
    newLabel,
    saleLabel,
    createdAt: _mock.time(index),
  };
});
