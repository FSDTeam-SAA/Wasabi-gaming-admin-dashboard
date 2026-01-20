"use client";

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ImageSectionContent } from '../../types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ImageFormProps {
    initialData?: ImageSectionContent;
    onSave: (data: ImageSectionContent) => Promise<void>;
    onCancel: () => void;
}

export function ImageForm({ initialData, onSave, onCancel }: ImageFormProps) {
    const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);

    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<ImageSectionContent>({
        defaultValues: initialData || { imageUrl: '' },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            // In a real app, you'd upload here. For now we use the local URL or a placeholder.
            setValue('imageUrl', url);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="imageUpload">Upload Image</Label>
                <div className="flex flex-col gap-4">
                    {preview && (
                        <div className="relative w-full h-48 bg-muted rounded-md overflow-hidden border">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                    {/* Hidden input to store the URL/Value for form submission */}
                    <input type="hidden" {...register('imageUrl')} />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} variant="default">
                    {isSubmitting ? "Saving..." : "Save Image"}
                </Button>
            </div>
        </form>
    );
}
