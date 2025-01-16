import React from "react";
import { useLocation } from "react-router-dom";
import { getSectionContent } from "../../utils/sectionContent";

const BeltsSection = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '' && segment !== 'category');

  const [type, category, itemgroup] = pathSegments;
  const content = getSectionContent(type, category, itemgroup);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-4 md:px-6 py-3 bg-[#EFEDED]">
      <div className="w-full md:w-1/2 text-center md:text-left md:pr-4">
        <h1 className="text-[24px] md:text-[36px] font-light text-[#4C3A36] mb-1">
          {content.title}
        </h1>
        <h3 className="text-[12px] md:text-[16px] font-normal text-[#4C3A36] tracking-widest uppercase mb-2">
          {content.subtitle}
        </h3>
        <p className="text-[12px] md:text-[16px] text-[#4C3A36] leading-5 mb-2">
          {content.description}
        </p>
      </div>
      <div className="w-full md:w-1/3 mb-3 md:mb-0 md:pl-4">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="rounded-md object-cover w-full h-auto max-h-[180px] md:max-h-[260px]"
        />
      </div>
    </section>
  );
};

export default BeltsSection;
