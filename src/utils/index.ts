import { format, intervalToDuration, parseISO } from 'date-fns';

export const mainPageTitle = 'Patient Management System';

export function calculateAge(birthDate: string) {
  const bd = parseISO(birthDate);
  const { years } = intervalToDuration({ start: bd, end: new Date() });

  return years;
}

export function formatBirthDate(birthDate: string) {
  return format(new Date(birthDate), 'dd.MM.yyyy');
}

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy - HH:mm');
};
