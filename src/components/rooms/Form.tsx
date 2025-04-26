import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roomsSchema } from '@/schemas/rooms';

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
import { Select } from '../ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue  } from '@/components/ui/select';

type Option = {
  value: string;
  label: string;
  type?: string[];
};

type TypeRoom = "standard" | "junior" | "suite";
type Accommodation = "single" | "double" | "triple" | "quadruple";

type FormValues = z.input<typeof roomsSchema>;

type Props = {
  id?: number;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

// Formulario para crear y editar hoteles
export const RoomsForm = ({
  id, defaultValues, onSubmit, disabled
}: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(roomsSchema),
    defaultValues
  });

  const handleSubmit = ((values: FormValues) => {
    onSubmit(values);
  });

  
  const typeRooms: Option[] = [
    { value: "standard", label: "Standard" },
    { value: "junior", label: "Junior" },
    { value: "suite", label: "Suite" },
  ];
  const accommodationRooms: Option[] = [
    { value: "single", label: "Single", type: ["standard", "suite"] },
    { value: "double", label: "Double", type: ["standard", "suite"] },
    { value: "triple", label: "Triple", type: ["junior", "suite"] },
    { value: "quadruple", label: "Quadruple", type: ["junior"] },
  ];

  const handleTypeChange = (value: TypeRoom) => {
    form.setValue('type', value);
    const firstMatchingAccommodation = accommodationRooms.find((accommodation) =>
      accommodation.type?.includes(value)
    );
    if (firstMatchingAccommodation) {
      form.setValue('accommodation', firstMatchingAccommodation.value as Accommodation);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Tipo habitación</FormLabel>
              <FormControl>
                <Select         
                  disabled={disabled}
                  required
                  {...field}
                  onValueChange={(value) => handleTypeChange(value as "standard" | "junior" | "suite")}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Selecciona un tipo de habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeRooms?.map(( type ) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="accommodation"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Acomodación</FormLabel>
              <FormControl>
                <Select         
                  disabled={disabled}
                  required
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  {...field}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Selecciona una acomodación" />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodationRooms?.map((accommodation) => {
                      if (
                        form.getValues('type') &&
                        accommodation.type?.includes(form.getValues('type'))
                      ) {
                        return (
                          <SelectItem key={accommodation.value} value={accommodation.value}>
                            {accommodation.label}
                          </SelectItem>
                        );
                      }
                      return null;
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="quantity"
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