import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelSchema } from '@/schemas/hotels';

// componentes de la UI
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

type FormValues = z.input<typeof hotelSchema>;

type Props = {
  id?: number;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

// Formulario para crear y editar hoteles
export const HotelForm = ({
  id, defaultValues, onSubmit, disabled
}: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(hotelSchema),
    defaultValues
  });

  const handleSubmit = ((values: FormValues) => {
    onSubmit(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Nombre</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  disabled={disabled}
                  placeholder="Hotel Decameron"
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Dirección</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  disabled={disabled}
                  placeholder="Calle 123"
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Ciudad</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  disabled={disabled}
                  placeholder="Bogotá"
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="nit"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>NIT</FormLabel>
                <FormControl>
                <Input
                  id={field.name}
                  disabled={disabled}
                  type="text"
                  placeholder="12345678-9"
                  pattern="[0-9]{9}-[0-9]"
                  required
                  {...field}
                  value={field.value ?? ''}
                />
                </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="total_rooms"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Nro de habitaciones</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  disabled={disabled}
                  placeholder="10"
                  pattern="[0-9]{9}"
                  type="number"
                  min={1}
                  required
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Editar" : "Crear"}
        </Button>
      </form>
    </Form>
  );
};