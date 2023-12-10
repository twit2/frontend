import "./BadgeContainer.scss";

export const BadgeContainer = (props: { badges: string[] })=>{
    return <span className="ui-badges">
        { props.badges.map(x =><span key={x} className={`badge ${x}`}/>) }
    </span>
}