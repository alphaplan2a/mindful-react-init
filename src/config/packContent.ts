interface PackContent {
  title: string;
  description: string;
  images: string[];
  videoUrl: string;
}

export const packContent: Record<string, PackContent> = {
  'Pack Prestige': {
    title: "Le Coffret Prestige",
    description: "Le Coffret Prestige est bien plus qu'un simple cadeau : c'est une expérience d'élégance et de raffinement. Ce coffret exclusif comprend une chemise personnalisable où vous pouvez ajouter votre nom ou un message unique, un portefeuille haut de gamme également personnalisable, et une ceinture en cuir au choix, tous fabriqués avec des matériaux de qualité supérieure. Le tout est présenté dans une boîte Prestige offerte gratuitement, ajoutant une touche de luxe à votre cadeau.",
    images: [
      "https://respizenmedical.com/fiori/Prestige/1.png",
      "https://respizenmedical.com/fiori/Prestige/2.jpg",
      "https://respizenmedical.com/fiori/Prestige/3.jpg"
    ],
    videoUrl: "https://respizenmedical.com/fiori/Prestige/video.mp4"
  },
  'Pack Premium': {
    title: "Le Pack Premium",
    description: "Le Pack Premium est le cadeau parfait pour allier style et praticité. Ce coffret contient une cravate élégante, un portefeuille en cuir de qualité, et une ceinture assortie. Personnalisez-le avec un nom ou un message pour une touche unique. Livré gratuitement dans un superbe coffret Prestige, c'est le choix idéal pour offrir un cadeau inoubliable.",
    images: [
      "https://respizenmedical.com/fiori/Premium/1.png",
      "https://respizenmedical.com/fiori/Premium/2.png",
      "https://respizenmedical.com/fiori/Premium/3.png"
    ],
    videoUrl: "https://respizenmedical.com/fiori/Premium/video.mp4"
  },
  'Pack Trio': {
    title: "Le Pack Trio",
    description: "Découvrez le Pack Trio, une combinaison parfaite d'élégance et de praticité. Ce coffret comprend un portefeuille en cuir haut de gamme, une ceinture élégante et un porte-clés raffiné, le tout fabriqué avec une qualité exceptionnelle et une attention aux détails. Personnalisez vos articles avec un nom ou un message, ce qui en fait un cadeau vraiment unique.",
    images: [
      "https://respizenmedical.com/fiori/Trio/1.png",
      "https://respizenmedical.com/fiori/Trio/2.png",
      "https://respizenmedical.com/fiori/Trio/3.png"
    ],
    videoUrl: "https://respizenmedical.com/fiori/Trio/video.mp4"
  },
  'Pack Duo': {
    title: "Le Pack Duo",
    description: "Discover the Pack Duo, a perfect combination of elegance and practicality. This set includes a premium leather wallet and a stylish belt, all crafted with exceptional quality and attention to detail. Personalize your items with a name or message, making it a truly unique gift.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Wallet",
      "https://placehold.co/600x400/333333/ffffff?text=Belt",
      "https://placehold.co/600x400/67000D/ffffff?text=Keychain"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Mini Duo': {
    title: "Le Pack Mini duo",
    description: "Discover the Pack Mini Duo, a perfect combination of elegance and practicality. This set includes a premium leather wallet and a stylish belt, all crafted with exceptional quality and attention to detail. Personalize your items with a name or message, making it a truly unique gift.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Wallet",
      "https://placehold.co/600x400/333333/ffffff?text=Belt",
      "https://placehold.co/600x400/67000D/ffffff?text=Keychain"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Chemise': {
    title: "Le Pack Chemise",
    description: "Discover the Pack Chemise, our exclusive shirt collection carefully curated for elegance. Each shirt is chosen for its exceptional quality and timeless style. Personalize your choice and receive it in our signature gift box.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Shirt+1",
      "https://placehold.co/600x400/333333/ffffff?text=Shirt+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Shirt+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Ceinture': {
    title: "Le Pack Ceinture",
    description: "Découvrez notre Pack Ceinture exclusif, une sélection raffinée de ceintures de haute qualité. Chaque ceinture est confectionnée avec soin pour allier style et durabilité. Personnalisez votre choix avec une gravure unique et profitez d'une présentation élégante dans notre coffret cadeau signature.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Belt+1",
      "https://placehold.co/600x400/333333/ffffff?text=Belt+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Belt+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Cravatte': {
    title: "Le Pack Cravatte",
    description: "Découvrez notre Pack Cravatte distinctif, une collection soigneusement sélectionnée de cravates élégantes. Chaque cravate est choisie pour sa qualité exceptionnelle et son style intemporel. Personnalisez votre choix et recevez-le dans notre coffret cadeau signature.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Tie+1",
      "https://placehold.co/600x400/333333/ffffff?text=Tie+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Tie+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Malette': {
    title: "Le Pack Malette",
    description: "Découvrez notre Pack Malette professionnel, une sélection de mallettes haut de gamme conçues pour allier style et fonctionnalité. Chaque mallette est choisie pour sa qualité exceptionnelle et son design élégant. Personnalisez votre choix et recevez-le dans notre coffret cadeau signature.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Briefcase+1",
      "https://placehold.co/600x400/333333/ffffff?text=Briefcase+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Briefcase+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Portefeuille': {
    title: "Le Pack Portefeuille",
    description: "Découvrez notre Pack Portefeuille exclusif, une sélection raffinée de portefeuilles de haute qualité. Chaque portefeuille est confectionné avec soin pour allier style et praticité. Personnalisez votre choix avec une gravure unique et profitez d'une présentation élégante dans notre coffret cadeau signature.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Wallet+1",
      "https://placehold.co/600x400/333333/ffffff?text=Wallet+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Wallet+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Porte-carte': {
    title: "Le Pack Porte-carte",
    description: "Découvrez notre Pack Porte-carte distinctif, une collection soigneusement sélectionnée de porte-cartes élégants. Chaque porte-carte est choisi pour sa qualité exceptionnelle et son style pratique. Personnalisez votre choix et recevez-le dans notre coffret cadeau signature.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Card+Holder+1",
      "https://placehold.co/600x400/333333/ffffff?text=Card+Holder+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Card+Holder+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  'Pack Porte-clé': {
    title: "Le Pack Porte-clé",
    description: "Découvrez notre Pack Porte-clé exclusif, une sélection raffinée de porte-clés de haute qualité. Chaque porte-clé est confectionné avec soin pour allier style et fonctionnalité. Personnalisez votre choix avec une gravure unique et profitez d'une présentation élégante dans notre coffret cadeau signature.",
    images: [
      "https://placehold.co/600x400/67000D/ffffff?text=Key+Holder+1",
      "https://placehold.co/600x400/333333/ffffff?text=Key+Holder+2",
      "https://placehold.co/600x400/67000D/ffffff?text=Key+Holder+3"
    ],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  }
};

export const getPackContent = (packType: string): PackContent => {
  const content = packContent[packType];
  if (!content) {
    throw new Error(`Pack type "${packType}" not found`);
  }
  return content;
};