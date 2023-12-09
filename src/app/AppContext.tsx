import { PartialUser } from "@twit2/std-library-fe";
import { DialogArgs } from "../ui/wm/dlg/DialogArgs";

// Represents the current app context
interface IAppCtx {
    currentUser?: PartialUser,
    ui: {
        /**
         * Shows a dialog.
         * @param args The arguments to pass.
         */
        createDlg: (args: DialogArgs)=>void,

        /**
         * Closes the active dialog.
         */
        closeDlg: ()=>void
    }
}

export const AppContext = {
    ui: {}
} as IAppCtx;