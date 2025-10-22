import { useState } from 'react';

interface PdfExportButtonProps {
  className?: string;
}

export function PdfExportButton({ className = '' }: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Dynamic imports to avoid bloating initial bundle
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
        document.fonts.ready
      ]);

      const root = document.getElementById('report-root');
      if (!root) {
        throw new Error('Report element not found');
      }

      console.log('Starting PDF generation...');

      // Normalize colors to avoid oklch/oklab issues
      const normalizeColors = (element: Element) => {
        const computedStyle = getComputedStyle(element);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;

        // Check if color contains unsupported functions
        if (color && (color.includes('oklch') || color.includes('oklab') || color.startsWith('var('))) {
          (element as HTMLElement).style.color = color;
        }

        // Check if backgroundColor contains unsupported functions
        if (backgroundColor && (backgroundColor.includes('oklch') || backgroundColor.includes('oklab') || backgroundColor.startsWith('var('))) {
          (element as HTMLElement).style.backgroundColor = backgroundColor;
        }

        // Recursively process children
        Array.from(element.children).forEach(normalizeColors);
      };

      normalizeColors(root);

      // Set crossOrigin for all images
      const images = root.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        img.crossOrigin = 'anonymous';
      });

      // Wait for fonts and animation frame
      await new Promise(resolve => requestAnimationFrame(resolve));

      // Capture with html2canvas
      const canvas = await html2canvas(root, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#fff',
        scale: 2,
        windowWidth: root.scrollWidth,
        windowHeight: root.scrollHeight,
        logging: false,
      });

      console.log('Canvas captured:', canvas.width, 'x', canvas.height);

      // Create PDF and slice into A4 pages
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = canvas.height * (imgW / canvas.width);

      console.log('PDF dimensions:', pageW, 'x', pageH, 'pt');
      console.log('Image dimensions:', imgW, 'x', imgH, 'pt');

      let isFirstPage = true;

      // Slice canvas into pages
      for (let y = 0; y < imgH; y += pageH) {
        if (!isFirstPage) {
          pdf.addPage();
        }

        // Calculate source coordinates
        const sy = Math.floor((y / imgH) * canvas.height);
        const sH = Math.min(Math.floor((pageH / imgH) * canvas.height), canvas.height - sy);
        const targetH = Math.min(pageH, imgH - y);

        // Create temporary canvas for this slice
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) throw new Error('Failed to get canvas context');

        tempCanvas.width = canvas.width;
        tempCanvas.height = sH;
        tempCtx.drawImage(canvas, 0, sy, canvas.width, sH, 0, 0, canvas.width, sH);

        // Convert to data URL and add to PDF
        const imgData = tempCanvas.toDataURL('image/png', 0.95);
        pdf.addImage(imgData, 'PNG', 0, 0, imgW, targetH);

        isFirstPage = false;
      }

      // Generate filename with current date
      const today = new Date();
      const dateString = today.toISOString().slice(0, 10).replace(/-/g, '');
      const filename = `bridge-stay-roi-${dateString}.pdf`;

      console.log('Saving PDF:', filename);
      pdf.save(filename);
      console.log('PDF export completed successfully');

    } catch (error) {
      console.error('PDF Export Error:', error);
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isExporting ? (
        <>
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Exporting...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export PDF
        </>
      )}
    </button>
  );
}
