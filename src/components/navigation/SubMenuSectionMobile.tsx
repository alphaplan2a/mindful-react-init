import React from 'react';
import { Link } from 'react-router-dom';

interface SubMenuSectionProps {
  title: string;
  items: Array<{
    href: string;
    title: string;
    description: string;
  }>;
}

const ListItem = ({ href, title }: { href: string; title: string; description: string }) => (
  <li>
    <Link 
      to={href} 
      className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 active:scale-95"
    >
      <span className="block text-white text-[15px] font-medium tracking-wide">{title}</span>
    </Link>
  </li>
);

const SubMenuSectionMobile = ({ title, items }: SubMenuSectionProps) => {
  return (
    <div className="py-3 px-4">
      <h4 className="text-xl font-medium mb-4 text-white/90 border-b border-white/10 pb-2">{title}</h4>
      <ul className="space-y-1"> 
        {items.map((item, index) => (
          <ListItem 
            key={`${item.href}-${index}`}
            href={item.href}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default SubMenuSectionMobile;