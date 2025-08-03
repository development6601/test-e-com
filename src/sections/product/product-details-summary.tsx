import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import { IProductItem } from 'src/types/product';
import { ICheckoutItem } from 'src/types/checkout';

import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------
const product =  {
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
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: ICheckoutItem) => void;
};

export default function ProductDetailsSummary({
  items,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const router = useRouter();

  const {
    id,
    name,
    sizes,
    price,
    coverUrl,
    colors,
    newLabel,
    available,
    priceSale,
    saleLabel,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          colors: [values.colors],
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      // router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        colors: [values.colors],
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {priceSale && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(price)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color
      </Typography>

      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color as string)}
            limit={4}
          />
        )}
      />
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <RHFSelect
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="textPrimary">
            Size Chart
          </Link>
        }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: {
            mx: 0,
            mt: 1,
            textAlign: 'right',
          },
        }}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Cancel
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        Save
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Stack>
  );

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
      {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Typography variant="h5">{name}</Typography>

          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {renderColorOptions} */}

        {renderSizeOptions}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {/* {renderShare} */}
      </Stack>
    </FormProvider>
  );
}
