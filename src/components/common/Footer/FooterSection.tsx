export type FooterItem = {
  label: string;
  href?: string;
};

export type FooterSection = {
  title: string;
  items: FooterItem[];
};