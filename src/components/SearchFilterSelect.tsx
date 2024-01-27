'use client';

import { searchBySelectItems } from '@/utils/data';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  value: string;
  onSelectedChange: (value: string) => void;
}

export default function SearchFilterSelect({ value, onSelectedChange }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    const value: string = event.target.value;

    onSelectedChange(value);
  };

  return (
    <FormControl sx={{ width: 180, paddingRight: (theme) => theme.spacing(2) }}>
      <InputLabel shrink id="select-label">
        Search by
      </InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label="Search by"
        size="small"
        onChange={handleChange}
      >
        {searchBySelectItems.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
