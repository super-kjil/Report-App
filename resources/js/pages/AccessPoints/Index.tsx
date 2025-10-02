import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Props, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Access Points',
        href: '/access-points',
    },
];

export default function Index({ accessPoints }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete(id: number) {
        setSelectedId(id);
        setOpen(true);
    }

    function confirmDelete() {
        if (selectedId === null) return;
        setIsDeleting(true);
        router.delete(route('access-points.destroy', selectedId), {
            onSuccess: () => {
                toast.success('Access point deleted');
            },
            onError: () => {
                toast.error('Failed to delete access point');
            },
            onFinish: () => {
                setIsDeleting(false);
                setOpen(false);
                setSelectedId(null);
            },
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Access Points" />
            <div>
                <div className="p-3">
                    <h1 className="text-2xl font-bold mb-4">Access Points</h1>
                    <Button>
                        <Link href={route('access-points.create')}>
                            Create New Access Point
                        </Link>
                    </Button>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase">
                            <tr className=" border-b ">
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Model</th>
                                <th scope="col" className="px-6 py-3">Brand</th>
                                <th scope="col" className="px-6 py-3 w-70">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accessPoints.map(({id, model, brand}) => 
                            <tr key={id} className=" border-b">
                                <td className="px-6 py-2 font-medium ">{id}</td>
                                <td className="px-6 py-2">{model}</td>
                                <td className="px-6 py-2">{brand}</td>

                                <td className="px-6 py-2 space-x-1">
                                    <Button>
                                        <Link href={route('access-points.edit', id)}>
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button onClick={() => handleDelete(id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Access Point</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this access point? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
