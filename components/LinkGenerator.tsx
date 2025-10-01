import React, { useState, useRef } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { Link, QrCode, Copy, Download } from 'lucide-react';

const LinkGenerator: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [affiliateId, setAffiliateId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleGenerateLink = () => {
    if (productId && affiliateId) {
      // This is a generic example. Real links vary by platform.
      const link = `https://pay.hotmart.com/${productId}?aff=${affiliateId}`;
      setGeneratedLink(link);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  
  const handleDownloadQR = () => {
    if (qrCodeRef.current) {
        const canvas = qrCodeRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "afili-qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Gerador de Links</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="productId">
              ID do Produto
            </label>
            <input
              type="text"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Ex: A12345678B"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="affiliateId">
              Seu ID de Afiliado (opcional)
            </label>
            <input
              type="text"
              id="affiliateId"
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              placeholder="Ex: C98765432D"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={handleGenerateLink}
            disabled={!productId || !affiliateId}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300 flex items-center justify-center disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <Link className="mr-2" size={20} />
            Gerar Link
          </button>
        </div>
      </div>

      {generatedLink && (
        <div className="bg-white p-6 rounded-lg shadow animate-fade-in">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Seu Link e QR Code</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">Link de Afiliado</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50"
              />
              <button
                onClick={handleCopy}
                className="p-3 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300"
              >
                {showCopied ? 'Copiado!' : <Copy size={20} />}
              </button>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">QR Code</label>
            <div ref={qrCodeRef} className="inline-block p-4 border border-slate-200 rounded-lg">
                <QRCode value={generatedLink} size={160} />
            </div>
             <button
                onClick={handleDownloadQR}
                className="mt-4 w-full bg-success text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success transition-colors duration-300 flex items-center justify-center"
              >
                <Download className="mr-2" size={20} />
                Baixar QR Code
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkGenerator;