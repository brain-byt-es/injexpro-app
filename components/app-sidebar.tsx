'use client';

import * as React from 'react';
import {
  IconDashboard,
  IconUsers,
  IconBrain,
  IconSchool,
  IconHelp,
  IconMessageHeart,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
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
    title: 'Patients',
    url: '/patients',
    icon: IconUsers,
  },
  {
    title: 'Anatomy Atlas',
    url: '/atlas',
    icon: IconBrain,
  },
  {
    title: 'Education',
    url: '/education',
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}