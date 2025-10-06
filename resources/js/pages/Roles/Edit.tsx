import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { EditProps, BreadcrumbItem } from '@/types';
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


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Put role name.",
    }),
    permissions: z.array(z.string()).min(1, {
        message: "Select at least one permission.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Edit({ role, rolePermissions, permissions }: EditProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: role?.name || "",
            permissions: rolePermissions || [],
        },
    });

    function onSubmit(data: FormValues) {
        router.put(route('roles.update', role.id), data, {
            onSuccess: () => {
                toast.success("Role updated successfully");
                router.visit(route('roles.index'));
            },
            onError: () => {
                toast.error("Failed to update Role");
            },
        });
    }

    return (
        <AppLayout breadcrumbs={[
            { title: 'Roles', href: '/roles' },
            { title: 'Edit', href: `/roles/${role.id}/edit` },
        ]}>
            <Head title="Edit Role" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Role</h1>
                    <Button variant="outline">
                        <Link href={route('roles.index')}>
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
                                            <Input placeholder="Enter role name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="permissions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Permissions</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Role Permissions" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="permissions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Permissions</FormLabel>
                                        <FormControl>
                                            <div className="grid gap-2">
                                                {permissions.map((permission: any) => {
                                                    const id = String(permission.id ?? permission.value ?? permission);
                                                    const label = permission.name ?? permission.label ?? String(permission);
                                                    const checked = Array.isArray(field.value) ? field.value.includes(id) : false;

                                                    return (
                                                        <label key={id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                checked={checked}
                                                                onCheckedChange={(val) => {
                                                                    const isChecked = Boolean(val);
                                                                    const current = Array.isArray(field.value) ? field.value : [];
                                                                    const next = isChecked
                                                                        ? [...current, id]
                                                                        : current.filter((v) => v !== id);
                                                                    field.onChange(next);
                                                                }}
                                                                id={`permission-${id}`}
                                                            />
                                                            <span>{label}</span>
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
                                Update Role
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}