import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Cart state
      cart: [],
      cartCount: 0,
      
      // Product state
      products: [],
      categories: [
        { id: 1, name: 'Electronics', icon: '📱' },
        { id: 2, name: 'Fashion', icon: '👕' },
        { id: 3, name: 'Home & Furniture', icon: '🏠' },
        { id: 4, name: 'Books', icon: '📚' },
        { id: 5, name: 'Sports', icon: '⚽' },
        { id: 6, name: 'Beauty', icon: '💄' },
      ],
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            cartCount: get().cartCount + 1
          })
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
            cartCount: get().cartCount + 1
          })
        }
      },
      
      removeFromCart: (productId) => {
        const cart = get().cart
        const item = cart.find(item => item.id === productId)
        
        if (item) {
          if (item.quantity > 1) {
            set({
              cart: cart.map(item =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
              cartCount: get().cartCount - 1
            })
          } else {
            set({
              cart: cart.filter(item => item.id !== productId),
              cartCount: get().cartCount - 1
            })
          }
        }
      },
      
      clearCart: () => set({ cart: [], cartCount: 0 }),
      
      setProducts: (products) => set({ products }),
      
      // Calculate total price
      getCartTotal: () => {
        const cart = get().cart
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'flipkart-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        cartCount: state.cartCount
      })
    }
  )
)

export default useStore
