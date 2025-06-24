import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Example Feature Form
 *
 * - Uses React Hook Form (RHF)
 * - Uses Zod schema for validation
 * - Inferred types from Zod schema (type-safe form values)
 * - No manual validation logic
 */

// Step 1: Define Zod schema
// This schema defines both:
// - Validation rules
// - Type shape of form values
const exampleFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

// Step 2: Infer form type from schema
// This makes form values type-safe
type ExampleFormValues = z.infer<typeof exampleFormSchema>;

export function ExampleFeatureForm() {
  // Step 3: Setup RHF with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExampleFormValues>({
    resolver: zodResolver(exampleFormSchema),
  });

  // Step 4: On form submit
  const onSubmit = (data: ExampleFormValues) => {
    alert(`Form submitted!\nTitle: ${data.title}\nDescription: ${data.description}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('title')}
          type="text"
          placeholder="Title"
          className="border p-2 rounded w-full"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Description"
          className="border p-2 rounded w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
