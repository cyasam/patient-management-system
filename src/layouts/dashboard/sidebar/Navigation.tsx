import { usePathname } from 'next/navigation';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SideNavItem } from './NavigationItem';
import items from './items';
import { useAuth } from '@/components/auth/AuthProvider';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SideNav = (props: Props) => {
  const { user } = useAuth();
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            p: '12px',
          }}
        >
          <div>
            <Typography color="#666" variant="body2">
              {user.email}
            </Typography>
          </div>
        </Box>
      </Box>
      <Divider />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
          }}
        >
          {items.map((item: any) => {
            const active = item.path ? pathname === item.path : false;

            return (
              <SideNavItem
                active={active}
                disabled={item.disabled}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
