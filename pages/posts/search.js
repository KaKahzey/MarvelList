import { useState } from "react";
import '/app/./globals.css'
export default function Search({setInput}) {

    return (
        <div>
            <form>
                <input type="text"  className="border-solid border-2 border-red-950 rounded-full text-center " onChange={(e) => {
                    setInput(e.target.value)
                }} style={{ color: "black" }}></input>
            </form> 
        </div>
        
    )
}