'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CartIcon from '../common/cart-icon';
import { useCheckoutContext } from '../../checkout/context';
import ProductDetailsReview from '../product-details-review';
import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------


const product = {
  "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
  "gender": [
    "Kids"
  ],
  "images": [
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-1.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-2.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-3.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-4.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-5.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-6.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-7.webp",
    "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-8.webp"
  ],
  "reviews": [
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      "name": "Jayvion Simon",
      "postedAt": "2025-08-02T09:52:39+00:00",
      "comment": "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
      "isPurchased": true,
      "rating": 4.2,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-1.webp",
      "helpful": 9911,
      "attachments": []
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      "name": "Lucian Obrien",
      "postedAt": "2025-08-01T08:52:39+00:00",
      "comment": "She eagerly opened the gift, her eyes sparkling with excitement.",
      "isPurchased": true,
      "rating": 3.7,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-2.webp",
      "helpful": 1947,
      "attachments": [
        "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-1.webp"
      ]
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
      "name": "Deja Brady",
      "postedAt": "2025-07-31T07:52:39+00:00",
      "comment": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
      "isPurchased": true,
      "rating": 4.5,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-3.webp",
      "helpful": 9124,
      "attachments": []
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
      "name": "Harrison Stein",
      "postedAt": "2025-07-30T06:52:39+00:00",
      "comment": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
      "isPurchased": false,
      "rating": 3.5,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-4.webp",
      "helpful": 6984,
      "attachments": [
        "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-3.webp",
        "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-4.webp"
      ]
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
      "name": "Reece Chung",
      "postedAt": "2025-07-29T05:52:39+00:00",
      "comment": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
      "isPurchased": false,
      "rating": 0.5,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-5.webp",
      "helpful": 8488,
      "attachments": []
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
      "name": "Lainey Davidson",
      "postedAt": "2025-07-28T04:52:39+00:00",
      "comment": "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
      "isPurchased": true,
      "rating": 3,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-6.webp",
      "helpful": 2034,
      "attachments": [
        "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-6.webp",
        "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-7.webp",
        "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-8.webp"
      ]
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
      "name": "Cristopher Cardenas",
      "postedAt": "2025-07-27T03:52:39+00:00",
      "comment": "The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.",
      "isPurchased": false,
      "rating": 2.5,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-7.webp",
      "helpful": 3364,
      "attachments": []
    },
    {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
      "name": "Melanie Noble",
      "postedAt": "2025-07-26T02:52:39+00:00",
      "comment": "The waves crashed against the shore, creating a soothing symphony of sound.",
      "isPurchased": false,
      "rating": 2.8,
      "avatarUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-8.webp",
      "helpful": 8401,
      "attachments": []
    }
  ],
  "publish": "draft",
  "ratings": [
    {
      "name": "1 Star",
      "starCount": 9911,
      "reviewCount": 1947
    },
    {
      "name": "2 Star",
      "starCount": 1947,
      "reviewCount": 9124
    },
    {
      "name": "3 Star",
      "starCount": 9124,
      "reviewCount": 6984
    },
    {
      "name": "4 Star",
      "starCount": 6984,
      "reviewCount": 8488
    },
    {
      "name": "5 Star",
      "starCount": 8488,
      "reviewCount": 2034
    }
  ],
  "category": "Accessories",
  "available": 0,
  "priceSale": 83.74,
  "taxes": 10,
  "quantity": 80,
  "inventoryType": "out of stock",
  "tags": [
    "Technology",
    "Health and Wellness",
    "Travel",
    "Finance",
    "Education"
  ],
  "code": "38BEE270",
  "description": "\n<h6>Specifications</h6>\n<table>\n  <tbody>\n    <tr>\n      <td>Category</td>\n      <td>Mobile</td>\n    </tr>\n    <tr>\n      <td>Manufacturer</td>\n      <td>Apple</td>\n    </tr>\n    <tr>\n      <td>Warranty</td>\n      <td>12 Months</td>\n    </tr>\n    <tr>\n      <td>Serial number</td>\n      <td>358607726380311</td>\n    </tr>\n    <tr>\n      <td>Ships from</td>\n      <td>United States</td>\n    </tr>\n  </tbody>\n</table>\n\n<h6>Product details</h6>\n<ul>\n  <li>\n    <p>The foam sockliner feels soft and comfortable</p>\n  </li>\n  <li>\n    <p>Pull tab</p>\n  </li>\n  <li>\n    <p>Not intended for use as Personal Protective Equipment</p>\n  </li>\n  <li>\n    <p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p>\n  </li>\n  <li>\n    <p>Style: 921826-109</p>\n  </li>\n  <li>\n    <p>Country/Region of Origin: China</p>\n  </li>\n</ul>\n<h6>Benefits</h6>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li>\n    <p>The foam midsole feels springy and soft.</p>\n  </li>\n  <li>\n    <p>The rubber outsole adds traction and durability.</p>\n  </li>\n</ul>\n<h6>Delivery and returns</h6>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<ul>\n  <li>\n    <p>Standard delivered 4-5 Business Days</p>\n  </li>\n  <li>\n    <p>Express delivered 2-4 Business Days</p>\n  </li>\n</ul>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n",
  "sku": "WW75K5210YW/SV",
  "createdAt": "2025-08-02T09:52:39+00:00",
  "name": "Urban Explorer Sneakers",
  "price": 83.74,
  "coverUrl": "https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-1.webp",
  "colors": [
    "#FF4842",
    "#1890FF"
  ],
  "totalRatings": 4.2,
  "totalSold": 763,
  "totalReviews": 1947,
  "newLabel": {
    "enabled": false,
    "content": "NEW"
  },
  "saleLabel": {
    "enabled": false,
    "content": "SALE"
  },
  "sizes": [
    "6",
    "7",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "13"
  ],
  "subDescription": "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead."
}


type Props = {
  id: string;
};

export default function ProductShopDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const checkout = useCheckoutContext();

  const [currentTab, setCurrentTab] = useState('description');


  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  // const renderError = (
  //   <EmptyContent
  //     filled
  //     title={`${productError?.message}`}
  //     action={
  //       <Button
  //         component={RouterLink}
  //         href={paths.product.root}
  //         startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
  //         sx={{ mt: 3 }}
  //       >
  //         Back to List
  //       </Button>
  //     }
  //     sx={{ py: 10 }}
  //   />
  // );

  const renderProduct = product && (
    <>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          {
            name: 'Shop',
            href: paths.dashboard.product.root,
          },
          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            product={product}
            items={checkout.items}
            onAddCart={checkout.onAddToCart}
            onGotoStep={checkout.onGotoStep}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description',
            },
            {
              value: 'reviews',
              label: `Reviews (${product.reviews.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}

        {currentTab === 'reviews' && (
          <ProductDetailsReview
            ratings={product.ratings}
            reviews={product.reviews} 
            totalRatings={product.totalRatings}
            totalReviews={product.totalReviews}
          />
        )}
      </Card>
    </>
  );

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <CartIcon totalItems={checkout.totalItems} />

      {/* {productLoading && renderSkeleton} */}

      {/* {productError && renderError} */}

      {product && renderProduct}
    </Container>
  );
}
