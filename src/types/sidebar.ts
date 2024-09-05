export interface SidebarProps {
    paths: {
      id: number;
      name: string;
      path: string;
      icon: React.ElementType;
    }[];
  }