import { useState } from "react";
import { PartialUser } from "@twit2/std-library-fe";
import { AvatarBox } from "../../layout/AvatarBox";
import "./BannerPreviewBox.scss";

interface BannerPreviewBoxProps {
    user: PartialUser;
    onchange: (avatarFile: File)=>void;
}

export const BannerPreviewBox = (props: BannerPreviewBoxProps)=>{
    let [replImage, setReplImage] = useState<string>();
    
    return <div className="ui-pb-preview">
        <div className="banner"></div>
        <AvatarBox user={props.user} replImage={replImage} onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            
            input.onchange = async (e: any) => { 
                const file = e.target.files[0] as File; 

                if(replImage)
                    URL.revokeObjectURL(replImage);

                setReplImage(URL.createObjectURL(file));
                props.onchange(file);
            }
            
            input.click();
        }}/>
    </div>
}