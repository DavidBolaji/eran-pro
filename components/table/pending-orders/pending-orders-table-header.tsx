// PendingOrdersTableHeader.tsx
import React from 'react'
import { TableHead, TableRow } from '@/components/ui/table'
import { PendingOrders } from './types'

interface PendingOrdersTableHeaderProps {
  onSort?: (column: keyof PendingOrders, direction: 'asc' | 'desc') => void
}

export default function PendingOrdersTableHeader({ onSort }: PendingOrdersTableHeaderProps) {
  const handleSort = (column: keyof Product) => {
    // Sort logic
  }

  return (
    <thead>
      <TableRow>
        <TableHead className="pl-6 py-3 black-300 font-bold text-sm">Product name</TableHead>
        <TableHead className='black-300 font-bold text-sm'>Customer</TableHead>
        <TableHead className='black-300 font-bold text-sm'>Phone no</TableHead>
        <TableHead className='black-300 font-bold text-sm'>Order date</TableHead>
      </TableRow>
    </thead>
  )
}