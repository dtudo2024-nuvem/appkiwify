
export enum Platform {
  Hotmart = 'Hotmart',
  Monetizze = 'Monetizze',
  Eduzz = 'Eduzz',
  Kiwify = 'Kiwify',
}

export interface Sale {
  id: string;
  productName: string;
  commission: number;
  saleDate: Date;
  platform: Platform;
}

export interface Notification {
  id: number;
  message: string;
}

export interface Material {
  id: number;
  type: 'image' | 'text';
  title: string;
  content: string;
}

export interface TrainingTip {
  id: number;
  title: string;
  content: string;
}
