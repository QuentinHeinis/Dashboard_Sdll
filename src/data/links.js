import { CashIcon, PresentationChartLineIcon, CalendarIcon, ClipboardListIcon, DatabaseIcon, CollectionIcon, MapIcon, CameraIcon } from "@heroicons/react/outline";
export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Inventaire BCX',
                link: '/inventaire',
                icon: <PresentationChartLineIcon className='h-6'/>,
            },
            {
                name: 'Export DataEtik XML/LCV',
                link: '/ExpEtiquette',
                icon: <PresentationChartLineIcon className='h-6'/>,
            },
          ],
    },
    {
        title: 'Livraisons',
        links: [
            {
                name: 'Livraison Shoes BCX',
                link: '/ean',
                icon: <PresentationChartLineIcon className='h-6'/>,
            },
            {
                name: 'Livraison PB/CBL',
                link: '/livraisonPb',
                icon: <PresentationChartLineIcon className='h-6'/>,
            },
            {
                name: 'Livraison Moulin Roty',
                link: '/livraisonMR',
                icon: <PresentationChartLineIcon className='h-6'/>,
            },
        ],
    },
]
