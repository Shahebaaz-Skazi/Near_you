import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Search,
  Mic,
  SlidersHorizontal,
  MapPin,
  TrendingUp,
  ShoppingBag,
  ShoppingCart,
  User,
  Percent,
  ClipboardList,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Settings,
  LogOut,
  Map,
  Store,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bell,
  Package,
  ShieldCheck,
  Activity,
  FileText,
  ChevronLeft,
  X,
  Phone,
  Mail,
  AlertCircle,
  HelpCircle,
  Info,
  Calendar,
  Share2,
  DollarSign,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATABASE DEFINITIONS ---

const INITIAL_STORES = [
  { id: 1, name: 'Sharma General Store', owner: 'Ramesh Sharma', distance: '340m', distanceMeters: 340, rating: 4.6, address: 'Shop 4, Koregaon Park Plaza, Pune', avatar: '👨‍💼', online: true },
  { id: 2, name: 'Patil Kirana', owner: 'Suresh Patil', distance: '520m', distanceMeters: 520, rating: 4.3, address: 'Lane 2, Viman Nagar, Pune', avatar: '🧔', online: true },
  { id: 3, name: 'New Mumbai Mart', owner: 'Anil Gupta', distance: '1.1km', distanceMeters: 1100, rating: 4.1, address: 'Kalyani Nagar Road, Pune', avatar: '👴', online: true },
  { id: 4, name: 'Om Provision Store', owner: 'Dinesh Joshi', distance: '1.4km', distanceMeters: 1400, rating: 4.4, address: 'Baner Main Road, Pune', avatar: '🧑‍💼', online: true },
];

const BASE_PRODUCTS = [
  { productId: 'p1', name: 'Aashirvaad Atta 5kg', mrp: 285, price: 272, category: 'Staples', emoji: '🌾', gradient: 'from-[#2C2010] to-[#120D06]' },
  { productId: 'p2', name: 'Amul Butter 500g', mrp: 275, price: 268, category: 'Dairy', emoji: '🧈', gradient: 'from-[#3A3215] to-[#1A1608]' },
  { productId: 'p3', name: 'Tata Salt 1kg', mrp: 28, price: 26, category: 'Staples', emoji: '🧂', gradient: 'from-[#1A1A1A] to-[#0A0A0A]' },
  { productId: 'p4', name: 'Fortune Sunflower Oil 1L', mrp: 165, price: 158, category: 'Staples', emoji: '🌻', gradient: 'from-[#2F2912] to-[#141206]' },
  { productId: 'p5', name: 'Parle-G Biscuits 800g', mrp: 55, price: 52, category: 'Snacks', emoji: '🍪', gradient: 'from-[#2E200F] to-[#140D05]' },
  { productId: 'p6', name: 'Nestlé Munch (pack of 12)', mrp: 120, price: 114, category: 'Snacks', emoji: '🍫', gradient: 'from-[#381212] to-[#140505]' },
  { productId: 'p7', name: 'Colgate MaxFresh 150g', mrp: 95, price: 89, category: 'Personal Care', emoji: '🪥', gradient: 'from-[#122438] to-[#050D14]' },
  { productId: 'p8', name: 'Surf Excel Easy Wash 1kg', mrp: 225, price: 210, category: 'Home', emoji: '🧺', gradient: 'from-[#181C3D] to-[#070914]' },
  { productId: 'p9', name: 'Amul Taaza Milk 1L', mrp: 62, price: 62, category: 'Dairy', emoji: '🥛', gradient: 'from-[#22252A] to-[#0C0E10]' },
  { productId: 'p10', name: 'Lay\'s Classic Salted (pack of 5)', mrp: 100, price: 95, category: 'Snacks', emoji: '🥔', gradient: 'from-[#332A10] to-[#141005]' },
  { productId: 'p11', name: 'Good Day Cashew Cookies 250g', mrp: 45, price: 42, category: 'Snacks', emoji: '🍪', gradient: 'from-[#2A2111] to-[#100D05]' },
  { productId: 'p12', name: 'Dettol Original Soap (4 pack)', mrp: 136, price: 128, category: 'Personal Care', emoji: '🧼', gradient: 'from-[#112F1F] to-[#05140C]' },
  { productId: 'p13', name: 'Vim Dishwash Liquid 500ml', mrp: 90, price: 84, category: 'Home', emoji: '🧴', gradient: 'from-[#1B2F10] to-[#081403]' },
  { productId: 'p14', name: 'Brooke Bond Red Label 500g', mrp: 220, price: 209, category: 'Beverages', emoji: '☕', gradient: 'from-[#3D1414] to-[#1A0505]' },
  { productId: 'p15', name: 'Maggi Noodles (pack of 12)', mrp: 204, price: 193, category: 'Snacks', emoji: '🍜', gradient: 'from-[#3A2C10] to-[#1A1205]' },
  { productId: 'p16', name: 'Crocin Pain Relief (pack of 15)', mrp: 60, price: 54, category: 'Medicine', emoji: '💊', gradient: 'from-[#3A1818] to-[#1A0707]' },
  { productId: 'p17', name: 'Vicks Vaporub 50g', mrp: 150, price: 140, category: 'Medicine', emoji: '🧪', gradient: 'from-[#122A2F] to-[#051214]' },
  { productId: 'p18', name: 'Dolo 650 (pack of 15)', mrp: 30, price: 27, category: 'Medicine', emoji: '💊', gradient: 'from-[#1A253A] to-[#070E1A]' },
];

const BUYER_PROFILE = {
  name: 'Rahul Kapoor',
  phone: '+91 98765 43210',
  email: 'rahul.kapoor@gmail.com',
  address: 'Flat 4B, Green Valley Society, Koregaon Park, Pune 411001',
  totalOrders: 14,
  totalSaved: 340,
  memberSince: 'Jan 2025'
};

const INITIAL_ORDERS = [
  {
    id: 1041,
    storeId: 1,
    storeName: 'Sharma General Store',
    items: [
      { productId: 'p2', name: 'Amul Butter 500g', price: 268, quantity: 1, emoji: '🧈', gradient: 'from-[#3A3215] to-[#1A1608]' },
      { productId: 'p3', name: 'Tata Salt 1kg', price: 26, quantity: 1, emoji: '🧂', gradient: 'from-[#1A1A1A] to-[#0A0A0A]' },
      { productId: 'p5', name: 'Parle-G Biscuits 800g', price: 52, quantity: 1, emoji: '🍪', gradient: 'from-[#2E200F] to-[#140D05]' }
    ],
    subtotal: 346,
    deliveryFee: 15,
    platformFee: 2,
    gst: 18,
    total: 381,
    status: 'Preparing',
    timestamp: '5 min ago',
    date: 'Today, 07:45 PM',
    buyerName: 'Rahul K.',
    buyerPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 4B, Green Valley Society, Koregaon Park, Pune 411001',
    step: 1
  },
  {
    id: 1038,
    storeId: 1,
    storeName: 'Sharma General Store',
    items: [
      { productId: 'p8', name: 'Surf Excel Easy Wash 1kg', price: 210, quantity: 1, emoji: '🧺', gradient: 'from-[#181C3D] to-[#070914]' },
      { productId: 'p15', name: 'Maggi Noodles (pack of 12)', price: 193, quantity: 2, emoji: '🍜', gradient: 'from-[#3A2C10] to-[#1A1205]' },
      { productId: 'p7', name: 'Colgate MaxFresh 150g', price: 89, quantity: 1, emoji: '🪥', gradient: 'from-[#122438] to-[#050D14]' }
    ],
    subtotal: 685,
    deliveryFee: 0,
    platformFee: 2,
    gst: 0,
    total: 687,
    status: 'Delivered',
    timestamp: '2 days ago',
    date: '27 Jul 2026',
    buyerName: 'Rahul K.',
    buyerPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 4B, Green Valley Society, Koregaon Park, Pune 411001',
    step: 3
  },
  {
    id: 1032,
    storeId: 2,
    storeName: 'Patil Kirana',
    items: [
      { productId: 'p4', name: 'Fortune Sunflower Oil 1L', price: 160, quantity: 2, emoji: '🌻', gradient: 'from-[#2F2912] to-[#141206]' },
      { productId: 'p9', name: 'Amul Taaza Milk 1L', price: 62, quantity: 1, emoji: '🥛', gradient: 'from-[#22252A] to-[#0C0E10]' },
      { productId: 'p11', name: 'Good Day Cashew Cookies 250g', price: 41, quantity: 1, emoji: '🍪', gradient: 'from-[#2A2111] to-[#100D05]' }
    ],
    subtotal: 423,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    total: 423,
    status: 'Delivered',
    timestamp: '5 days ago',
    date: '24 Jul 2026',
    buyerName: 'Rahul K.',
    buyerPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 4B, Green Valley Society, Koregaon Park, Pune 411001',
    step: 3
  }
];

// --- REACT STATE CONTEXT ---

export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('buyer'); // 'buyer' | 'seller'
  const [buyerTab, setBuyerTab] = useState('home'); // 'home' | 'deals' | 'orders' | 'profile' | 'cart'
  const [sellerTab, setSellerTab] = useState('dashboard'); // 'dashboard' | 'inventory' | 'orders' | 'settings'

  const [stores, setStores] = useState(INITIAL_STORES);
  const [toasts, setToasts] = useState([]);
  const [logs, setLogs] = useState([
    { id: 1, time: '19:51', text: '✨ NearYou hyperlocal luxury workspace initialised.' },
    { id: 2, time: '19:51', text: '🏪 Sharma General Store status: ONLINE (340m away).' },
    { id: 3, time: '19:51', text: '📦 Preloaded active order #1041. Sourced in Pune.' }
  ]);

  const initialProducts = useMemo(() => {
    const p = [];
    INITIAL_STORES.forEach((store) => {
      BASE_PRODUCTS.forEach((bp, index) => {
        if (store.id === 1 && index >= 12) return; // Skip p13-p18 for Sharma General Store initially

        let priceOffset = 0;
        if (store.id === 2) priceOffset = 2;
        if (store.id === 3) priceOffset = -3;
        if (store.id === 4) priceOffset = 1;

        let finalPrice = bp.price;
        if (bp.productId !== 'p9') { // Amul Milk has no markup
          finalPrice = Math.max(bp.price - 4, Math.min(bp.mrp, bp.price + priceOffset));
        }

        p.push({
          id: `s${store.id}_${bp.productId}`,
          productId: bp.productId,
          storeId: store.id,
          storeName: store.name,
          distance: store.distance,
          distanceMeters: store.distanceMeters,
          name: bp.name,
          category: bp.category,
          mrp: bp.mrp,
          price: finalPrice,
          inStock: true,
          stockQty: Math.floor(Math.random() * 15) + 12,
          emoji: bp.emoji,
          gradient: bp.gradient
        });
      });
    });
    return p;
  }, []);

  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  
  // Custom states
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryRadius, setDeliveryRadius] = useState(1.8); // in km
  const [activeTrackOrder, setActiveTrackOrder] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const addLog = (text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [
      { id: Date.now() + Math.random(), time: timeStr, text },
      ...prev.slice(0, 19)
    ]);
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3050);
  };

  // Cart operations
  const addToCart = (product, qty = 1) => {
    if (!product.inStock) {
      showToast('Item is currently out of stock', 'error');
      return;
    }
    
    const targetStore = stores.find(s => s.id === product.storeId);
    if (targetStore && !targetStore.online) {
      showToast(`${targetStore.name} is currently offline`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stockQty, existing.quantity + qty);
        addLog(`🛒 Updated ${product.name} quantity to ${newQty} in cart`);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      showToast(`Added ${product.name} to cart!`);
      addLog(`🛒 Added ${product.name} to cart (${product.storeName})`);
      return [...prev, { product, quantity: qty }];
    });
  };

  const updateCartQty = (productId, storeId, delta) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.productId === productId && i.product.storeId === storeId);
      if (!item) return prev;
      
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        addLog(`🛒 Removed ${item.product.name} from cart`);
        showToast(`Removed ${item.product.name}`);
        return prev.filter((i) => !(i.product.productId === productId && i.product.storeId === storeId));
      }
      
      if (newQty > item.product.stockQty) {
        showToast(`Only ${item.product.stockQty} items available in stock`, 'warning');
        return prev;
      }
      
      addLog(`🛒 Adjusted quantity of ${item.product.name} to ${newQty}`);
      return prev.map((i) =>
        i.product.productId === productId && i.product.storeId === storeId
          ? { ...i, quantity: newQty }
          : i
      );
    });
  };

  const removeFromCart = (productId, storeId) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.productId === productId && i.product.storeId === storeId);
      if (item) {
        addLog(`🛒 Removed ${item.product.name} from cart`);
        showToast(`Removed ${item.product.name}`);
      }
      return prev.filter((i) => !(i.product.productId === productId && i.product.storeId === storeId));
    });
  };

  // Checkout (Place Order)
  const placeOrder = () => {
    if (cart.length === 0) return;

    const storeGroups = cart.reduce((groups, item) => {
      const sid = item.product.storeId;
      if (!groups[sid]) groups[sid] = [];
      groups[sid].push(item);
      return groups;
    }, {});

    const newOrders = [];
    
    Object.keys(storeGroups).forEach((sid) => {
      const storeId = parseInt(sid);
      const groupItems = storeGroups[storeId];
      const storeObj = stores.find((s) => s.id === storeId);
      
      const subtotal = groupItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const deliveryFee = subtotal > 300 ? 0 : 15;
      const platformFee = 2;
      const gst = Math.round(subtotal * 0.05); 
      const total = subtotal + deliveryFee + platformFee + gst;
      
      const newOrderId = Math.floor(Math.random() * 1000) + 1042;
      
      const orderObj = {
        id: newOrderId,
        storeId,
        storeName: storeObj.name,
        items: groupItems.map((gi) => ({
          productId: gi.product.productId,
          name: gi.product.name,
          price: gi.product.price,
          quantity: gi.quantity,
          emoji: gi.product.emoji,
          gradient: gi.product.gradient
        })),
        subtotal,
        deliveryFee,
        platformFee,
        gst,
        total,
        status: 'Pending',
        timestamp: 'Just now',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        buyerName: BUYER_PROFILE.name.split(' ')[0] + ' ' + BUYER_PROFILE.name.split(' ')[1][0] + '.',
        buyerPhone: BUYER_PROFILE.phone,
        deliveryAddress: BUYER_PROFILE.address,
        step: 0
      };

      newOrders.push(orderObj);
      addLog(`⚡ Placed Order #${newOrderId} at ${storeObj.name} for ₹${total}`);
    });

    setOrders((prev) => [...newOrders, ...prev]);
    setCart([]);
    setShowConfetti(true);
    setBuyerTab('orders');
    showToast('Order Placed Successfully! 🎉');
  };

  // Reorder a past order
  const reorder = (pastOrder) => {
    let itemsAdded = 0;
    
    const targetStore = stores.find(s => s.id === pastOrder.storeId);
    if (targetStore && !targetStore.online) {
      showToast(`${targetStore.name} is offline. Cannot reorder now.`, 'error');
      return;
    }

    pastOrder.items.forEach((pastItem) => {
      const activeProd = products.find(
        (p) => p.productId === pastItem.productId && p.storeId === pastOrder.storeId
      );
      if (activeProd && activeProd.inStock) {
        setCart((prev) => {
          const existing = prev.find((item) => item.product.id === activeProd.id);
          if (existing) {
            return prev.map((item) =>
              item.product.id === activeProd.id
                ? { ...item, quantity: Math.min(activeProd.stockQty, existing.quantity + pastItem.quantity) }
                : item
            );
          }
          return [...prev, { product: activeProd, quantity: pastItem.quantity }];
        });
        itemsAdded++;
      }
    });

    if (itemsAdded > 0) {
      addLog(`🔄 Reordered ${itemsAdded} items from Order #${pastOrder.id}`);
      showToast(`Reordered ${itemsAdded} items successfully!`);
      setBuyerTab('cart');
    } else {
      showToast('All items in this order are currently out of stock.', 'error');
    }
  };

  // Merchant actions
  const acceptOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Preparing', step: 1 } : o))
    );
    addLog(`🏪 Sharma Ji accepted Order #${orderId}. Preparing items...`);
    showToast(`Order #${orderId} Accepted!`);
  };

  const declineOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled', step: -1 } : o))
    );
    addLog(`🚨 Sharma Ji declined Order #${orderId}.`);
    showToast(`Order #${orderId} Declined`, 'error');
  };

  const markReady = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Ready for Pickup', step: 2 } : o))
    );
    addLog(`🛵 Order #${orderId} is Ready for Pickup! Rider dispatched.`);
    showToast(`Order #${orderId} is Ready!`);
  };

  const markDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Delivered', step: 3 } : o))
    );
    addLog(`✅ Order #${orderId} delivered to buyer.`);
    showToast(`Order #${orderId} Delivered!`);
  };

  // Inventory modifications
  const updateProductPrice = (productId, storeId, newPrice) => {
    const parsedPrice = parseFloat(newPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) return;
    
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === productId && p.storeId === storeId ? { ...p, price: parsedPrice } : p
      )
    );
    const prod = products.find(p => p.productId === productId && p.storeId === storeId);
    addLog(`✍️ Sharma Ji changed ${prod ? prod.name : 'item'} price to ₹${parsedPrice}`);
    showToast('Price updated!');
  };

  const toggleProductStock = (productId, storeId) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.productId === productId && p.storeId === storeId) {
          const nextStock = !p.inStock;
          addLog(`📦 ${p.name} stock toggled: ${nextStock ? 'IN STOCK' : 'OUT OF STOCK'}`);
          showToast(`${p.name} is ${nextStock ? 'In Stock' : 'Out of Stock'}`);
          return { ...p, inStock: nextStock };
        }
        return p;
      })
    );
  };

  const updateProductStockQty = (productId, storeId, newQty) => {
    const qty = parseInt(newQty);
    if (isNaN(qty) || qty < 0) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === productId && p.storeId === storeId ? { ...p, stockQty: qty, inStock: qty > 0 } : p
      )
    );
  };

  // Add product from Master Catalog
  const addProductToStore = (productId, price, stockQty) => {
    const baseP = BASE_PRODUCTS.find((b) => b.productId === productId);
    if (!baseP) return;

    const parsedPrice = parseFloat(price) || baseP.price;
    const parsedQty = parseInt(stockQty) || 15;

    const exists = products.some((p) => p.productId === productId && p.storeId === 1);
    if (exists) {
      showToast('Product already registered in showcase', 'warning');
      return;
    }

    const newStoreProduct = {
      id: `s1_${baseP.productId}`,
      productId: baseP.productId,
      storeId: 1,
      storeName: 'Sharma General Store',
      distance: '340m',
      distanceMeters: 340,
      name: baseP.name,
      category: baseP.category,
      mrp: baseP.mrp,
      price: parsedPrice,
      inStock: true,
      stockQty: parsedQty,
      emoji: baseP.emoji,
      gradient: baseP.gradient
    };

    setProducts((prev) => [...prev, newStoreProduct]);
    addLog(`➕ Registered ${baseP.name} into Sharma General Store catalog`);
    showToast(`${baseP.name} added to showcase!`);
  };

  // Store status toggle
  const toggleShopOnline = () => {
    const currentStore = stores.find((s) => s.id === 1);
    const nextStatus = !currentStore.online;
    
    setStores((prev) =>
      prev.map((s) => (s.id === 1 ? { ...s, online: nextStatus } : s))
    );
    addLog(`⚡ Sharma General Store status: ${nextStatus ? 'ONLINE 🟢' : 'OFFLINE 🔴'}`);
    showToast(`Store went ${nextStatus ? 'Online' : 'Offline'}`);
  };

  // Simulate an order from buyer directly in merchant dashboard
  const simulateIncomingOrder = () => {
    const mockOrderItems = [
      { productId: 'p1', name: 'Aashirvaad Atta 5kg', price: 272, quantity: 1, emoji: '🌾', gradient: 'from-[#2C2010] to-[#120D06]' },
      { productId: 'p6', name: 'Nestlé Munch (pack of 12)', price: 114, quantity: 2, emoji: '🍫', gradient: 'from-[#381212] to-[#140505]' },
      { productId: 'p12', name: 'Dettol Soap (4 pack)', price: 128, quantity: 1, emoji: '🧼', gradient: 'from-[#112F1F] to-[#05140C]' }
    ];

    const subtotal = 500; 
    const deliveryFee = 0;
    const platformFee = 2;
    const gst = 31;
    const total = 661;
    const newOrderId = Math.floor(Math.random() * 1000) + 2000;

    const simulated = {
      id: newOrderId,
      storeId: 1,
      storeName: 'Sharma General Store',
      items: mockOrderItems,
      subtotal,
      deliveryFee,
      platformFee,
      gst,
      total,
      status: 'Pending',
      timestamp: 'Just now',
      date: 'Today, 08:12 PM',
      buyerName: 'Simran S.',
      buyerPhone: '+91 91234 56789',
      deliveryAddress: 'Flat 12A, Marvel Apartments, Koregaon Park, Pune',
      step: 0
    };

    setOrders((prev) => [simulated, ...prev]);
    addLog(`🔔 Simulated incoming Order #${newOrderId} from Simran S. (₹661)`);
    showToast('Simulated incoming order!', 'warning');
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        buyerTab,
        setBuyerTab,
        sellerTab,
        setSellerTab,
        stores,
        products,
        cart,
        orders,
        toasts,
        logs,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        deliveryRadius,
        setDeliveryRadius,
        activeTrackOrder,
        setActiveTrackOrder,
        showConfetti,
        setShowConfetti,
        addToCart,
        updateCartQty,
        removeFromCart,
        placeOrder,
        reorder,
        acceptOrder,
        declineOrder,
        markReady,
        markDelivered,
        updateProductPrice,
        toggleProductStock,
        updateProductStockQty,
        addProductToStore,
        toggleShopOnline,
        simulateIncomingOrder,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// --- SUB-COMPONENTS & LAYOUTS ---

// Toast Alert Component
const ToastSystem = () => {
  const { toasts } = useApp();
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-xs z-50 flex flex-col gap-2 pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className={`px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border-l-[3px] text-xs font-semibold backdrop-blur-md bg-brand-surface3 border-l-brand-gold text-brand-textPrimary shadow-[0_4px_20px_rgba(212,168,67,0.08)]`}
          >
            {toast.type === 'error' ? '🚨' : toast.type === 'warning' ? '⚠️' : '⚜️'}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Confetti Effect (falling gold leaf)
const Confetti = () => {
  const colors = ['#D4A843', '#F0C96B', '#A07820', '#1E1A0F', '#F5F0E8'];
  const pieces = Array.from({ length: 70 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2.5;
        const duration = Math.random() * 2 + 1.5;
        const size = Math.random() * 6 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 360;

        return (
          <div
            key={i}
            className="absolute rounded-sm opacity-90"
            style={{
              left: `${left}%`,
              top: `-15px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `rotate(${rotation}deg)`,
              animation: `fallDownConfetti ${duration}s linear ${delay}s infinite`
            }}
          />
        );
      })}
      <style>{`
        @keyframes fallDownConfetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(850px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Count-Up Numbers for Dashboard Stats
const CountUp = ({ to, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(to);
    if (isNaN(end) || end === 0) {
      setCount(to);
      return;
    }
    const steps = 30;
    const increment = end / steps;
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(interval);
  }, [to]);

  const formatted = count % 1 !== 0 ? count.toFixed(1) : count.toLocaleString('en-IN');
  return <span className="font-mono-gold">{prefix}{formatted}{suffix}</span>;
};

// Simulated Map Tracker Modal
const MapTrackerModal = ({ order, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 250);
    return () => clearInterval(timer);
  }, []);

  if (!order) return null;

  return (
    <div className="absolute inset-0 bg-[#080808]/85 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="w-full bg-brand-surface2 border-t border-brand-gold/15 rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] uppercase font-bold tracking-wider">📍 LIVE TRACKING</span>
            <span className="text-xs text-brand-textSecondary font-mono font-bold">#{order.id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-brand-gold/10 flex items-center justify-center hover:border-brand-gold/40 active:scale-90"
          >
            <X size={16} className="text-brand-textPrimary" />
          </button>
        </div>

        <h3 className="text-lg font-bold font-display italic text-brand-textPrimary">Scooter en route</h3>
        <p className="text-xs text-brand-textSecondary mt-1">Sourced from <span className="text-brand-gold font-bold">{order.storeName}</span></p>

        {/* CURVY ROAD MAP VISUALIZATION */}
        <div className="relative h-48 bg-brand-surface1 rounded-2xl overflow-hidden border border-brand-gold/12 my-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,168,67,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,168,67,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <svg className="absolute inset-0 w-full h-full p-6">
            <path
              d="M 40 110 Q 140 40, 200 120 T 340 80"
              fill="none"
              stroke="rgba(212,168,67,0.05)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              id="road-path"
              d="M 40 110 Q 140 40, 200 120 T 340 80"
              fill="none"
              stroke="rgba(212,168,67,0.08)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 40 110 Q 140 40, 200 120 T 340 80"
              fill="none"
              stroke="#D4A843"
              strokeWidth="4"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress / 100) * 400}
              strokeLinecap="round"
            />
          </svg>

          {/* Store Pin */}
          <div className="absolute left-4 top-[95px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand-surface3 border border-brand-gold/30 flex items-center justify-center text-xs shadow-lg">🏪</div>
            <span className="text-[9px] text-brand-textSecondary mt-1 font-semibold">Store</span>
          </div>

          {/* User Pin */}
          <div className="absolute right-4 top-[65px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand-gold border border-brand-goldLight flex items-center justify-center text-xs shadow-lg text-brand-bg font-bold">🏠</div>
            <span className="text-[9px] text-brand-textSecondary mt-1 font-semibold">Home</span>
          </div>

          {/* Delivery Rider Scooter */}
          <div
            className="absolute text-2xl transition-all duration-300 ease-out"
            style={{
              left: `${15 + progress * 0.7}%`,
              top: `${52 + Math.sin((progress * Math.PI) / 50) * 24}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            🛵
          </div>
        </div>

        <div className="gold-card p-4 border border-brand-gold/12 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-brand-surface1 border border-brand-gold/15 flex items-center justify-center text-lg">🚴</div>
          <div className="flex-1">
            <p className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary">Assigned Partner</p>
            <p className="text-sm font-semibold text-brand-textPrimary mt-0.5">Vikram Singh Rathore</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-brand-gold">
              <Star size={10} className="fill-brand-gold stroke-none" />
              <span className="font-bold">4.9 (1,240 deliveries)</span>
            </div>
          </div>
          <button
            onClick={() => showToast('Calling Vikram... (+91 98901 02030)')}
            className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold/20 active:scale-95 transition-all-custom"
          >
            <Phone size={16} />
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-brand-textSecondary uppercase tracking-wider block font-medium">Estimated Arrival</span>
            <span className="text-lg font-bold text-brand-gold mt-1 block font-mono-gold">
              {order.status === 'Preparing' ? '12-15 MINS' : order.status === 'Ready for Pickup' ? '8-10 MINS' : 'ARRIVED'}
            </span>
          </div>
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-brand-textSecondary uppercase tracking-wider block font-medium">Proximity Zone</span>
            <span className="text-lg font-bold text-brand-textPrimary mt-1 block font-mono">
              {order.status === 'Preparing' ? '320m away' : order.status === 'Ready for Pickup' ? '180m away' : '0m'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Flash Sale Countdown component
const FlashSaleTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 44 * 60 + 19);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 2 * 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-full font-mono text-[11px] font-bold pulse-gold-proximity">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
      <span>ENDS IN {format(secondsLeft)}</span>
    </div>
  );
};

// Proximity Badge Component
const ProximityBadge = ({ text }) => {
  return (
    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-brand-surface1/85 backdrop-blur-md border border-brand-gold/15 px-2 py-0.5 rounded-full text-[10px] font-semibold text-brand-gold">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold pulse-gold-proximity" />
      <span>📍 {text} away</span>
    </div>
  );
};

// Dynamic Price Stepper Component
const AddButtonStepper = ({ product }) => {
  const { cart, addToCart, updateCartQty } = useApp();
  const cartItem = cart.find((i) => i.product.id === product.id);

  if (!cartItem) {
    return (
      <button
        onClick={() => addToCart(product, 1)}
        disabled={!product.inStock}
        className={`w-full py-2 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 active:scale-95 ${
          product.inStock
            ? 'gold-gradient text-brand-bg hover:shadow-lg hover:shadow-brand-gold/20'
            : 'bg-white/5 border border-white/5 text-brand-textMuted cursor-not-allowed'
        }`}
      >
        {product.inStock ? (
          <>
            <Plus size={12} strokeWidth={3} />
            <span>ADD TO CART</span>
          </>
        ) : (
          <span>OUT OF STOCK</span>
        )}
      </button>
    );
  }

  return (
    <div className="w-full flex items-center justify-between gold-gradient rounded-xl px-2.5 py-1.5 text-brand-bg font-extrabold shadow-md">
      <button
        onClick={() => updateCartQty(product.productId, product.storeId, -1)}
        className="p-1 hover:bg-black/10 rounded-full active:scale-75 transition-all-custom"
      >
        <Minus size={13} strokeWidth={3} />
      </button>
      <span className="text-xs font-mono font-extrabold">{cartItem.quantity}</span>
      <button
        onClick={() => updateCartQty(product.productId, product.storeId, 1)}
        className="p-1 hover:bg-black/10 rounded-full active:scale-75 transition-all-custom"
      >
        <Plus size={13} strokeWidth={3} />
      </button>
    </div>
  );
};

// --- BUYER TABS ---

// Tab 1: HOME
const BuyerHome = () => {
  const {
    products,
    stores,
    setBuyerTab,
    setActiveCategory,
    setSearchQuery,
    searchQuery,
    reorder,
    orders
  } = useApp();

  const categories = [
    { name: 'Grocery', label: 'Grocery', emoji: '🛒' },
    { name: 'Dairy', label: 'Dairy', emoji: '🥛' },
    { name: 'Staples', label: 'Staples', emoji: '🍚' },
    { name: 'Personal Care', label: 'Personal Care', emoji: '🧴' },
    { name: 'Home', label: 'Home', emoji: '🧹' },
    { name: 'Beverages', label: 'Beverages', emoji: '🥤' },
    { name: 'Snacks', label: 'Snacks', emoji: '🍫' },
    { name: 'Medicine', label: 'Medicine', emoji: '💊' },
  ];

  const sellingFast = useMemo(() => {
    return products
      .filter((p) => {
        const s = stores.find((st) => st.id === p.storeId);
        return s && s.online && p.inStock;
      })
      .slice(0, 4);
  }, [products, stores]);

  const lastOrder = orders.find((o) => o.status === 'Delivered');

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary">HYPERLOCAL FLIGHT</span>
          {/* Typographic moment 1: Playfair Display */}
          <h2 className="text-xl font-bold font-display italic text-brand-textPrimary flex items-center gap-1.5 mt-0.5">
            Good morning, Rahul <span className="animate-bounce">👋</span>
          </h2>
        </div>
        <div className="flex items-center gap-1 bg-brand-surface1 border border-brand-gold/12 rounded-full px-3 py-1 text-xs">
          <MapPin size={12} className="text-brand-gold" />
          <span className="text-[11px] text-brand-textPrimary font-medium">Koregaon Park, Pune</span>
        </div>
      </div>

      {/* Hero Spotlight / Delivery banner */}
      <div className="relative overflow-hidden hero-spotlight border border-brand-gold/15 rounded-2xl py-3.5 px-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-gold">EXPRESS CONCIERGE</span>
          <span className="text-xs font-semibold text-brand-textPrimary mt-0.5">Society dispatch courier</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-gold font-mono bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full">
          <span>⚡ 8–15 MINS</span>
        </div>
      </div>

      {/* Glassmorphism Search Bar */}
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-4 text-brand-textSecondary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products in Koregaon Park..."
          className="w-full bg-brand-surface1 border border-brand-gold/12 rounded-2xl pl-11 pr-10 py-3.5 text-xs text-brand-textPrimary placeholder-brand-textSecondary focus:outline-none focus:border-brand-gold/40 transition-all"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setBuyerTab('deals');
            }
          }}
        />
        <SlidersHorizontal size={14} className="absolute right-4 text-brand-textSecondary cursor-pointer hover:text-brand-gold" />
      </div>

      {/* Categories Horizontal Scroll */}
      <div>
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-2.5">Shop Categories</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <div
              key={c.name}
              onClick={() => {
                setActiveCategory(c.name);
                setBuyerTab('deals');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-brand-surface1 border border-brand-gold/10 hover:border-brand-gold/30 rounded-xl text-xs text-brand-textPrimary font-medium cursor-pointer transition-all shrink-0"
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stores Near You */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary">Stores Near You</h3>
          <span className="text-[10px] text-brand-gold font-bold tracking-wider">LIVE SHOWCASE</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {stores.map((s) => (
            <div
              key={s.id}
              className="w-[200px] gold-card p-3 shrink-0 flex flex-col relative transition-all duration-300 hover:border-brand-gold/30"
            >
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full text-[9px] font-bold border border-brand-gold/15">
                <span className={`w-1.5 h-1.5 rounded-full ${s.online ? 'bg-brand-success animate-pulse' : 'bg-brand-error'}`} />
                <span className={s.online ? 'text-brand-success' : 'text-brand-error'}>
                  {s.online ? 'Open' : 'Closed'}
                </span>
              </div>

              <div className="text-2xl mt-1">{s.avatar}</div>
              <h4 className="text-xs font-bold text-brand-textPrimary mt-2 truncate">{s.name}</h4>
              <p className="text-[10px] text-brand-textSecondary mt-0.5 truncate">{s.address}</p>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-brand-gold/10">
                <div className="flex items-center gap-1 text-[10px] text-brand-gold font-bold">
                  <span>📍</span>
                  <span>{s.distance}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] font-bold bg-brand-gold/10 px-1.5 py-0.5 rounded text-brand-gold border border-brand-gold/20">
                  <span>⭐</span>
                  <span>{s.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selling Fast Grid */}
      <div>
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-2.5">Fast Moving Showcase 🔥</h3>
        <div className="grid grid-cols-2 gap-3">
          {sellingFast.map((item) => (
            <div key={item.id} className="gold-card gold-card-hover p-3 flex flex-col relative overflow-hidden group">
              <ProximityBadge text={item.distance} />
              
              <div className={`h-24 w-full rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-inner mb-2.5 border border-brand-gold/5`}>
                {item.emoji}
              </div>

              <h4 className="text-xs font-bold text-brand-textPrimary truncate">{item.name}</h4>
              <p className="text-[9px] text-brand-textSecondary truncate mt-0.5">{item.storeName}</p>

              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="font-mono-gold text-xs">₹{item.price}</span>
                <span className="text-[9px] text-brand-textMuted line-through font-mono">₹{item.mrp}</span>
              </div>

              <div className="mt-3">
                <AddButtonStepper product={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reorder card */}
      {lastOrder && (
        <div className="gold-card p-3.5 border border-brand-gold/20 bg-brand-surface3/40 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">RECENT ORDER</span>
            <h4 className="text-xs font-bold text-brand-textPrimary mt-1.5">Reorder from {lastOrder.storeName}</h4>
            <p className="text-[10px] text-brand-textSecondary mt-0.5 truncate">
              {lastOrder.items.map((i) => i.name).join(', ')}
            </p>
          </div>
          <button
            onClick={() => reorder(lastOrder)}
            className="px-4 py-2.5 text-xs font-extrabold gold-gradient text-brand-bg rounded-full hover:scale-95 active:scale-90 transition-all shrink-0 shadow-md shadow-brand-gold/15"
          >
            REORDER
          </button>
        </div>
      )}

      {/* Banner promo */}
      <div className="gold-card p-4 text-center flex flex-col items-center bg-brand-surface3/30 border border-brand-gold/15">
        <Sparkles size={20} className="text-brand-gold mb-1.5" />
        <h4 className="text-xs font-extrabold text-brand-textPrimary uppercase tracking-wider">Unlock Free Delivery</h4>
        <p className="text-[10px] text-brand-textSecondary mt-1 leading-relaxed max-w-xs">Introduce NearYou to your local apartment group. Get free deliveries for both accounts once they register.</p>
        <button
          onClick={() => {
            setBuyerTab('profile');
            showToast('Referral code copied!');
          }}
          className="mt-3 px-4 py-1.5 rounded-full border border-brand-gold/30 text-[10px] font-bold text-brand-gold hover:bg-brand-gold/5 active:scale-95"
        >
          SHARE CODE
        </button>
      </div>
    </div>
  );
};

// Tab 2: MY ORDERS
const BuyerOrders = () => {
  const { orders, reorder, setActiveTrackOrder } = useApp();

  const activeOrders = useMemo(() => orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled'), [orders]);
  const pastOrders = useMemo(() => orders.filter((o) => o.status === 'Delivered' || o.status === 'Cancelled'), [orders]);

  const stepsList = ['Confirmed', 'Preparing', 'Ready', 'Delivered'];

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold font-display text-brand-textPrimary">Your Orders</h2>
        <span className="text-[10px] bg-brand-surface1 border border-brand-gold/10 px-2 py-0.5 rounded text-brand-textSecondary font-mono">{orders.length} total</span>
      </div>

      {/* Active Orders Tracker */}
      {activeOrders.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary">Active Deliveries</h3>
          {activeOrders.map((order) => {
            const activeStep = order.step; 
            
            return (
              <div key={order.id} className="gold-card p-4 border border-brand-gold/25 flex flex-col relative">
                <div className="flex justify-between items-start pb-3 border-b border-brand-gold/10">
                  <div>
                    <h4 className="text-xs font-bold text-brand-textPrimary uppercase">{order.storeName}</h4>
                    <span className="text-[10px] text-brand-textSecondary mt-1 block">ID: #{order.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-gold text-xs">₹{order.total}</span>
                    <span className="text-[9px] text-brand-textSecondary block mt-0.5">{order.timestamp}</span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="my-4 flex items-center justify-between relative px-2">
                  <div className="absolute top-[14px] left-[15px] right-[15px] h-[2px] bg-brand-surface3 z-0">
                    <div
                      className="h-full bg-brand-gold transition-all duration-700 ease-out"
                      style={{ width: `${(activeStep / 3) * 100}%` }}
                    />
                  </div>

                  {stepsList.map((stepName, index) => {
                    const isPassed = index <= activeStep;
                    const isCurrent = index === activeStep;
                    return (
                      <div key={stepName} className="flex flex-col items-center z-10 relative">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${
                            isCurrent
                              ? 'bg-brand-surface2 border-brand-gold text-brand-gold shadow-[0_0_12px_rgba(212,168,67,0.25)]'
                              : isPassed
                              ? 'bg-brand-gold border-brand-gold text-brand-bg'
                              : 'bg-brand-surface1 border-brand-gold/10 text-brand-textMuted'
                          }`}
                        >
                          {index === 0 ? '✓' : index === 1 ? '🍳' : index === 2 ? '🛵' : '🎁'}
                        </div>
                        <span
                          className={`text-[8px] mt-1.5 uppercase font-bold tracking-wider ${
                            isCurrent ? 'text-brand-gold font-extrabold' : isPassed ? 'text-brand-textPrimary' : 'text-brand-textMuted'
                          }`}
                        >
                          {stepName}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveTrackOrder(order)}
                  className="w-full py-2.5 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/20 rounded-xl text-xs font-bold active:scale-95 transition-all-custom flex items-center justify-center gap-1.5"
                >
                  <Map size={12} />
                  <span>TRACK LIVE ON MAP</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Past Orders History */}
      <div>
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-2.5">Past Purchases</h3>
        {pastOrders.length === 0 && activeOrders.length === 0 ? (
          <div className="gold-card p-8 text-center flex flex-col items-center my-4">
            <span className="text-3xl">🛍️</span>
            <h4 className="text-sm font-bold text-brand-textPrimary mt-3">No orders placed</h4>
            <p className="text-xs text-brand-textSecondary mt-1 max-w-[200px] mx-auto leading-relaxed">Your neighborhood general store list is online now.</p>
            <button
              onClick={() => setBuyerTab('deals')}
              className="mt-4 px-5 py-2.5 gold-gradient text-brand-bg rounded-full text-xs font-bold active:scale-95 transition-all shadow-md"
            >
              BROWSE CATALOG
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pastOrders.map((order) => (
              <div key={order.id} className="gold-card p-3.5 flex flex-col gap-3 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-brand-textPrimary uppercase">{order.storeName}</h4>
                    <span className="text-[10px] text-brand-textSecondary mt-0.5 block">{order.date} • #{order.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-gold text-xs block">₹{order.total}</span>
                    <span className={`text-[9px] inline-block mt-1 px-2 py-0.5 rounded font-bold uppercase ${
                      order.status === 'Cancelled' ? 'bg-brand-error/10 text-brand-error' : 'bg-brand-success/10 text-brand-success'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="bg-black/20 rounded-xl p-2.5 border border-brand-gold/10">
                  <p className="text-[10.5px] text-brand-textSecondary leading-relaxed">
                    <span className="font-semibold text-brand-textPrimary">Sourced: </span>
                    {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => reorder(order)}
                    className="flex-1 py-2 bg-brand-gold/8 border border-brand-gold/20 text-brand-textPrimary hover:bg-brand-gold/15 active:scale-95 rounded-xl text-xs font-bold text-center transition-all"
                  >
                    REORDER PRODUCTS
                  </button>
                  {order.status !== 'Cancelled' && (
                    <button
                      onClick={() => showToast('Feedback recorded! Thank you.')}
                      className="px-3.5 py-2 border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/5 active:scale-95 rounded-xl text-xs font-bold text-center transition-all"
                    >
                      ⭐ RATE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Tab 3: EXPLORE DEALS
const BuyerDeals = () => {
  const {
    products,
    stores,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [sortOption, setSortOption] = useState('popularity'); 
  const [selectedBrand, setSelectedBrand] = useState('All');

  const categories = ['All', 'Grocery', 'Dairy', 'Staples', 'Personal Care', 'Home', 'Beverages', 'Snacks', 'Medicine'];

  const brands = [
    { name: 'All', label: 'All Brands', emoji: '✨' },
    { name: 'Amul', label: 'Amul', emoji: '🐄' },
    { name: 'Tata', label: 'Tata', emoji: '🍵' },
    { name: 'Aashirvaad', label: 'Aashirvaad', emoji: '🌾' },
    { name: 'Nestlé', label: 'Nestlé', emoji: '🪺' },
    { name: 'Parle', label: 'Parle', emoji: '🍪' }
  ];

  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    { title: 'SAVE ₹47 VS ZEPTO', desc: 'Guaranteed lower hyper-local pricing at Patil Kirana.', code: 'NEIGHBOR', color: 'from-[#080808] to-[#1E1A0F]' },
    { title: 'SHARMA JI ONLINE 🏪', desc: 'Sharma General Store is accepting checkout requests.', code: 'SHARMA15', color: 'from-[#080808] to-[#13110A]' },
    { title: 'STAPLES MEGA DISCOUNTS', desc: 'Rice, Atta & Oil directly sourced for Koregaon Park.', code: 'FREESHIP', color: 'from-[#080808] to-[#241A0B]' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((b) => (b === banners.length - 1 ? 0 : b + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const s = stores.find((st) => st.id === p.storeId);
        if (!s || !s.online) return false;

        if (searchQuery.trim() !== '') {
          const matchName = p.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchCat = p.category.toLowerCase().includes(searchQuery.toLowerCase());
          const matchStore = p.storeName.toLowerCase().includes(searchQuery.toLowerCase());
          if (!matchName && !matchCat && !matchStore) return false;
        }

        if (activeCategory !== 'All') {
          if (activeCategory === 'Grocery') {
            const isGrocery = ['Staples', 'Dairy', 'Home', 'Beverages', 'Snacks'].includes(p.category);
            if (!isGrocery) return false;
          } else if (p.category !== activeCategory) {
            return false;
          }
        }

        if (selectedBrand !== 'All') {
          if (!p.name.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'distance') return a.distanceMeters - b.distanceMeters;
        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
      });
  }, [products, stores, searchQuery, activeCategory, selectedBrand, sortOption]);

  const flashSaleItems = useMemo(() => {
    return products
      .filter((p) => {
        const s = stores.find((st) => st.id === p.storeId);
        return s && s.online && p.inStock && p.mrp - p.price > 10;
      })
      .slice(0, 3);
  }, [products, stores]);

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      {/* Search Input in Catalog */}
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-4 text-brand-textSecondary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter catalog products..."
          className="w-full bg-brand-surface1 border border-brand-gold/12 rounded-2xl pl-11 pr-10 py-3.5 text-xs text-brand-textPrimary placeholder-brand-textSecondary focus:outline-none focus:border-brand-gold/45 transition-all"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 text-brand-textSecondary hover:text-brand-textPrimary">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Auto-scrolling Hero Promo Banner Carousel */}
      <div className="relative h-28 rounded-2xl overflow-hidden border border-brand-gold/15 shadow-lg bg-brand-surface1">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${banners[activeBanner].color} px-5 py-3 flex flex-col justify-center transition-all duration-500`}
        >
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-gold">EXCLUSIVE VAULT</span>
          <h3 className="text-sm font-bold text-brand-textPrimary mt-1 uppercase font-display italic">{banners[activeBanner].title}</h3>
          <p className="text-[10px] text-brand-textSecondary mt-0.5 leading-tight">{banners[activeBanner].desc}</p>
        </div>
        
        <div className="absolute bottom-2 right-4 flex gap-1 z-10">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeBanner ? 'bg-brand-gold w-3.5' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      {/* Flash Sale Countdown & Grid */}
      <div className="gold-card p-3 border-brand-gold/15 bg-brand-surface3/10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-brand-gold text-xs">⚡</span>
            <h3 className="text-xs font-semibold tracking-wider text-brand-textPrimary uppercase">Flash Allocations</h3>
          </div>
          <FlashSaleTimer />
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {flashSaleItems.map((item) => (
            <div key={item.id} className="w-[125px] bg-brand-surface1 border border-brand-gold/10 p-2 rounded-xl shrink-0 flex flex-col">
              <span className="text-[8px] bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider self-start border border-brand-gold/20">
                SAVE ₹{item.mrp - item.price}
              </span>
              <div className="h-14 w-full bg-brand-surface2 rounded-lg flex items-center justify-center text-2xl my-2 border border-brand-gold/5">
                {item.emoji}
              </div>
              <h4 className="text-[10px] font-bold text-brand-textPrimary truncate">{item.name}</h4>
              <span className="font-mono-gold text-xs mt-1">₹{item.price}</span>
              <div className="mt-2">
                <AddButtonStepper product={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Filter Horizontal Scroll */}
      <div>
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-2.5">Distillers & Brands</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {brands.map((b) => (
            <div
              key={b.name}
              onClick={() => setSelectedBrand(b.name)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 border rounded-full text-[11px] font-semibold cursor-pointer transition-all shrink-0 ${
                selectedBrand === b.name
                  ? 'gold-gradient text-brand-bg border-brand-gold'
                  : 'bg-brand-surface1 border-brand-gold/10 text-brand-textPrimary hover:bg-brand-surface2'
              }`}
            >
              <span className="text-xs">{b.emoji}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls & Grid Options */}
      <div className="flex items-center justify-between border-b border-brand-gold/10 pb-2.5 mt-1">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="bg-transparent text-xs text-brand-textPrimary font-bold border-none focus:outline-none cursor-pointer pr-4"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-brand-bg text-brand-textPrimary text-xs">{c} Catalog</option>
          ))}
        </select>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-brand-textSecondary font-semibold uppercase">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-brand-surface1 border border-brand-gold/15 rounded-lg px-2.5 py-1 text-[11px] text-brand-gold font-bold focus:outline-none cursor-pointer"
          >
            <option value="popularity" className="bg-brand-bg text-brand-textPrimary">Popularity</option>
            <option value="price-low" className="bg-brand-bg text-brand-textPrimary">Price: Low-High</option>
            <option value="price-high" className="bg-brand-bg text-brand-textPrimary">Price: High-Low</option>
            <option value="distance" className="bg-brand-bg text-brand-textPrimary">Distance</option>
          </select>
        </div>
      </div>

      {/* Main Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <span className="text-3xl block">🔍</span>
          <h4 className="text-sm font-bold text-brand-textPrimary mt-3">No matching items</h4>
          <p className="text-xs text-brand-textSecondary mt-1 leading-relaxed">Adjust filters to reveal available boutique stock.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((item) => {
            const savings = item.mrp - item.price;
            const zeptoDiff = Math.floor(savings * 1.3) || 8;

            return (
              <div key={item.id} className="gold-card gold-card-hover p-3 flex flex-col relative overflow-hidden group">
                <ProximityBadge text={item.distance} />

                <div className={`h-24 w-full rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-inner mb-2.5 border border-brand-gold/5`}>
                  {item.emoji}
                </div>

                <h4 className="text-xs font-bold text-brand-textPrimary truncate">{item.name}</h4>
                <p className="text-[9px] text-brand-textSecondary truncate mt-0.5">{item.storeName}</p>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-mono-gold text-xs">₹{item.price}</span>
                  <span className="text-[9px] text-brand-textMuted line-through font-mono">₹{item.mrp}</span>
                  
                  {savings > 0 && (
                    <span className="text-[8px] bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-bold px-1.5 py-0.5 rounded-full ml-auto">
                      Save ₹{savings}
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex items-center text-[9px] font-bold text-brand-gold">
                  <span>⚜️ ₹{zeptoDiff} cheaper than Zepto</span>
                </div>

                <div className="mt-3">
                  <AddButtonStepper product={item} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Tab 4: PROFILE
const BuyerProfile = () => {
  const { showToast } = useApp();
  
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-brand-surface1 border border-brand-gold/12 rounded-2xl p-4">
        <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-sm font-bold text-brand-gold font-mono">
          RK
        </div>
        <div>
          <h3 className="text-sm font-bold text-brand-textPrimary">{BUYER_PROFILE.name}</h3>
          <p className="text-xs text-brand-textSecondary mt-0.5 font-mono">{BUYER_PROFILE.phone}</p>
          <p className="text-[10px] text-brand-textMuted mt-0.5">{BUYER_PROFILE.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-brand-surface1 border border-brand-gold/10 p-3 rounded-2xl text-center">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary block">Purchases</span>
          <span className="text-lg font-bold text-brand-textPrimary mt-1.5 block font-mono">14</span>
        </div>
        <div className="bg-brand-surface1 border border-brand-gold/10 p-3 rounded-2xl text-center">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary block">Total Saved</span>
          <span className="font-mono-gold text-lg mt-1.5 block">₹340</span>
        </div>
        <div className="bg-brand-surface1 border border-brand-gold/10 p-3 rounded-2xl text-center">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary block">Sourced Since</span>
          <span className="text-[11px] font-bold text-brand-textPrimary mt-2 block uppercase">Jan '25</span>
        </div>
      </div>

      {/* Saved Address Book */}
      <div className="gold-card p-4 border border-brand-gold/12 flex flex-col gap-3">
        <h4 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary">Delivery Residence</h4>
        <div className="bg-black/20 p-3.5 rounded-xl border border-brand-gold/10 flex gap-2 items-start">
          <div className="text-sm mt-0.5">🏠</div>
          <div className="flex-1">
            <p className="text-xs font-bold text-brand-textPrimary">Home Society</p>
            <p className="text-[10.5px] text-brand-textSecondary mt-1 leading-relaxed">{BUYER_PROFILE.address}</p>
          </div>
          <span className="text-[10px] font-bold text-brand-gold cursor-pointer hover:underline" onClick={() => showToast('Edit details')}>EDIT</span>
        </div>
      </div>

      {/* Refer & Earn Premium Card */}
      <div className="gold-card p-4 bg-brand-surface3/30 border border-brand-gold/20 flex flex-col relative overflow-hidden">
        <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded-full self-start">
          CONCIERGE PASS
        </span>
        <h4 className="text-sm font-bold text-brand-textPrimary mt-3 font-display italic">Acquire Free Ship Rights</h4>
        <p className="text-xs text-[#9A8F7A] mt-1 leading-relaxed">
          Invite residents of your building complex. Once 3 neighbors complete a checkout, unlock unlimited free deliveries.
        </p>
        <div className="mt-3 flex gap-2">
          <div className="flex-1 bg-black/40 border border-brand-gold/10 rounded-xl px-3 py-2 text-xs font-mono text-brand-gold font-bold flex items-center justify-between">
            <span>NY-KOREGAON-98</span>
            <span className="text-[10px] text-brand-textSecondary">COPY</span>
          </div>
          <button
            onClick={() => showToast('Referral link shared!')}
            className="px-4 py-2.5 text-xs font-bold gold-gradient text-brand-bg rounded-xl active:scale-95 transition-all shadow-md shadow-brand-gold/15"
          >
            SHARE
          </button>
        </div>
      </div>

      {/* Other Settings Options */}
      <div className="gold-card p-2">
        <div className="flex items-center justify-between p-2.5 border-b border-brand-gold/10 hover:bg-white/5 cursor-pointer text-xs rounded-xl" onClick={() => showToast('UPI Details')}>
          <span className="text-brand-textPrimary">Payment Gateways</span>
          <ChevronRight size={14} className="text-brand-textSecondary" />
        </div>
        <div className="flex items-center justify-between p-2.5 border-b border-brand-gold/10 hover:bg-white/5 cursor-pointer text-xs rounded-xl" onClick={() => showToast('Help Center')}>
          <span className="text-brand-textPrimary">Concierge Support</span>
          <ChevronRight size={14} className="text-brand-textSecondary" />
        </div>
        <div className="flex items-center justify-between p-2.5 border-b border-brand-gold/10 hover:bg-white/5 cursor-pointer text-xs rounded-xl" onClick={() => showToast('Showcase Terms')}>
          <span className="text-brand-textPrimary">Showcase Legal</span>
          <ChevronRight size={14} className="text-brand-textSecondary" />
        </div>
        <div className="flex items-center justify-between p-2.5 hover:bg-brand-error/10 hover:text-brand-error cursor-pointer text-xs rounded-xl" onClick={() => showToast('Logged out')}>
          <span className="text-brand-error font-semibold flex items-center gap-1">
            <LogOut size={12} />
            Logout from NearYou
          </span>
          <ChevronRight size={14} className="text-brand-error" />
        </div>
      </div>
    </div>
  );
};

// Tab 5: CART
const BuyerCart = () => {
  const { cart, updateCartQty, removeFromCart, placeOrder, setBuyerTab } = useApp();

  const groupedCart = useMemo(() => {
    return cart.reduce((groups, item) => {
      const sid = item.product.storeId;
      if (!groups[sid]) {
        groups[sid] = {
          storeName: item.product.storeName,
          distance: item.product.distance,
          items: []
        };
      }
      groups[sid].items.push(item);
      return groups;
    }, {});
  }, [cart]);

  const billingInfo = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const mrpSubtotal = cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
    const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 15;
    const platformFee = subtotal === 0 ? 0 : 2;
    const gst = Math.round(subtotal * 0.05); 
    const total = subtotal + deliveryFee + platformFee + gst;
    const savings = mrpSubtotal - subtotal;
    const zeptoSavings = savings > 0 ? savings + 14 : 0;

    return { subtotal, deliveryFee, platformFee, gst, total, savings, zeptoSavings };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col justify-center items-center text-center">
        <ShoppingCart size={48} className="text-brand-textSecondary animate-pulse" />
        <h3 className="text-sm font-bold text-brand-textPrimary mt-4">Your bag is empty</h3>
        <p className="text-xs text-brand-textSecondary mt-1.5 max-w-[200px] leading-relaxed">Fill your delivery cart with premium neighborhood products.</p>
        <button
          onClick={() => setBuyerTab('deals')}
          className="mt-5 px-6 py-2.5 gold-gradient text-brand-bg font-extrabold rounded-full text-xs hover:scale-95 active:scale-90 transition-all cursor-pointer shadow-md shadow-brand-gold/15"
        >
          GO SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-brand-gold/10 pb-2.5">
        <h2 className="text-lg font-bold font-display text-brand-textPrimary">Your Bag</h2>
        <span className="text-[10px] bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2.5 py-0.5 rounded font-mono font-bold">
          {cart.length} ITEMS SELECTED
        </span>
      </div>

      {/* Store Grouped Items list */}
      <div className="flex flex-col gap-4">
        {Object.keys(groupedCart).map((sid) => {
          const group = groupedCart[sid];
          return (
            <div key={sid} className="gold-card p-3 border border-brand-gold/12">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-brand-gold/10">
                <div>
                  <h4 className="text-xs font-bold text-brand-textPrimary uppercase">{group.storeName}</h4>
                  <span className="text-[9px] text-brand-textSecondary mt-0.5 block">📍 Proximity: {group.distance} away</span>
                </div>
                <span className="text-[9px] bg-brand-surface1 border border-brand-gold/10 px-2.5 py-0.5 rounded text-brand-textSecondary font-bold font-mono">
                  {group.items.length} items
                </span>
              </div>

              {/* Items in store */}
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.product.gradient} flex items-center justify-center text-xl shrink-0 border border-brand-gold/5`}>
                      {item.product.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-brand-textPrimary truncate">{item.product.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="font-mono-gold text-xs">₹{item.product.price}</span>
                        <span className="text-[9px] text-brand-textMuted line-through font-mono">₹{item.product.mrp}</span>
                      </div>
                    </div>

                    {/* Stepper controller */}
                    <div className="flex items-center gap-2 bg-brand-surface1 border border-brand-gold/10 rounded-lg p-1 font-mono text-xs">
                      <button
                        onClick={() => updateCartQty(item.product.productId, item.product.storeId, -1)}
                        className="w-5 h-5 rounded hover:bg-white/5 flex items-center justify-center text-brand-textPrimary"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-5 text-center font-bold text-brand-textPrimary text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.product.productId, item.product.storeId, 1)}
                        className="w-5 h-5 rounded hover:bg-white/5 flex items-center justify-center text-brand-textPrimary"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.productId, item.product.storeId)}
                      className="p-1.5 text-brand-error hover:bg-brand-error/15 rounded-lg active:scale-90 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bill summary breakdown */}
      <div className="gold-card p-4 border border-brand-gold/12 flex flex-col gap-2.5">
        <h4 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-1">Invoice Receipt</h4>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-textSecondary">Boutique Subtotal</span>
          <span className="font-mono-gold text-xs">₹{billingInfo.subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-textSecondary">Concierge Dispatch</span>
          <span className="text-brand-textPrimary font-mono font-medium">
            {billingInfo.deliveryFee === 0 ? (
              <span className="text-brand-gold font-bold">FREE</span>
            ) : (
              `₹${billingInfo.deliveryFee}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-textSecondary">NearYou Platform Fee</span>
          <span className="font-mono-gold text-xs">₹{billingInfo.platformFee}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-textSecondary">State VAT & GST (5%)</span>
          <span className="font-mono-gold text-xs">₹{billingInfo.gst}</span>
        </div>

        <div className="border-t border-brand-gold/10 pt-2.5 mt-1 flex justify-between items-center">
          <span className="text-xs font-bold text-brand-textPrimary">Total Invoice</span>
          <span className="font-mono-gold text-sm">₹{billingInfo.total}</span>
        </div>
      </div>

      {/* Savings Notification Alert */}
      {billingInfo.savings > 0 && (
        <div className="gold-card p-3.5 border border-brand-success/15 bg-brand-surface3/40 flex gap-2.5 items-center">
          <span className="text-lg">👑</span>
          <div className="text-[10.5px] text-brand-textSecondary leading-tight">
            Society savings check: <span className="text-brand-gold font-bold">₹{billingInfo.savings}</span> applied.
            <span className="block text-[9.5px] mt-0.5 text-brand-success font-semibold">₹{billingInfo.zeptoSavings} cheaper than Blinkit/Zepto!</span>
          </div>
        </div>
      )}

      <div className="gold-card p-3.5 border border-brand-gold/12 flex gap-3 items-center">
        <MapPin size={16} className="text-brand-gold shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Deliver Address</p>
          <p className="text-xs font-medium text-brand-textPrimary truncate mt-0.5">{BUYER_PROFILE.address}</p>
        </div>
        <ChevronRight size={14} className="text-brand-textSecondary" />
      </div>

      {/* Place Order Checkout Button */}
      <button
        onClick={placeOrder}
        className="w-full py-4 gold-gradient text-brand-bg rounded-full text-xs font-extrabold tracking-widest active:scale-95 transition-all-custom cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-brand-gold/25"
      >
        <span>PLACE ORDER</span>
        <ArrowRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
};

// --- SHOP OWNER TABS ---

// Tab 1: DASHBOARD
const SellerDashboard = () => {
  const { orders, acceptOrder, declineOrder, markReady, simulateIncomingOrder } = useApp();

  const storeOrders = useMemo(() => orders.filter((o) => o.storeId === 1), [orders]);
  
  const pendingOrders = useMemo(() => storeOrders.filter((o) => o.status === 'Pending'), [storeOrders]);
  const activeOrders = useMemo(() => storeOrders.filter((o) => o.status === 'Preparing' || o.status === 'Ready for Pickup'), [storeOrders]);
  const completedOrders = useMemo(() => storeOrders.filter((o) => o.status === 'Delivered'), [storeOrders]);

  const totalRevenue = useMemo(() => {
    return completedOrders.reduce((acc, o) => acc + o.total, 0) + 4280; 
  }, [completedOrders]);

  const ordersCount = completedOrders.length + activeOrders.length + 23;

  const graphData = [
    { day: 'Mon', value: 2400 },
    { day: 'Tue', value: 3100 },
    { day: 'Wed', value: 1800 },
    { day: 'Thu', value: 4500 },
    { day: 'Fri', value: 2900 },
    { day: 'Sat', value: 5200 },
    { day: 'Sun', value: totalRevenue }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">MERCHANT HUB</span>
          <h2 className="text-lg font-bold font-display italic text-brand-textPrimary mt-0.5">Sharma Ji Dashboard 🏪</h2>
        </div>
        <button
          onClick={simulateIncomingOrder}
          className="px-3 py-1.5 bg-brand-surface1 border border-brand-gold/20 text-brand-gold rounded-full text-[10px] font-bold active:scale-95 transition-all flex items-center gap-1 shadow"
        >
          <span>SIMULATE CUSTOMER ORDER</span>
          <span>🛒</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="gold-card p-3 flex flex-col relative overflow-hidden">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Today Revenue</span>
          <span className="text-lg font-bold font-mono text-brand-gold mt-1">
            ₹<CountUp to={totalRevenue} />
          </span>
          <span className="text-[8px] text-brand-success font-semibold mt-1">📈 +18.4% vs last week</span>
        </div>

        <div className="gold-card p-3 flex flex-col">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Orders Count</span>
          <span className="text-lg font-bold font-mono text-brand-textPrimary mt-1">
            <CountUp to={ordersCount} />
          </span>
          <span className="text-[8px] text-brand-success font-semibold mt-1">📈 +12% vs last week</span>
        </div>

        <div className="gold-card p-3 flex flex-col">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Pending Review</span>
          <span className="text-lg font-bold font-mono text-brand-warning mt-1">
            <CountUp to={pendingOrders.length} />
          </span>
          <span className="text-[8px] text-brand-textSecondary mt-1">Needs shop approval</span>
        </div>

        <div className="gold-card p-3 flex flex-col">
          <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Store Rating</span>
          <span className="text-lg font-bold font-mono text-brand-gold mt-1">4.6 ⭐</span>
          <span className="text-[8px] text-brand-textSecondary mt-1">Based on 124 reviews</span>
        </div>
      </div>

      {/* Alarm Alert for Pending orders */}
      {pendingOrders.length > 0 && (
        <div className="p-3 bg-brand-surface3 border border-brand-warning rounded-2xl animate-pulse flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔔</span>
            <div className="text-xs text-brand-warning font-bold uppercase tracking-wider">
              {pendingOrders.length} New Checkout Requests!
            </div>
          </div>
          <span className="text-[9.5px] bg-brand-warning/20 border border-brand-warning/45 text-brand-warning font-bold px-2 py-0.5 rounded font-mono">
            ALERT
          </span>
        </div>
      )}

      {/* Active Orders List */}
      <div>
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-2.5">Incoming orders</h3>
        {storeOrders.length === 0 ? (
          <div className="gold-card p-6 text-center">
            <span className="text-3xl block">📦</span>
            <h4 className="text-xs font-bold text-brand-textPrimary mt-2.5">No active queue</h4>
            <p className="text-[10.5px] text-brand-textSecondary mt-1">All orders are cleared or completed.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {storeOrders.map((order) => {
              if (order.status === 'Delivered' || order.status === 'Cancelled') return null;

              return (
                <div
                  key={order.id}
                  className={`gold-card p-3.5 flex flex-col gap-2.5 border transition-all duration-300 ${
                    order.status === 'Pending' ? 'border-brand-warning/60 shadow-[0_0_10px_rgba(230,126,34,0.1)]' : 'border-brand-gold/10'
                  }`}
                >
                  <div className="flex justify-between items-start pb-2 border-b border-brand-gold/10">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-brand-textPrimary uppercase">Order #{order.id}</h4>
                        <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded font-mono uppercase ${
                          order.status === 'Pending'
                            ? 'bg-brand-warning/10 text-brand-warning'
                            : 'bg-brand-gold/10 text-brand-gold'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-brand-textSecondary mt-0.5 block">Customer: {order.buyerName} ({order.timestamp})</span>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="font-mono-gold text-xs">₹{order.total}</span>
                      {order.status === 'Preparing' && (
                        <div className="flex items-center gap-1 text-[9.5px] text-brand-warning font-mono mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-warning animate-ping" />
                          <span>Preparing: ⏱️ 4 min</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-black/20 p-2.5 rounded-xl border border-brand-gold/5 text-[11px] text-brand-textSecondary">
                    <ul className="flex flex-col gap-1">
                      {order.items.map((i) => (
                        <li key={i.productId} className="flex justify-between text-brand-textPrimary/80">
                          <span>{i.name}</span>
                          <span className="font-bold font-mono">x{i.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => acceptOrder(order.id)}
                          className="flex-1 py-2 gold-gradient text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all shadow-md shadow-brand-gold/15"
                        >
                          ACCEPT ORDER
                        </button>
                        <button
                          onClick={() => declineOrder(order.id)}
                          className="px-4 py-2 border border-brand-gold/25 hover:bg-brand-error/10 hover:text-brand-error rounded-xl text-xs font-semibold text-brand-textSecondary transition-all"
                        >
                          DECLINE
                        </button>
                      </>
                    )}
                    {order.status === 'Preparing' && (
                      <button
                        onClick={() => markReady(order.id)}
                        className="w-full py-2.5 gold-gradient text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all shadow-md shadow-brand-gold/15"
                      >
                        ✓ READY FOR COURIER DISPATCH
                      </button>
                    )}
                    {order.status === 'Ready for Pickup' && (
                      <button
                        onClick={() => markDelivered(order.id)}
                        className="w-full py-2.5 bg-brand-surface3 border border-brand-gold/30 text-brand-gold font-bold rounded-xl text-xs active:scale-95 transition-all"
                      >
                        ✓ CONFIRM COMPLETED HANDOVER
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SVG css graph */}
      <div className="gold-card p-4">
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-3.5">Weekly Sales Trend</h3>
        <div className="h-44 flex items-end justify-between gap-2.5 pt-4 px-1.5">
          {graphData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full relative flex flex-col items-center justify-end h-32">
                <div className="absolute -top-7 bg-brand-surface2 border border-brand-gold/20 text-[9px] text-brand-gold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-mono z-10 shadow-lg">
                  ₹{Math.round(d.value)}
                </div>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand-goldDark to-brand-goldLight transition-all duration-700 hover:brightness-110"
                  style={{ height: `${(d.value / 6500) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-brand-textSecondary font-bold font-mono mt-1">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tab 2: INVENTORY
const SellerInventory = () => {
  const { products, updateProductPrice, toggleProductStock, addProductToStore } = useApp();

  const [invQuery, setInvQuery] = useState('');
  const [selectedInvCat, setSelectedInvCat] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProdId, setNewProdId] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdQty, setNewProdQty] = useState('15');

  const storeInventory = useMemo(() => {
    return products.filter((p) => p.storeId === 1);
  }, [products]);

  const masterCatalogAddable = useMemo(() => {
    return BASE_PRODUCTS.filter(
      (bp) => !storeInventory.some((p) => p.productId === bp.productId)
    );
  }, [storeInventory]);

  const filteredInventory = useMemo(() => {
    return storeInventory.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(invQuery.toLowerCase());
      const matchCat = selectedInvCat === 'All' || p.category === selectedInvCat;
      return matchSearch && matchCat;
    });
  }, [storeInventory, invQuery, selectedInvCat]);

  const [editingId, setEditingId] = useState(null);
  const [editPriceVal, setEditPriceVal] = useState('');

  const handleSavePrice = (id, newP) => {
    const target = storeInventory.find(p => p.id === id);
    if (target) {
      updateProductPrice(target.productId, 1, newP);
    }
    setEditingId(null);
  };

  const handleSaveProductForm = () => {
    if (!newProdId) return;
    addProductToStore(newProdId, newProdPrice, newProdQty);
    setShowAddForm(false);
    setNewProdId('');
    setNewProdPrice('');
    setNewProdQty('15');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold font-display text-brand-textPrimary">Boutique Inventory</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3.5 py-2 gold-gradient text-brand-bg font-extrabold rounded-full text-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brand-gold/15"
        >
          <Plus size={13} strokeWidth={2.5} />
          <span>ADD NEW ITEM</span>
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 flex items-center">
          <Search size={14} className="absolute left-3 text-brand-textSecondary" />
          <input
            type="text"
            value={invQuery}
            onChange={(e) => setInvQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-brand-surface1 border border-brand-gold/10 rounded-xl pl-9 pr-3 py-2 text-xs text-brand-textPrimary placeholder-brand-textSecondary focus:outline-none"
          />
        </div>
        
        <select
          value={selectedInvCat}
          onChange={(e) => setSelectedInvCat(e.target.value)}
          className="bg-brand-surface1 border border-brand-gold/12 rounded-xl px-2 text-xs text-brand-gold font-bold focus:outline-none cursor-pointer"
        >
          <option value="All" className="bg-brand-bg text-brand-textPrimary">All boutique</option>
          <option value="Staples" className="bg-brand-bg text-brand-textPrimary">Staples</option>
          <option value="Dairy" className="bg-brand-bg text-brand-textPrimary">Dairy</option>
          <option value="Snacks" className="bg-brand-bg text-brand-textPrimary">Snacks</option>
          <option value="Personal Care" className="bg-brand-bg text-brand-textPrimary">Personal Care</option>
          <option value="Home" className="bg-brand-bg text-brand-textPrimary">Home Care</option>
          <option value="Beverages" className="bg-brand-bg text-brand-textPrimary">Beverages</option>
          <option value="Medicine" className="bg-brand-bg text-brand-textPrimary">Medicine</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filteredInventory.map((item) => {
          const isEditing = editingId === item.id;
          const marketAvg = Math.round(item.mrp * 0.95);

          return (
            <div key={item.id} className="gold-card p-3 flex gap-3 items-center border border-brand-gold/10 bg-brand-surface1/60">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xl shrink-0 border border-brand-gold/5`}>
                {item.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-brand-textPrimary truncate">{item.name}</h4>
                  <span className="text-[8px] bg-brand-surface3 border border-brand-gold/15 text-brand-gold px-1.5 py-0.2 rounded uppercase font-bold tracking-wider">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-brand-textSecondary font-mono">MRP: ₹{item.mrp}</span>
                  <span className="text-[10px] text-brand-gold font-bold font-mono">Sugg. Price: ₹{marketAvg}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <span className="text-brand-primary text-xs font-mono">₹</span>
                    <input
                      type="number"
                      value={editPriceVal}
                      onChange={(e) => setEditPriceVal(e.target.value)}
                      className="w-14 bg-brand-surface2 border border-brand-gold text-brand-gold text-xs font-bold font-mono rounded px-1.5 py-0.5 focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSavePrice(item.id, editPriceVal);
                      }}
                    />
                    <button
                      onClick={() => handleSavePrice(item.id, editPriceVal)}
                      className="p-1 rounded-full bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20"
                    >
                      <Check size={10} strokeWidth={3} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setEditingId(item.id);
                      setEditPriceVal(item.price.toString());
                    }}
                    className="text-brand-gold text-xs font-bold font-mono bg-brand-gold/5 hover:bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.8 rounded cursor-pointer transition-all flex items-center gap-1"
                  >
                    <span>₹{item.price}</span>
                    <span className="text-[8px] text-brand-textSecondary font-normal">✍️</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-brand-textSecondary font-semibold">
                    {item.inStock ? 'In Stock' : 'Out'}
                  </span>
                  <div
                    onClick={() => toggleProductStock(item.productId, 1)}
                    className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer transition-all duration-355 ${
                      item.inStock ? 'bg-brand-gold' : 'bg-brand-textMuted'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-slate-900 transition-all duration-355 ${
                        item.inStock ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#080808]/85 backdrop-blur-sm z-50 flex items-end justify-center"
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="w-full bg-brand-surface2 border-t border-brand-gold/15 rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between mb-4.5">
                <h3 className="text-sm font-bold text-brand-textPrimary uppercase tracking-wider">Acquire Catalog Item</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="w-7 h-7 rounded-full bg-white/5 border border-brand-gold/10 flex items-center justify-center hover:bg-white/10"
                >
                  <X size={14} className="text-brand-textPrimary" />
                </button>
              </div>

              {masterCatalogAddable.length === 0 ? (
                <p className="text-xs text-brand-textSecondary text-center py-6 leading-relaxed">
                  All available master catalog listings are registered in your showroom.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Select Catalog Item</span>
                    <select
                      value={newProdId}
                      onChange={(e) => {
                        setNewProdId(e.target.value);
                        const bItem = BASE_PRODUCTS.find((p) => p.productId === e.target.value);
                        if (bItem) setNewProdPrice(bItem.price.toString());
                      }}
                      className="w-full bg-brand-surface1 border border-brand-gold/12 rounded-xl px-3 py-2.5 text-xs text-brand-textPrimary focus:outline-none"
                    >
                      <option value="">-- Choose Item from Catalog --</option>
                      {masterCatalogAddable.map((b) => (
                        <option key={b.productId} value={b.productId}>
                          {b.emoji} {b.name} (MRP: ₹{b.mrp})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Store Showcase Price (₹)</span>
                    <input
                      type="number"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="Showcase price"
                      className="w-full bg-brand-surface1 border border-brand-gold/12 rounded-xl px-3 py-2.5 text-xs text-brand-textPrimary font-mono focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="tracking-[0.15em] text-[8px] uppercase font-bold text-brand-textSecondary">Initial Stock Quantity</span>
                    <input
                      type="number"
                      value={newProdQty}
                      onChange={(e) => setNewProdQty(e.target.value)}
                      placeholder="Stock quantity (e.g. 15)"
                      className="w-full bg-brand-surface1 border border-brand-gold/12 rounded-xl px-3 py-2.5 text-xs text-brand-textPrimary font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveProductForm}
                    disabled={!newProdId}
                    className="w-full py-3 gold-gradient text-brand-bg rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all mt-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-gold/15"
                  >
                    SAVE TO SHOWCASE
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Tab 3: ORDERS
const SellerOrders = () => {
  const { orders, acceptOrder, markReady, markDelivered } = useApp();
  const [activeQueueTab, setActiveQueueTab] = useState('Pending');

  const storeOrders = useMemo(() => orders.filter((o) => o.storeId === 1), [orders]);

  const filteredQueue = useMemo(() => {
    return storeOrders.filter((o) => {
      if (activeQueueTab === 'Pending') return o.status === 'Pending';
      if (activeQueueTab === 'Preparing') return o.status === 'Preparing';
      if (activeQueueTab === 'Ready') return o.status === 'Ready for Pickup';
      if (activeQueueTab === 'Completed') return o.status === 'Delivered';
      return false;
    });
  }, [storeOrders, activeQueueTab]);

  const statusToggles = ['Pending', 'Preparing', 'Ready', 'Completed'];

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <h2 className="text-lg font-bold font-display text-brand-textPrimary">Merchant Order Logs</h2>

      <div className="flex bg-brand-surface1 border border-brand-gold/10 p-1 rounded-xl gap-1">
        {statusToggles.map((st) => {
          const count = storeOrders.filter((o) => {
            if (st === 'Pending') return o.status === 'Pending';
            if (st === 'Preparing') return o.status === 'Preparing';
            if (st === 'Ready') return o.status === 'Ready for Pickup';
            if (st === 'Completed') return o.status === 'Delivered';
            return false;
          }).length;

          return (
            <button
              key={st}
              onClick={() => setActiveQueueTab(st)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex flex-col items-center ${
                activeQueueTab === st
                  ? 'gold-gradient text-brand-bg'
                  : 'text-brand-textSecondary hover:text-brand-textPrimary'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[8.5px] font-mono mt-0.5 ${activeQueueTab === st ? 'text-brand-bg/85' : 'text-brand-textSecondary/70'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filteredQueue.length === 0 ? (
          <div className="gold-card p-8 text-center text-brand-textSecondary">
            <span className="text-3xl">🗂️</span>
            <p className="text-xs mt-3">No orders found in "{activeQueueTab}" queue.</p>
          </div>
        ) : (
          filteredQueue.map((o) => (
            <div key={o.id} className="gold-card p-3.5 flex flex-col gap-2.5 border border-brand-gold/10">
              <div className="flex justify-between items-start pb-2 border-b border-brand-gold/10">
                <div>
                  <h4 className="text-xs font-bold text-brand-textPrimary">ORDER ID: #{o.id}</h4>
                  <span className="text-[9.5px] text-brand-textSecondary mt-0.5 block">{o.date} • {o.buyerName}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono-gold text-xs block">₹{o.total}</span>
                  <span className="text-[9px] text-brand-textSecondary block mt-0.5 font-mono font-semibold">{o.timestamp}</span>
                </div>
              </div>

              <div className="bg-black/15 p-2 rounded-lg border border-brand-gold/5">
                <p className="text-[10px] text-brand-textSecondary leading-relaxed">
                  <span className="font-semibold text-brand-textPrimary">Residence:</span> {o.deliveryAddress}
                </p>
              </div>

              <div className="text-[11px] text-brand-textSecondary pl-1">
                <ul className="flex flex-col gap-1 list-disc pl-3">
                  {o.items.map((it) => (
                    <li key={it.productId} className="text-brand-textPrimary/85">
                      {it.name} <span className="font-mono font-bold text-brand-gold ml-1">(x{it.quantity})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                {o.status === 'Pending' && (
                  <button
                    onClick={() => acceptOrder(o.id)}
                    className="w-full py-2 gold-gradient text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all shadow-md"
                  >
                    ACCEPT CHECKOUT REQUEST
                  </button>
                )}
                {o.status === 'Preparing' && (
                  <button
                    onClick={() => markReady(o.id)}
                    className="w-full py-2 gold-gradient text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all shadow-md"
                  >
                    ✓ PACK & SHIP READY
                  </button>
                )}
                {o.status === 'Ready for Pickup' && (
                  <button
                    onClick={() => markDelivered(o.id)}
                    className="w-full py-2 bg-brand-surface3 border border-brand-gold/30 text-brand-gold font-bold rounded-xl text-xs active:scale-95 transition-all"
                  >
                    ✓ COMPLETE DISPATCHED DELIVERY
                  </button>
                )}
                {o.status === 'Delivered' && (
                  <div className="text-center w-full text-[10px] font-semibold text-brand-success py-1.5 bg-brand-surface1 border border-brand-gold/15 rounded-lg uppercase tracking-wider">
                    ✅ Order Fully Settled & Handed Over
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Tab 4: PROFILE & SHOP SETTINGS
const SellerSettings = () => {
  const { deliveryRadius, setDeliveryRadius, toggleShopOnline, stores } = useApp();

  const storeInfo = useMemo(() => stores.find((s) => s.id === 1), [stores]);

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <h2 className="text-lg font-bold font-display text-brand-textPrimary">Shop Settings</h2>

      <div className="gold-card p-4 border border-brand-gold/20 bg-brand-surface3/40 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">Showroom LIVE Status</h3>
          <p className="text-[10px] text-brand-textSecondary mt-0.5 leading-tight">Switch offline to hide checkout.</p>
        </div>
        <div
          onClick={toggleShopOnline}
          className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all-custom ${
            storeInfo.online
              ? 'bg-[#4CAF82] text-brand-bg shadow-[0_0_12px_rgba(76,175,130,0.25)]'
              : 'bg-brand-error text-brand-textPrimary'
          }`}
        >
          {storeInfo.online ? '🟢 ONLINE' : '🔴 OFFLINE'}
        </div>
      </div>

      <div className="gold-card p-4 border border-brand-gold/10 bg-brand-surface1/60 flex gap-3 items-center">
        <span className="text-3xl">🏪</span>
        <div>
          <h3 className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">{storeInfo.name}</h3>
          <p className="text-[11px] text-brand-textSecondary mt-0.5 font-medium">Proprietor: {storeInfo.owner}</p>
          <p className="text-[10px] text-brand-textMuted font-mono mt-1">GSTIN: 27AABCS1423B1Z2</p>
        </div>
      </div>

      <div className="gold-card p-4 border border-brand-gold/12">
        <div className="flex justify-between items-center mb-1">
          <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary">Dispatch Zone radius</h3>
          <span className="text-xs font-mono font-bold text-brand-gold">{deliveryRadius} km</span>
        </div>
        
        <div className="relative h-40 bg-brand-surface1 rounded-2xl overflow-hidden border border-brand-gold/10 my-3 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,168,67,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,168,67,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div
            className="absolute rounded-full border border-brand-gold bg-brand-gold/10 transition-all duration-300 flex items-center justify-center"
            style={{
              width: `${35 + ((deliveryRadius - 0.5) / 4.5) * 95}px`,
              height: `${35 + ((deliveryRadius - 0.5) / 4.5) * 95}px`
            }}
          >
            <div className="absolute inset-0 rounded-full border border-brand-gold/30 animate-ping opacity-25" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-2xl">🏪</span>
          </div>

          <div className="absolute right-[45px] top-[40px] text-xs pointer-events-none opacity-40">🏠</div>
          <div className="absolute left-[30px] bottom-[30px] text-xs pointer-events-none opacity-40">🏠</div>
        </div>

        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={deliveryRadius}
          onChange={(e) => setDeliveryRadius(parseFloat(e.target.value))}
          className="w-full accent-brand-gold mt-2 cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-brand-textSecondary font-bold mt-1 uppercase">
          <span>0.5 km</span>
          <span>Coverage Zone</span>
          <span>5.0 km</span>
        </div>
      </div>

      <div className="gold-card p-4 border border-brand-gold/12 flex flex-col gap-2">
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-1">KYC Credentials</h3>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
          <div className="bg-brand-success/10 border border-brand-success/20 text-brand-success py-2 rounded-xl">
            ✓ Phone Verified
          </div>
          <div className="bg-brand-success/10 border border-brand-success/20 text-brand-success py-2 rounded-xl">
            ✓ Doc Verified
          </div>
          <div className="bg-brand-warning/10 border border-brand-warning/20 text-brand-warning py-2 rounded-xl animate-pulse">
            ⏳ FSSAI Pending
          </div>
        </div>
      </div>

      <div className="gold-card p-4 border border-brand-gold/12">
        <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-textSecondary mb-2">Settlement Node</h3>
        <div className="bg-black/20 p-2.5 rounded-xl border border-brand-gold/10 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-brand-textPrimary">UPIN link</p>
            <p className="text-brand-textSecondary font-mono mt-0.5">ramesh.sharma@paytm</p>
          </div>
          <span className="text-[10px] bg-brand-gold/10 border border-brand-gold/20 text-brand-gold px-2.5 py-0.5 rounded font-bold">
            PRIMARY ACCOUNT
          </span>
        </div>
      </div>
    </div>
  );
};

// --- APP SHELL MAIN VIEW CONTAINER ---

function NearYouApp() {
  const {
    mode,
    setMode,
    buyerTab,
    setBuyerTab,
    sellerTab,
    setSellerTab,
    cart,
    logs,
    activeTrackOrder,
    setActiveTrackOrder,
    showConfetti,
    setShowConfetti
  } = useApp();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const cartCount = useMemo(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-textPrimary font-sans flex flex-col md:flex-row items-center justify-center p-0 md:p-6 lg:p-10 select-none overflow-x-hidden relative">
      
      {/* Golden radial light spot from top */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#21180A]/10 to-transparent pointer-events-none" />

      {/* LEFT COLUMN: INVESTOR DECK INFO NOTES (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col gap-5 w-80 shrink-0 text-left mr-8">
        <div>
          <div className="flex items-center gap-2">
            {/* Typographic moment 2: Playfair Display */}
            <span className="text-3xl font-bold font-display italic text-brand-gold tracking-tight">NearYou</span>
            <span className="text-[9px] bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-2 py-0.5 rounded-full font-bold uppercase">
              10Cr SEED STAGE
            </span>
          </div>
          <p className="text-xs text-brand-textSecondary mt-2.5 leading-relaxed">
            Rolls-Royce meets food delivery. A boutique hyperlocal dispatch ring linking premium buyers with neighborhood general merchants.
          </p>
        </div>

        <div className="gold-card p-4 border border-brand-gold/15 flex flex-col gap-3">
          <h3 className="tracking-[0.15em] text-[9px] uppercase font-bold text-brand-gold flex items-center gap-1.5">
            <Sparkles size={13} className="text-brand-gold" />
            Showcase Guidelines
          </h3>
          
          <ul className="text-[11px] text-brand-textSecondary flex flex-col gap-2.5 leading-relaxed">
            <li>
              <span className="text-brand-textPrimary font-semibold">🔄 Synced Dual State:</span> Toggle modes dynamically. All cart items, shop pricing, and online tags remain linked!
            </li>
            <li>
              <span className="text-brand-textPrimary font-semibold">🛒 Checkout Loop:</span> Add boutique items ➔ Place order ➔ Flip to Shop Owner side dashboard to approve and pack order!
            </li>
            <li>
              <span className="text-brand-textPrimary font-semibold">📦 Stock Controls:</span> Toggle stock or modify prices in Inventory. Updates reflect in real time.
            </li>
          </ul>
        </div>

        <div className="text-[10px] text-brand-textMuted flex flex-col gap-0.5 font-medium">
          <span>Target zone: Pune / Mumbai boutique complexes</span>
          <span>Engine: React 18 + Capacitor.js + Tailwind</span>
          <span>© 2026 NearYou Inc. Private Investor Deck.</span>
        </div>
      </div>

      {/* CENTER COLUMN: SMARTPHONE DEVICE WRAPPER FRAME */}
      <div className="w-full max-w-md bg-brand-bg text-brand-textPrimary min-h-screen md:min-h-[850px] md:h-[850px] md:rounded-[40px] md:border-[8px] md:border-[#1E1A0F] md:shadow-[0_20px_50px_rgba(212,168,67,0.15)] relative overflow-hidden flex flex-col z-10">
        
        {showConfetti && <Confetti />}

        <ToastSystem />

        {activeTrackOrder && (
          <MapTrackerModal
            order={activeTrackOrder}
            onClose={() => setActiveTrackOrder(null)}
          />
        )}

        {/* TOP STATUS BAR */}
        <div className="w-full bg-brand-bg py-2.5 px-6 flex justify-between items-center text-[10px] font-bold tracking-wider font-mono text-brand-textSecondary shrink-0 select-none border-b border-brand-gold/12">
          <span>19:51 📱</span>
          <div className="w-16 h-4.5 bg-black/60 rounded-full border border-brand-gold/15 flex items-center justify-center text-[9px] text-brand-gold font-bold">
            NearYou Gold
          </div>
          <div className="flex items-center gap-1">
            <span>5G</span>
            <span className="text-[11px]">🔋</span>
          </div>
        </div>

        {/* TOP DUAL-MODE CONTROLLER SWITCH PILL */}
        <div className="w-full bg-brand-bg py-3.5 px-4 flex justify-center border-b border-brand-gold/12 shrink-0 z-20">
          <div className="flex bg-brand-surface1 border border-brand-gold/20 rounded-full p-1 w-full max-w-[290px] relative">
            <button
              onClick={() => setMode('buyer')}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                mode === 'buyer' ? 'text-brand-bg gold-gradient shadow' : 'text-brand-textMuted'
              }`}
            >
              <span>🛒</span>
              <span>Buyer Mode</span>
            </button>
            <button
              onClick={() => setMode('seller')}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                mode === 'seller' ? 'text-brand-bg gold-gradient shadow' : 'text-brand-textMuted'
              }`}
            >
              <span>🏪</span>
              <span>Shop Owner</span>
            </button>
          </div>
        </div>

        {/* MAIN BODY TABS SCREEN VIEWS */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode === 'buyer' ? `b_${buyerTab}` : `s_${sellerTab}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.12 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {mode === 'buyer' ? (
                <>
                  {buyerTab === 'home' && <BuyerHome />}
                  {buyerTab === 'orders' && <BuyerOrders />}
                  {buyerTab === 'deals' && <BuyerDeals />}
                  {buyerTab === 'profile' && <BuyerProfile />}
                  {buyerTab === 'cart' && <BuyerCart />}
                </>
              ) : (
                <>
                  {sellerTab === 'dashboard' && <SellerDashboard />}
                  {sellerTab === 'inventory' && <SellerInventory />}
                  {sellerTab === 'orders' && <SellerOrders />}
                  {sellerTab === 'settings' && <SellerSettings />}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* FLOATING CART FLOATER */}
          {mode === 'buyer' && buyerTab !== 'cart' && cartCount > 0 && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setBuyerTab('cart')}
              className="absolute bottom-20 right-4 w-12 h-12 gold-gradient rounded-full text-brand-bg shadow-xl shadow-brand-gold/30 flex items-center justify-center z-40 border border-brand-goldLight"
            >
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#C0392B] border-2 border-brand-bg text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            </motion.button>
          )}
        </div>

        {/* BOTTOM NAVIGATION BARS */}
        <div className="w-full bg-[#080808]/95 backdrop-blur-md border-t border-brand-gold/12 py-2 px-4 flex justify-around items-center shrink-0 z-30">
          {mode === 'buyer' ? (
            <>
              <button
                onClick={() => setBuyerTab('home')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'home' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <Store size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
                {buyerTab === 'home' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>
              
              <button
                onClick={() => setBuyerTab('deals')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'deals' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <Percent size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Deals</span>
                {buyerTab === 'deals' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>

              <button
                onClick={() => setBuyerTab('orders')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'orders' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <ClipboardList size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Orders</span>
                {buyerTab === 'orders' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>

              <button
                onClick={() => setBuyerTab('cart')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom relative ${
                  buyerTab === 'cart' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-brand-gold rounded-full border border-brand-bg animate-pulse" />
                )}
                <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
                {buyerTab === 'cart' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>

              <button
                onClick={() => setBuyerTab('profile')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'profile' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <User size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
                {buyerTab === 'profile' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setSellerTab('dashboard')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'dashboard' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <Activity size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Dashboard</span>
                {sellerTab === 'dashboard' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>
              
              <button
                onClick={() => setSellerTab('inventory')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'inventory' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <Package size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Inventory</span>
                {sellerTab === 'inventory' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>

              <button
                onClick={() => setSellerTab('orders')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'orders' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <FileText size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Orders</span>
                {sellerTab === 'orders' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>

              <button
                onClick={() => setSellerTab('settings')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'settings' ? 'text-brand-gold' : 'text-brand-textMuted hover:text-brand-textSecondary'
                }`}
              >
                <Settings size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Settings</span>
                {sellerTab === 'settings' && <span className="w-1 h-1 rounded-full bg-brand-gold mt-0.5" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: REALTIME SYSTEM LOGGER CONSOLE */}
      <div className="hidden md:flex flex-col gap-4 w-72 shrink-0 text-left ml-8 self-stretch pt-2">
        <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
          Reactive Stream Log
        </h3>
        
        <div className="flex-1 bg-black/40 border border-brand-gold/10 rounded-3xl p-4 overflow-y-auto max-h-[750px] font-mono text-[10px] text-brand-textSecondary flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="pb-2 border-b border-brand-gold/5 leading-relaxed"
              >
                <span className="text-brand-gold font-bold mr-1.5">[{log.time}]</span>
                <span className="text-brand-textPrimary/80">{log.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="gold-card p-3 border border-brand-gold/10 bg-brand-surface3/10 text-brand-textSecondary">
          <p className="text-[9.5px] leading-snug">
            💡 <span className="text-brand-gold font-semibold">Boutique Demo:</span> Place checkout orders, adjust operating radius, or modify prices. Events sync dynamically across the buyer and seller state containers.
          </p>
        </div>
      </div>

    </div>
  );
}

// Wrapper to export context provider
export default function App() {
  return (
    <AppProvider>
      <NearYouApp />
    </AppProvider>
  );
}
