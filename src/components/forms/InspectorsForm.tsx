import React from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { Inspectors } from "@/types/inspectors";
import { InspectorsSchema } from "@/validations/inspectorSchema";
import { createInspectors, updateInspectors } from "@/utils/inspectors";
import { Box, TextField, Tooltip } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

interface GeneralActionProps {
  onClick: () => void;
  isEdit: boolean;
  idInspector?: number;
  nombreInspector?: string;
  apellidoInspector?: string;
  numeroTelefono: string;
  urlImg?: string;
}

const InspectorsForm: React.FC<GeneralActionProps> = ({
  isEdit,
  numeroTelefono,
  onClick,
  apellidoInspector,
  idInspector,
  nombreInspector,
  urlImg,
}) => {
  //Logica para guardar la url de la img.

  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(urlImg);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      console.log(file);
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  React.useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(imageUrl!);
      }
    };
  }, [image]);

  //--------------------------------------------------------------------
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
              data.numeroTelefono,
              data.urlImg
            );
            onClick();
          }
        }
      }
    } else {
      createInspector(
        data.nombre,
        data.apellido,
        data.numeroTelefono,
        data.urlImg
      );
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
    numeroTelefono: string,
    urlImg: string
  ) => {
    try {
      const response = await createInspectors(
        nombre,
        apellido,
        numeroTelefono,
        urlImg
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateInspector = async (
    id: number,
    nombre: string,
    apellido: string,
    numeroTelefono: string,
    urlImg: string
  ) => {
    try {
      const response = await updateInspectors(
        id,
        nombre,
        apellido,
        numeroTelefono,
        urlImg
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="borde-card" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",

          "@media (max-width: 1100px)": {
            flexDirection: "column",
            alignItems: "stretch", // Alinear los elementos al principio y al final
          },
        }}
      >
        <TextField
          sx={{ flex: 2 }}
          id="titulo"
          label="Nombre Inspector"
          variant="outlined"
          {...register("nombre")}
          error={!!errors.nombre}
          helperText={errors?.nombre?.message}
          defaultValue={isEdit ? nombreInspector || "" : ""}
          InputLabelProps={{ shrink: !!nombreInspector || undefined }}
        />
        <TextField
          sx={{ flex: 2 }}
          id="apellido"
          label="Apellido Inspector"
          multiline
          {...register("apellido")}
          error={!!errors.apellido}
          helperText={errors?.apellido?.message}
          defaultValue={isEdit ? apellidoInspector || "" : ""}
          InputLabelProps={{ shrink: !!apellidoInspector || undefined }}
        />
      </Box>
      <Box
        sx={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",

          "@media (max-width: 1100px)": {
            flexDirection: "column",
            alignItems: "stretch", // Alinear los elementos al principio y al final
          },
        }}
      >
        <TextField
          sx={{ flex: 2 }}
          id="numeroTelefono"
          label="Numero de telefono"
          multiline
          {...register("numeroTelefono")}
          error={!!errors.numeroTelefono}
          helperText={errors?.numeroTelefono?.message}
          defaultValue={isEdit ? numeroTelefono || "" : ""}
          InputLabelProps={{ shrink: !!numeroTelefono || undefined }}
        />
        <input
          style={{ flex: 2 }}
          accept="image/*"
          type="file"
          onChange={onImageChange}
          name="image"
        />
        <Tooltip title={/*title*/ "Guardar inspector"}>
          <button onClick={onClick} className="btn-save" type="submit">
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  );
};

export default InspectorsForm;
