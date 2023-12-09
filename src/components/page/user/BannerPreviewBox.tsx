import { useState } from "react";
import { PartialUser } from "@twit2/std-library-fe";
import { AvatarBox } from "../../layout/AvatarBox";
import "./BannerPreviewBox.scss";
import { fileToBase64 } from "@twit2/std-library-fe";

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
                setReplImage(await fileToBase64(file));
                props.onchange(file);
            }
            
            input.click();
        }}/>
    </div>
}