import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Access Points',
        href: '/access-points',
    },
    {
        title: 'Create',
        href: '/access-points/create',
    },
];

const formSchema = z.object({
    model: z.string().min(2, {
        message: "Put AP model.",
    }),
    brand: z.string().min(2, {
        message: "Put AP brand.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Create() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model: "",
            brand: "",
        },
    });

    function onSubmit(data: FormValues) {
        router.post(route('access-points.store'), data, {
            onSuccess: () => {
                toast.success("Access Point created successfully");
                router.visit(route('access-points.index'));
            },
            onError: () => {
                toast.error("Failed to create Access Point");
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Access Point" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Create Access Point</h1>
                    <Button variant="outline">
                        <Link href={route('access-points.index')}>
                            Back to List
                        </Link>
                    </Button>
                </div>

                <div className="max-w-2xl">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter AP model" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter AP brand" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">
                                Create Access Point
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}