import RootLayout from "@/app/layout"
import "/app/./globals.css";


export  function Focus(character) {
    localStorage.setItem("focusedCharacter", JSON.stringify(character))
}

export default function Focused(){
    let focusGuy = JSON.parse(localStorage.getItem("focusedCharacter"))
    return (
        <RootLayout>
            <div id="focus">
                <table className="table-fixed">
                    <tbody >
                        <tr>
                            <td className="w-1/6 p-1 border border-slate-500 tdImage" rowSpan="2">
                                <img src={`${focusGuy.thumbnail.path}.${focusGuy.thumbnail.extension}`} alt={focusGuy.name} />
                            </td>
                            <td className="w-5/6 p-1 border border-slate-500"> {focusGuy.id}</td>
                        </tr>
                        <tr>
                            <td className="w-5/6 p-1 border border-slate-500">{focusGuy.name}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="p-1 border border-slate-500">
                                <span>Description : </span><br />
                                {focusGuy.description ? focusGuy.description : "Not much is known of this entity"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </RootLayout>
    )
}