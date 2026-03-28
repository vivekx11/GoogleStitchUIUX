import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Search, 
  Home as HomeIcon, 
  ShoppingBag, 
  User, 
  Heart, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Lock,
  ChevronDown
} from 'lucide-react';

// --- Types ---
type Screen = 'home' | 'list' | 'detail' | 'cart' | 'profile';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  description?: string;
}

interface CartItem extends Product {
  qty: number;
  variant?: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cloud-Walk Sneaker',
    brand: 'Aura Footwear',
    price: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgOwli27kt0ldjidR7pAxJJEgt7N2vBGx719ShTl3OtTiE4XFOIQTQmj9aW6UgnAV3a1ZT45KOdqv1LwO87IhBKGT3avs4K6dUrXUdj1EYsOiP_6x32xNOkgjMzw35FGw_e_pzJgfAcCJpz2qpUe_2lf0OP6ZEeiPo6-HCoZK9rUvyUvoph0XzJmoukFMR4NPUQvNtXiURpUggC9TgHxUURs83GwuwsojUT1B65EFBYO7gixxC2R0-aeT-tATtmN053dD6xUEp-3E',
    category: 'Footwear'
  },
  {
    id: '2',
    name: 'Heritage Leather Belt',
    brand: 'Maison Atelier',
    price: 185,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1GWlHI0GkKEt9Cycu1AIKgkBSgIoHBukL-TDiX-oHG_iuwMSHaj6iyupItefEksbBxRA_2LTdRjfpM21XEY_oD4aPrXa6ZgU2Y6hOEzrn0EgnPVp8qyGNcPW1epSZU5O1cjpwAr6X5C4JpO6M0QIEzUp895qgAPTiRidU8q3LrB4FiTYmEK6AhFW8TrKgwZ2l0XUgErS3O1KnHTvsLZ-Kuyw1Ofizfh1fsiyL6xiDvADkpjQSTOyRniU5z-MxRPJsdyggUd-HX_E',
    category: 'Leather'
  },
  {
    id: '3',
    name: 'Classic Cotton Trench',
    brand: 'Nomad Outerwear',
    price: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDposK1-QsnkJKT_dyDcB5XvfjPJZiMchfHf0appnjdmh1V-awgQVYYzbt3QbwhfyOdnHCjFTocv3eVyhFMoN2fRcvex3wOG0J9L5HiXl4haxOIIBXOMpds2biyyATyL-_h1Yuknmb4zLqv8hM0TNxz9mFRmTec0lyahqz1-W08ovHDV0t8vLDubZTTfl42xzBmz2EqRkXoiK5OWYTdXlYd5mUtaIdoRrCUKMvZWgokrE2foglMqyf-Megsx9e_gxNhCBEYR6POYlc',
    category: 'Tailoring'
  },
  {
    id: '4',
    name: 'Noir de Nuit Parfum',
    brand: 'Elixir Scent',
    price: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHnufZbXze954QfXnJuHQgcEeZ0FhloBJJwtS0FdUH2ES1Jhrn3dMXKp4cBmXDn6VlhganU9mj94Ib8oBEmL0bu6vj24ksGBigBcA1LURY7Xz5vrN--w87i22uRB4cATFx8YYh-C94UPUatZakH08R904aavYeUHoBs02b4_aC8ChgMGyjC2tHWSPDOLIaQFF9rbHriFQUfL96AWMf27wWItELU6xIZx0qBrSENnyVtswUgbXr_crlDGOAKNKpjKLtzKaguajWObw',
    category: 'Bijoux'
  },
  {
    id: '5',
    name: 'Archival Trench',
    brand: 'Premium Brushed Cotton',
    price: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH12OhdP6lN3A8vt9BYZSEpZi2RvOOTeQzZ9QEfOLjS0dJnk8XdjHPQUiHK_gSkHtfcD12Vo6ShZ-XoaSO7cN8k_FT8IxQWPBxPax89NmIXeD8HdPMkDcdpASeozEgsgv9Wz9ILYEbcFr3Ib106A3NLE2NiyGH7dcnF8hPwd68cBOjePqUcqzLGoGdRzow8xzMQD7ejsrZSvY7D3_sR4KHeLg8KKw7SmzQAsKXnb1z_yNQNPnMEn-yjrA83ldlkuBeYc6gZnmRzPQ',
    category: 'Tailoring'
  },
  {
    id: '6',
    name: 'Nomos Glass',
    brand: 'Swiss Movement / Steel',
    price: 1150,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmfuEZQCxx3m_YqZH6ogxmcdqrfabrxA5LICtc9dn8nsjm4aaKWRC_oBoBS-qjN1mibZARexc5_BV0HvvV6AoWmtzVBJY3oTBjO09KhL3d6GdgpOJ8GOJlgdIE446GVqvzn-xlPP4ohOZOfWgZrrlSeX-rYxPg3YBsJvZzAfMLLQo0Zv9ovwAFLxfswJ9_ucsnTaBcHQx6fvm1Hom552qlPNb1EMMAEPc3Mv05fQeqQrYN-VS7HZRbW60cX2-7VyMqPh3J7mN_crQ',
    category: 'Living'
  },
  {
    id: '7',
    name: 'Studio 01',
    brand: 'Active Noise Cancellation',
    price: 349,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLsz44NFPvwFXhtK5mSsOGnR9TAuXafO897kxOk_p_sISpzkpjMXu1pZRaLnz56iNe-h7JNnhTxmfpAy9eF_sy7ORTmt1AuMHRbaqQhAY0j7vL4CbhbvZexrpYwND36pA3pAfD1rJ_4I7vALUamOyMGb2Qitrogb4A7-l-GU4LNlmS7G4weMGsWdbd4XdM0BpaGiqstSlTal4G3dKrdk460EkMP66FMAxAbQOV7Fm3VWpCsYWv01FK8b8dBCLudWZ5wbozz4Xf_SM',
    category: 'Living'
  },
  {
    id: '8',
    name: 'Organics Set',
    brand: 'Hand-thrown Porcelain',
    price: 185,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTgLI3jYqePjJlvWE9c4TB8ji4i9Rx6dsqT85LDERoiEi6hKdhEdineJnVWqUf0TJuV-5P2yHwrGVaIB1NxBknL6KYIokpgl6u8S69H28zCWo4xSk0be9jdJZH6wrQoph0Az5F6Evt4a48Tk3yHGDQXUEvKDRezb7kHVJ-Pz4_91cmNUox3-ELfyNzpRuRMJVz28oOYE47Q8y7ZeHXvkrDJrtVRwxeZkknIgeG2_dt3IJbd1DsETq3oyuQ0mmPMJGkcnTHGeWtqXU',
    category: 'Living'
  }
];

// --- Components ---

const TopBar = ({ onMenuClick, onSearchClick }: { onMenuClick: () => void, onSearchClick: () => void }) => (
  <header className="fixed top-0 w-full z-50 glass-nav">
    <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="text-on-surface hover:bg-surface-container-low transition-colors p-2 rounded-full">
          <Menu size={24} />
        </button>
        <span className="font-headline font-black tracking-tighter text-2xl text-on-surface">ELIXIR</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onSearchClick} className="text-on-surface hover:bg-surface-container-low transition-colors p-2 rounded-full">
          <Search size={24} />
        </button>
      </div>
    </div>
  </header>
);

const BottomNav = ({ activeTab, onTabChange, cartCount }: { activeTab: Screen, onTabChange: (tab: Screen) => void, cartCount: number }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'list', label: 'Search', icon: Search },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 glass-nav rounded-t-[24px] z-50 shadow-[0_-4px_24px_rgba(25,28,29,0.04)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as Screen)}
            className={`relative flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-300 ${
              isActive ? 'bg-primary text-white scale-95' : 'text-on-surface/50 hover:opacity-80 scale-90'
            }`}
          >
            <div className="relative">
              <tab.icon size={24} fill={isActive ? 'currentColor' : 'none'} />
              {tab.id === 'cart' && cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-surface"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const HomeScreen = ({ onProductClick }: { onProductClick: (p: Product) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-20 pb-32"
  >
    {/* Hero Banner */}
    <section className="px-6 mb-12">
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-low min-h-[500px] flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-8 md:p-12 z-10">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Summer Series 2024</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-tight mb-6">
            The Ethereal <br/> Collection
          </h1>
          <p className="font-sans text-on-surface-variant max-w-sm mb-8 leading-relaxed">
            Redefining luxury through minimalist architecture and sustainable textile innovation.
          </p>
          <button className="bg-gradient-to-br from-primary to-primary-container text-white font-sans font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition-opacity">
            Explore Collection
          </button>
        </div>
        <div className="w-full md:w-1/2 h-full absolute md:relative top-0 right-0 opacity-40 md:opacity-100">
          <img 
            alt="Editorial fashion" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHE1jJeA_sKEkw50rhy-OST2w_-xvDVdOxDr8m8I7vKoqjn3pCiUmNTfm0eHw5mErdWig1o2-N6sv14GuZr87PaUIW2mDMSzRvibnFUrRRzr2tGz2KucsiJxdyAuL_o2ND2VrDGJGYHciDR8xscQSbQ6RTCM8aInZgbb4qdu3fxX-r4qR4zQ9DzjwhrbiIFn8KSi9YexltnYi0tj8HE-Q7HmKjTU6Qd67hb9zYpB2BFI8wnyvU0ffFv9BII9lJlM6TwZLiyD2t9E"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    {/* Horizontal Categories */}
    <section className="mb-16">
      <div className="px-6 flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline text-2xl font-bold tracking-tight">Curated Archives</h2>
          <p className="font-sans text-on-surface-variant text-sm">Browse by aesthetic</p>
        </div>
        <button className="font-sans text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1">View All</button>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 pb-4 no-scrollbar">
        {['Tailoring', 'Bijoux', 'Footwear', 'Leather'].map((cat, i) => (
          <div key={cat} className="flex-none w-40 group cursor-pointer">
            <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-surface-container-high">
              <img 
                alt={cat} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={PRODUCTS[i % PRODUCTS.length].image}
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-sans text-xs font-bold uppercase tracking-wider text-center">{cat}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Bento Grid */}
    <section className="px-6 mb-16">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7 aspect-[16/10] bg-surface-container-low rounded-3xl relative overflow-hidden group cursor-pointer">
          <img 
            alt="New Arrival" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgdoRe0huvRHaBHUB2jetbkwPUfqCSowvJmGRwfmIpA5dNO8SkKa-_PPV4YTVmsMoudpHQ6BiMdqz30PCdQciVCLh4P2sgGl5SxgGkiRJUEBS019oHHwsla9G8Cm2-fPZyriFxK8a1lo9zYIIM3vQZeSpDvra8U-gCi1js8JKaG6LBpISm7eyqgo8DRkG8n4LBp0LdCsKb2ntY2obUyTBTtVTDr0SdTbpgz5XqiOV2WT13I8ViYalh-3pFZu4uWKIFTpebbQmbccY"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest mb-1">Seasonal Edit</p>
            <h3 className="font-headline text-2xl font-bold">New Arrivals</h3>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <div className="flex-1 bg-primary text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-headline text-xl font-bold mb-2">Exclusive Loyalty</h3>
              <p className="text-sm opacity-80 mb-4">Join Elixir Privé for early access and bespoke services.</p>
              <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Join Now</button>
            </div>
          </div>
          <div className="flex-1 bg-surface-container-high rounded-3xl p-8 flex items-center justify-between group cursor-pointer">
            <div>
              <h3 className="font-headline text-xl font-bold">Gift Curation</h3>
              <p className="font-sans text-sm text-on-surface-variant">The Art of Giving</p>
            </div>
            <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </section>

    {/* Best Sellers */}
    <section className="px-6 mb-24">
      <div className="mb-10 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-2">Best Sellers</h2>
        <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {PRODUCTS.slice(0, 4).map((product) => (
          <div key={product.id} className="group cursor-pointer" onClick={() => onProductClick(product)}>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low mb-4">
              <img 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={product.image}
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={18} className="text-on-surface" />
              </button>
            </div>
            <div className="px-1">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{product.brand}</p>
              <h4 className="font-sans text-sm font-medium text-on-surface mb-2">{product.name}</h4>
              <p className="font-headline text-base font-bold text-primary">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const ProductListScreen = ({ onProductClick }: { onProductClick: (p: Product) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-24 pb-32 px-6 max-w-7xl mx-auto"
  >
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3 block">Autumn Collection 24</span>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
            Curated <br/> Essentials
          </h1>
        </div>
        <p className="text-on-surface-variant max-w-xs md:text-right leading-relaxed text-sm">
          Experience the harmony of form and function with our latest archival releases.
        </p>
      </div>
    </section>

    <nav className="sticky top-[88px] z-40 bg-surface/90 backdrop-blur-md py-4 mb-10 flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
      <div className="flex items-center gap-3">
        <button className="bg-surface-container-high text-on-surface px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:bg-surface-container-highest">
          <Menu size={14} /> Filter
        </button>
        <div className="h-4 w-px bg-outline-variant/30 mx-2"></div>
        <div className="flex items-center gap-6 whitespace-nowrap">
          <button className="text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-primary pb-1">All Products</button>
          <button className="text-on-surface-variant font-medium text-xs uppercase tracking-widest hover:text-on-surface transition-colors pb-1">Apparel</button>
          <button className="text-on-surface-variant font-medium text-xs uppercase tracking-widest hover:text-on-surface transition-colors pb-1">Objects</button>
          <button className="text-on-surface-variant font-medium text-xs uppercase tracking-widest hover:text-on-surface transition-colors pb-1">Living</button>
        </div>
      </div>
      <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface whitespace-nowrap">
        Sort by <ChevronDown size={14} />
      </button>
    </nav>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
      {PRODUCTS.map((product, i) => (
        <article 
          key={product.id} 
          className={`group relative ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
          onClick={() => onProductClick(product)}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low mb-6 relative cursor-pointer">
            <img 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              src={product.image}
              referrerPolicy="no-referrer"
            />
            <button className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all duration-300">
              <Heart size={20} />
            </button>
            {i === 0 && (
              <div className="absolute bottom-6 left-6">
                <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">New Arrival</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-start pr-2">
            <div>
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-on-surface-variant text-sm mt-1">{product.brand}</p>
            </div>
            <span className="font-bold text-lg text-on-surface">${product.price.toFixed(2)}</span>
          </div>
        </article>
      ))}
    </div>

    <div className="mt-32 flex flex-col items-center">
      <button className="group flex flex-col items-center gap-4">
        <span className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
          <Plus size={20} />
        </span>
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant">Explore More</span>
      </button>
    </div>
  </motion.div>
);

const ProductDetailScreen = ({ product, onBack, onAddToCart }: { product: Product, onBack: () => void, onAddToCart: (p: Product) => void }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="fixed inset-0 z-[60] bg-surface overflow-y-auto"
  >
    <header className="fixed top-0 w-full z-50 glass-nav flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-surface-container-low transition-colors rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-headline font-bold tracking-tight text-on-surface text-xl uppercase">ELIXIR</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full">
          <Heart size={24} />
        </button>
        <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full">
          <Share2 size={24} />
        </button>
      </div>
    </header>

    <main className="pt-20 pb-32">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        <section className="md:col-span-7 space-y-6">
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-surface-container-low shadow-sm">
              <img 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={product.image}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="w-2 h-2 rounded-full bg-on-surface/20"></span>
              <span className="w-2 h-2 rounded-full bg-on-surface/20"></span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-surface-container-low">
                <img 
                  alt="Detail" 
                  className="w-full h-full object-cover" 
                  src={product.image}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="md:col-span-5 flex flex-col pt-4">
          <div className="mb-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-primary">NEW ARRIVAL</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-2 leading-tight uppercase">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl font-bold text-on-surface">${product.price.toFixed(2)}</span>
            <span className="text-sm font-medium text-on-surface-variant line-through opacity-60">${(product.price * 1.4).toFixed(2)}</span>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Color — Bone White</label>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-[#f5f5f5] ring-2 ring-primary ring-offset-2 p-0.5"></button>
                <button className="w-10 h-10 rounded-full bg-[#1c1c1c] ring-1 ring-outline-variant p-0.5"></button>
                <button className="w-10 h-10 rounded-full bg-[#4a5043] ring-1 ring-outline-variant p-0.5"></button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Select Size</label>
                <button className="text-[10px] font-bold uppercase tracking-widest text-primary underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    className={`py-3 text-sm font-semibold rounded-xl transition-all ${
                      size === 'M' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Product Details</h3>
              <p className="font-sans text-sm leading-relaxed text-on-surface-variant mb-6">
                A masterclass in functional minimalism. The Sculpted Shell features a proprietary water-resistant membrane and an architectural silhouette that moves with you. Finished with ultrasonic welded seams and hidden magnetic closures.
              </p>
              <ul className="space-y-3">
                {['Water-repellent technical fabric', 'Internal security pocket with RFID lining', 'Ethically sourced and produced'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-on-surface">
                    <CheckCircle2 size={18} className="text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold text-base tracking-tight shadow-xl shadow-primary/20 transition-transform active:scale-95 hover:opacity-95"
              >
                ADD TO CART — ${product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-24 bg-surface-container-low py-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Complete the Look</span>
              <h2 className="font-headline text-2xl font-extrabold mt-2 uppercase">ESSENTIAL PAIRINGS</h2>
            </div>
            <button className="text-sm font-bold text-primary border-b-2 border-primary pb-1">VIEW ALL</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(4, 8).map(p => (
              <div key={p.id} className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container-lowest">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase">{p.name}</h4>
                  <p className="text-xs text-on-surface-variant">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  </motion.div>
);

const CartScreen = ({ items, onUpdateQty }: { items: CartItem[], onUpdateQty: (id: string, delta: number) => void }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-32 px-6 flex flex-col items-center justify-center min-h-[60vh] max-w-7xl mx-auto"
      >
        <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-8 border border-surface-container-highest/50">
          <ShoppingBag size={40} className="text-primary/40" />
        </div>
        <h2 className="font-headline font-bold text-3xl mb-3 tracking-tight">Your cart is empty</h2>
        <p className="font-sans text-on-surface-variant text-center max-w-sm mb-10 leading-relaxed">Discover our latest collections and find something special for your collection.</p>
        <button className="px-10 py-4 bg-primary text-white font-headline font-bold text-sm uppercase tracking-widest rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
          Explore Collections
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-32 px-6 max-w-7xl mx-auto"
    >
      <section className="mb-12">
        <h2 className="font-headline font-extrabold text-4xl tracking-tight mb-2">Shopping Cart</h2>
        <p className="font-sans text-on-surface-variant">Review your selection before proceeding to checkout.</p>
      </section>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8 space-y-6">
          {items.map(item => (
            <div key={item.id} className="bg-surface-container-lowest rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-center sm:items-start group transition-all duration-300 border border-surface-container-highest/20 hover:border-primary/20">
              <div className="w-full sm:w-32 h-40 overflow-hidden rounded-xl bg-surface-container-low">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow space-y-2 text-center sm:text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{item.category}</p>
                    <h3 className="font-headline font-bold text-xl">{item.name}</h3>
                    <p className="font-sans text-sm text-on-surface-variant">{item.variant || 'Standard Edition'}</p>
                  </div>
                  <button 
                    onClick={() => onUpdateQty(item.id, -item.qty)}
                    className="text-outline hover:text-red-500 transition-colors p-2"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center justify-center sm:justify-between mt-6">
                  <div className="flex items-center bg-surface-container-low rounded-full px-4 py-2 gap-4 border border-surface-container-highest/50">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="hover:text-primary transition-colors"><Minus size={14} /></button>
                    <span className="font-bold text-sm w-6 text-center">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="hover:text-primary transition-colors"><Plus size={14} /></button>
                  </div>
                  <p className="font-headline font-bold text-lg text-primary">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-surface-container-low rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-primary">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-headline font-bold text-lg">Complimentary Gift Wrapping</h4>
              <p className="font-sans text-sm text-on-surface-variant">Signature ELIXIR packaging included with every order over $200.</p>
            </div>
            <ShoppingBag size={32} className="text-primary flex-shrink-0" />
          </div>
        </div>

        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="bg-surface-container-lowest rounded-xl p-8 sticky top-28 shadow-[0_12px_32px_rgba(25,28,29,0.06)] border border-surface-container-highest/30">
            <h3 className="font-headline font-bold text-2xl mb-8">Order Summary</h3>
            <div className="space-y-4 font-sans">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span className="font-semibold text-primary">Complimentary</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Tax</span>
                <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-surface-container-highest my-6"></div>
              <div className="flex justify-between items-end">
                <span className="font-headline font-bold text-xl">Total</span>
                <span className="font-headline font-black text-3xl text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-headline font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]">
                Proceed to Checkout
              </button>
              <div className="flex items-center justify-center gap-2 text-on-surface-variant py-2">
                <Lock size={14} />
                <span className="text-xs font-medium uppercase tracking-widest">Secure Checkout Guaranteed</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-surface-container-high">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Promo Code</label>
              <div className="flex gap-2">
                <input className="flex-grow bg-transparent border-b-2 border-surface-container-highest focus:border-primary outline-none px-2 py-2 text-sm transition-colors font-sans" placeholder="Enter code" type="text" />
                <button className="text-primary font-bold text-sm uppercase tracking-wider px-4">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProfileScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <div className="max-w-md mx-auto">
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 overflow-hidden border-2 border-primary/10">
          <User size={48} className="text-on-surface-variant" />
        </div>
        <h2 className="text-2xl font-display font-bold">Vivek Sawji</h2>
        <p className="text-sm text-on-surface-variant font-sans">viveksawji06@gmail.com</p>
      </div>

      <div className="space-y-4">
        {[
          { icon: <ShoppingBag size={20} />, label: 'My Orders', detail: '3 active' },
          { icon: <Heart size={20} />, label: 'Wishlist', detail: '12 items' },
          { icon: <Lock size={20} />, label: 'Security', detail: 'Password & 2FA' },
          { icon: <ChevronDown size={20} />, label: 'Settings', detail: '' },
        ].map((item, i) => (
          <button 
            key={i}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors border border-surface-container-highest/50"
          >
            <div className="flex items-center gap-4">
              <div className="text-primary">{item.icon}</div>
              <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant">{item.detail}</span>
              <ArrowRight size={16} className="text-on-surface-variant/50" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-3xl bg-primary/5 border border-primary/10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Elixir Loyalty</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">You're 240 points away from your next reward. Shop now to earn double points on the Summer Series.</p>
        <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="w-3/4 h-full bg-primary" />
        </div>
      </div>

      <button className="w-full mt-12 py-4 text-sm font-bold uppercase tracking-widest text-destructive hover:bg-destructive/5 rounded-2xl transition-colors">
        Sign Out
      </button>
    </div>
  </motion.div>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('detail');
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10">
      <TopBar 
        onMenuClick={() => {}} 
        onSearchClick={() => setCurrentScreen('list')} 
      />

      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div key="home" className="w-full">
              <HomeScreen onProductClick={handleProductClick} />
            </motion.div>
          )}
          {currentScreen === 'list' && (
            <motion.div key="list" className="w-full">
              <ProductListScreen onProductClick={handleProductClick} />
            </motion.div>
          )}
          {currentScreen === 'cart' && (
            <motion.div key="cart" className="w-full">
              <CartScreen items={cartItems} onUpdateQty={updateCartQty} />
            </motion.div>
          )}
          {currentScreen === 'profile' && (
            <motion.div key="profile" className="w-full">
              <ProfileScreen />
            </motion.div>
          )}
          {currentScreen === 'detail' && selectedProduct && (
            <motion.div key="detail" className="w-full">
              <ProductDetailScreen 
                product={selectedProduct} 
                onBack={() => setCurrentScreen('home')} 
                onAddToCart={addToCart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav 
        activeTab={currentScreen === 'detail' ? 'home' : currentScreen} 
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)}
        onTabChange={(tab) => {
          setCurrentScreen(tab);
          setSelectedProduct(null);
        }} 
      />
    </div>
  );
}
