import { CashIcon, PresentationChartLineIcon, CalendarIcon, ClipboardListIcon, DatabaseIcon, CollectionIcon, MapIcon, CameraIcon } from "@heroicons/react/outline";
export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Inventaire BCX',
                link: '/inventaire',
                icon: <PresentationChartLineIcon className='h-6'/>,
                desc : "Creation d'inventaire via l'application BarreCode-X APP"
            },
            {
                name: 'Export DataEtik XML/LCV',
                link: '/ExpEtiquette',
                icon: <PresentationChartLineIcon className='h-6'/>,
                desc : "Creation de fichier invent01 via l'export d'etiquette"
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
                desc : "livraison faites avec l'application BarreCode-X APP"
            },
            {
                name: 'Livraison PB/CBL img',
                link: '/livraisonPb',
                icon: <PresentationChartLineIcon className='h-6'/>,
                desc : "livraison petit bateau"
            },
            {
                name: 'Livraison PB/CBL .txt',
                link: '/livraisonPbOcr',
                icon: <PresentationChartLineIcon className='h-6'/>,
                desc : "livraison "
            },
            {
                name: 'Livraison Moulin Roty',
                link: '/livraisonMR',
                icon: <PresentationChartLineIcon className='h-6'/>,
                desc : "livraison Moulin roty"
            },
        ],
    },
]
