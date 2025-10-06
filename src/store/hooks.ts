import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// RTK Query auth hooks
export { 
	useLoginMutation,
	useRegisterMutation,
	useForgotPasswordMutation,
	useGetUserQuery,
	useLogoutMutation,
	useGetDashboardQuery
} from './api';
