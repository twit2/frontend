/**
 * Profile box properties.
 */
interface ProfileBoxProps {
    /**
     * The avatar URL to use.
     */
    avatarUrl: string;

    /**
     * The username to display.
     */
    username: string;
}

/**
 * Creates a new profile box.
 * @param props Properties.
 */
export const ProfileBox = (props: ProfileBoxProps)=><div className="profile-box">
    <div className="avatar" style={{ /*backgroundImage: `url(${props.avatarUrl})`*/ }}></div>
    <div className="username">{props.username}</div>
</div>