// Main Page

import { useState } from "react";
import { LoadingContainer } from "../../components/basic/LoadingContainer";
import { Sidebar } from "../../components/layout/Sidebar";
import "./MainPage.scss";

/**
 * Represents a sub layout.
 */
interface SubLayout<T> {
    /**
     * Sublayout view ID.
     */
    id: SubLayoutView;

    /**
     * Arguments to pass to sub layout.
     */
    args: T;
}

/**
 * Sub layout view enum.
 * 
 * Contains all possible sub layouts for the main layout.
 */
enum SubLayoutView {
    Feed = 0,
    Profile = 1
}

/**
 * Renders the main page.
 * @returns The main page.
 */
export const MainPage = ()=> {
    const [loading, setLoading] = useState(true);
    const [subLayout, setSubLayout] = useState<SubLayout<any>>({ id: SubLayoutView.Feed, args: null });

    // Debug: no backend, disable loading
    setTimeout(()=>setLoading(false), 200);
    
    return loading ? <LoadingContainer/> : <div className="page main">
        <div className="main-layout">
            <div className="left">
                <Sidebar/>
            </div>
            <div className="right">

            </div>
        </div>
    </div>;
}

