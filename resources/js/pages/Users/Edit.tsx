import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { EditProps, BreadcrumbItem, User, UserEditProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import roles from '@/routes/roles';

// breadcrumbs will be built dynamically inside the component because
// the edit breadcrumb needs the accessPoint id for its href

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Put user name.",
    }),
    email: z.string().min(2, {
        message: "Put user email.",
    }),
    roles: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Edit({ user, roles , userRoles }: UserEditProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            roles: userRoles || [],
        },
    });

    function onSubmit(data: FormValues) {
        router.put(route('users.update', user.id), data, {
            onSuccess: () => {
                toast.success("User updated successfully");
                router.visit(route('users.index'));
            },
            onError: () => {
                toast.error("Failed to update User");
            },
        });
    }

    return (
        <AppLayout breadcrumbs={[
            { title: 'Users', href: '/users' },
            { title: 'Edit', href: `/users/${user.id}/edit` },
        ]}>
            <Head title="Edit User" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit User</h1>
                    <Button variant="outline">
                        <Link href={route('users.index')}>
                            Back to List
                        </Link>
                    </Button>
                </div>

                <div className="max-w-2xl">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter AP model" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="roles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Roles</FormLabel>
                                        <FormControl>
                                            <div className="grid gap-2">
                                                {roles.map((roleName: string) => {
                                                    const checked = Array.isArray(field.value) ? field.value.includes(roleName) : false;

                                                    return (
                                                        <label key={roleName} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                checked={checked}
                                                                onCheckedChange={(val) => {
                                                                    const isChecked = Boolean(val);
                                                                    const current = Array.isArray(field.value) ? field.value : [];
                                                                    const next = isChecked
                                                                        ? [...current, roleName]
                                                                        : current.filter((v) => v !== roleName);
                                                                    field.onChange(next);
                                                                }}
                                                                id={`role-${roleName}`}
                                                            />
                                                            <span className="capitalize">{roleName}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">
                                Update User
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}