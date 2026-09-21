import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
}

export default function ImageViewerModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
}: ImageViewerModalProps) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `kitchen-design-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[95vh] bg-[#222521] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#191b18] text-white">
          <div className="truncate pr-4">
            <h3 className="text-base sm:text-lg font-medium text-white truncate font-display">
              {title}
            </h3>
            <p className="text-xs text-white/60 truncate">{description}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom controls */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 mr-2">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded"
                title="Зменшити"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded font-mono"
                title="Скинути масштаб"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded"
                title="Збільшити"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded"
                title="100%"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5e6b56] hover:bg-[#4e5947] text-white rounded-lg text-xs font-medium transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Завантажити</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
              title="Закрити (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport container */}
        <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center min-h-[400px] max-h-[78vh] bg-[#141613]">
          <div
            className="transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={imageUrl}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#191b18] text-xs text-white/60 flex items-center justify-between border-t border-white/10">
          <span>Сучасний інтер'єр у теплих оливково-бежевих тонах</span>
          <span className="hidden sm:inline text-white/40">Коліщатко миші або кнопки для масштабування</span>
        </div>
      </div>
    </div>
  );
}
