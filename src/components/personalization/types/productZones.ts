export interface CustomizationZone {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface ProductZoneConfig {
  id: string;
  name: string;
  zone: CustomizationZone;
}

export const productZones: ProductZoneConfig[] = [
  {
    id: 'mugs',
    name: 'Tasses',
    zone: {
      width: 200,
      height: 150,
      top: 100,
      left: 150
    }
  },
  {
    id: 'tshirts',
    name: 'T-shirts',
    zone: {
      width: 250,
      height: 300,
      top: 150,
      left: 175
    }
  },
  {
    id: 'blouses',
    name: 'Blouses de travail',
    zone: {
      width: 250,
      height: 300,
      top: 150,
      left: 175
    }
  },
  {
    id: 'flyers',
    name: 'Flyers',
    zone: {
      width: 400,
      height: 500,
      top: 50,
      left: 50
    }
  },
  {
    id: 'notebooks',
    name: 'Carnets',
    zone: {
      width: 300,
      height: 400,
      top: 100,
      left: 100
    }
  },
  {
    id: 'bags',
    name: 'Sacs',
    zone: {
      width: 300,
      height: 250,
      top: 150,
      left: 150
    }
  }
];