// "use client";

// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon, Upload, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import dynamic from "next/dynamic";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from "@/components/ui/dialog";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// interface EditEventModalProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   formData: any;
//   onChange: (field: string, value: any) => void;
//   onImageChange: (file: File | null) => void;
//   onSubmit: () => void;
// }

// export default function EditEventModal({
//   open,
//   setOpen,
//   formData,
//   onChange,
//   onImageChange,
//   onSubmit,
// }: EditEventModalProps) {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const preview = URL.createObjectURL(file);
//       onImageChange(file);
//       onChange("imagePreview", preview);
//     }
//   };

//   const removeImage = () => {
//     onImageChange(null);
//     onChange("imagePreview", null);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
//         <DialogHeader>
//           <DialogTitle>Edit Event</DialogTitle>
//           <DialogDescription>Edit the details of your event below.</DialogDescription>
//         </DialogHeader>

//         <DialogClose asChild>
//           <Button variant="ghost" className="absolute top-4 right-4">
//             <X className="h-4 w-4" />
//           </Button>
//         </DialogClose>

//         <div className="space-y-6 mt-4">
//           {/* Title */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Event Title *</Label>
//             <Input
//               id="title"
//               value={formData.title || ""}
//               onChange={(e) => onChange("title", e.target.value)}
//             />
//           </div>

//           {/* Event Type */}
//           <div className="space-y-2">
//             <Label htmlFor="eventType">Event Type / Category</Label>
//             <Input
//               id="eventType"
//               value={formData.eventType || ""}
//               onChange={(e) => onChange("eventType", e.target.value)}
//             />
//           </div>

//           {/* Date & Time */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label>Date *</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={cn(
//                       "w-full justify-start text-left font-normal",
//                       !formData.date && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {formData.date
//                       ? format(new Date(formData.date), "PPP")
//                       : "Select date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={formData.date ? new Date(formData.date) : undefined}
//                     onSelect={(date) =>
//                       onChange("date", date ? date.toISOString().split("T")[0] : "")
//                     }
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="time">Time *</Label>
//               <Input
//                 id="time"
//                 type="time"
//                 value={formData.time || ""}
//                 onChange={(e) => onChange("time", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Cover Image */}
//           <div className="space-y-2">
//             <Label>Event Cover Image</Label>

//             {formData.imagePreview ? (
//               <div className="relative group w-full max-w-md">
//                 <div className="overflow-hidden rounded-lg border bg-muted">
//                   <Image
//                     src={formData.imagePreview}
//                     alt="Current event cover"
//                     width={500}
//                     height={320}
//                     className="w-full h-64 object-cover"
//                   />
//                 </div>
//                 <Button
//                   size="icon"
//                   variant="destructive"
//                   className="absolute top-2 right-2"
//                   onClick={removeImage}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             ) : (
//               <div className="border-2 border-dashed rounded-lg p-10 text-center">
//                 <label className="cursor-pointer">
//                   <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
//                   <div className="mt-4 text-sm font-medium">
//                     Upload new cover image
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </div>
//             )}
//           </div>

//           {/* Rich Text Description */}
//           <div className="space-y-2">
//             <Label>Event Description *</Label>
//             <div className="border rounded-md min-h-[320px]">
//               <ReactQuill
//                 theme="snow"
//                 value={formData.description || ""}
//                 onChange={(value) => onChange("description", value)}
//                 className="h-[280px]"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end mt-4">
//             <Button onClick={onSubmit}>Save Changes</Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface EditEventModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData?: any; // pass initial data if editing
}

export default function EditEventModal({ open, setOpen, initialData }: EditEventModalProps) {
  const [formData, setFormData] = useState<any>({
    title: "",
    eventType: "",
    date: "",
    time: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  // populate formData if editing
  // useEffect(() => {
  //   if (initialData) {
  //     setFormData({
  //       title: initialData.title || "",
  //       eventType: initialData.eventType || "",
  //       date: initialData.date || "",
  //       time: initialData.time || "",
  //       description: initialData.description || "",
  //       image: initialData.image || null,
  //       imagePreview: initialData.imagePreview || initialData.image || null,
  //     });
  //   }
  // }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      handleChange("image", file);
      handleChange("imagePreview", preview);
    }
  };

  const removeImage = () => {
    handleChange("image", null);
    handleChange("imagePreview", null);
  };

  const handleSubmit = () => {
    console.log("Submitting Event Data:", formData);
    // Here you can replace console.log with your API call
    setOpen(false); // close modal after submit
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Event" : "Add Event"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Edit your event details below." : "Fill in the details to create a new event."}
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button variant="ghost" className="absolute top-4 right-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        <div className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type / Category</Label>
            <Input
              id="eventType"
              value={formData.eventType}
              onChange={(e) => handleChange("eventType", e.target.value)}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(new Date(formData.date), "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date ? new Date(formData.date) : undefined}
                    onSelect={(date) =>
                      handleChange("date", date ? date.toISOString().split("T")[0] : "")
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Event Cover Image</Label>

            {formData.imagePreview ? (
              <div className="relative group w-full max-w-md">
                <div className="overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={formData.imagePreview}
                    alt="Event cover"
                    width={500}
                    height={320}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-10 text-center">
                <label className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 text-sm font-medium">Click or drag & drop image</div>
                  <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </label>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Event Description *</Label>
            <div className="border rounded-md min-h-[320px]">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(value) => handleChange("description", value)}
                className="h-[280px]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmit}>{initialData ? "Save Changes" : "Create Event"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
