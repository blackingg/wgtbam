import { values } from '@/utils';

export const getAmount = (value: number) => {
   const selectedValue = values.find(item => item.value === value);
   return selectedValue ? selectedValue.amount : null;
}