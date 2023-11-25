import { DialogArgs } from "../../ui/wm/dlg/DialogArgs";
import "./BasicDialog.scss";

export const BasicDialog = (props: { args: DialogArgs, onclose: ()=>void })=><div className="generic-alert-dlg">
    <div className="subcontent">
        { props.args.content }
    </div>
    <div className="buttons">
        { props.args.buttons?.map(x =><button key={x.id} onClick={()=>{
            if((x.onClick as any) == "$close") {
                props.onclose();
                return;
            }

        }}>{x.label}</button>) }
    </div>
</div>