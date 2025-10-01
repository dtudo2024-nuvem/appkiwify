
import React, { useState } from 'react';
import type { Material } from '../types';
import { Image, Type, Plus, Copy, Trash2 } from 'lucide-react';

const initialMaterials: Material[] = [
  { id: 1, type: 'text', title: 'Copy para Story', content: '🔥 Quer aprender a faturar 5 dígitos por mês trabalhando de casa? Arrasta pra cima e descubra o método que mudou minha vida! 🚀' },
  { id: 2, type: 'image', title: 'Banner Promocional', content: 'https://picsum.photos/800/400' },
  { id: 3, type: 'text', title: 'Texto para Post', content: 'Você não precisa de mais motivação, você precisa de um método. Conheça o passo a passo para alcançar seus objetivos ainda este ano. Link na bio! #sucesso #marketingdigital' },
];

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialContent, setNewMaterialContent] = useState('');
  const [newMaterialType, setNewMaterialType] = useState<'text' | 'image'>('text');

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMaterialTitle && newMaterialContent) {
      const newMaterial: Material = {
        id: Date.now(),
        title: newMaterialTitle,
        content: newMaterialContent,
        type: newMaterialType,
      };
      setMaterials([newMaterial, ...materials]);
      setNewMaterialTitle('');
      setNewMaterialContent('');
      setShowAddForm(false);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Conteúdo copiado!');
  };

  const handleDelete = (id: number) => {
    if(window.confirm("Tem certeza que deseja apagar este material?")){
        setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Materiais</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 shadow"
        >
          <Plus size={24} />
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow animate-fade-in-down">
          <form onSubmit={handleAddMaterial} className="space-y-4">
            <h2 className="text-lg font-semibold">Adicionar Novo Material</h2>
            <div>
              <label htmlFor="mat-title" className="block text-sm font-medium text-slate-600 mb-1">Título</label>
              <input id="mat-title" type="text" value={newMaterialTitle} onChange={e => setNewMaterialTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tipo</label>
              <select value={newMaterialType} onChange={e => setNewMaterialType(e.target.value as 'text' | 'image')} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white">
                <option value="text">Texto (Copy)</option>
                <option value="image">Imagem (URL)</option>
              </select>
            </div>
            <div>
              <label htmlFor="mat-content" className="block text-sm font-medium text-slate-600 mb-1">{newMaterialType === 'text' ? 'Conteúdo' : 'URL da Imagem'}</label>
              <textarea id="mat-content" value={newMaterialContent} onChange={e => setNewMaterialContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md" rows={4} required></textarea>
            </div>
            <button type="submit" className="w-full bg-success text-white font-bold py-2 rounded-md">Salvar Material</button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {materials.map(material => (
          <div key={material.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                  <div className="flex items-center mb-2">
                    {material.type === 'image' ? <Image className="text-slate-500 mr-2" /> : <Type className="text-slate-500 mr-2" />}
                    <h3 className="font-semibold text-slate-800">{material.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                     {material.type === 'text' && (
                        <button onClick={() => handleCopy(material.content)} className="text-slate-500 hover:text-primary p-1 rounded-full"><Copy size={18} /></button>
                     )}
                     <button onClick={() => handleDelete(material.id)} className="text-slate-500 hover:text-red-500 p-1 rounded-full"><Trash2 size={18} /></button>
                  </div>
              </div>
              
              {material.type === 'image' ? (
                <img src={material.content} alt={material.title} className="rounded-md mt-2 w-full h-auto" />
              ) : (
                <p className="text-slate-600 bg-slate-50 p-3 rounded-md text-sm">{material.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
