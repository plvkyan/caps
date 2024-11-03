import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
import { ADMIN_SIDEBAR_NAV_DATA } from "@/data/sidebar-nav-data"

import { UserType } from "@/types/user-type";
import { Separator } from "@/components/ui/separator"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>, { user }: { user: UserType }) {
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

      <SidebarContent className="flex items-center">

        <NavMain items={ADMIN_SIDEBAR_NAV_DATA.GENERAL_NAV_DATA.items} label={ADMIN_SIDEBAR_NAV_DATA.GENERAL_NAV_DATA.label} />
        <NavMain items={ADMIN_SIDEBAR_NAV_DATA.TRANSACTION_NAV_DATA.items} label={ADMIN_SIDEBAR_NAV_DATA.TRANSACTION_NAV_DATA.label} />
        <NavMain items={ADMIN_SIDEBAR_NAV_DATA.ASSOCIATION_NAV_DATA.items} label={ADMIN_SIDEBAR_NAV_DATA.ASSOCIATION_NAV_DATA.label} />
        <NavSecondary items={ADMIN_SIDEBAR_NAV_DATA.SUPPORT_NAV_DATA.items} className="mt-auto"/>

      </SidebarContent>

      <SidebarFooter className="block md:hidden">
        <NavUser/>
      </SidebarFooter>
      
    </Sidebar>

  )
}
