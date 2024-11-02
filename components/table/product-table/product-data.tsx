import { Product } from "./types";

export const dummyProducts: Product[] = [
    {
      id: '1',
      name: 'Fresh Chicken Breast',
      category: 'Chicken',
      price: 7500,
      stock: 25,
      promotion: 'BLACKFRIDAY20%',
      status: 'active',
      image: '/placeholder.svg?height=40&width=40'
    },
    {
      id: '2',
      name: 'Fresh Chicken Wings',
      category: 'Chicken',
      price: 7500,
      stock: 25,
      promotion: null,
      status: 'active',
      image: '/placeholder.svg?height=40&width=40'
    },
    {
      id: '3',
      name: 'Fresh Chicken Thighs',
      category: 'Chicken',
      price: 7500,
      stock: 25,
      promotion: 'BLACKFRIDAY20%',
      status: 'archived',
      image: '/placeholder.svg?height=40&width=40'
    },
    {
      id: '4',
      name: 'Fresh Chicken Legs',
      category: 'Chicken',
      price: 7500,
      stock: 25,
      promotion: null,
      status: 'draft',
      image: '/placeholder.svg?height=40&width=40'
    }
  ]