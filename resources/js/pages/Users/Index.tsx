import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Props, User, Role, type BreadcrumbItem } from '@/types';
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
import { can } from '@/lib/can';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users, roles }: { users: User[], roles: Role[] }) {
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
        router.delete(route('users.destroy', selectedId), {
            onSuccess: () => {
                toast.success('User deleted');
            },
            onError: () => {
                toast.error('Failed to delete User');
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
            <Head title="Users" />
            
            <div>
                <div className="p-3">
                    <h1 className="text-2xl font-bold mb-4">Users</h1>
                    
                        <Button>
                            <Link href={route('users.create')}>
                                Create New User
                            </Link>
                        </Button>
                    
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase">
                            <tr className=" border-b ">
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Roles</th>
                                <th scope="col" className="px-6 py-3 w-70">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(({id,name, email, roles}) => 
                            <tr key={id} className="border-b">
                                <td className="px-6 py-2 font-medium ">{id}</td>
                                <td className="px-6 py-2">{name}</td>
                                <td className="px-6 py-2">{email}</td>
                                <td className="px-6 py-2">
                                    {roles?.map((role: { id: number; name: string; }) =>
                                    <Badge key={role.id}
                                        className='m-1 '
                                        >
                                        {role.name}
                                    </Badge>
                                    )}
                                </td>
                                <td className="px-6 py-2 space-x-1">
                                    
                                        <Button>
                                            <Link href={route('users.edit', id)}>
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
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this User? This action cannot be undone.
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
