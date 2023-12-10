import { useState } from "react";
import { PartialUser } from "@twit2/std-library-fe";
import { AvatarBox } from "../../layout/AvatarBox";
import "./BannerPreviewBox.scss";
import { UserManager } from "../../../app/UserManager";

interface BannerPreviewBoxProps {
    user: PartialUser;
    onchange: (avatarFile?: File, bannerFile?: File)=>void;
}

export const BannerPreviewBox = (props: BannerPreviewBoxProps)=>{
    let [avReplImage, setAvReplImage] = useState<string>();
    let [bnReplImage, setBnReplImage] = useState<string>();
    const oldBanner = UserManager.getBannerURL(props.user);
    
    return <div className="ui-pb-preview">
        <div className="banner" style={(bnReplImage) ? { backgroundImage: `url(${bnReplImage})` } : (oldBanner ? { backgroundImage: `url(${oldBanner})` } : {})} onClick={()=>{
            const input = document.createElement('input');
            input.type = 'file';
            
            input.onchange = async (e: any) => { 
                const file = e.target.files[0] as File; 

                if(bnReplImage)
                    URL.revokeObjectURL(bnReplImage);

                setBnReplImage(URL.createObjectURL(file));

                props.onchange(undefined, file);
            }
            
            input.click();
        }}></div>
        <AvatarBox user={props.user} replImage={avReplImage} onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            
            input.onchange = async (e: any) => { 
                const file = e.target.files[0] as File; 

                if(avReplImage)
                    URL.revokeObjectURL(avReplImage);

                setAvReplImage(URL.createObjectURL(file));
                props.onchange(file, undefined);
            }
            
            input.click();
        }}/>
    </div>
}