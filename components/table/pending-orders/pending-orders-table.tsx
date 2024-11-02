// ProductTable.tsx
'use client'

import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PendingOrdersTableHeader from './pending-orders-table-header'

import { dummyPendingOrders } from './pending-orders-data'
import { PendingOrders, PendingOrdersTableProps } from './types'
import PendingordersTableRow from './pending-orders-table-row'
import { Typography } from '@/components/typography/typography'
import { Table } from '@/components/ui/table'

export default function PendingOrdersTable({
  initialProducts = [],
  onLoadMore,
  onSort,
  onSearch,
  onFilter,
}: PendingOrdersTableProps) {
  const [products, setProducts] = React.useState<PendingOrders[]>(initialProducts.length ? initialProducts : dummyPendingOrders)
  const [showFilters, setShowFilters] = React.useState(false)

  const { ref, inView } = useInView({ threshold: 0 })

  // Infinite Scroll Hook
  React.useEffect(() => {
    if (inView && onLoadMore) {
      loadMore()
    }
  }, [inView])

  const loadMore = async () => {
    if (!onLoadMore) return
    const newProducts = await onLoadMore()
    setProducts((prev) => [...prev, ...newProducts])
  }

  return (
    <div className="w-full bg-white rounded-2xl">
      <div className="mb-6 flex items-center justify-between pt-5 px-6">
        <Typography size='h5' as="h5" align='left'>
            Pending Orders
        </Typography>
        <Button variant="default" className='rounded-full'>
          Create New Order
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="border">
        <Table className=''>
          <PendingOrdersTableHeader onSort={onSort} />
          <tbody>
            {products.map((product) => (
              <PendingordersTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </Table>
      </div>

      {/* <FilterDialog open={showFilters} onClose={() => setShowFilters(false)} />
      <Pagination ref={ref} /> */}
    </div>
  )
}