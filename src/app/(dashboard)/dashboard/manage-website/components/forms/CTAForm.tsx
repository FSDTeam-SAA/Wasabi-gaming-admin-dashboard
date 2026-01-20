"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HeroSectionContent } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface CTAFormProps {
    initialData?: any; // Relaxed type to handle variations
    onSave: (data: any) => Promise<void>;
    onCancel: () => void;
    variant?: 'hero' | 'section-2' | 'section-3' | 'portfolio';
}

export function CTAForm({ initialData, onSave, onCancel, variant = 'hero' }: CTAFormProps) {
    const defaultValues = initialData || {
        title: '',
        subtitle: '',
        description: '',
        primaryButton: '',
        secondaryButton: '',
        buttons: [], // For section 2
        imageUrl: '', // For section 3
    };

    const { register, control, handleSubmit, setValue, formState: { isSubmitting } } = useForm({
        defaultValues,
    });

    // For Section 2 multiple buttons
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'buttons',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setValue('imageUrl', url);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} placeholder="Enter section title" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input id="subtitle" {...register('subtitle')} placeholder="Enter section subtitle" />
            </div>

            {variant === 'hero' && (
                <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea id="description" {...register('description')} placeholder="Enter section description" />
                </div>
            )}

            {/* Hero & Section 3 Buttons */}
            {(variant === 'hero' || variant === 'section-3') && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="primaryButton">Primary Button Text</Label>
                        <Input id="primaryButton" {...register('primaryButton')} placeholder="e.g. Sign Up" />
                    </div>
                    {variant === 'hero' && (
                        <div className="space-y-2">
                            <Label htmlFor="secondaryButton">Secondary Button Text</Label>
                            <Input id="secondaryButton" {...register('secondaryButton')} placeholder="e.g. Learn More" />
                        </div>
                    )}
                </div>
            )}

            {/* Section 2: Multiple Buttons */}
            {variant === 'section-2' && (
                <div className="space-y-3 border p-4 rounded-md">
                    <Label>Primary Buttons List</Label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <Input {...register(`buttons.${index}.text`)} placeholder="Button Text" />
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={() => append({ text: '' })}>
                        <Plus className="w-4 h-4 mr-2" /> Add Button
                    </Button>

                    <div className="space-y-2 mt-4">
                        <Label htmlFor="secondaryButton">Secondary Button Text</Label>
                        <Input id="secondaryButton" {...register('secondaryButton')} placeholder="e.g. CV Builder" />
                    </div>
                </div>
            )}

            {/* Section 3: Image */}
            {variant === 'section-3' && (
                <div className="space-y-2">
                    <Label>Section Image</Label>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    <input type="hidden" {...register('imageUrl')} />
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} variant="default">
                    {isSubmitting ? "Saving..." : "Next"}
                </Button>
            </div>
        </form>
    );
}
