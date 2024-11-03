'use client';

import * as React from 'react';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// shadcn
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import LoadingButton from '@/components/ui/loading-button'
import { toast } from "@/components/ui/use-toast"


import MultipleSelector, { Option } from '@/components/custom/MultipleSelector';

const OPTIONS: Option[] = [
  { label: 'Statements', value: 'statements' },
  { label: 'Utility', value: 'utility' },
  { label: 'Missing', value: 'missing' },
  { label: 'Lost', value: 'lost' },
  { label: 'Found', value: 'found' },
];



const optionSchema = zod.object({
    label: zod.string(),
    value: zod.string(),
    disable: zod.boolean().optional(),
})



const FormSchema = zod.object({
    badges: zod.array(optionSchema).min(1),
})





const MultipleSelectorCreatableForm = () => {

    const form = useForm<zod.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [loading, setLoading] = React.useState(false);

    function onSubmit(data: zod.infer<typeof FormSchema>) {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            toast({
                title: 'Your submitted data',
                description: ""
            })
        })
    }


  return (
    <div className="w-full pl-3 pr-3">
      <MultipleSelector
        className="bg-black-bg"
        defaultOptions={OPTIONS}
        placeholder="Create a new tag or select an existing one."
        creatable
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorCreatableForm;
