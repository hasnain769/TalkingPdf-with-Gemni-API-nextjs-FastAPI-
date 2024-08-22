"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns"; // For formatting upload date
import ChatWindowScreen from "@/app/screens/chatWindow";
import { ChevronRightIcon, ChevronLeftIcon ,DoorOpen ,MoveHorizontalIcon ,  BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function page() {
  const [pdfListItem, setPdfList] = useState<any | []>([]);
  const [selectedPdf, setSelectedPdf] = useState<any>(null);
  const [selectedPdfId, setId] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar toggle
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    const getpdf = async () => {
      try {
        const response = await fetch("/api/pdfs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPdfList(data);
      } catch (error) {
        console.error("Failed to fetch PDFs:", error);
      }
    };
    getpdf();
  }, []);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is not available.");
    }
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);

      try {
        const response = await fetch("/api/uploadPdf", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          // Refresh the PDF list after upload
          const updatedResponse = await fetch("/api/pdfs");
          const updatedData = await updatedResponse.json();
          setPdfList(updatedData);
        } else {
          console.error("File upload failed", response.statusText);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
      }
    }
  };

  const handlePdfClick = (pdfId: any) => {
    setSelectedPdf(`/api/pdfs/${pdfId}`);
    setId(pdfId);
  };

  const handleDeletePdf = async (pdfId: any) => {
    try {
      const response = await fetch(`/api/pdfs/${pdfId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("PDF deleted successfully");
        // Remove deleted PDF from the list
        setPdfList(pdfListItem.filter((pdf: any) => pdf.id !== pdfId));
        // Clear selected PDF if it was deleted
        if (selectedPdf === `/api/pdfs/${pdfId}`) {
          setSelectedPdf(null);
        }
      } else {
        console.error("Failed to delete PDF", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const handleDownloadPdf = (pdfId: any) => {
    window.open(`/api/pdfs/${pdfId}`, "_blank");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
    
    <div className="bg-black w-full h-auto flex items-center text-white py-5 px-10 border-b-2 border-s-gray-200 gap-x-3">
  <BrainCircuit height={30} width={30} />
  <span className="flex items-center font-semibold">Play Ground</span>
  <Link href="/" className="ml-auto text-white ">
  <DoorOpen height={50} width={40}  />
  </Link>
</div>

    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Sidebar toggle button for mobile */}
      <div className="lg:hidden fixed right-0 top-13 z-20 p-2">
        <Button
          variant="outline"
          onClick={toggleSidebar}
          className="flex items-center"
        >
          {sidebarOpen ? (
            <ChevronRightIcon className="h-6 w-6" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Right Column for Upload and PDF List */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed lg:static right-0 top-0 lg:top-auto lg:right-auto h-full lg:h-auto w-64 lg:w-auto   border-s-black lg:border-2 bg-white shadow-lg lg:shadow-none transform transition-transform duration-300 ease-in-out z-10 lg:z-auto`}
      >
        <div className="p-4 border-l overflow-auto h-full w-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your PDFs</h2>
            <Button variant="outline" onClick={handleUploadClick}>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload PDF
            </Button>
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <ul>
            {pdfListItem.length > 0 ? (
              pdfListItem.map((pdf: any) => (
                <li
                  key={pdf.id}
                  onClick={() => handlePdfClick(pdf.id)}
                  className={`p-2 mb-2 cursor-pointer rounded-md ${
                    selectedPdf === `/api/pdfs/${pdf.id}`
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-5 w-5 text-blue-500" />
                      <span className="font-medium text-gray-800">
                        {pdf.name}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="h-5 w-5" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => handlePdfClick(pdf.id)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownloadPdf(pdf.id)}
                        >
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePdf(pdf.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-gray-500">No PDFs uploaded yet.</div>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-full w-full">
  {selectedPdf && (
    <div className="flex h-2/5 lg:w-1/2 p-4 lg:h-full w-full border-r-gray-300   lg:border-2">
      <iframe
        src={selectedPdf}
        className="w-full h-full border"
        title="PDF Viewer"
      />
    </div>
  )}
  {selectedPdf && (
    <div className="h-3/5 lg:h-full p-4 lg:w-1/2 w-full">
      <ChatWindowScreen pdf_id={selectedPdfId} />
    </div>
  )}
</div>

    </div>
    </>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

// function MoveHorizontalIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="18 8 22 12 18 16" />
//       <polyline points="6 8 2 12 6 16" />
//       <line x1="2" x2="22" y1="12" y2="12" />
//     </svg>
//   );
// }
