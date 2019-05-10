import { User } from './../../../entity/User'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> {
    return User.findOne({ where: { email } }).then(
      (user): boolean => {
        if (user) return false
        return true
      },
    )
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions): Function {
  return function(object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    })
  }
}
