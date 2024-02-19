'use client'

import React from 'react'
import Link from 'next/link'

import { T_LINKTEXTPROPS } from '@/src/types.ts/types'
import { Button } from '@/src/components/ui/button'

export const LinkButton: React.FC<T_LINKTEXTPROPS> = ({ href, label }) => {
  return (
    <Button variant="link" className='w-full' size="sm" >
      {href && <Link href={href}>{label}</Link>}
      {!href && <span>{label} (disabled)</span>}
    </Button>
  );
};


