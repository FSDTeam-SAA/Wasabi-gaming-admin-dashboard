"use client";

import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TeamSectionContent } from '../../types';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

interface TeamFormProps {
    initialData?: TeamSectionContent;
    onSave: (data: TeamSectionContent) => Promise<void>;
    onCancel: () => void;
}

export function TeamForm({ initialData, onSave, onCancel }: TeamFormProps) {
    const { register, control, handleSubmit, setValue, getValues, formState: { isSubmitting } } = useForm<TeamSectionContent>({
        defaultValues: initialData || { members: [{ imageUrl: '' }] },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'members',
    });

    // Helper to handle individual file uploads
    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setValue(`members.${index}.imageUrl`, url);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start p-4 border rounded-lg bg-muted/10">
                        <div className="flex-1 space-y-2">
                            <Label>Team Member Photo {index + 1}</Label>
                            <div className="flex items-center gap-4">
                                {/* We can peek at current value if we want preview, simpler to just rely on input for now or add complex state mapping */}
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(index, e)}
                                    />
                                </div>
                            </div>
                            {/* Hidden input for form state */}
                            <input type="hidden" {...register(`members.${index}.imageUrl`)} />
                        </div>
                        <Button type="button" variant="destructive" size="icon" className="mt-8" onClick={() => remove(index)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <Button type="button" variant="secondary" className="w-full" onClick={() => append({ imageUrl: '' })}>
                <Plus className="w-4 h-4 mr-2" /> Add Team Member
            </Button>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} variant="default">
                    {isSubmitting ? "Saving..." : "Save Images"}
                </Button>
            </div>
        </form>
    );
}
