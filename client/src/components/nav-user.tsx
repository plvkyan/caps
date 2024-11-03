import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Home,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"

// shadcn Alert Dialog Imports
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

// shadcn Button Import
import { Button } from "@/components/ui/button";

// shadcn Drawer Component Imports
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useLogout } from "@/hooks/useLogout";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import path from "path";


export function NavUser() {
  


  // Hooks
  // Authentication Hook
  const { user } = useAuthContext();
  // isMobile Hook
  const { isMobile } = useSidebar();
  // Logout Hook
  const { logout } = useLogout();
  // Navigate Hook
  const navigate = useNavigate();



  // States
  // Logout Dialog State
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)



  // Functions
  // Logout Button Handler
  const handleLogoutButton = () => {
    logout()
  }





  return (
    <SidebarMenu>



      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        <AlertDialogDescription>
          Any unfinished actions won't be saved.
        </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button variant="destructive" onClick={handleLogoutButton}>
          Logout
        </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border px-4 gap-2"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.blkLt} alt={user.blkLt} /> */}
                <AvatarFallback className="rounded-lg"> U </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold"> {user.blkLt} </span>
                <span className={"truncate text-xs " + (user.memberStatus === "Outstanding" ? "text-primary" : "text-warning")}> {user.position} </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "top" : "bottom"}
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.blkLt} alt={user.blkLt} />
                  <AvatarFallback className="rounded-lg"> U </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold"> {user.blkLt} </span>
                  <span className={"truncate text-xs " + (user.memberStatus === "Outstanding" ? "text-primary" : "text-warning")}> {user.position} </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/")}>
                <Home/>
                Home
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Bell />
                Notification
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onSelect={() => setShowLogoutDialog(true)}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
