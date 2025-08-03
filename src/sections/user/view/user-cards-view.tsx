'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _userCards, USER_STATUS_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { Tab, Tabs } from '@mui/material';
import Label from 'src/components/label';
import { useCallback, useState } from 'react';
import { alpha } from '@mui/material/styles';
import UserCardList from '../user-card-list';

// ----------------------------------------------------------------------

console.log('USER_CARDS', _userCards);



export default function UserCardsView() {
  const settings = useSettingsContext();
  const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
  const [filters, setFilters] = useState({ status: 'all' });


  const filteredUsers = _userCards.filter((user) => {
    if (filters.status !== 'all') {
      return user.status === filters.status;
    }
    return true;
  });

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setFilters({ status: newValue });
    },
    []
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Users"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User' },
        ]}

        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs
        value={filters.status}
        onChange={handleFilterStatus}
        sx={{
          px: 2.5,
          mb: 3,
          boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={
                  ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                }
                color={
                  (tab.value === 'active' && 'success') ||
                  (tab.value === 'banned' && 'error') ||
                  'default'
                }
              >
                {['active', 'banned'].includes(tab.value)
                  ? _userCards.filter((user) => user.status === tab.value).length
                  : _userCards.length}
              </Label>
            }
          />
        ))}
      </Tabs>

      <UserCardList users={filteredUsers} />
    </Container>
  );
}
