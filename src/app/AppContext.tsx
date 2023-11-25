import { PartialUser } from "../api/user/PartialUser";
import { DialogArgs } from "../ui/wm/dlg/DialogArgs";

// Represents the current app context
interface IAppCtx {
    currentUser: PartialUser,
    ui: {
        alert: (args: DialogArgs)=>void
    }
}

export const AppContext = {
    ui: {}
} as IAppCtx;