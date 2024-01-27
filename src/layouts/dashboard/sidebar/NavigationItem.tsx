import NextLink from 'next/link';
import { Box, ButtonBase } from '@mui/material';

interface Props {
  active: boolean;
  disabled: boolean;
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SideNavItem = (props: Props) => {
  const { active = false, disabled, icon, path, title } = props;

  const linkProps = path
    ? {
        component: NextLink,
        href: path,
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
