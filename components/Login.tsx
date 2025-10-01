
import React from 'react';
import { LogIn, Rocket } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Rocket className="mx-auto text-primary h-16 w-16" />
          <h1 className="text-4xl font-bold text-slate-800 mt-4">AfiliApp</h1>
          <p className="text-slate-500 mt-2">Sua central de vendas de afiliado.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="email">
                Email (simulado)
              </label>
              <input
                type="email"
                id="email"
                defaultValue="afiliado@exemplo.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="password">
                Senha (simulada)
              </label>
              <input
                type="password"
                id="password"
                defaultValue="123456"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300 flex items-center justify-center"
            >
              <LogIn className="mr-2" size={20} />
              Entrar
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-6">
            Este é um aplicativo de demonstração. Os dados são simulados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
