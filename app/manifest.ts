import type { MetadataRoute } from 'next'


export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Eran Pro',
    short_name: 'Eranpro',
    description: 'Enjoy fresh, premium chicken delivered to your doorstep at a discount. Don\'t miss out – order now and savor the savings!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7DBA00',
    icons: [
      {
        src: '/logo_black_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo_black.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}