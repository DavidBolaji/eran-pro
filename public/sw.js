if(!self.define){let s,e={};const a=(a,t)=>(a=new URL(a+".js",t).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(t,c)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let n={};const r=s=>a(s,i),o={module:{uri:i},exports:n,require:r};e[i]=Promise.all(t.map((s=>o[s]||r(s)))).then((s=>(c(...s),n)))}}define(["./workbox-4754cb34"],(function(s){"use strict";importScripts("worker-s1J7UJVNN6sGytkaZcEs7.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"4ae3126be2149db05adc8364212f8cd6"},{url:"/_next/static/chunks/0e5ce63c-12d4b0fab1420090.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/1029-ad0f5d495f5aba49.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/1105-6bc31d830bbc1b30.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/1207-481f154a4b918dfc.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/15-f22be82681fb4d7f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/1835-2e809b6bfaafff78.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/1998-4c9310701807efae.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2029-811a363f65c31322.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2117-877a272b6066d07f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2144-911d22bdd606d225.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2429-425d6d76fc098a27.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2652-9dacc0a1d0bfe142.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2691-215ad3e6831210ec.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2850-a919a2fe8f5bec51.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2972-552ad53b9f025f54.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/2991-63de925387f32b17.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/314-70f2e1a01d7874e6.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3309-fbff147e8b405e6f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3329-e64e900f46663c49.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3464-45b4e26d7d94729a.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3665-b0baf3802932935b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3690-069a932c919d2be5.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3867-c34f3263f219149a.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3941-dbae4d84d63b7c1e.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/3993-c93925ad75ae610d.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/4109-57c0408bf7acd4cf.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/4156-1f34637f24e58df5.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/4851-dda318ab7242738a.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5100-4c231b925e31fa59.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5242-7234a7a234093ffb.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5416-81c2af50846eeed9.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5493-c2cee0b5541bfc5b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5817-ca87e3da91671803.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5864-3729d99df7ba5789.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/5878-e3b6d3ea86f3008e.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/6137-eaf7b6db0f76248f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/6268-6f83d09cb329c569.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/6316-2cc6644507e66103.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/660-db8188209b93a6d0.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/6615-24ad4d0076d77be7.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7085-494789a3cf9ecbc5.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7227-296af8efab05bddd.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7394-63b460736461ae5b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7597-6e55117605e09e66.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7642-6d27d0d7e0ec613c.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7697-2a8ecbdbe5700d85.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/7844-e1326d0b84e3e256.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8012d7e2-30ee7f2db1fd9d31.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/803-6e905dad3ef847ae.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8036-77d1323d0b9bc50f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8066-0557f6d3a583ec2b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8258-aee3024960c1ffa7.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8299-7f69a6c96c01d0a1.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8500-db1c229f8d0bc125.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8534-d85444507caa3b13.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/8658-23dc07bbb87deda2.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/9005-2b3df57a5ad70b2f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/919-76a0c49ea2db72fe.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/9223-2377a5a0b8568471.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/9400-7e64c3ea9f7e16ae.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/blog/%5BblogId%5D/page-e41667f1d0e3c873.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/blog/page-952789c6d7d94c9b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/cart/layout-871a46aea3457d6a.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/cart/page-10c7a250cdc61403.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/orders/%5BuserId%5D/edit/page-4aeec152c4c84b33.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/orders/%5BuserId%5D/page-9795703b8651e36d.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/orders/layout-d4dd8dde0eabb250.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/payment/page-963b4d49fe7650f2.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/product/%5BproductId%5D/page-e3343570c7735350.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/product/layout-87b61c0790acd046.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/(routes)/success/page-1a77f462a3331095.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/layout-74b76caa972cc07e.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/(home)/page-d458f705114737f1.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/_not-found/page-8e34cc9fcdc9955d.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/checkout/layout-71fa16e9937f0984.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/checkout/page-fe94816fb30ac925.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/contents/%5BblogId%5D/edit/page-a9754d7779546cd8.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/contents/add/page-cb3e6472af7c134b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/contents/faq/%5BfaqId%5D/edit/page-6cb6574aff235fef.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/contents/faq/add/page-cbc7e93cbb370838.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/contents/page-f28a1a1c1615ba07.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/customers/%5BcustomerId%5D/edit/page-773e5242b9602f26.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/customers/%5BcustomerId%5D/page-b90e286b7e03f732.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/customers/page-4733a2acc295ca9f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/home/page-38075f2a81c5bf58.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/layout-f643eca955847c5b.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/orders/%5BorderId%5D/page-12a3c615af87a836.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/orders/add/page-4108bfd6fa6d7e69.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/orders/page-e23987119e93f19e.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/products/add/page-9090a76b7697223f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/products/edit/%5BproductId%5D/page-cfde7e6450b07058.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/products/page-ea0c8c8a9c8118ca.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/promotions/%5BpromotionId%5D/edit/page-901c96d2c3eac7fc.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/promotions/%5BpromotionId%5D/page-75e1d70a270dfcf3.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/promotions/add/page-e8b5e91b4fcf1cdf.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/(routes)/promotions/page-c8a22e958efbe983.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/layout-8e034b2ca73536a6.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/dashboard/page-466fdd92822dc42c.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/error-98f7833682cd75d2.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/app/layout-c56e4a774e8ba7ab.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/fd9d1056-51ce02d3004da797.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/main-119d47111b114de2.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/main-app-e6e2ccecb0a55ddc.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/pages/_app-3c9ca398d360b709.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-3ddebb79517eed22.js",revision:"s1J7UJVNN6sGytkaZcEs7"},{url:"/_next/static/css/57411776de99dd7f.css",revision:"57411776de99dd7f"},{url:"/_next/static/css/9038931003336d76.css",revision:"9038931003336d76"},{url:"/_next/static/css/f7fefb85627623c8.css",revision:"f7fefb85627623c8"},{url:"/_next/static/media/big.640e1c99.png",revision:"65b3f789f730ee1d2125bac9dc18b81c"},{url:"/_next/static/media/black.0c9aa2cc.png",revision:"1b2e63ee6efc1afe7ef6d7f62d5944a5"},{url:"/_next/static/media/bottom-meat.a61f854b.png",revision:"6d4dc0dbbf72be06f034944bec0bc58b"},{url:"/_next/static/media/bottom.9ed33065.png",revision:"3e3a33a03eb8e858fdc6e3457b54a3d2"},{url:"/_next/static/media/bottom2.106f9b7b.png",revision:"518b6f09e55777059ec39bb609fbbb51"},{url:"/_next/static/media/box.22249750.png",revision:"ab8ed01c7e0c6530fe2027090c20f7ff"},{url:"/_next/static/media/breast.41c190c9.png",revision:"1c7e62bec2db2211eb433dc3dd4cd70c"},{url:"/_next/static/media/briefcase.5b5d27ac.png",revision:"c508299f1c7a31511c279d2ad1ac8a9e"},{url:"/_next/static/media/center-meat.72a56e06.png",revision:"9853ac4abae0ed78f92db6d0b148db42"},{url:"/_next/static/media/circle.2b615160.png",revision:"af93f2148ea70dd29e7f8a0adc764525"},{url:"/_next/static/media/cow.830aad2d.png",revision:"d244e37df85500f71bdcbbf858fce9f1"},{url:"/_next/static/media/icon-128x128.6ed12c4c.png",revision:"e8da0667b868e91cd9a4abc179869a7b"},{url:"/_next/static/media/left-meat.ffef841f.png",revision:"bc30edd464f9b1767c629315e5285361"},{url:"/_next/static/media/logo_black.1a30c894.png",revision:"01ec86cb30d1e0a739f037040eeaf4fc"},{url:"/_next/static/media/right.3f94f3c0.png",revision:"5632b41ff3399e9d516dd342f276b5d1"},{url:"/_next/static/media/right2.94d94d40.png",revision:"aad6b63b01f80517d4804c46bcb7ab4b"},{url:"/_next/static/media/side3.0770fc1e.png",revision:"db0fb4812239e695ca146ebeb3ad69e0"},{url:"/_next/static/media/top.585fb68c.png",revision:"33f6c1ef4fc5a34b8f56474c904ab293"},{url:"/_next/static/s1J7UJVNN6sGytkaZcEs7/_buildManifest.js",revision:"6310079bf1ae7bebeb6a2135896e4564"},{url:"/_next/static/s1J7UJVNN6sGytkaZcEs7/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/apple-icon-180.png",revision:"3359eea60e7a3e14d11e2aa36c0fb2db"},{url:"/apple-splash-1125-2436.jpg",revision:"d84a17b1609f00ac58164069755b7fa1"},{url:"/apple-splash-1136-640.jpg",revision:"bca3ca150948adbe027428895a87c57f"},{url:"/apple-splash-1170-2532.jpg",revision:"e582d89057256b0fcd69a11b0bb2de0d"},{url:"/apple-splash-1179-2556.jpg",revision:"48d7ae5500710ac6632c8901fd4d3a48"},{url:"/apple-splash-1206-2622.jpg",revision:"39e6405d423416cde2a935b58b198899"},{url:"/apple-splash-1242-2208.jpg",revision:"2144762e700b74d54ef42ef47b86864e"},{url:"/apple-splash-1242-2688.jpg",revision:"25ccff1049b9293b103892418e210dd7"},{url:"/apple-splash-1284-2778.jpg",revision:"6160036408c96a04ba7c610bff7207b6"},{url:"/apple-splash-1290-2796.jpg",revision:"b28cf6bd10b36e059281774970631f36"},{url:"/apple-splash-1320-2868.jpg",revision:"44ebbc7dece3d5ad90750fcacd2d69f5"},{url:"/apple-splash-1334-750.jpg",revision:"a8c6df6268b503770478aa0fe83d1bc3"},{url:"/apple-splash-1488-2266.jpg",revision:"24419480752007b83bc3c81399178305"},{url:"/apple-splash-1536-2048.jpg",revision:"caacc6aff15fa3f6c667686077305b72"},{url:"/apple-splash-1620-2160.jpg",revision:"7e10ec399c9562531e907d93f6052911"},{url:"/apple-splash-1640-2360.jpg",revision:"ec06a5ced956eb5a09e0fa4ac5e5f65d"},{url:"/apple-splash-1668-2224.jpg",revision:"4e2b183ccc99cc0080b35e4f001d9d42"},{url:"/apple-splash-1668-2388.jpg",revision:"c5fd571b67b1a767329dae5355b3be4a"},{url:"/apple-splash-1792-828.jpg",revision:"ab0c3da9b9aebe0534be11118c7748d7"},{url:"/apple-splash-2048-1536.jpg",revision:"930df3667e150652ef8320f05a03d70e"},{url:"/apple-splash-2048-2732.jpg",revision:"01efacd4035d0dca35ccafd3b4b95a94"},{url:"/apple-splash-2160-1620.jpg",revision:"b20ece46dd22041d0ad766b2d1f01eaf"},{url:"/apple-splash-2208-1242.jpg",revision:"f2fb052c0af1b5764a396aa3e8614fb5"},{url:"/apple-splash-2224-1668.jpg",revision:"2dccaabae10b304ac4fb74d89e758edc"},{url:"/apple-splash-2266-1488.jpg",revision:"2861f82c58aaf485429d85b449579e39"},{url:"/apple-splash-2360-1640.jpg",revision:"25e49ed436cd1f629244678b87031257"},{url:"/apple-splash-2388-1668.jpg",revision:"cc8f85f491cb602c6cd3392d4cd3e286"},{url:"/apple-splash-2436-1125.jpg",revision:"2c505640e1e15252ec9b9080b939bc74"},{url:"/apple-splash-2532-1170.jpg",revision:"a8b2ea109b53ff8ec58e131c90c41513"},{url:"/apple-splash-2556-1179.jpg",revision:"60b05457eae459432323e3d404d607be"},{url:"/apple-splash-2622-1206.jpg",revision:"4389d6e2a051e31155f80214d5204f34"},{url:"/apple-splash-2688-1242.jpg",revision:"bb664d747cf7302a2406890a99e49081"},{url:"/apple-splash-2732-2048.jpg",revision:"c51c5af348ed6bbb3d89539ae7c86755"},{url:"/apple-splash-2778-1284.jpg",revision:"aed1fa7f9eee82de667b6920879d4546"},{url:"/apple-splash-2796-1290.jpg",revision:"729764146c6d0e28ee427c49408f8802"},{url:"/apple-splash-2868-1320.jpg",revision:"17598e5db2ab25100be0854afcf8e023"},{url:"/apple-splash-640-1136.jpg",revision:"7b18ee43c7be38be33a2844ea28dec02"},{url:"/apple-splash-750-1334.jpg",revision:"af650994c69e2d9b237cc501e9ef7076"},{url:"/apple-splash-828-1792.jpg",revision:"27b6c27a71109959891217b35aa13fb1"},{url:"/favicon-196.png",revision:"540fd60893e8ad780725dcc969a029c7"},{url:"/file.svg",revision:"a43652a972f8f8ea24f2e1ccfad4bd06"},{url:"/fonts/Satoshi-Black.eot",revision:"89390249ee84dfdfbc0fd94277d8dd95"},{url:"/fonts/Satoshi-Black.ttf",revision:"f12126e8a8e529e8195c7357dd5ad0c4"},{url:"/fonts/Satoshi-Black.woff",revision:"8f3e2ffe218c63abbb190ae21e5914b3"},{url:"/fonts/Satoshi-Black.woff2",revision:"d9749ed5ed84db875b4671a3f20b6d7d"},{url:"/fonts/Satoshi-BlackItalic.eot",revision:"d7c707d7c0cef590b2abcbd69b638521"},{url:"/fonts/Satoshi-BlackItalic.ttf",revision:"bdec661cb56db4658d0421e0b51441be"},{url:"/fonts/Satoshi-BlackItalic.woff",revision:"658c3f8c228e89126e72b1de62ae3075"},{url:"/fonts/Satoshi-BlackItalic.woff2",revision:"d28fa4c086f1b1a4bad3ca42f7441317"},{url:"/fonts/Satoshi-Bold.eot",revision:"c57e258d213ecf8cfe0a62f1671e1d81"},{url:"/fonts/Satoshi-Bold.ttf",revision:"50eee48d495ab752b3e6b873b1206f10"},{url:"/fonts/Satoshi-Bold.woff",revision:"fc3b9a8724a46bc0439e8aedffbed4e0"},{url:"/fonts/Satoshi-Bold.woff2",revision:"d4db658f4dd63bc2d0d84f325a341e29"},{url:"/fonts/Satoshi-BoldItalic.eot",revision:"d264ae07a0580d45396975d232aff1ad"},{url:"/fonts/Satoshi-BoldItalic.ttf",revision:"cbbadbeec8490d033ca192e355d89d9e"},{url:"/fonts/Satoshi-BoldItalic.woff",revision:"255104eefaebaabbf099285b4c9fc277"},{url:"/fonts/Satoshi-BoldItalic.woff2",revision:"e66ffbf8f9e8d20d9755dc6b5750a6de"},{url:"/fonts/Satoshi-Italic.eot",revision:"919d4cad729d77fd1109ef4b2ac26fcf"},{url:"/fonts/Satoshi-Italic.ttf",revision:"002093bee822f0b3287ad4bad21e2a9f"},{url:"/fonts/Satoshi-Italic.woff",revision:"993e96e16010788cca45739a47143066"},{url:"/fonts/Satoshi-Italic.woff2",revision:"7e048c3007f86b11219b9ab2cfd1203c"},{url:"/fonts/Satoshi-Light.eot",revision:"9194138dc6b1514d2a46f11150b1f8ff"},{url:"/fonts/Satoshi-Light.ttf",revision:"02d43df8e0b9f0acb1d1c6b40aaa5b7e"},{url:"/fonts/Satoshi-Light.woff",revision:"d27d9203eb87ffbd40a6940b086e9afc"},{url:"/fonts/Satoshi-Light.woff2",revision:"5481680cc24e1e83b5c9d3b7a5501a22"},{url:"/fonts/Satoshi-LightItalic.eot",revision:"11c0c98a171975d439500fe966465d62"},{url:"/fonts/Satoshi-LightItalic.ttf",revision:"055ba8c42d30b81454e272acebb74cab"},{url:"/fonts/Satoshi-LightItalic.woff",revision:"584ec39d7f98211c07c7db79b1b028b1"},{url:"/fonts/Satoshi-LightItalic.woff2",revision:"e13da56de99251d8544a3eb74b798b2a"},{url:"/fonts/Satoshi-Medium.eot",revision:"78fb45f456a61513628dcdeb87831eef"},{url:"/fonts/Satoshi-Medium.ttf",revision:"7bec814954d059a7e7dae047285eedbc"},{url:"/fonts/Satoshi-Medium.woff",revision:"3f3ea9424062d955ceee8e0fc2b15d70"},{url:"/fonts/Satoshi-Medium.woff2",revision:"cd790237ed63c56b30aa8fb9d99a7563"},{url:"/fonts/Satoshi-MediumItalic.eot",revision:"868fafb63df3bfbfb0423387374d49a7"},{url:"/fonts/Satoshi-MediumItalic.ttf",revision:"d7e82ee45e48a2a617efa87155b6dc9f"},{url:"/fonts/Satoshi-MediumItalic.woff",revision:"6b31d60796818f0cdac5d25f0062331a"},{url:"/fonts/Satoshi-MediumItalic.woff2",revision:"3d53a7c37f5572f4d335d9b8f668d331"},{url:"/fonts/Satoshi-Regular.eot",revision:"389d62aa26362deab1db61d201e556ac"},{url:"/fonts/Satoshi-Regular.ttf",revision:"4da5359f3f975b25249e8cfcf142f39e"},{url:"/fonts/Satoshi-Regular.woff",revision:"3adf562e446a18d90ba98f72ea08601c"},{url:"/fonts/Satoshi-Regular.woff2",revision:"71a6023c087c936859024eb16ec7a519"},{url:"/fonts/Satoshi-Variable.eot",revision:"f953920d265c265d55029a0044a7b122"},{url:"/fonts/Satoshi-Variable.ttf",revision:"bc0207192e408b721fa14151690c6a66"},{url:"/fonts/Satoshi-Variable.woff",revision:"bd7cac4b844318aa2b2f168b57b45c22"},{url:"/fonts/Satoshi-Variable.woff2",revision:"70880e42f07b0386e261974cd14820a1"},{url:"/fonts/Satoshi-VariableItalic.eot",revision:"9888965098b0fe3121439e5293e5f63d"},{url:"/fonts/Satoshi-VariableItalic.ttf",revision:"db98db5c0d84369d2586aaf5eedc3376"},{url:"/fonts/Satoshi-VariableItalic.woff",revision:"aa09c255fd899a8d89fc4636c0c9db4d"},{url:"/fonts/Satoshi-VariableItalic.woff2",revision:"ed39abb752ab5d8f7d19f0a8d9523c7b"},{url:"/logo_black.png",revision:"01ec86cb30d1e0a739f037040eeaf4fc"},{url:"/logo_black_192.png",revision:"c5c784c39f6210bdcfcfd3da7bcd54f2"},{url:"/logo_fav.png",revision:"36626fa1cd48e73c017d4aebd923d269"},{url:"/manifest-icon-192.maskable.png",revision:"f024127e91d2897babefcc7af39fcdfd"},{url:"/manifest-icon-512.maskable.png",revision:"b702af5d0c59f5a3ccbe2ef123c5c0e0"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/satoshi.css",revision:"3689222533bda0f796339955e00f5e19"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:t})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
