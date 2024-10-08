import React from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { Workers } from "@/types/inspectors";
import { WorkerSchema } from "@/validations/workerSchema";
import { createWorkers, updateWorkers } from "@/services/workers";
import { Box, TextField, Tooltip } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { MemoryStoredFile } from "nestjs-form-data";

interface GeneralActionProps {
  onClick: () => void;
  isEdit: boolean;
  idInspector?: number;
  nombreInspector?: string;
  apellidoInspector?: string;
  numeroTelefono: string;
  urlImg?: string;
}

const WorkersForm: React.FC<GeneralActionProps> = ({
  isEdit,
  numeroTelefono,
  onClick,
  apellidoInspector,
  idInspector,
  nombreInspector,
  urlImg,
}) => {
  const dispatch = useDispatch();
  const workerState = useSelector((state: RootState) => state.worker);
  //Logica para guardar la url de la img.
  const [image, setImage] = React.useState<File| null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | undefined | ArrayBuffer | null >(urlImg);

  const onImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
            
      const file =  event.target.files[0];
      
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function(event){
        let arrayBuffer = event.target?.result;
        setImageUrl(event.target?.result)
        console.log("El buffer es:",arrayBuffer);   
      }
      //reader.readAsArrayBuffer(file);
    
  };
}

  //--------------------------------------------------------------------
  const resolver: Resolver<Workers, FieldErrors<Workers>> = async (data) => {
    try {
      // Validar los datos con zod
      await WorkerSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<Workers> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof Workers;
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
  } = useForm<Workers>({
    resolver: resolver,
  });

  const onSubmit = (data: Workers) => {
    console.log("Formulario de secciones enviado:", data);

    if (isEdit) {
      if (idInspector && idInspector !== -1) {
        if (nombreInspector) {
          if (numeroTelefono) {
            updateWorker(
              idInspector,
              data.nombre,
              data.apellido,
              data.numeroTelefono,
              (urlImg = "ImagenPerrona")
            );
          }
        }
      }
    } else {
      createWorker(
        data.nombre,
        data.apellido,
        data.numeroTelefono,
        imageUrl,
      );
    }
    // Limpiar los valores de los campos
    setValue("nombre", "");
    setValue("apellido", "");
    setValue("numeroTelefono", "");
  };

  const createWorker = async (
    nombre: string,
    apellido: string,
    numeroTelefono: string,
    urlImg: ArrayBuffer | null | string | undefined
  ) => {
    try {
      const response = await createWorkers(
        nombre,
        apellido,
        numeroTelefono,
        urlImg
      );
      if (!response.error) {
        onClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateWorker = async (
    id: number,
    nombre: string,
    apellido: string,
    numeroTelefono: string,
    urlImg: string
  ) => {
    try {
      const response = await updateWorkers(
        id,
        nombre,
        apellido,
        numeroTelefono,
        urlImg
      );
      if (!response.error) {
        onClick();
      }
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
          defaultValue={workerState.isEdit ? workerState.nombre || "" : ""}
          InputLabelProps={{ shrink: !!workerState.nombre || undefined }}
        />
        <TextField
          sx={{ flex: 2 }}
          id="apellido"
          label="Apellido Inspector"
          multiline
          {...register("apellido")}
          error={!!errors.apellido}
          helperText={errors?.apellido?.message}
          defaultValue={workerState.isEdit ? workerState.apellido || "" : ""}
          InputLabelProps={{ shrink: !!workerState.apellido || undefined }}
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
          defaultValue={
            workerState.isEdit ? workerState.numeroTelefono || "" : ""
          }
          InputLabelProps={{
            shrink: !!workerState.numeroTelefono || undefined,
          }}
        />
        <TextField
          name="image"
          label="Imagen"
          type="file"
          onChange={onImageChange}
          sx={{
            flex: 2,
          }}
        />

        <Tooltip title={/*title*/ "Guardar inspector"}>
          <button className="btn-save" type="submit">
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  );
};

export default WorkersForm;
