import { ProductorWorker } from "@/types/inspectors";
import { ProductorTrabajadorSchema } from "@/validations/workerProductor";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { ZodError } from "zod";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Productors } from "@/types/productors";
import { getProductors } from "@/services/productors";
import { createWorkerProductor } from "@/services/workers";

interface GeneralActionProps {
  onClick: () => void;
  idWorker: number;
}

const WorkerProductor: FC<GeneralActionProps> = ({ onClick, idWorker }) => {
  const resolver: Resolver<
    ProductorWorker,
    FieldErrors<ProductorWorker>
  > = async (data) => {
    try {
      // Validar los datos con zod
      await ProductorTrabajadorSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<ProductorWorker> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof ProductorWorker;
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
  } = useForm<ProductorWorker>({
    resolver: resolver,
  });

  const [productors, setProductors] = useState<Productors[]>([]);
  const getAllProductors = async () => {
    try {
      const response = await getProductors();
      if (response.data !== undefined) {
        setProductors(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const [age, setAge] = useState();
  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    getAllProductors();
  }, []);

  const [idProductors, setIdProductors] = useState(0);

  const onSubmit = (data: ProductorWorker) => {
    console.log('el id',idWorker)
    console.log(data)
    createWorkerProductors(data.IDProductor,idWorker);
    setValue("IDProductor", 0);
  };

  const createWorkerProductors = async (
    productor: number,
    trabajador: number
  ) => {
    try {
      const response = await createWorkerProductor(productor, trabajador);
      if (response !== undefined) {
        onClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <form
      style={{ width: "40rem" }}
      className="borde-card"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="demo-simple-select-label">Productor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="idProductor"
            label="Productor"
            {...register("IDProductor", { required: true })}
            error={!!errors.IDProductor}
            onChange={handleChange}
          >
            {productors.map((item) => (
              <MenuItem
                onClick={() => setIdProductors(item.id)}
                key={item.id}
                value={item.id}
              >
                {item.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors?.IDProductor && (
            <FormHelperText
              sx={{
                color: "red",
              }}
            >
              {errors.IDProductor.message}
            </FormHelperText>
          )}
        </FormControl>
        <Tooltip title="Guardar">
          <button
            style={{ flex: 1 }}
            onClick={onClick}
            className="btn-save"
            type="submit"
          >
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  );
};

export default WorkerProductor;
