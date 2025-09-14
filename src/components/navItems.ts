export type NavItem = {
  id: string;
  title: string;
  icon: string;
  to: string;
  active?: boolean;
  badge?: number;
  items?: NavItem[];
};

export type NavSection = {
  section: string;
  items: NavItem[];
};

export const menuItems: NavSection[] = [
  {
    section: "MAIN",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/",
        active: true,
      },
    ],
  },
  {
    section: "NAVIGATION",
    items: [
      {
        id: "tournaments",
        title: "Tournaments",
        icon: "mdi-trophy",
        to: "/Tournament",
        badge: 32,
      },
      {
        id: "shop",
        title: "Shop",
        icon: "mdi-shopping",
        to: "/Shop",
      },
      {
        id: "leaderboards",
        title: "Leaderboards",
        icon: "mdi-chart-line",
        to: "/Leaderboard",
      },
    ],
  },
  {
    section: "COMMUNITY",
    items: [
      {
        id: "esports",
        title: "Esports",
        icon: "mdi-account-group",
        to: "/Esport",
      },
      {
        id: "settings",
        title: "Settings",
        icon: "mdi-cog",
        to: "/Setting",
      },
      {
        id: "membership",
        title: "Membership",
        icon: "mdi-account-multiple",
        to: "/Membership",
      },
    ],
  },
];
