"use client"
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

async function  getAllPdfs(){
  const response = await fetch("/api/pdfs")
  console.log(response)
  return response
}

export default function PdfListView() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.error("File input ref is not available.");
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);
            console.log(formData
            )
            try {
                const response = await fetch("/api/uploadPdf", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    console.log("File uploaded successfully");
                    // Optionally: Provide user feedback or refresh the list of PDFs
                } else {
                    console.error("File upload failed", response.statusText);
                }
            } catch (error) {
                console.error("Error during file upload:", error);
            }
        }
        

       
    };

  //   const getAllPdfs = async () =>{
  //     const response = await fetch("/api/pdfs")
  //     console.log(response)
  //     return response
  //   }
  //  getAllPdfs()
    return (
        <div className="flex flex-col p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">PDF Files</h2>
                <div>
                    <Button variant="outline" onClick={handleUploadClick}>
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload PDF
                    </Button>
                    <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
        </div>
        </div>
        <div className="flex-1 overflow-auto">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span>Report Q4 2023.pdf</span>
                </div>
                </TableCell>
                <TableCell>2 days ago</TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Discuss with AI</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span>Annual Report 2023.pdf</span>
                </div>
                </TableCell>
                <TableCell>1 week ago</TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Discuss with AI</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span>Marketing Strategy.pdf</span>
                </div>
                </TableCell>
                <TableCell>3 hours ago</TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Discuss with AI</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span>Project Plan 2024.pdf</span>
                </div>
                </TableCell>
                <TableCell>5 days ago</TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Discuss with AI</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4" />
                    <span>Employee Handbook.pdf</span>
                </div>
                </TableCell>
                <TableCell>2 weeks ago</TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoveHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Discuss with AI</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </div>
    </div>

    )
}

function FileIcon(props : any) {
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
    )
  }
  
  

  
  
  function MoveHorizontalIcon(props : any) {
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
        <polyline points="18 8 22 12 18 16" />
        <polyline points="6 8 2 12 6 16" />
        <line x1="2" x2="22" y1="12" y2="12" />
      </svg>
    )
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
    )
  }