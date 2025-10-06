import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Props,  type BreadcrumbItem } from '@/types';
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
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index({ roles, }: Props) {
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
        router.delete(route('roles.destroy', selectedId), {
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
                    <h1 className="text-2xl font-bold mb-4">Roles</h1>
                    <Button>
                        <Link href={route('roles.create')}>
                            Create New Role
                        </Link>
                    </Button>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase">
                            <tr className=" border-b ">
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Permission</th>
                                <th scope="col" className="px-6 py-3 w-70">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {roles.map(({id, name, permissions}) => 
                            <tr key={id} className=" border-b">
                                <td className="px-6 py-2 font-medium ">{id}</td>
                                <td className="px-6 py-2">{name}</td>
                                <td className="px-6 py-2">
                                    {permissions.map((permission: { id: number; name: string; }) =>
                                    <Badge key={permission.id}
                                        className='m-1 '
                                        >
                                        {permission.name}
                                    </Badge>
                                    )}
                                </td> 
                                <td className="px-6 py-2 space-x-1">
                                    <Button>
                                        <Link href={route('roles.edit', id)}>
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
                        <AlertDialogTitle>Delete Role</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this Role? This action cannot be undone.
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
