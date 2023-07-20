import { useAppSelector } from "./redux-hooks";

export const useAuth = () => useAppSelector((s) => s.user);
