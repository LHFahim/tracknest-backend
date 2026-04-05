import { ControllersEnum } from '../enum/controllers.enum';

export const Routes = {
  [ControllersEnum.AdminAuth]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
    changePassword: 'change-password',
    resetPassword: 'reset-password',
    resetPasswordSendCode: 'reset-password/send',
    verifyEmailPublic: 'verify-email/public',
  },

  [ControllersEnum.AdminCategory]: {
    findAll: '',
    findOne: ':id',
    createOne: '',
    updateOne: ':id',
    deleteOne: ':id',
  },

  [ControllersEnum.AdminLostItem]: {
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },

  [ControllersEnum.Auth]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
  },
  [ControllersEnum.Users]: {
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },
  [ControllersEnum.Profile]: {
    me: 'me',
  },
  [ControllersEnum.Category]: {
    findAll: '',
    findOne: ':id',
  },

  [ControllersEnum.LostItem]: {
    findAll: '',
    findOne: ':id',
    create: '',
    updateOne: ':id',
    updateStatus: ':id/status',
    deleteOne: ':id',
  },

  [ControllersEnum.FoundItem]: {
    findAll: '',
    findOne: ':id',
    create: '',
    updateOne: ':id',
    updateStatus: ':id/status',
    deleteOne: ':id',
  },
} as const;
