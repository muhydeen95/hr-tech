export enum NotificationStatusEnum {
  UN_TREATED = 1,
  PENDING = 2,
  TREATED = 3,
}
export interface Notification {
  id: number;
  status: NotificationStatusEnum;
  title: string;
  message: string;
}
