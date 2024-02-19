import { T_LAYOUTPROPS } from '@/src/types.ts/types';
import React from 'react'

const AuthLayout: React.FC<T_LAYOUTPROPS> = ({children}) => {
    return <main className="h-full flex-c-center">{children}</main>;
};

export default AuthLayout
