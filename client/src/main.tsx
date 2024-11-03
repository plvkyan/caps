import './index.css'
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './components/custom/ThemeProvider.tsx'



// Context Provider Imports

// AmenitiesContextProvider Import
import { AmenitiesContextProvider } from '@/context/AmenityContext.tsx'

// AnnouncementsContextProvider Import
import { AnnouncementsContextProvider } from '@/context/AnnouncementContext'

// AuthContextProvider Import
import { AuthContextProvider } from '@/context/AuthContext'

// BillContextProvider Import
import { BillsContextProvider } from '@/context/BillContext'

// ReservationsContextProvider Import
import { ReservationsContextProvider } from '@/context/ReservationContext.tsx'

// UsersContextProvider Import
import { UsersContextProvider } from '@/context/UserContext.tsx'


import { Toaster } from "@/components/ui/sonner"




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <BillsContextProvider>
          <AmenitiesContextProvider>
            <AnnouncementsContextProvider>
              <ReservationsContextProvider>
                <UsersContextProvider>
                  <Toaster />
                  <App />
                </UsersContextProvider>
              </ReservationsContextProvider>
            </AnnouncementsContextProvider>
          </AmenitiesContextProvider>
        </BillsContextProvider>
      </AuthContextProvider>
    </ThemeProvider>

  </React.StrictMode>,
)
