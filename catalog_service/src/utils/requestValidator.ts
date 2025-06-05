import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

const validationError = async (input: any): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    validationError: {target: true}
  });

  if(errors.length) {
    return errors;
  }
  return false;
};

export const RequestValidator = async <T>(body: any, type: ClassConstructor<T>)
: Promise<{errors: boolean | string; input: T}> => {
  const input = plainToClass(type, body);
  const errors = await validationError(input);
  if(errors) {
    const errorMessages = errors.map((error: ValidationError) => {
      return (Object as any).values(error.constraints)
    }).join(',');
    return { errors: errorMessages, input };
  }
  return { errors: false, input};
};