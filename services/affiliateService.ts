
import type { Sale } from '../types';
import { Platform } from '../types';

const productNames = [
  'Curso de Marketing Digital',
  'Ebook de Receitas Fit',
  'Plugin para WordPress',
  'Template de Design Gráfico',
  'Curso de Inglês Online',
  'Mentoria de Carreira',
  'Software de Edição de Vídeo',
];

const platforms = [Platform.Hotmart, Platform.Monetizze, Platform.Eduzz, Platform.Kiwify];

const generateRandomSale = (): Sale => {
  const commission = parseFloat((Math.random() * (250 - 15) + 15).toFixed(2));
  return {
    id: `sale_${Date.now()}_${Math.random()}`,
    productName: productNames[Math.floor(Math.random() * productNames.length)],
    commission: commission,
    saleDate: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // up to 30 days ago
    platform: platforms[Math.floor(Math.random() * platforms.length)],
  };
};

export const mockFetchSalesData = (): Promise<Sale[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const sales = Array.from({ length: 50 }, generateRandomSale).sort(
        (a, b) => b.saleDate.getTime() - a.saleDate.getTime()
      );
      resolve(sales);
    }, 1000);
  });
};


export const mockFetchNewSale = (): Promise<Sale | null> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate a new sale appearing randomly
            if (Math.random() > 0.7) { // 30% chance of a new sale
                const newSale = { ...generateRandomSale(), saleDate: new Date() };
                resolve(newSale);
            } else {
                resolve(null);
            }
        }, 2000);
    });
};
