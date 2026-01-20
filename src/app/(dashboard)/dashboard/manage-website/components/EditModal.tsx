import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function EditModal({ isOpen, onClose, title, description, children }: EditModalProps) {
    // Prevent closing when clicking outside if submitting? 
    // For now simple reliable behavior.

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="mt-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
