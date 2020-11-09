import { useContext } from 'react';
import { ShowSnackbarProps, SnackbarContext } from '../providers/SnackbarProvider';

export const useSnackbar = (): ((props: ShowSnackbarProps) => void) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return showSnackbar;
};
