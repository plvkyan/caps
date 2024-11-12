import * as React from "react"
import {
  Command,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



//
import { ADMIN_SIDEBAR_NAV_DATA, UNIT_OWNER_SIDEBAR_NAV_DATA } from "@/data/sidebar-nav-data"
import { useAuthContext } from "@/hooks/useAuthContext"

// import { Separator } from "@/components/ui/separator"





export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useAuthContext();



  return (

    <Sidebar variant="inset" {...props}>

      <SidebarHeader>

        <SidebarMenu>

          <SidebarMenuItem>

            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold"> Grand Cedar Homes </span>
                  <span className="truncate text-xs"> Homeowners' Association </span>
                </div>
              </a>
            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarHeader>

      {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (
        <SidebarContent className="flex items-center">

          <NavMain items={ADMIN_SIDEBAR_NAV_DATA.GENERAL_NAV_DATA.items} label={ADMIN_SIDEBAR_NAV_DATA.GENERAL_NAV_DATA.label} />
          <NavMain items={ADMIN_SIDEBAR_NAV_DATA.ADMIN_TRANSACTION_NAV_DATA.items} label={ADMIN_SIDEBAR_NAV_DATA.ADMIN_TRANSACTION_NAV_DATA.label} />
          <NavMain items={ADMIN_SIDEBAR_NAV_DATA.ASSOCIATION_NAV_DATA.items} label={ADMIN_SIDEBAR_NAV_DATA.ASSOCIATION_NAV_DATA.label} />
          <NavSecondary items={ADMIN_SIDEBAR_NAV_DATA.ADMIN_SUPPORT_NAV_DATA.items} className="mt-auto" />

        </SidebarContent>
      )}

{user && user.userRole === "Unit Owner" && user.userPosition === "Unit Owner" && (
        <SidebarContent className="flex items-center">

          <NavMain items={UNIT_OWNER_SIDEBAR_NAV_DATA.GENERAL_NAV_DATA.items} label={UNIT_OWNER_SIDEBAR_NAV_DATA.GENERAL_NAV_DATA.label} />
          <NavMain items={UNIT_OWNER_SIDEBAR_NAV_DATA.UNIT_OWNER_TRANSACTION_NAV_DATA.items} label={UNIT_OWNER_SIDEBAR_NAV_DATA.UNIT_OWNER_TRANSACTION_NAV_DATA.label} />
          <NavMain items={UNIT_OWNER_SIDEBAR_NAV_DATA.UNIT_OWNER_ASSOCIATION_NAV_DATA.items} label={UNIT_OWNER_SIDEBAR_NAV_DATA.UNIT_OWNER_ASSOCIATION_NAV_DATA.label} />
          <NavSecondary items={UNIT_OWNER_SIDEBAR_NAV_DATA.UNIT_OWNER_SUPPORT_NAV_DATA.items} className="mt-auto" />

        </SidebarContent>
      )}


      <SidebarFooter className="block md:hidden">
        <NavUser />
      </SidebarFooter>

    </Sidebar>

  )
}
