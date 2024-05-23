import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {find: "@", replacement: "/src/*"},
      {find: "@service", replacement: "/src/service"},
      
      {find: "@services-interface", replacement: "/src/interface/services.ts"},
      {find: "@orders-interface", replacement: "/src/interface/orders.ts"},
      {find: "@dashboad-interface", replacement: "/src/interface/dashboad.ts"},
      // {find: "@useOrdersStore", replacement: "/src/store/orders.ts"},
    ]
  }
})
