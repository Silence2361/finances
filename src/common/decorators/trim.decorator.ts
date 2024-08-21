import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class TrimConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The value should not be empty after trimming whitespace';
  }
}

export function Trim(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: TrimConstraint,
    });
  };
}
