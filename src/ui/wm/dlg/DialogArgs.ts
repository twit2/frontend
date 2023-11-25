export interface DialogButton {
    id: string;
    label: string;
    onClick: (btn: DialogButton)=>void | "$close";
}

export interface DialogArgs {
    title: string;
    content: any;
    buttons?: DialogButton[];
}