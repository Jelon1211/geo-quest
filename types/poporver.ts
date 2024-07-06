export interface IMenuItems {
  id: number;
  label: string;
  isActive: boolean;
}

export interface PopoverContentProps {
  uuid: string;
  geo: any;
  setPopoverVisible: (visible: boolean) => void;
  items: IMenuItems[];
}
