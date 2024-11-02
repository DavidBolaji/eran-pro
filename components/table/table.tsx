// 'use client'

// import * as React from 'react'
// import { useInView } from 'react-intersection-observer'
// import { ChevronDown, ChevronUp, Filter, MoreHorizontal, Plus, Search, X } from 'lucide-react'
// import Image from 'next/image'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Badge } from '@/components/ui/badge'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { cn } from '@/lib/utils'

// interface Product {
//   id: string
//   name: string
//   category: string
//   price: number
//   stock: number
//   promotion: string | null
//   status: 'active' | 'draft' | 'archived'
//   image: string
// }

// interface ProductTableProps {
//   initialProducts?: Product[]
//   onLoadMore?: () => Promise<Product[]>
//   onSort?: (column: keyof Product, direction: 'asc' | 'desc') => void
//   onSearch?: (query: string) => void
//   onFilter?: (filters: any) => void
// }

// const dummyProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Fresh Chicken Breast',
//     category: 'Chicken',
//     price: 7500,
//     stock: 25,
//     promotion: 'BLACKFRIDAY20%',
//     status: 'active',
//     image: '/placeholder.svg?height=40&width=40'
//   },
//   {
//     id: '2',
//     name: 'Fresh Chicken Wings',
//     category: 'Chicken',
//     price: 7500,
//     stock: 25,
//     promotion: null,
//     status: 'active',
//     image: '/placeholder.svg?height=40&width=40'
//   },
//   {
//     id: '3',
//     name: 'Fresh Chicken Thighs',
//     category: 'Chicken',
//     price: 7500,
//     stock: 25,
//     promotion: 'BLACKFRIDAY20%',
//     status: 'archived',
//     image: '/placeholder.svg?height=40&width=40'
//   },
//   {
//     id: '4',
//     name: 'Fresh Chicken Legs',
//     category: 'Chicken',
//     price: 7500,
//     stock: 25,
//     promotion: null,
//     status: 'draft',
//     image: '/placeholder.svg?height=40&width=40'
//   }
// ]

// export default function Component({
//   initialProducts = [],
//   onLoadMore,
//   onSort,
//   onSearch,
//   onFilter,
// }: ProductTableProps = {}) {
//   const [products, setProducts] = React.useState<Product[]>(initialProducts.length ? initialProducts : dummyProducts)
//   const [sortColumn, setSortColumn] = React.useState<keyof Product | null>(null)
//   const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
//   const [loading, setLoading] = React.useState(false)
//   const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())
//   const [showFilters, setShowFilters] = React.useState(false)
//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

//   const { ref, inView } = useInView({
//     threshold: 0,
//   })

//   // Handle infinite scroll
//   React.useEffect(() => {
//     if (inView && !loading && onLoadMore) {
//       loadMore()
//     }
//   }, [inView])

//   const loadMore = async () => {
//     if (!onLoadMore) return
//     setLoading(true)
//     try {
//       const newProducts = await onLoadMore()
//       setProducts(prev => [...prev, ...newProducts])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSort = (column: keyof Product) => {
//     if (!onSort) return
//     const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
//     setSortColumn(column)
//     setSortDirection(direction)
//     onSort(column, direction)
//   }

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (onSearch) {
//       onSearch(e.target.value)
//     }
//   }

//   const toggleSelectAll = () => {
//     if (selectedItems.size === products.length) {
//       setSelectedItems(new Set())
//     } else {
//       setSelectedItems(new Set(products.map(p => p.id)))
//     }
//   }

//   const toggleSelectItem = (id: string) => {
//     const newSelected = new Set(selectedItems)
//     if (newSelected.has(id)) {
//       newSelected.delete(id)
//     } else {
//       newSelected.add(id)
//     }
//     setSelectedItems(newSelected)
//   }

//   function FilterDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
//     return open ? (
//       <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24">
//         <div className="bg-white rounded-lg shadow-lg w-[300px]">
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="font-semibold">Manage Filters</h2>
//             <Button variant="ghost" size="icon" onClick={onClose}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//           <div className="p-4 space-y-4">
//             <div className="space-y-2">
//               <Label>Categories</Label>
//               <div className="space-y-2">
//                 {['Chicken', 'Turkey', 'Cow', 'Goat'].map((category) => (
//                   <div key={category} className="flex items-center space-x-2">
//                     <Checkbox id={category.toLowerCase()} />
//                     <label htmlFor={category.toLowerCase()}>{category}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="border-t p-4 bg-gray-50/80 rounded-b-lg flex items-center justify-between gap-2">
//             <Button variant="outline" size="sm">Reset</Button>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
//               <Button size="sm">Apply</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : null
//   }

//   return (
//     <div className="w-full">
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold mb-4">Product List</h1>
//         <div className="flex items-center justify-between gap-4">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search for product"
//               className="pl-8"
//               onChange={handleSearch}
//             />
//           </div>
//           <Button variant="outline" onClick={() => setShowFilters(true)} className="gap-2">
//             <Filter className="h-4 w-4" />
//             Filters
//             <Badge variant="secondary" className="ml-1">
//               0
//             </Badge>
//           </Button>
//           <Select>
//             <SelectTrigger className="w-[140px]">
//               <SelectValue placeholder="More Actions" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="delete">Delete Selected</SelectItem>
//               <SelectItem value="archive">Archive Selected</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button className="gap-2">
//             <Plus className="h-4 w-4" />
//             Add Product
//           </Button>
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-12">
//                 <Checkbox
//                   checked={selectedItems.size === products.length}
//                   onCheckedChange={toggleSelectAll}
//                 />
//               </TableHead>
//               <TableHead>Product</TableHead>
//               <TableHead>
//                 <button
//                   onClick={() => handleSort('category')}
//                   className="flex items-center gap-1"
//                 >
//                   Category
//                   {sortColumn === 'category' && (
//                     sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
//                   )}
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button
//                   onClick={() => handleSort('price')}
//                   className="flex items-center gap-1"
//                 >
//                   Price
//                   {sortColumn === 'price' && (
//                     sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
//                   )}
//                 </button>
//               </TableHead>
//               <TableHead>
//                 <button
//                   onClick={() => handleSort('stock')}
//                   className="flex items-center gap-1"
//                 >
//                   Stock
//                   {sortColumn === 'stock' && (
//                     sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
//                   )}
//                 </button>
//               </TableHead>
//               <TableHead>Promotion</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="w-[100px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>
//                   <Checkbox
//                     checked={selectedItems.has(product.id)}
//                     onCheckedChange={() => toggleSelectItem(product.id)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Image
//                       src={product.image}
//                       alt={product.name}
//                       width={40}
//                       height={40}
//                       className="rounded-md object-cover"
//                     />
//                     <span className="font-medium">{product.name}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>₦ {product.price.toLocaleString()}</TableCell>
//                 <TableCell>{product.stock}</TableCell>
//                 <TableCell>
//                   {product.promotion && (
//                     <Badge variant="secondary">{product.promotion}</Badge>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <Badge
//                     variant="outline"
//                     className={cn(
//                       'capitalize',
//                       product.status === 'active' && 'border-green-500 text-green-500',
//                       product.status === 'archived' && 'border-amber-500 text-amber-500',
//                       product.status === 'draft' && 'border-gray-500 text-gray-500'
//                     )}
//                   >
//                     {product.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                         <span className="sr-only">Open menu</span>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>Edit</DropdownMenuItem>
//                       <DropdownMenuItem>Duplicate</DropdownMenuItem>
//                       <DropdownMenuItem>Archive</DropdownMenuItem>
//                       <DropdownMenuItem className="text-destructive">
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

    //   {!isMobile && (
    //     <div className="flex items-center justify-between px-2 py-4 mt-4 border-t">
    //       <Button variant="outline" size="sm" disabled={!products.length}>
    //         Previous
    //       </Button>
    //       <div className="flex items-center gap-2">
    //         {Array.from({ length: 8 }, (_, i) => (
    //           <Button
    //             key={i}
    //             variant={i === 0 ? 'default' : 'outline'}
    //             size="sm"
    //             className="w-8"
    //           >
    //             {i + 1}
    //           </Button>
    //         ))}
    //       </div>
    //       <Button variant="outline" size="sm" disabled={!products.length}>
    //         Next
    //       </Button>
    //     </div>
    //   )}

    //   {isMobile && (
    //     <div ref={ref} className="py-4 text-center text-sm text-muted-foreground">
    //       {loading ? 'Loading more...' : 'Load more'}
    //     </div>
    //   )}
//       <FilterDialog open={showFilters} onClose={() => setShowFilters(false)} />
//     </div>
//   )
// }