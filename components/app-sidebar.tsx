'use client';

import * as React from 'react';
import {
  IconDashboard,
  IconBrain,
  IconSchool,
  IconHelp,
  IconMessageHeart,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';

const navMain = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: IconDashboard,
  },
  {
    title: 'Library',
    url: '/dashboard/library',
    icon: IconBrain,
    // Submenu items for the Atlas
    subItems: [
      { title: 'Procedures', url: '/dashboard/library/procedures' },
      { title: 'Muscles', url: '/dashboard/library/muscles' },
      { title: 'Complications', url: '/dashboard/library/complications' },
    ],
  },
  {
    title: 'Resources',
    url: '/dashboard/resources',
    icon: IconSchool,
  },
];

const navSecondary = [
  {
    title: 'Support',
    url: '/support',
    icon: IconHelp,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: IconMessageHeart,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  );
}