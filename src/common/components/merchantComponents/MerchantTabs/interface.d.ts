export interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

export interface MerchantTabsProps {
  tabItems: TabItem[];
}