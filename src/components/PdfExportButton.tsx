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
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ]);

      const element = document.getElementById('report-root');
      if (!element) {
        throw new Error('Report element not found');
      }

      // Ensure fonts are loaded before capture
      await document.fonts.ready;

      // Set crossOrigin for all images to avoid CORS issues
      const images = element.querySelectorAll('img');
      images.forEach((img: HTMLImageElement) => {
        img.crossOrigin = 'anonymous';
      });

      // Set background to white for better PDF rendering
      const originalBackground = element.style.backgroundColor;
      element.style.backgroundColor = '#ffffff';

      // Wait a bit for images to load with new crossOrigin
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log('Starting PDF generation with jsPDF.html...');

      // Create PDF with proper sizing
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      // Use jsPDF.html() for better pagination and text handling
      await pdf.html(element, {
        callback: (doc) => {
          console.log('PDF generation completed');
          
          // Generate filename with current date
          const today = new Date();
          const dateString = today.toISOString().slice(0, 10).replace(/-/g, '');
          const filename = `bridge-stay-roi-${dateString}.pdf`;
          
          console.log('Saving PDF:', filename);
          doc.save(filename);
          console.log('PDF export completed successfully');
        },
        margin: [24, 24, 24, 24], // 24pt margins on all sides
        autoPaging: 'text',
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          logging: false,
        },
        x: 0,
        y: 0,
        width: 595.28, // A4 width in points
        windowWidth: element.scrollWidth,
      });

    } catch (error) {
      console.error('PDF Export Error Details:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      let errorMessage = 'Failed to generate PDF. ';
      if (error instanceof Error) {
        errorMessage += `Error: ${error.message}`;
      } else {
        errorMessage += 'Unknown error occurred.';
      }
      
      alert(errorMessage);
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
