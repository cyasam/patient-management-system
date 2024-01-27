'use client';

import { Avatar, Box, IconButton, Stack, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/components/auth/AuthProvider';

interface Props {
  onNavOpen: () => void;
}

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props: Props) => {
  const { onNavOpen } = props;
  const { user, signout } = useAuth();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: 'sticky',
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'grey.300',
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {!lgUp && (
            <IconButton onClick={onNavOpen}>
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
            }}
            src={user.photoURL}
            onClick={() => signout()}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
