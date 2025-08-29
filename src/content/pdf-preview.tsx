"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

if (typeof window !== "undefined") {
  // PDF.js v5+: prefer module workers via workerPort
  pdfjs.GlobalWorkerOptions.workerPort = new Worker("/pdf.worker.min.mjs", {
    type: "module",
  });
}

export const PdfPreview = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(400);
  const [containerHeight, setContainerHeight] = useState<number>(600);
  // width / height of the PDF page at scale 1
  const [pageAspectRatio, setPageAspectRatio] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const element = contentRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // subtract horizontal padding (px-6 => 1.5rem each side => 24px)
        const computedWidth = Math.max(0, entry.contentRect.width);
        // CardContent has only horizontal padding by default; don't subtract vertical padding
        const computedHeight = Math.max(0, entry.contentRect.height);
        setContainerWidth(computedWidth || 400);
        setContainerHeight(computedHeight || 600);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) =>
      numPages ? Math.min(prev + 1, numPages) : prev + 1
    );
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };
  return (
    <Card className="w-2/5 h-full overflow-hidden">
      <CardHeader>
        <CardTitle>PDF Preview</CardTitle>
        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {pageNumber}
              {numPages ? ` of ${numPages}` : ""}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={numPages ? pageNumber >= numPages : false}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={zoomOut}
              disabled={scale <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={zoomIn}
              disabled={scale >= 2.0}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent
        ref={contentRef}
        className="flex-1 overflow-auto"
        tabIndex={0}
        onWheel={(e) => {
          // Flip pages on scroll
          if (e.deltaY > 0) {
            goToNextPage();
          } else if (e.deltaY < 0) {
            goToPrevPage();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "PageDown") {
            e.preventDefault();
            goToNextPage();
          } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            goToPrevPage();
          } else if (e.key === "+" || e.key === "=") {
            e.preventDefault();
            zoomIn();
          } else if (e.key === "-" || e.key === "_") {
            e.preventDefault();
            zoomOut();
          }
        }}
      >
        <Document
          file={"/manual.pdf"}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setPageNumber(1);
          }}
        >
          <Page
            pageNumber={pageNumber}
            onLoadSuccess={(page) => {
              const { width, height } = page.getViewport({ scale: 1 });
              if (width && height) {
                setPageAspectRatio(width / height);
              }
            }}
            width={Math.floor(
              Math.max(
                0,
                pageAspectRatio
                  ? Math.min(
                      containerWidth,
                      containerHeight * pageAspectRatio
                    ) / Math.max(scale, 0.0001)
                  : containerWidth
              )
            )}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-lg mx-auto"
          />
        </Document>
      </CardContent>
    </Card>
  );
};

export default PdfPreview;
