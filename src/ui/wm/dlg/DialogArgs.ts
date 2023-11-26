/**
 * Represents a dialog button.
 */
export interface DialogButton {
    /**
     * The ID to assign to this button.
     */
    id: string;

    /**
     * The label of this button.
     */
    label: string;

    /**
     * The onclick handler for this button.
     * 
     * Set to $close to assign the default close action.
     */
    onClick: (btn: DialogButton)=>void | "$close";
}

/**
 * Represents dialog arguments.
 */
export interface DialogArgs {
    /**
     * The dialog title.
     */
    title: string;

    /**
     * The dialog content to use. This can be text or a component.
     */
    content: any;

    /**
     * The buttons to place.
     * 
     * If you want to roll your own button group, you can set this to an empty array.
     */
    buttons?: DialogButton[];

    /**
     * Whether the window can be closed.
     */
    canClose?: boolean;
}