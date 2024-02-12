import React from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { Inspectors } from "@/types/inspectors";
import { InspectorsSchema } from "@/validations/inspectorSchema";
import { createInspectors, updateInspectors } from "@/utils/inspectors";

interface GeneralActionProps {
  onClick: () => void;
  isEdit: boolean;
  idInspector?: number;
  nombreInspector?: string;
  ApellidoInspector?: string;
  numeroTelefono: string;
}

const InspectorsForm: React.FC<GeneralActionProps> = ({
  isEdit,
  numeroTelefono,
  onClick,
  ApellidoInspector,
  idInspector,
  nombreInspector,
}) => {
  const resolver: Resolver<Inspectors, FieldErrors<Inspectors>> = async (
    data
  ) => {
    try {
      // Validar los datos con zod
      await InspectorsSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<Inspectors> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof Inspectors;
          fieldErrors[fieldName] = {
            type: "validation", // Asegúrate de ajustar esto según tus necesidades
            message: issue.message ?? "Error de validación",
          };
        }
      });

      // Devolver los errores adaptados
      return { values: {}, errors: fieldErrors };
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inspectors>({
    resolver: resolver,
  });

  const onSubmit = (data: Inspectors) => {
    console.log("Formulario de secciones enviado:", data);

    if (isEdit) {
      if (idInspector && idInspector !== -1) {
        if (nombreInspector) {
          if (numeroTelefono) {
            updateInspector(
              idInspector,
              data.nombre,
              data.apellido,
              data.numeroTelefono
            );
            onClick();
          }
        }
      }
    } else {
      createInspector(data.nombre, data.apellido, data.numeroTelefono);
      onClick();
    }
    // Limpiar los valores de los campos
    setValue("nombre", "");
    setValue("apellido", "");
    setValue("numeroTelefono", "");
  };

  const createInspector = async (
    nombre: string,
    apellido: string,
    numeroTelefono: string
  ) => {
    try {
      const response = await createInspectors(nombre, apellido, numeroTelefono);
    } catch (error) {
      console.error(error);
    }
  };

  const updateInspector = async (
    id: number,
    nombre: string,
    apellido: string,
    numeroTelefono: string
  ) => {
    try {
      const response = await updateInspectors(
        id,
        nombre,
        apellido,
        numeroTelefono
      );
    } catch (error) {
      console.error(error);
    }
  };

  return <div>InspectorsForm</div>;
};

export default InspectorsForm;
