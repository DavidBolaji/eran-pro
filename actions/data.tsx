export const productQuery = {
    id: true,
    name: true,
    description: true,
    img: true,
    price: true,
    qty: true,
    stock: true,
    unit: true,
    status: true,
    images: {
      select: {
        url: true,
      },
    },
    category: {
      select: {
        id: true,
        name: true,
      },
    },
    promotion: {
      select: {
        name: true,
        discount: true,
      },
    },
  };