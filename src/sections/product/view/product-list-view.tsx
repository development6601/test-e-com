'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridColDef,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProducts } from 'src/api/product';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import { IProductItem, IProductTableFilters, IProductTableFilterValue } from 'src/types/product';

import ProductTableToolbar from '../product-table-toolbar';
import ProductTableFiltersResult from '../product-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../product-table-row';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const defaultFilters: IProductTableFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function ProductListView() {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const { products, productsLoading, productsError, productsEmpty } = useGetProducts();

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  // Debug logging
  console.log('ProductListView render:', {
    productsLength: products?.length,
    productsLoading,
    productsError: productsError?.message,
    productsEmpty,
    tableDataLength: tableData.length
  });

  useEffect(() => {
    console.log('Products changed:', products?.length);
    if (products && products.length) {
      setTableData(products);
    }
  }, [products]);

  // Fallback data if API fails
  const fallbackProducts: IProductItem[] = [
    {
      id: 'fallback-1',
      sku: 'FALLBACK-001',
      name: 'Sample Product 1',
      code: 'SAMPLE001',
      price: 99.99,
      priceSale: null,
      taxes: 10,
      quantity: 50,
      available: 25,
      totalSold: 100,
      totalRatings: 4.5,
      totalReviews: 50,
      category: 'Sample',
      gender: ['Men'],
      colors: ['#000000'],
      sizes: ['M', 'L', 'XL'],
      inventoryType: 'in stock',
      publish: 'published',
      coverUrl: '/assets/images/mock/m-product/product-1.webp',
      images: ['/assets/images/mock/m-product/product-1.webp'],
      tags: ['Sample'],
      description: 'This is a sample product for testing purposes.',
      subDescription: 'Sample product description.',
      reviews: [],
      ratings: [],
      newLabel: { enabled: false, content: 'NEW' },
      saleLabel: { enabled: false, content: 'SALE' },
      createdAt: new Date(),
    },
    {
      id: 'fallback-2',
      sku: 'FALLBACK-002',
      name: 'Sample Product 2',
      code: 'SAMPLE002',
      price: 149.99,
      priceSale: 129.99,
      taxes: 10,
      quantity: 30,
      available: 15,
      totalSold: 75,
      totalRatings: 4.2,
      totalReviews: 30,
      category: 'Sample',
      gender: ['Women'],
      colors: ['#FF0000'],
      sizes: ['S', 'M', 'L'],
      inventoryType: 'low stock',
      publish: 'published',
      coverUrl: '/assets/images/mock/m-product/product-2.webp',
      images: ['/assets/images/mock/m-product/product-2.webp'],
      tags: ['Sample'],
      description: 'Another sample product for testing.',
      subDescription: 'Another sample product description.',
      reviews: [],
      ratings: [],
      newLabel: { enabled: true, content: 'NEW' },
      saleLabel: { enabled: true, content: 'SALE' },
      createdAt: new Date(),
    }
  ];

  // Use fallback data if API fails and no data is available
  const displayData = tableData.length > 0 ? tableData :
    (productsError && !productsLoading ? fallbackProducts : []);

  const dataFiltered = applyFilter({
    inputData: displayData,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name: string, value: IProductTableFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      enqueueSnackbar('Delete success!');

      setTableData(deleteRow);
    },
    [enqueueSnackbar, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    enqueueSnackbar('Delete success!');

    setTableData(deleteRows);
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );

  const columns: GridColDef[] = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Product',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'createdAt',
      headerName: 'Create at',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'inventoryType',
      headerName: 'Stock',
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: 'publish',
      headerName: 'Publish',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <ProductTableToolbar
        filters={filters}
        onFilters={handleFilters}
        stockOptions={PRODUCT_STOCK_OPTIONS}
        publishOptions={PUBLISH_OPTIONS}
      />

      <GridToolbarQuickFilter />

      <Stack
        spacing={1}
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {!!selectedRowIds.length && (
          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={confirmRows.onTrue}
          >
            Delete ({selectedRowIds.length})
          </Button>
        )}

        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Product
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        {/* Status indicator */}
        {productsError && !productsLoading && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              API connection failed. Showing fallback data for demonstration.
            </Typography>
          </Alert>
        )}

        {productsLoading && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Loading products from API...
            </Typography>
          </Alert>
        )}

        <Card>
          {canReset && (
            <ProductTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <DataGrid
            hideFooterPagination
            rows={dataFiltered}
            columns={columns}
            loading={productsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            checkboxSelection
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectedRowIds(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              setColumnVisibilityModel(newModel);
            }}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: {
                selectedRowIds,
                onDeleteRows: handleDeleteRows,
                onEditRows: () => {
                  console.info('EDIT ROWS', selectedRowIds);
                },
              },
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong>{selectedRowIds.length}</strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
}: {
  inputData: IProductItem[];
  filters: IProductTableFilters;
}) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
