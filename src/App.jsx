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
  { productId: 'p1', name: 'Aashirvaad Atta 5kg', mrp: 285, price: 272, category: 'Staples', emoji: '🌾', gradient: 'from-amber-800 to-amber-950' },
  { productId: 'p2', name: 'Amul Butter 500g', mrp: 275, price: 268, category: 'Dairy', emoji: '🧈', gradient: 'from-yellow-400 to-yellow-600' },
  { productId: 'p3', name: 'Tata Salt 1kg', mrp: 28, price: 26, category: 'Staples', emoji: '🧂', gradient: 'from-slate-500 to-slate-700' },
  { productId: 'p4', name: 'Fortune Sunflower Oil 1L', mrp: 165, price: 158, category: 'Staples', emoji: '🌻', gradient: 'from-yellow-600 to-amber-700' },
  { productId: 'p5', name: 'Parle-G Biscuits 800g', mrp: 55, price: 52, category: 'Snacks', emoji: '🍪', gradient: 'from-orange-500 to-amber-800' },
  { productId: 'p6', name: 'Nestlé Munch (pack of 12)', mrp: 120, price: 114, category: 'Snacks', emoji: '🍫', gradient: 'from-red-600 to-amber-900' },
  { productId: 'p7', name: 'Colgate MaxFresh 150g', mrp: 95, price: 89, category: 'Personal Care', emoji: '🪥', gradient: 'from-blue-600 to-teal-500' },
  { productId: 'p8', name: 'Surf Excel Easy Wash 1kg', mrp: 225, price: 210, category: 'Home', emoji: '🧺', gradient: 'from-blue-600 to-indigo-800' },
  { productId: 'p9', name: 'Amul Taaza Milk 1L', mrp: 62, price: 62, category: 'Dairy', emoji: '🥛', gradient: 'from-blue-200 to-slate-400' },
  { productId: 'p10', name: 'Lay\'s Classic Salted (pack of 5)', mrp: 100, price: 95, category: 'Snacks', emoji: '🥔', gradient: 'from-yellow-400 to-yellow-600' },
  { productId: 'p11', name: 'Good Day Cashew Cookies 250g', mrp: 45, price: 42, category: 'Snacks', emoji: '🍪', gradient: 'from-amber-600 to-orange-700' },
  { productId: 'p12', name: 'Dettol Original Soap (4 pack)', mrp: 136, price: 128, category: 'Personal Care', emoji: '🧼', gradient: 'from-emerald-700 to-green-900' },
  { productId: 'p13', name: 'Vim Dishwash Liquid 500ml', mrp: 90, price: 84, category: 'Home', emoji: '🧴', gradient: 'from-green-500 to-yellow-500' },
  { productId: 'p14', name: 'Brooke Bond Red Label 500g', mrp: 220, price: 209, category: 'Beverages', emoji: '☕', gradient: 'from-red-800 to-red-950' },
  { productId: 'p15', name: 'Maggi Noodles (pack of 12)', mrp: 204, price: 193, category: 'Snacks', emoji: '🍜', gradient: 'from-yellow-500 to-red-600' },
  { productId: 'p16', name: 'Crocin Pain Relief (pack of 15)', mrp: 60, price: 54, category: 'Medicine', emoji: '💊', gradient: 'from-red-500 to-blue-500' },
  { productId: 'p17', name: 'Vicks Vaporub 50g', mrp: 150, price: 140, category: 'Medicine', emoji: '🧪', gradient: 'from-teal-600 to-indigo-900' },
  { productId: 'p18', name: 'Dolo 650 (pack of 15)', mrp: 30, price: 27, category: 'Medicine', emoji: '💊', gradient: 'from-blue-500 to-sky-700' },
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
      { productId: 'p2', name: 'Amul Butter 500g', price: 268, quantity: 1, emoji: '🧈', gradient: 'from-yellow-400 to-yellow-600' },
      { productId: 'p3', name: 'Tata Salt 1kg', price: 26, quantity: 1, emoji: '🧂', gradient: 'from-slate-500 to-slate-700' },
      { productId: 'p5', name: 'Parle-G Biscuits 800g', price: 52, quantity: 1, emoji: '🍪', gradient: 'from-orange-500 to-amber-800' }
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
      { productId: 'p8', name: 'Surf Excel Easy Wash 1kg', price: 210, quantity: 1, emoji: '🧺', gradient: 'from-blue-600 to-indigo-800' },
      { productId: 'p15', name: 'Maggi Noodles (pack of 12)', price: 193, quantity: 2, emoji: '🍜', gradient: 'from-yellow-500 to-red-600' },
      { productId: 'p7', name: 'Colgate MaxFresh 150g', price: 89, quantity: 1, emoji: '🪥', gradient: 'from-blue-600 to-teal-500' }
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
      { productId: 'p4', name: 'Fortune Sunflower Oil 1L', price: 160, quantity: 2, emoji: '🌻', gradient: 'from-yellow-600 to-amber-700' },
      { productId: 'p9', name: 'Amul Taaza Milk 1L', price: 62, quantity: 1, emoji: '🥛', gradient: 'from-blue-200 to-slate-400' },
      { productId: 'p11', name: 'Good Day Cashew Cookies 250g', price: 41, quantity: 1, emoji: '🍪', gradient: 'from-amber-600 to-orange-700' }
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
    { id: 1, time: '19:51', text: '✨ NearYou hyperlocal workspace initialised.' },
    { id: 2, time: '19:51', text: '🏪 Sharma General Store is now LIVE (340m away).' },
    { id: 3, time: '19:51', text: '📦 Preloaded active order #1041. Status: Preparing.' }
  ]);

  // Generate initial products with store mapping.
  const initialProducts = useMemo(() => {
    const p = [];
    INITIAL_STORES.forEach((store) => {
      BASE_PRODUCTS.forEach((bp, index) => {
        // Skip p13-p18 for store 1 initially (Master Catalog demonstration)
        if (store.id === 1 && index >= 12) return;

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

  // Helper log addition
  const addLog = (text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [
      { id: Date.now() + Math.random(), time: timeStr, text },
      ...prev.slice(0, 19)
    ]);
  };

  // Toast manager
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Cart operations
  const addToCart = (product, qty = 1) => {
    if (!product.inStock) {
      showToast('Item is currently out of stock', 'error');
      return;
    }
    
    // Check if store is online
    const targetStore = stores.find(s => s.id === product.storeId);
    if (targetStore && !targetStore.online) {
      showToast(`${targetStore.name} is currently Offline`, 'error');
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

    // Group items by storeId
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
      const gst = Math.round(subtotal * 0.05); // 5% GST
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
        buyerName: BUYER_PROFILE.name.split(' ')[0] + ' ' + BUYER_PROFILE.name.split(' ')[1][0] + '.', // Masked: Rahul K.
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
    
    // Check store is online
    const targetStore = stores.find(s => s.id === pastOrder.storeId);
    if (targetStore && !targetStore.online) {
      showToast(`${targetStore.name} is offline. Cannot reorder now.`, 'error');
      return;
    }

    pastOrder.items.forEach((pastItem) => {
      // Find current active product offer
      const activeProd = products.find(
        (p) => p.productId === pastItem.productId && p.storeId === pastOrder.storeId
      );
      if (activeProd && activeProd.inStock) {
        // Add to cart with quantity
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

    // Check if already in store
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
    addLog(`⚡ Sharma General Store is now ${nextStatus ? 'ONLINE 🟢' : 'OFFLINE 🔴'}`);
    showToast(`Store went ${nextStatus ? 'Online' : 'Offline'}`);
  };

  // Simulate an order from buyer directly in merchant dashboard
  const simulateIncomingOrder = () => {
    const mockOrderItems = [
      { productId: 'p1', name: 'Aashirvaad Atta 5kg', price: 272, quantity: 1, emoji: '🌾', gradient: 'from-amber-700 to-amber-900' },
      { productId: 'p6', name: 'Nestlé Munch (pack of 12)', price: 114, quantity: 2, emoji: '🍫', gradient: 'from-red-600 to-amber-900' },
      { productId: 'p12', name: 'Dettol Soap (4 pack)', price: 128, quantity: 1, emoji: '🧼', gradient: 'from-emerald-700 to-green-900' }
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
            className={`px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border text-xs font-semibold backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-brand-error/15 border-brand-error/30 text-brand-error'
                : toast.type === 'warning'
                ? 'bg-brand-warning/15 border-brand-warning/30 text-brand-warning'
                : 'bg-brand-primary/15 border-brand-primary/30 text-brand-primary'
            }`}
          >
            {toast.type === 'error' ? '🚨' : toast.type === 'warning' ? '⚠️' : '✅'}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Confetti Effect
const Confetti = () => {
  const colors = ['#AAFF00', '#6C63FF', '#22C55E', '#F59E0B', '#EF4444', '#F8FAFC'];
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
              animation: `fallDown ${duration}s linear ${delay}s infinite`
            }}
          />
        );
      })}
      <style>{`
        @keyframes fallDown {
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
  return <span>{prefix}{formatted}{suffix}</span>;
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
    <div className="absolute inset-0 bg-[#0A0E1A]/85 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="w-full bg-[#111827] border-t border-white/10 rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs">📍 LIVE TRACKING</span>
            <span className="text-xs text-brand-muted font-mono font-bold">#{order.id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-90"
          >
            <X size={16} />
          </button>
        </div>

        <h3 className="text-lg font-bold font-display text-white">Scooter on the way!</h3>
        <p className="text-xs text-brand-muted mt-1">Delivery from <span className="text-brand-primary">{order.storeName}</span></p>

        {/* CURVY ROAD MAP VISUALIZATION */}
        <div className="relative h-48 bg-[#0B0F19] rounded-2xl overflow-hidden border border-white/5 my-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <svg className="absolute inset-0 w-full h-full p-6">
            <path
              d="M 40 110 Q 140 40, 200 120 T 340 80"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              id="road-path"
              d="M 40 110 Q 140 40, 200 120 T 340 80"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 40 110 Q 140 40, 200 120 T 340 80"
              fill="none"
              stroke="#AAFF00"
              strokeWidth="4"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress / 100) * 400}
              strokeLinecap="round"
            />
          </svg>

          {/* Store Pin */}
          <div className="absolute left-4 top-[95px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-xs shadow-lg border border-white/10">🏪</div>
            <span className="text-[9px] text-brand-muted mt-1 font-semibold">Merchant</span>
          </div>

          {/* User Pin */}
          <div className="absolute right-4 top-[65px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-xs shadow-lg border border-white/10 text-brand-bg font-bold">🏠</div>
            <span className="text-[9px] text-brand-muted mt-1 font-semibold">You</span>
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

        <div className="glass-card p-4 border border-white/5 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg">🚴</div>
          <div className="flex-1">
            <p className="text-xs text-brand-muted uppercase font-bold tracking-wider">Assigned Delivery Partner</p>
            <p className="text-sm font-semibold text-white mt-0.5">Vikram Singh Rathore</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-brand-primary">
              <Star size={10} className="fill-brand-primary" />
              <span>4.9 (1,240 deliveries)</span>
            </div>
          </div>
          <button
            onClick={() => showToast('Calling Vikram... (+91 98901 02030)')}
            className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary flex items-center justify-center hover:bg-brand-primary/20 active:scale-95 transition-all-custom"
          >
            <Phone size={16} />
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
            <span className="text-xs text-brand-muted block">Estimated Delivery</span>
            <span className="text-lg font-bold text-brand-primary mt-1 block font-mono">
              {order.status === 'Preparing' ? '12-15 Mins' : order.status === 'Ready for Pickup' ? '8-10 Mins' : 'Delivered'}
            </span>
          </div>
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
            <span className="text-xs text-brand-muted block">Distance Left</span>
            <span className="text-lg font-bold text-white mt-1 block font-mono">
              {order.status === 'Preparing' ? '320 meters' : order.status === 'Ready for Pickup' ? '180 meters' : '0 meters'}
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
    <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full font-mono text-[11px] font-bold pulse-proximity">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
      <span>ENDS IN {format(secondsLeft)}</span>
    </div>
  );
};

// Proximity Badge Component
const ProximityBadge = ({ text }) => {
  return (
    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[10px] font-semibold text-brand-primary">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary pulse-proximity" />
      <span>📍 {text}</span>
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
            ? 'bg-brand-primary text-brand-bg hover:shadow-lg hover:shadow-brand-primary/20'
            : 'bg-white/5 border border-white/5 text-brand-muted cursor-not-allowed'
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
    <div className="w-full flex items-center justify-between bg-brand-primary rounded-xl px-2.5 py-1.5 text-brand-bg font-bold">
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
          <span className="text-xs text-brand-muted block uppercase tracking-wider font-semibold">HYPERLOCAL DELIVERY</span>
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-1.5 mt-0.5">
            Good morning, Rahul <span className="animate-bounce">👋</span>
          </h2>
        </div>
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-3 py-1 text-xs">
          <MapPin size={12} className="text-brand-primary" />
          <span className="text-[11px] text-white font-medium">Koregaon Park, Pune</span>
        </div>
      </div>

      {/* Animated ⚡ Delivery Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-bg to-brand-secondary/35 border border-white/5 rounded-2xl py-2 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-full bg-brand-primary/10 text-brand-primary">⚡</span>
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Fastest Store Dispatch Ring</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-brand-primary font-mono bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 rounded-full">
          <span>8–15 MINS DELIVERY</span>
        </div>
      </div>

      {/* Glassmorphism Search Bar */}
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-4 text-brand-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products in Koregaon Park..."
          className="w-full bg-[#111827]/60 border border-white/8 rounded-2xl pl-11 pr-10 py-3 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/45 transition-all"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setBuyerTab('deals');
            }
          }}
        />
        <SlidersHorizontal size={14} className="absolute right-4 text-brand-muted cursor-pointer hover:text-brand-primary" />
      </div>

      {/* Categories Horizontal Scroll */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-2">Shop by Category</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <div
              key={c.name}
              onClick={() => {
                setActiveCategory(c.name);
                setBuyerTab('deals');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white font-medium cursor-pointer hover:bg-white/10 active:scale-95 transition-all shrink-0"
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
          <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase">Stores Near You</h3>
          <span className="text-[10px] text-brand-primary font-bold tracking-widest">LIVE STATUS</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {stores.map((s) => (
            <div
              key={s.id}
              className="w-[200px] glass-card p-3 shrink-0 flex flex-col relative transition-all duration-300 hover:border-brand-primary/20"
            >
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full text-[9px] font-semibold border border-white/5">
                <span className={`w-1.5 h-1.5 rounded-full ${s.online ? 'bg-brand-success animate-pulse' : 'bg-brand-error'}`} />
                <span className={s.online ? 'text-brand-success' : 'text-brand-error'}>
                  {s.online ? 'Open' : 'Offline'}
                </span>
              </div>

              <div className="text-2xl mt-1">{s.avatar}</div>
              <h4 className="text-xs font-bold text-white mt-2 truncate">{s.name}</h4>
              <p className="text-[10px] text-brand-muted mt-0.5 truncate">{s.address}</p>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-brand-primary font-bold">
                  <span>📍</span>
                  <span>{s.distance}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] font-semibold bg-white/5 px-1.5 py-0.5 rounded text-yellow-400">
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
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-2.5">Selling Fast 🔥</h3>
        <div className="grid grid-cols-2 gap-3">
          {sellingFast.map((item) => (
            <div key={item.id} className="glass-card p-3 flex flex-col relative overflow-hidden group">
              <ProximityBadge text={item.distance} />
              
              <div className={`h-24 w-full rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-inner mb-2`}>
                {item.emoji}
              </div>

              <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
              <p className="text-[9px] text-brand-muted truncate mt-0.5">{item.storeName}</p>

              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-xs font-bold text-brand-primary font-mono">₹{item.price}</span>
                <span className="text-[9px] text-brand-muted line-through font-mono">₹{item.mrp}</span>
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
        <div className="glass-card p-3 border border-brand-primary/10 flex items-center justify-between gap-3">
          <div className="flex-1">
            <span className="text-[9px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-bold">RECENTLY DELIVERED</span>
            <h4 className="text-xs font-bold text-white mt-1.5">Reorder from {lastOrder.storeName}</h4>
            <p className="text-[10px] text-brand-muted mt-0.5 truncate">
              {lastOrder.items.map((i) => i.name).join(', ')}
            </p>
          </div>
          <button
            onClick={() => reorder(lastOrder)}
            className="px-4 py-2 text-xs font-bold bg-[#AAFF00] text-[#0A0E1A] rounded-full hover:scale-95 active:scale-90 transition-all shrink-0"
          >
            REORDER
          </button>
        </div>
      )}

      {/* Banner promo */}
      <div className="glass-card p-3.5 bg-gradient-to-r from-brand-secondary/25 to-brand-bg border border-brand-secondary/25 text-center flex flex-col items-center">
        <Sparkles size={20} className="text-brand-primary mb-1.5" />
        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Earn ₹150 Free Cash</h4>
        <p className="text-[10px] text-brand-muted mt-1 leading-relaxed max-w-xs">Refer a neighbor. When they place their first local order, you both save ₹150. Instant wallet payouts.</p>
        <button
          onClick={() => {
            setBuyerTab('profile');
            showToast('Referral code copied!');
          }}
          className="mt-3 px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold hover:bg-white/5 active:scale-95 text-white"
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

  const stepsList = ['Confirmed', 'Preparing', 'Ready for Pickup', 'Delivered'];

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold font-display text-white">Your Orders</h2>
        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-brand-muted font-mono">{orders.length} total</span>
      </div>

      {/* Active Orders Tracker */}
      {activeOrders.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase">Active Deliveries</h3>
          {activeOrders.map((order) => {
            const activeStep = order.step; 
            
            return (
              <div key={order.id} className="glass-card p-4 border border-brand-primary/20 flex flex-col relative">
                <div className="flex justify-between items-start pb-3 border-b border-white/5">
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase">{order.storeName}</h4>
                    <span className="text-[10px] text-brand-muted mt-1 block">Order ID: #{order.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-brand-primary font-mono">₹{order.total}</span>
                    <span className="text-[9px] text-brand-muted block mt-0.5">{order.timestamp}</span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="my-4 flex items-center justify-between relative px-2">
                  <div className="absolute top-[14px] left-[15px] right-[15px] h-[3px] bg-slate-800 z-0">
                    <div
                      className="h-full bg-brand-primary transition-all duration-700 ease-out"
                      style={{ width: `${(activeStep / 3) * 100}%` }}
                    />
                  </div>

                  {stepsList.map((stepName, index) => {
                    const isPassed = index <= activeStep;
                    const isCurrent = index === activeStep;
                    return (
                      <div key={stepName} className="flex flex-col items-center z-10 relative">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                            isCurrent
                              ? 'bg-brand-bg border-brand-primary text-brand-primary shadow-[0_0_12px_rgba(170,255,0,0.3)]'
                              : isPassed
                              ? 'bg-brand-primary border-brand-primary text-brand-bg'
                              : 'bg-[#111827] border-white/10 text-brand-muted'
                          }`}
                        >
                          {index === 0 ? '✓' : index === 1 ? '🍳' : index === 2 ? '🛵' : '🎁'}
                        </div>
                        <span
                          className={`text-[8px] mt-1.5 uppercase font-bold tracking-wider ${
                            isCurrent ? 'text-brand-primary font-extrabold' : isPassed ? 'text-white' : 'text-brand-muted'
                          }`}
                        >
                          {stepName.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveTrackOrder(order)}
                  className="w-full py-2.5 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary rounded-xl text-xs font-bold hover:bg-brand-primary/20 active:scale-95 transition-all-custom flex items-center justify-center gap-1.5"
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
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-2.5">Order History</h3>
        {pastOrders.length === 0 && activeOrders.length === 0 ? (
          <div className="glass-card p-8 text-center flex flex-col items-center my-4">
            <span className="text-4xl">🛍️</span>
            <h4 className="text-sm font-bold text-white mt-3">No orders yet — let's fix that!</h4>
            <p className="text-xs text-brand-muted mt-1 max-w-[200px] mx-auto leading-relaxed">Your local neighborhood store catalog is waiting to showcase.</p>
            <button
              onClick={() => setBuyerTab('deals')}
              className="mt-4 px-5 py-2.5 bg-brand-primary text-brand-bg rounded-full text-xs font-bold active:scale-95 transition-all"
            >
              SHOP PRODUCTS
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pastOrders.map((order) => (
              <div key={order.id} className="glass-card p-3.5 flex flex-col gap-3 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase">{order.storeName}</h4>
                    <span className="text-[10px] text-brand-muted mt-0.5 block">{order.date} • #{order.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-mono">₹{order.total}</span>
                    <span className={`text-[9px] block mt-1 px-2 py-0.5 rounded font-bold uppercase ${
                      order.status === 'Cancelled' ? 'bg-brand-error/10 text-brand-error' : 'bg-brand-success/10 text-brand-success'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="bg-black/25 rounded-xl p-2 border border-white/5">
                  <p className="text-[10.5px] text-brand-muted leading-relaxed">
                    <span className="font-semibold text-white">Items: </span>
                    {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => reorder(order)}
                    className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 rounded-xl text-xs font-bold text-white text-center transition-all"
                  >
                    REORDER ITEMS
                  </button>
                  {order.status !== 'Cancelled' && (
                    <button
                      onClick={() => showToast('Feedback logged! Thank you.')}
                      className="px-3.5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 rounded-xl text-xs font-bold text-yellow-400 text-center transition-all"
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
    { title: 'SAVE ₹47 VS ZEPTO', desc: 'Guaranteed lower hyper-local pricing at Patil Kirana.', code: 'NEIGHBOR', color: 'from-[#0A0E1A] to-[#1D1740]' },
    { title: 'SHARMA JI ONLINE 🏪', desc: 'Sharma General Store is accepting checkout requests.', code: 'SHARMA15', color: 'from-[#0A0E1A] to-[#0A2E20]' },
    { title: 'STAPLES MEGA DISCOUNTS', desc: 'Rice, Atta & Oil directly sourced for Koregaon Park.', code: 'FREESHIP', color: 'from-[#0A0E1A] to-[#3C102C]' }
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
        <Search size={16} className="absolute left-4 text-brand-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter catalog products..."
          className="w-full bg-[#111827]/60 border border-white/8 rounded-2xl pl-11 pr-10 py-3 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary/45 transition-all"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 text-brand-muted hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Auto-scrolling Hero Promo Banner Carousel */}
      <div className="relative h-28 rounded-2xl overflow-hidden border border-white/5 shadow-lg bg-slate-900">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${banners[activeBanner].color} px-5 py-3 flex flex-col justify-center transition-all duration-500`}
        >
          <span className="text-[10px] text-brand-primary font-bold tracking-widest uppercase">PROMO DISPATCH</span>
          <h3 className="text-sm font-extrabold text-white mt-1 uppercase font-display">{banners[activeBanner].title}</h3>
          <p className="text-[10px] text-brand-muted mt-0.5 leading-tight">{banners[activeBanner].desc}</p>
        </div>
        
        <div className="absolute bottom-2 right-4 flex gap-1 z-10">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeBanner ? 'bg-brand-primary w-3.5' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Flash Sale Countdown & Grid */}
      <div className="glass-card p-3 border border-brand-primary/10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">⚡</span>
            <h3 className="text-xs font-semibold tracking-wider text-white uppercase">Flash Sales</h3>
          </div>
          <FlashSaleTimer />
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {flashSaleItems.map((item) => (
            <div key={item.id} className="w-[125px] bg-black/35 border border-white/5 p-2 rounded-xl shrink-0 flex flex-col">
              <span className="text-[8px] bg-brand-error/15 text-brand-error px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider self-start">
                SAVE ₹{item.mrp - item.price}
              </span>
              <div className="h-14 w-full bg-slate-800 rounded-lg flex items-center justify-center text-2xl my-2">
                {item.emoji}
              </div>
              <h4 className="text-[10px] font-bold text-white truncate">{item.name}</h4>
              <span className="text-xs font-mono font-bold text-brand-primary mt-1">₹{item.price}</span>
              <div className="mt-2">
                <AddButtonStepper product={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Filter Horizontal Scroll */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-2">Brands You Love</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {brands.map((b) => (
            <div
              key={b.name}
              onClick={() => setSelectedBrand(b.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[11px] font-semibold cursor-pointer transition-all shrink-0 ${
                selectedBrand === b.name
                  ? 'bg-brand-primary border-brand-primary text-brand-bg'
                  : 'bg-[#111827]/40 border-white/10 text-white hover:bg-[#111827]/80'
              }`}
            >
              <span className="text-xs">{b.emoji}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls & Grid Options */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mt-1">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="bg-transparent text-xs text-white font-bold border-none focus:outline-none cursor-pointer pr-4"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-[#0A0E1A] text-white text-xs">{c} Catalog</option>
          ))}
        </select>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-brand-muted font-semibold uppercase">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-[11px] text-brand-primary font-bold focus:outline-none cursor-pointer"
          >
            <option value="popularity" className="bg-[#0A0E1A] text-white">Popularity</option>
            <option value="price-low" className="bg-[#0A0E1A] text-white">Price: Low-High</option>
            <option value="price-high" className="bg-[#0A0E1A] text-white">Price: High-Low</option>
            <option value="distance" className="bg-[#0A0E1A] text-white">Distance</option>
          </select>
        </div>
      </div>

      {/* Main Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <span className="text-3xl block">🔍</span>
          <h4 className="text-sm font-bold text-white mt-3">No matching products found</h4>
          <p className="text-xs text-brand-muted mt-1 leading-relaxed">Try adjusting filters or searching different terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((item) => {
            const savings = item.mrp - item.price;
            const zeptoDiff = Math.floor(savings * 1.3) || 8;

            return (
              <div key={item.id} className="glass-card p-3 flex flex-col relative overflow-hidden group">
                <ProximityBadge text={item.distance} />

                <div className={`h-24 w-full rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-inner mb-2`}>
                  {item.emoji}
                </div>

                <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                <p className="text-[9px] text-brand-muted truncate mt-0.5">{item.storeName}</p>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-xs font-bold text-brand-primary font-mono">₹{item.price}</span>
                  <span className="text-[9px] text-brand-muted line-through font-mono">₹{item.mrp}</span>
                  
                  {savings > 0 && (
                    <span className="text-[8px] bg-brand-primary/10 text-brand-primary font-bold px-1.5 py-0.5 rounded-full ml-auto">
                      Save ₹{savings}
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex items-center text-[9px] font-bold text-brand-primary">
                  <span>💰 ₹{zeptoDiff} cheaper than Zepto</span>
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
      <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4">
        <div className="w-12 h-12 rounded-full bg-brand-secondary/30 border border-brand-secondary/50 flex items-center justify-center text-lg font-bold text-brand-secondary">
          RK
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{BUYER_PROFILE.name}</h3>
          <p className="text-xs text-brand-muted mt-0.5 font-mono">{BUYER_PROFILE.phone}</p>
          <p className="text-[10px] text-brand-muted mt-0.5">{BUYER_PROFILE.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#111827]/40 border border-white/5 p-3 rounded-2xl text-center">
          <span className="text-xs text-brand-muted block font-semibold uppercase tracking-wider">Orders</span>
          <span className="text-lg font-extrabold text-white mt-1 block font-mono">14</span>
        </div>
        <div className="bg-[#111827]/40 border border-white/5 p-3 rounded-2xl text-center">
          <span className="text-xs text-brand-muted block font-semibold uppercase tracking-wider">Total Saved</span>
          <span className="text-lg font-extrabold text-brand-primary mt-1 block font-mono">₹340</span>
        </div>
        <div className="bg-[#111827]/40 border border-white/5 p-3 rounded-2xl text-center">
          <span className="text-xs text-brand-muted block font-semibold uppercase tracking-wider">Member Since</span>
          <span className="text-[11px] font-bold text-white mt-2 block uppercase">Jan '25</span>
        </div>
      </div>

      {/* Saved Address Book */}
      <div className="glass-card p-4 flex flex-col gap-3">
        <h4 className="text-xs font-semibold tracking-wider text-brand-muted uppercase">Saved Addresses</h4>
        <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex gap-2 items-start">
          <div className="text-sm mt-0.5">🏠</div>
          <div className="flex-1">
            <p className="text-xs font-bold text-white">Home Address</p>
            <p className="text-[10.5px] text-brand-muted mt-1 leading-relaxed">{BUYER_PROFILE.address}</p>
          </div>
          <span className="text-[10px] font-bold text-brand-primary cursor-pointer hover:underline" onClick={() => showToast('Edit details')}>EDIT</span>
        </div>
      </div>

      {/* Refer & Earn Premium Card */}
      <div className="glass-card p-4 bg-gradient-to-br from-brand-secondary/40 to-brand-bg border border-brand-primary/20 flex flex-col relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-brand-primary/10 blur-xl" />
        <span className="text-[9px] bg-brand-primary text-brand-bg px-2 py-0.5 rounded-full font-bold uppercase self-start tracking-wider">
          Premium referral
        </span>
        <h4 className="text-sm font-extrabold text-white mt-2 font-display">Get free delivery for a month</h4>
        <p className="text-xs text-brand-muted mt-1 leading-relaxed">
          Invite your housing society friends. Once 3 neighbors register and place their first order, unlock NearYou Premium.
        </p>
        <div className="mt-3 flex gap-2">
          <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-brand-primary font-bold flex items-center justify-between">
            <span>NY-KOREGAON-98</span>
            <span className="text-[10px] text-brand-muted">COPY</span>
          </div>
          <button
            onClick={() => showToast('Referral link shared!')}
            className="px-4 bg-brand-primary text-brand-bg rounded-xl text-xs font-bold active:scale-95 transition-all"
          >
            SHARE
          </button>
        </div>
      </div>

      {/* Other Settings Options */}
      <div className="glass-card p-2">
        <div className="flex items-center justify-between p-2.5 border-b border-white/5 hover:bg-white/5 cursor-pointer text-xs rounded-xl" onClick={() => showToast('UPI Details')}>
          <span className="text-white">UPI & Saved Cards</span>
          <ChevronRight size={14} className="text-brand-muted" />
        </div>
        <div className="flex items-center justify-between p-2.5 border-b border-white/5 hover:bg-white/5 cursor-pointer text-xs rounded-xl" onClick={() => showToast('Help Center')}>
          <span className="text-white">Help & Support</span>
          <ChevronRight size={14} className="text-brand-muted" />
        </div>
        <div className="flex items-center justify-between p-2.5 border-b border-white/5 hover:bg-white/5 cursor-pointer text-xs rounded-xl" onClick={() => showToast('Showcase Terms')}>
          <span className="text-white">Terms & Conditions</span>
          <ChevronRight size={14} className="text-brand-muted" />
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
        <ShoppingCart size={48} className="text-brand-muted animate-pulse" />
        <h3 className="text-sm font-bold text-white mt-4">Your cart is empty</h3>
        <p className="text-xs text-brand-muted mt-1.5 max-w-[200px] leading-relaxed">Explore catalog deals from your nearby stores to fill it up.</p>
        <button
          onClick={() => setBuyerTab('deals')}
          className="mt-5 px-6 py-2.5 bg-brand-primary text-brand-bg font-extrabold rounded-full text-xs hover:scale-95 active:scale-90 transition-all cursor-pointer"
        >
          GO SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-3 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <h2 className="text-lg font-bold font-display text-white">Your Cart</h2>
        <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 rounded font-mono font-bold">
          {cart.length} ITEMS SELECTED
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {Object.keys(groupedCart).map((sid) => {
          const group = groupedCart[sid];
          return (
            <div key={sid} className="glass-card p-3 border border-white/5">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase">{group.storeName}</h4>
                  <span className="text-[9px] text-brand-muted mt-0.5 block">📍 Proximity: {group.distance}</span>
                </div>
                <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-brand-muted font-bold font-mono">
                  {group.items.length} items
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.product.gradient} flex items-center justify-center text-xl shrink-0`}>
                      {item.product.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-mono font-bold text-brand-primary">₹{item.product.price}</span>
                        <span className="text-[9px] text-brand-muted line-through font-mono">₹{item.product.mrp}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg p-1 font-mono text-xs">
                      <button
                        onClick={() => updateCartQty(item.product.productId, item.product.storeId, -1)}
                        className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-white"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-5 text-center font-bold text-white text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.product.productId, item.product.storeId, 1)}
                        className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-white"
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

      <div className="glass-card p-4 border border-white/5 flex flex-col gap-2.5">
        <h4 className="text-xs font-semibold tracking-wider text-brand-muted uppercase">Bill Breakdown</h4>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-muted">Items Subtotal</span>
          <span className="text-white font-mono font-medium">₹{billingInfo.subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-muted">Delivery Charges</span>
          <span className="text-white font-mono font-medium">
            {billingInfo.deliveryFee === 0 ? (
              <span className="text-brand-primary font-bold">FREE</span>
            ) : (
              `₹${billingInfo.deliveryFee}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-muted">Platform Fee</span>
          <span className="text-white font-mono font-medium">₹{billingInfo.platformFee}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-brand-muted">GST & Taxes (5%)</span>
          <span className="text-white font-mono font-medium">₹{billingInfo.gst}</span>
        </div>

        <div className="border-t border-white/5 pt-2.5 mt-1 flex justify-between items-center">
          <span className="text-xs font-bold text-white">To Pay</span>
          <span className="text-sm font-extrabold text-brand-primary font-mono">₹{billingInfo.total}</span>
        </div>
      </div>

      {billingInfo.savings > 0 && (
        <div className="glass-card p-3 border border-brand-success/15 bg-brand-success/5 flex gap-2 items-center">
          <span className="text-lg">🎉</span>
          <div className="text-[10.5px] text-brand-muted leading-tight">
            You're saving <span className="text-brand-success font-extrabold">₹{billingInfo.savings}</span> today on this catalog checkout.
            <span className="block text-[9.5px] mt-0.5 text-brand-success">₹{billingInfo.zeptoSavings} cheaper than Zepto!</span>
          </div>
        </div>
      )}

      <div className="glass-card p-3.5 border border-white/5 flex gap-3 items-center">
        <MapPin size={16} className="text-brand-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Deliver to society</p>
          <p className="text-xs font-medium text-white truncate mt-0.5">{BUYER_PROFILE.address}</p>
        </div>
        <ChevronRight size={14} className="text-brand-muted" />
      </div>

      <button
        onClick={placeOrder}
        className="w-full py-3.5 bg-[#AAFF00] hover:shadow-lg hover:shadow-[#AAFF00]/10 text-[#0A0E1A] rounded-full text-xs font-extrabold tracking-widest active:scale-95 transition-all-custom cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>CONFIRM PLACE ORDER</span>
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
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-brand-muted block uppercase tracking-wider font-semibold">STORE MANAGER SIDE</span>
          <h2 className="text-lg font-bold font-display text-white mt-0.5">Welcome back, Sharma Ji 🏪</h2>
        </div>
        <button
          onClick={simulateIncomingOrder}
          className="px-3 py-1.5 bg-brand-secondary/20 border border-brand-secondary/30 text-brand-secondary rounded-full text-[10px] font-bold active:scale-95 transition-all flex items-center gap-1"
        >
          <span>SIMULATE BUYER ORDER</span>
          <span>🛒</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="glass-card p-3 flex flex-col relative overflow-hidden">
          <span className="text-[10px] text-brand-muted uppercase font-bold">Today's Revenue</span>
          <span className="text-lg font-bold font-mono text-brand-primary mt-1">
            ₹<CountUp to={totalRevenue} />
          </span>
          <span className="text-[8px] text-brand-success font-semibold mt-1">📈 +18.4% vs last week</span>
        </div>

        <div className="glass-card p-3 flex flex-col">
          <span className="text-[10px] text-brand-muted uppercase font-bold">Today's Orders</span>
          <span className="text-lg font-bold font-mono text-white mt-1">
            <CountUp to={ordersCount} />
          </span>
          <span className="text-[8px] text-brand-success font-semibold mt-1">📈 +12% vs last week</span>
        </div>

        <div className="glass-card p-3 flex flex-col">
          <span className="text-[10px] text-brand-muted uppercase font-bold">Pending Orders</span>
          <span className="text-lg font-bold font-mono text-brand-warning mt-1">
            <CountUp to={pendingOrders.length} />
          </span>
          <span className="text-[8px] text-brand-muted mt-1">Needs merchant review</span>
        </div>

        <div className="glass-card p-3 flex flex-col">
          <span className="text-[10px] text-brand-muted uppercase font-bold">Store Rating</span>
          <span className="text-lg font-bold font-mono text-yellow-400 mt-1">4.6 ⭐</span>
          <span className="text-[8px] text-brand-muted mt-1">Based on 124 reviews</span>
        </div>
      </div>

      {pendingOrders.length > 0 && (
        <div className="p-3 bg-brand-warning/10 border-2 border-brand-warning rounded-2xl animate-pulse flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔔</span>
            <div className="text-xs text-brand-warning font-bold uppercase tracking-wider">
              {pendingOrders.length} Pending Checkout Requests!
            </div>
          </div>
          <span className="text-[9.5px] bg-brand-warning/20 text-brand-warning font-bold px-2 py-0.5 rounded font-mono">
            ALERT
          </span>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-2.5">Incoming & Active Orders</h3>
        {storeOrders.length === 0 ? (
          <div className="glass-card p-6 text-center">
            <span className="text-3xl block">📦</span>
            <h4 className="text-xs font-bold text-white mt-2.5">No active merchant queue</h4>
            <p className="text-[10.5px] text-brand-muted mt-1">All orders are cleared or completed.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {storeOrders.map((order) => {
              if (order.status === 'Delivered' || order.status === 'Cancelled') return null;

              return (
                <div
                  key={order.id}
                  className={`glass-card p-3.5 flex flex-col gap-2.5 border transition-all duration-300 ${
                    order.status === 'Pending' ? 'border-brand-warning/40 shadow-[0_0_10px_rgba(245,158,11,0.05)]' : 'border-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start pb-2 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-white uppercase">Order #{order.id}</h4>
                        <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded font-mono uppercase ${
                          order.status === 'Pending'
                            ? 'bg-brand-warning/10 text-brand-warning'
                            : 'bg-brand-primary/10 text-brand-primary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-brand-muted mt-0.5 block">Customer: {order.buyerName} ({order.timestamp})</span>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-bold text-white font-mono">₹{order.total}</span>
                      {order.status === 'Preparing' && (
                        <div className="flex items-center gap-1 text-[9.5px] text-brand-warning font-mono mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-warning animate-ping" />
                          <span>Preparing: ⏱️ 4 min</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 text-[11px] text-brand-muted">
                    <ul className="flex flex-col gap-1">
                      {order.items.map((i) => (
                        <li key={i.productId} className="flex justify-between text-white/80">
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
                          className="flex-1 py-2 bg-brand-primary text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all"
                        >
                          ACCEPT ORDER
                        </button>
                        <button
                          onClick={() => declineOrder(order.id)}
                          className="px-4 py-2 border border-white/10 hover:bg-brand-error/10 hover:text-brand-error rounded-xl text-xs font-semibold text-brand-muted transition-all"
                        >
                          DECLINE
                        </button>
                      </>
                    )}
                    {order.status === 'Preparing' && (
                      <button
                        onClick={() => markReady(order.id)}
                        className="w-full py-2.5 bg-brand-primary text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all"
                      >
                        ✓ MARK READY & DISPATCH
                      </button>
                    )}
                    {order.status === 'Ready for Pickup' && (
                      <button
                        onClick={() => markDelivered(order.id)}
                        className="w-full py-2.5 bg-brand-secondary text-white font-extrabold rounded-xl text-xs active:scale-95 transition-all"
                      >
                        ✓ SIMULATE COMPLETE DELIVERY
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="glass-card p-4">
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-3.5">Weekly Sales Trend</h3>
        <div className="h-44 flex items-end justify-between gap-2.5 pt-4 px-1.5">
          {graphData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full relative flex flex-col items-center justify-end h-32">
                <div className="absolute -top-7 bg-brand-secondary text-[9px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-mono z-10 shadow-lg">
                  ₹{Math.round(d.value)}
                </div>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand-secondary/40 to-brand-primary transition-all duration-700 hover:brightness-110"
                  style={{ height: `${(d.value / 6500) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-brand-muted font-bold font-mono mt-1">{d.day}</span>
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
        <h2 className="text-lg font-bold font-display text-white">Store Inventory</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3.5 py-2 bg-brand-primary text-brand-bg font-extrabold rounded-full text-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-brand-primary/10"
        >
          <Plus size={13} strokeWidth={2.5} />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 flex items-center">
          <Search size={14} className="absolute left-3 text-brand-muted" />
          <input
            type="text"
            value={invQuery}
            onChange={(e) => setInvQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-[#111827]/60 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-brand-muted focus:outline-none"
          />
        </div>
        
        <select
          value={selectedInvCat}
          onChange={(e) => setSelectedInvCat(e.target.value)}
          className="bg-white/5 border border-white/5 rounded-xl px-2 text-xs text-brand-primary font-bold focus:outline-none cursor-pointer"
        >
          <option value="All" className="bg-[#0A0E1A] text-white">All categories</option>
          <option value="Staples" className="bg-[#0A0E1A] text-white">Staples</option>
          <option value="Dairy" className="bg-[#0A0E1A] text-white">Dairy</option>
          <option value="Snacks" className="bg-[#0A0E1A] text-white">Snacks</option>
          <option value="Personal Care" className="bg-[#0A0E1A] text-white">Personal Care</option>
          <option value="Home" className="bg-[#0A0E1A] text-white">Home Care</option>
          <option value="Beverages" className="bg-[#0A0E1A] text-white">Beverages</option>
          <option value="Medicine" className="bg-[#0A0E1A] text-white">Medicine</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filteredInventory.map((item) => {
          const isEditing = editingId === item.id;
          const marketAvg = Math.round(item.mrp * 0.95);

          return (
            <div key={item.id} className="glass-card p-3 flex gap-3 items-center border border-white/5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xl shrink-0`}>
                {item.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                  <span className="text-[8px] bg-white/5 border border-white/5 text-brand-muted px-1.5 py-0.2 rounded uppercase">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-brand-muted">Market MRP: ₹{item.mrp}</span>
                  <span className="text-[10px] text-brand-success font-bold font-mono">Suggested Price: ₹{marketAvg}</span>
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
                      className="w-14 bg-slate-800 border border-brand-primary/40 text-brand-primary text-xs font-bold font-mono rounded px-1.5 py-0.5 focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSavePrice(item.id, editPriceVal);
                      }}
                    />
                    <button
                      onClick={() => handleSavePrice(item.id, editPriceVal)}
                      className="p-1 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
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
                    className="text-brand-primary text-xs font-bold font-mono bg-brand-primary/5 hover:bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.8 rounded cursor-pointer transition-all flex items-center gap-1"
                  >
                    <span>₹{item.price}</span>
                    <span className="text-[8px] text-brand-muted font-normal">✍️</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-brand-muted font-semibold">
                    {item.inStock ? 'In Stock' : 'Out'}
                  </span>
                  <div
                    onClick={() => toggleProductStock(item.productId, 1)}
                    className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer transition-all duration-300 ${
                      item.inStock ? 'bg-brand-primary' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-slate-900 transition-all duration-300 ${
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
            className="absolute inset-0 bg-[#0A0E1A]/85 backdrop-blur-sm z-50 flex items-end justify-center"
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="w-full bg-[#111827] border-t border-white/10 rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between mb-4.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Register Master Catalog Product</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
                >
                  <X size={14} />
                </button>
              </div>

              {masterCatalogAddable.length === 0 ? (
                <p className="text-xs text-brand-muted text-center py-6 leading-relaxed">
                  All available products from the NearYou master catalog are already registered in your store.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-brand-muted font-bold uppercase">Select Catalog Item</span>
                    <select
                      value={newProdId}
                      onChange={(e) => {
                        setNewProdId(e.target.value);
                        const bItem = BASE_PRODUCTS.find((p) => p.productId === e.target.value);
                        if (bItem) setNewProdPrice(bItem.price.toString());
                      }}
                      className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
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
                    <span className="text-[10px] text-brand-muted font-bold uppercase">Store Showcase Price (₹)</span>
                    <input
                      type="number"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="Showcase price"
                      className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-brand-muted font-bold uppercase">Initial Stock Quantity</span>
                    <input
                      type="number"
                      value={newProdQty}
                      onChange={(e) => setNewProdQty(e.target.value)}
                      placeholder="Stock quantity (e.g. 15)"
                      className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveProductForm}
                    disabled={!newProdId}
                    className="w-full py-3 bg-[#AAFF00] hover:shadow-lg hover:shadow-[#AAFF00]/10 text-[#0A0E1A] rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all mt-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <h2 className="text-lg font-bold font-display text-white">Merchant Order Logs</h2>

      <div className="flex bg-[#111827] border border-white/5 p-1 rounded-xl gap-1">
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
                  ? 'bg-brand-primary text-brand-bg'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[8.5px] font-mono mt-0.5 ${activeQueueTab === st ? 'text-brand-bg/80' : 'text-brand-muted/70'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filteredQueue.length === 0 ? (
          <div className="glass-card p-8 text-center text-brand-muted">
            <span className="text-3xl">🗂️</span>
            <p className="text-xs mt-3">No orders found in "{activeQueueTab}" queue.</p>
          </div>
        ) : (
          filteredQueue.map((o) => (
            <div key={o.id} className="glass-card p-3.5 flex flex-col gap-2.5 border border-white/5">
              <div className="flex justify-between items-start pb-2 border-b border-white/5">
                <div>
                  <h4 className="text-xs font-extrabold text-white">ORDER ID: #{o.id}</h4>
                  <span className="text-[9.5px] text-brand-muted mt-0.5 block">{o.date} • {o.buyerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-brand-primary font-mono block">₹{o.total}</span>
                  <span className="text-[9px] text-brand-muted block mt-0.5 font-mono font-semibold">{o.timestamp}</span>
                </div>
              </div>

              <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                <p className="text-[10px] text-brand-muted leading-relaxed">
                  <span className="font-semibold text-white">Address:</span> {o.deliveryAddress}
                </p>
              </div>

              <div className="text-[11px] text-brand-muted pl-1">
                <ul className="flex flex-col gap-1 list-disc pl-3">
                  {o.items.map((it) => (
                    <li key={it.productId} className="text-white/80">
                      {it.name} <span className="font-mono font-bold text-brand-primary ml-1">(x{it.quantity})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                {o.status === 'Pending' && (
                  <button
                    onClick={() => acceptOrder(o.id)}
                    className="w-full py-2 bg-brand-primary text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all"
                  >
                    ACCEPT CHECKOUT REQUEST
                  </button>
                )}
                {o.status === 'Preparing' && (
                  <button
                    onClick={() => markReady(o.id)}
                    className="w-full py-2 bg-brand-primary text-brand-bg font-extrabold rounded-xl text-xs active:scale-95 transition-all"
                  >
                    ✓ PACK & READY FOR PICKUP
                  </button>
                )}
                {o.status === 'Ready for Pickup' && (
                  <button
                    onClick={() => markDelivered(o.id)}
                    className="w-full py-2 bg-brand-secondary text-white font-extrabold rounded-xl text-xs active:scale-95 transition-all"
                  >
                    ✓ CONFIRM DELIVERED
                  </button>
                )}
                {o.status === 'Delivered' && (
                  <div className="text-center w-full text-[10px] font-semibold text-brand-success py-1 bg-brand-success/5 border border-brand-success/15 rounded-lg uppercase tracking-wider">
                    ✅ Order Fully Delivered & Settled
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
      <h2 className="text-lg font-bold font-display text-white">Merchant & Shop Settings</h2>

      <div className="glass-card p-4 border border-brand-primary/10 bg-gradient-to-r from-[#0A0E1A] to-[#1a1040] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Showcase LIVE Status</h3>
          <p className="text-xs text-brand-muted mt-0.5 leading-tight">When offline, buyers see store as Closed.</p>
        </div>
        <div
          onClick={toggleShopOnline}
          className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all-custom ${
            storeInfo.online
              ? 'bg-brand-success text-brand-bg shadow-[0_0_12px_rgba(34,197,94,0.25)]'
              : 'bg-brand-error text-white'
          }`}
        >
          {storeInfo.online ? '🟢 ONLINE NOW' : '🔴 GO OFFLINE'}
        </div>
      </div>

      <div className="glass-card p-4 border border-white/5 flex gap-3 items-center">
        <span className="text-3xl">🏪</span>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{storeInfo.name}</h3>
          <p className="text-[11px] text-brand-muted mt-0.5">Proprietor: {storeInfo.owner}</p>
          <p className="text-[10px] text-brand-muted font-mono mt-1">GSTIN: 27AABCS1423B1Z2</p>
        </div>
      </div>

      <div className="glass-card p-4 border border-white/5">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase">Hyperlocal Dispatch Radius</h3>
          <span className="text-xs font-mono font-bold text-brand-primary">{deliveryRadius} km</span>
        </div>
        
        <div className="relative h-40 bg-[#0B0F19] rounded-2xl overflow-hidden border border-white/5 my-3 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div
            className="absolute rounded-full border border-brand-primary bg-brand-primary/10 transition-all duration-300 flex items-center justify-center"
            style={{
              width: `${35 + ((deliveryRadius - 0.5) / 4.5) * 95}px`,
              height: `${35 + ((deliveryRadius - 0.5) / 4.5) * 95}px`
            }}
          >
            <div className="absolute inset-0 rounded-full border border-brand-primary/30 animate-ping opacity-25" />
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
          className="w-full accent-brand-primary mt-2 cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-brand-muted font-bold mt-1 uppercase">
          <span>0.5 km</span>
          <span>Society radius coverage zone</span>
          <span>5.0 km</span>
        </div>
      </div>

      <div className="glass-card p-4 border border-white/5 flex flex-col gap-2">
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-1">Registration Status</h3>
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

      <div className="glass-card p-4 border border-white/5">
        <h3 className="text-xs font-semibold tracking-wider text-brand-muted uppercase mb-2">Settlement Account</h3>
        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-white">UPIN payout link</p>
            <p className="text-brand-muted font-mono mt-0.5">ramesh.sharma@paytm</p>
          </div>
          <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-2.5 py-0.5 rounded font-bold">
            PRIMARY LINK
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
    <div className="min-h-screen bg-[#070913] text-[#F8FAFC] font-sans flex flex-col md:flex-row items-center justify-center p-0 md:p-6 lg:p-10 select-none overflow-x-hidden relative">
      
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-secondary/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[150px] pointer-events-none" />

      {/* LEFT COLUMN: INVESTOR DECK INFO NOTES (Hidden on small screens) */}
      <div className="hidden lg:flex flex-col gap-5 w-80 shrink-0 text-left mr-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-brand-primary font-display">NearYou</span>
            <span className="text-[9px] bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-2 py-0.5 rounded-full font-bold uppercase">
              10Cr SEED STAGE
            </span>
          </div>
          <p className="text-xs text-brand-muted mt-2 leading-relaxed">
            A premium hyperlocal delivery ecosystem connecting premium residential buyers with neighbor merchants.
          </p>
        </div>

        <div className="glass-card p-4 border border-white/5 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={13} className="text-brand-primary" />
            Showcase Guidelines
          </h3>
          
          <ul className="text-[11px] text-brand-muted flex flex-col gap-2.5 leading-relaxed">
            <li>
              <span className="text-white font-semibold">🔄 Dual Side State:</span> Toggle Buyer/Shop mode at the top. State remains synced!
            </li>
            <li>
              <span className="text-white font-semibold">🛒 Real Loop Flow:</span> Add items to cart ➔ Checkout ➔ Go to Shop Owner side to Accept & Process!
            </li>
            <li>
              <span className="text-white font-semibold">📦 Master Catalog:</span> Add new products to Sharma's list inside Inventory tab.
            </li>
            <li>
              <span className="text-white font-semibold">📍 Pulse Badges:</span> Pulse ring represents spatial hyperlocal proximity.
            </li>
          </ul>
        </div>

        <div className="text-[10px] text-brand-muted flex flex-col gap-0.5 font-medium">
          <span>Target City: Pune / Mumbai metro zones</span>
          <span>Technology Stack: React 19 + Tailwind v4 + Framer Motion</span>
          <span>© 2026 NearYou Inc. Confidential Investor Showcase.</span>
        </div>
      </div>

      {/* CENTER COLUMN: SMARTPHONE DEVICE WRAPPER FRAME */}
      <div className="w-full max-w-md bg-[#0A0E1A] text-brand-text min-h-screen md:min-h-[850px] md:h-[850px] md:rounded-[40px] md:border-8 md:border-slate-800 md:shadow-2xl relative overflow-hidden flex flex-col z-10">
        
        {showConfetti && <Confetti />}

        <ToastSystem />

        {activeTrackOrder && (
          <MapTrackerModal
            order={activeTrackOrder}
            onClose={() => setActiveTrackOrder(null)}
          />
        )}

        {/* TOP STATUS BAR */}
        <div className="w-full bg-[#0A0E1A] py-2.5 px-6 flex justify-between items-center text-[10px] font-bold tracking-wider font-mono text-brand-muted shrink-0 select-none border-b border-white/5">
          <span>19:51 📱</span>
          <div className="w-16 h-4.5 bg-black/60 rounded-full border border-white/5 flex items-center justify-center text-[9px] text-brand-primary">
            NearYou v2.0
          </div>
          <div className="flex items-center gap-1">
            <span>5G</span>
            <span className="text-[11px]">🔋</span>
          </div>
        </div>

        {/* TOP DUAL-MODE CONTROLLER SWITCH PILL */}
        <div className="w-full bg-[#0A0E1A] py-3.5 px-4 flex justify-center border-b border-white/5 shrink-0 z-20">
          <div className="flex bg-slate-950/80 border border-white/10 rounded-full p-1 w-full max-w-[290px] relative">
            <button
              onClick={() => setMode('buyer')}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                mode === 'buyer' ? 'text-[#0A0E1A] bg-[#AAFF00]' : 'text-brand-muted'
              }`}
            >
              <span>🛒</span>
              <span>Buyer Mode</span>
            </button>
            <button
              onClick={() => setMode('seller')}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                mode === 'seller' ? 'text-[#0A0E1A] bg-[#AAFF00]' : 'text-brand-muted'
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
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
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
              className="absolute bottom-20 right-4 w-12 h-12 bg-brand-primary rounded-full text-brand-bg shadow-xl shadow-brand-primary/20 flex items-center justify-center z-40"
            >
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-brand-secondary border-2 border-brand-bg text-white font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            </motion.button>
          )}
        </div>

        {/* BOTTOM NAVIGATION BARS */}
        <div className="w-full bg-[#0A0E1A]/95 backdrop-blur-md border-t border-white/5 py-2 px-4 flex justify-around items-center shrink-0 z-30">
          {mode === 'buyer' ? (
            <>
              <button
                onClick={() => setBuyerTab('home')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'home' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <Store size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
              </button>
              
              <button
                onClick={() => setBuyerTab('deals')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'deals' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <Percent size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Deals</span>
              </button>

              <button
                onClick={() => setBuyerTab('orders')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'orders' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <ClipboardList size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Orders</span>
              </button>

              <button
                onClick={() => setBuyerTab('cart')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom relative ${
                  buyerTab === 'cart' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-brand-secondary rounded-full border border-brand-bg animate-pulse" />
                )}
                <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
              </button>

              <button
                onClick={() => setBuyerTab('profile')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-all-custom ${
                  buyerTab === 'profile' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <User size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setSellerTab('dashboard')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'dashboard' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <Activity size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Dashboard</span>
              </button>
              
              <button
                onClick={() => setSellerTab('inventory')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'inventory' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <Package size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Inventory</span>
              </button>

              <button
                onClick={() => setSellerTab('orders')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'orders' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <FileText size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Orders</span>
              </button>

              <button
                onClick={() => setSellerTab('settings')}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-all-custom ${
                  sellerTab === 'settings' ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                }`}
              >
                <Settings size={18} />
                <span className="text-[9px] font-bold uppercase tracking-wider">Settings</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: REALTIME SYSTEM LOGGER CONSOLE */}
      <div className="hidden md:flex flex-col gap-4 w-72 shrink-0 text-left ml-8 self-stretch pt-2">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
          Reactive Event Log
        </h3>
        
        <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-4 overflow-y-auto max-h-[750px] font-mono text-[10px] text-brand-muted flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="pb-2 border-b border-white/[0.03] leading-relaxed"
              >
                <span className="text-brand-primary font-bold mr-1.5">[{log.time}]</span>
                <span className="text-slate-350">{log.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="glass-card p-3 border border-white/5">
          <p className="text-[9.5px] text-brand-muted leading-snug">
            💡 <span className="text-white font-semibold">Tip:</span> Clicking tabs, changing stock toggles, placing orders, and modifying inventory instantly append live tracking streams to this reactive events log.
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
