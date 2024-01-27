import { Card, CardContent, Stack, Typography } from '@mui/material';

interface Props {
  value: string;
  title: string;
  sx: object;
}

export const OverviewBox = (props: Props) => {
  const { sx, value, title } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
