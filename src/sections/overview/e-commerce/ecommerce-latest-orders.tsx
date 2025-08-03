import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';

import Scrollbar from 'src/components/scrollbar';
import { ColorPreview } from 'src/components/color-utils';
import { Typography } from '@mui/material';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  orderNumber: string;
  createdAt: Date;
  taxes: number;
  items: any[];
  history: any[];
  subTotal: number;
  shipping: number;
  discount: number;
  customer: any;
  delivery: any;
  totalAmount: number;
  totalQuantity: number;
  shippingAddress: {
    fullAddress: string;
    phoneNumber: string;
  },
  payment: {
    cardType: string;
    cardNumber: string;
  },
  status: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function EcommerceLatestOrders({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar> 
        <Stack spacing={3} sx={{ p: 3, minWidth: 360 }}>
          {list.map((product) => (
            <ProductItem key={product.id} order={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProductItemProps = {
  order: ItemProps;
};

function ProductItem({ order }: ProductItemProps) {
  const { orderNumber, createdAt, totalAmount, totalQuantity, status } = order;

  return (
    <Stack direction="row" spacing={2}>
      {/* <Avatar
        variant="rounded"
        alt={orderNumber}
        src={coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      /> */}

      <ListItemText
        primary={<Stack direction="row" justifyContent="space-between"><span>Order number: <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{orderNumber}</Link></span> <Label variant="soft" color={(status === 'completed' && 'success') || (status === 'pending' && 'warning') || (status === 'cancelled' && 'error') || 'default'}>{status}</Label> </Stack>}
        secondary={<Stack direction="row" justifyContent="space-between">
          <Box component="span" >{totalQuantity} items</Box>
          <Box component="span" >{new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Box>
          <Box component="span" >{fCurrency(totalAmount)}</Box>
        </Stack>
        }
        primaryTypographyProps={{
          noWrap: true,
        }}
        secondaryTypographyProps={{
          mt: 0.5,
        }}
      />

    </Stack>
  );
}
