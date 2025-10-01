import React, { useState } from 'react';
import type { TrainingTip } from '../types';
import { User, Key, BookOpen, ChevronDown, ChevronUp, LogOut } from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
}

const trainingTips: TrainingTip[] = [
  { id: 1, title: "Conheça seu público", content: "Entenda as dores, desejos e objeções do seu público-alvo para criar uma comunicação mais eficaz e aumentar suas conversões." },
  { id: 2, title: "Crie conteúdo de valor", content: "Não foque apenas em vender. Entregue conteúdo que ajude sua audiência a resolver problemas. Isso gera autoridade e confiança." },
  { id: 3, title: "Use gatilhos mentais", content: "Utilize gatilhos como escassez, urgência e prova social em suas copys para incentivar a tomada de decisão do cliente." },
  { id: 4, title: "Analise suas métricas", content: "Acompanhe os cliques, conversões e ROI de suas campanhas. Analisar os dados é fundamental para otimizar seus resultados." },
];

const AccordionItem: React.FC<{ tip: TrainingTip; isOpen: boolean; onClick: () => void }> = ({ tip, isOpen, onClick }) => (
  <div className="border-b border-slate-200">
    <button onClick={onClick} className="w-full flex justify-between items-center text-left p-4">
      <span className="font-medium text-slate-700">{tip.title}</span>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <div className="p-4 pt-0 text-slate-600 animate-fade-in-down">
        <p>{tip.content}</p>
      </div>
    )}
  </div>
);

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [openTipId, setOpenTipId] = useState<number | null>(null);

  const handleToggleTip = (id: number) => {
    setOpenTipId(openTipId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Perfil e Configurações</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <img src="https://picsum.photos/100" alt="User Avatar" className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">Afiliado de Sucesso</h2>
            <p className="text-slate-500">afiliado@exemplo.com</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
          <Key className="mr-2" size={20}/> Tokens das Plataformas (Salvos)
        </h3>
        <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center p-2 bg-slate-50 rounded"><span>Hotmart:</span> <span className="font-mono text-slate-600">********-****-****-****-************</span></li>
            <li className="flex justify-between items-center p-2 bg-slate-50 rounded"><span>Monetizze:</span> <span className="font-mono text-slate-600">****************</span></li>
            <li className="flex justify-between items-center p-2 bg-slate-50 rounded"><span>Eduzz:</span> <span className="font-mono text-slate-600">****************</span></li>
        </ul>
        <p className="text-xs text-slate-400 mt-3 text-center">Os tokens são salvos localmente no seu dispositivo.</p>
      </div>

      <div className="bg-white rounded-lg shadow">
         <h3 className="text-lg font-semibold text-slate-700 p-4 pb-2 flex items-center">
          <BookOpen className="mr-2" size={20}/> Área de Treinamento
        </h3>
        <div>
          {trainingTips.map(tip => (
            <AccordionItem key={tip.id} tip={tip} isOpen={openTipId === tip.id} onClick={() => handleToggleTip(tip.id)} />
          ))}
        </div>
      </div>
      
      <button
        onClick={onLogout}
        className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 flex items-center justify-center"
      >
        <LogOut className="mr-2" size={20} />
        Sair
      </button>
    </div>
  );
};

export default Profile;