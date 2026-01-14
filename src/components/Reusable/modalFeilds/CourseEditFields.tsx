// "use client";
// import React, { useState, useEffect } from "react";
// import { Upload, Plus, Trash2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// interface CourseEditFieldsProps {
//   initialData: any;
//   courseId: string;
//   onSuccess?: () => void;
// }

// const CourseEditFields = ({
//   initialData,
//   courseId,
//   onSuccess,
// }: CourseEditFieldsProps) => {
//   const { data: session } = useSession();
//   const token = session?.user?.accessToken;
//   const queryClient = useQueryClient();

//   const [formData, setFormData] = useState({
//     courseName: initialData?.name || "",
//     description: initialData?.description || "",
//     grade: initialData?.gradeLevel || "",
//     category: initialData?.category || "",
//     coursePrice: initialData?.coursePrice || 0,
//     videos: initialData?.courseVideo?.map((v: any) => ({
//       title: v.title || "",
//       existingUrl: v.url || "",
//       time: v.time || "00:00",
//       file: null, // নতুন ফাইল আপলোড করতে চাইলে
//     })) || [],
//   });

//   const updateCourseMutation = useMutation({
//     mutationFn: async (payload: FormData) => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${courseId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: payload,
//         }
//       );

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.message || "Failed to update course");
//       }
//       return res.json();
//     },

//     onSuccess: () => {
//       toast.success("Course updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["courses"] });
//       onSuccess?.();
//     },

//     onError: (error: any) => {
//       toast.error(error.message || "Something went wrong while updating");
//     },
//   });

//   const handleChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleVideoChange = (index: number, field: string, value: any) => {
//     const updatedVideos = [...formData.videos];
//     updatedVideos[index] = { ...updatedVideos[index], [field]: value };
//     handleChange("videos", updatedVideos);
//   };

//   const addVideoField = () => {
//     const newVideo = { file: null, title: "", existingUrl: "", time: "00:00" };
//     handleChange("videos", [...formData.videos, newVideo]);
//   };

//   const removeVideo = (index: number) => {
//     const updatedVideos = formData.videos.filter((_: any, i: number) => i !== index);
//     handleChange("videos", updatedVideos);
//   };

//   const handleSubmit = () => {
//     const payload = new FormData();

//     const courseData = {
//       name: formData.courseName.trim(),
//       description: formData.description.trim(),
//       gradeLevel: formData.grade,
//       category: formData.category,
//       coursePrice: Number(formData.coursePrice) || 0,
//     };

//     payload.append("data", JSON.stringify(courseData));

//     // নতুন ভিডিও যোগ করা হলে
//     formData.videos.forEach((video: any) => {
//       if (video.file instanceof File) {
//         payload.append("courseVideo", video.file);
//         payload.append("titles", JSON.stringify([video.title.trim()]));
//       }
//       // Note: Existing video update করার জন্য আপনার backend-এ আলাদা logic লাগবে
//     });

//     updateCourseMutation.mutate(payload);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Course Name */}
//       <div className="space-y-2">
//         <Label>Course Name *</Label>
//         <Input
//           type="text"
//           placeholder="e.g. Mathematics for Class 9"
//           value={formData.courseName}
//           onChange={(e) => handleChange("courseName", e.target.value)}
//         />
//       </div>

//       {/* Description */}
//       <div className="space-y-2">
//         <Label>Description</Label>
//         <Textarea
//           rows={4}
//           placeholder="Brief description of the course..."
//           value={formData.description}
//           onChange={(e) => handleChange("description", e.target.value)}
//         />
//       </div>

//       {/* Grade & Category & Price */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <Label>Grade Level *</Label>
//           <Select
//             value={formData.grade}
//             onValueChange={(value) => handleChange("grade", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select grade" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="6">Grade 6</SelectItem>
//               <SelectItem value="7">Grade 7</SelectItem>
//               <SelectItem value="8">Grade 8</SelectItem>
//               <SelectItem value="9">Grade 9</SelectItem>
//               <SelectItem value="10">Grade 10</SelectItem>
//               <SelectItem value="11">Grade 11</SelectItem>
//               <SelectItem value="12">Grade 12</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label>Category *</Label>
//           <Select
//             value={formData.category}
//             onValueChange={(value) => handleChange("category", value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Mathematics">Mathematics</SelectItem>
//               <SelectItem value="Science">Science</SelectItem>
//               <SelectItem value="English">English</SelectItem>
//               <SelectItem value="Technology">Technology</SelectItem>
//               <SelectItem value="Social Studies">Social Studies</SelectItem>
//               <SelectItem value="History">History</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label>Course Price (৳)</Label>
//           <Input
//             type="number"
//             placeholder="0 for free"
//             value={formData.coursePrice}
//             onChange={(e) => handleChange("coursePrice", Number(e.target.value))}
//           />
//         </div>
//       </div>

//       {/* Videos Section */}
//       <div className="space-y-4">
//         <Label className="block text-base font-medium">Course Videos</Label>

//         {formData.videos.map((video: any, index: number) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50 relative"
//           >
//             {/* Existing Video Info / New Upload */}
//             <div className="space-y-2">
//               {video.existingUrl && !video.file ? (
//                 <div className="text-sm text-gray-600">
//                   Current video: <span className="font-medium">{video.title}</span>
//                   <div className="text-xs text-gray-500 mt-1 truncate">
//                     {video.existingUrl}
//                   </div>
//                 </div>
//               ) : (
//                 <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition">
//                   <Upload className="h-8 w-8 text-gray-400 mb-3" />
//                   <p className="text-sm font-medium text-gray-700">
//                     {video.file ? video.file.name : "Upload new/replace video"}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">MP4 • Max 100MB</p>
//                   <input
//                     type="file"
//                     accept="video/mp4,video/quicktime"
//                     className="hidden"
//                     onChange={(e) =>
//                       handleVideoChange(index, "file", e.target.files?.[0] || null)
//                     }
//                   />
//                 </label>
//               )}
//             </div>

//             {/* Title */}
//             <div className="space-y-2">
//               <Label>Video Title</Label>
//               <Input
//                 placeholder="e.g. Introduction to Algebra"
//                 value={video.title}
//                 onChange={(e) => handleVideoChange(index, "title", e.target.value)}
//               />
//             </div>

//             {/* Remove Button */}
//             <button
//               type="button"
//               onClick={() => removeVideo(index)}
//               className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
//               title="Remove this video"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}

//         <Button
//           type="button"
//           variant="outline"
//           onClick={addVideoField}
//           className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
//         >
//           <Plus className="h-4 w-4" /> Add Another Video
//         </Button>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 pt-6 border-t">
//         <Button
//           variant="outline"
//           onClick={onSuccess}
//           disabled={updateCourseMutation.isPending}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           disabled={updateCourseMutation.isPending}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black"
//         >
//           {updateCourseMutation.isPending ? "Updating..." : "Save Changes"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CourseEditFields;




"use client";
import React, { useState, useEffect } from "react";
import { Upload, Plus, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CourseEditModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialData: any;
    courseId: string;
}

const CourseEditModal = ({
    open,
    setOpen,
    initialData,
    courseId,
}: CourseEditModalProps) => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        courseName: initialData?.courseName || "",
        description: initialData?.description || "",
        grade: initialData?.grade || "",
        category: initialData?.category || "",
        coursePrice: initialData?.coursePrice || 0,
        videos: initialData?.videos || [], // নতুন ভিডিওর জন্য
    });


    const updateCourseMutation = useMutation({
        mutationFn: async (payload: FormData) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/${courseId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: payload,
                }
            );
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to update course");
            }
            return res.json();
        },

        onSuccess: () => {
            toast.success("Course updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["courses"] });
            setOpen(false);
        },

        onError: (error: any) => {
            toast.error(error.message || "Something went wrong while updating");
        },
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleVideoChange = (index: number, field: string, value: any) => {
        const updatedVideos = [...formData.videos];
        updatedVideos[index] = { ...updatedVideos[index], [field]: value };
        handleChange("videos", updatedVideos);
    };

    const addVideoField = () => {
        const newVideo = { file: null, title: "", existingUrl: "", time: "00:00" };
        handleChange("videos", [...formData.videos, newVideo]);
    };

    const removeVideo = (index: number) => {
        const updatedVideos = formData.videos.filter((_: any, i: number) => i !== index);
        handleChange("videos", updatedVideos);
    };

    const handleSubmit = () => {
        const payload = new FormData();

        const courseData = {
            name: formData.courseName.trim(),
            description: formData.description.trim(),
            gradeLevel: formData.grade,
            category: formData.category,
            coursePrice: Number(formData.coursePrice) || 0,
        };

        payload.append("data", JSON.stringify(courseData));

        // নতুন ভিডিও যোগ করা
        formData.videos.forEach((video: any) => {
            if (video.file instanceof File) {
                payload.append("courseVideo", video.file);
                payload.append("titles", JSON.stringify([video.title.trim()]));
            }
        });

        updateCourseMutation.mutate(payload);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Course</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Course Name */}
                    <div className="space-y-2">
                        <Label>Course Name *</Label>
                        <Input
                            value={formData.courseName}
                            onChange={(e) => handleChange("courseName", e.target.value)}
                            placeholder="e.g. Mathematics for Class 9"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Brief description of the course..."
                        />
                    </div>

                    {/* Grade, Category, Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Grade Level *</Label>
                            <Select
                                value={formData.grade}
                                onValueChange={(value) => handleChange("grade", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="6">Grade 6</SelectItem>
                                    <SelectItem value="7">Grade 7</SelectItem>
                                    <SelectItem value="8">Grade 8</SelectItem>
                                    <SelectItem value="9">Grade 9</SelectItem>
                                    <SelectItem value="10">Grade 10</SelectItem>
                                    <SelectItem value="11">Grade 11</SelectItem>
                                    <SelectItem value="12">Grade 12</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Category *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleChange("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                                    <SelectItem value="Science">Science</SelectItem>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Technology">Technology</SelectItem>
                                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                                    <SelectItem value="History">History</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Course Price (৳)</Label>
                            <Input
                                type="number"
                                value={formData.coursePrice}
                                onChange={(e) => handleChange("coursePrice", Number(e.target.value))}
                                placeholder="0 for free"
                            />
                        </div>
                    </div>

                    {/* Videos Section */}
                    <div className="space-y-4">
                        <Label className="block text-base font-medium">Course Videos</Label>

                        {formData.videos.map((video: any, index: number) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50 relative"
                            >
                                {/* Video Upload / Existing */}
                                <div className="space-y-2">
                                    {video.existingUrl && !video.file ? (
                                        <div className="text-sm text-gray-600">
                                            Current video: <span className="font-medium">{video.title}</span>
                                            <div className="text-xs text-gray-500 mt-1 truncate">
                                                {video.existingUrl}
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition">
                                            <Upload className="h-8 w-8 text-gray-400 mb-3" />
                                            <p className="text-sm font-medium text-gray-700">
                                                {video.file ? video.file.name : "Upload new/replace video"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">MP4 • Max 100MB</p>
                                            <input
                                                type="file"
                                                accept="video/mp4,video/quicktime"
                                                className="hidden"
                                                onChange={(e) =>
                                                    handleVideoChange(index, "file", e.target.files?.[0] || null)
                                                }
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Video Title */}
                                <div className="space-y-2">
                                    <Label>Video Title</Label>
                                    <Input
                                        value={video.title}
                                        onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                                        placeholder="e.g. Introduction to Algebra"
                                    />
                                </div>

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => removeVideo(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition"
                                    title="Remove this video"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addVideoField}
                            className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
                        >
                            <Plus className="h-4 w-4" /> Add Another Video
                        </Button>
                    </div>
                </div>

                <DialogFooter className="gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="rounded-[20px]"
                        disabled={updateCourseMutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={updateCourseMutation.isPending}
                        className="bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90 rounded-[20px]"
                    >
                        {updateCourseMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CourseEditModal;