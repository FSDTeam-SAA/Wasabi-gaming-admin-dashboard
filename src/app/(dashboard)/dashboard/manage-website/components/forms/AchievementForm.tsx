"use client";

import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AchievementSectionContent } from '../../types';
import { Card, CardContent } from '@/components/ui/card';

interface AchievementFormProps {
    initialData?: AchievementSectionContent;
    onSave: (data: AchievementSectionContent) => Promise<void>;
    onCancel: () => void;
}

export function AchievementForm({ initialData, onSave, onCancel }: AchievementFormProps) {
    const defaultCards = Array(4).fill({ title: '', subtitle: '', imageUrl: '' });

    const { register, control, handleSubmit, setValue, formState: { isSubmitting } } = useForm<AchievementSectionContent>({
        defaultValues: initialData?.cards?.length === 4 ? initialData : { cards: defaultCards },
    });

    const { fields } = useFieldArray({
        control,
        name: 'cards',
    });

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setValue(`cards.${index}.imageUrl`, url);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, index) => (
                    <Card key={field.id}>
                        <CardContent className="pt-6 space-y-3">
                            <h4 className="font-semibold">Card {index + 1}</h4>
                            <div className="space-y-1">
                                <Label>Title</Label>
                                <Input {...register(`cards.${index}.title`)} placeholder="e.g. 1500+" />
                            </div>
                            <div className="space-y-1">
                                <Label>Subtitle</Label>
                                <Input {...register(`cards.${index}.subtitle`)} placeholder="e.g. Users" />
                            </div>
                            <div className="space-y-1">
                                <Label>Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(index, e)}
                                />
                                <input type="hidden" {...register(`cards.${index}.imageUrl`)} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} variant="default">
                    {isSubmitting ? "Saving..." : "Next"}
                </Button>
            </div>
        </form>
    );
}
