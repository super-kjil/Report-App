import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { EditProps, Props, User, type BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Create',
        href: '/users/create',
    },
];

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Put user name.",
    }),
    email: z.string().min(2, {
        message: "Put user email.",
    }),
    password: z.string().min(8, {
        message: "Put user password.",
    }),
    roles: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Create({ roles } : Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            roles: [],
        },
    });

    function onSubmit(data: FormValues) {
        router.post(route('users.store'), data, {
            onSuccess: () => {
                toast.success("User created successfully");
                router.visit(route('users.index'));
            },
            onError: () => {
                toast.error("Failed to create User");
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Create User</h1>
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
                                            <Input placeholder="Enter user name" {...field} />
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
                                            <Input placeholder="Enter email" type='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter user password" type='password' {...field} />
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
                                                {roles.map((role) => {
                                                    const id = String(role.id ?? role.value ?? role);
                                                    const label = role.name ?? role.label ?? String(role);
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
                                                                id={`role-${id}`}
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
                                Create User
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}