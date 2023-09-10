import RootLayout from "@/app/layout"
import Link from "next/link"
import Search from "./search"
import { VerifyFavorites } from "./list"
import { Focused } from "./focus"
import { useState } from "react"

export default function displayLists({list}) {
    const [searchInput, setInput] = useState("")
    let [favoriteCharactersList, setFavoriteCharactersList] = useState([])
    return (
        <RootLayout>
            <div id="list">
                <div id="field" className="text-center mx-auto p-5">
                    <Search setInput = {setInput} />
                </div>
                <div className="grid grid-cols-4 ">
                    {list.map((character) => {
                        if(character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && 
                            character.name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return(
                                <div key={character.id} className="p-6 ">
                                        <Link href="/posts/focus">
                                            <div onClick={() => Focused(character)}>
                                                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                                                    alt={character.name}  className="listImages" />
                                            </div>
                                        </Link>
                                    <div className="pt-4">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{character.name}</td>
                                                <td rowSpan="2" className="star">
                                                    <div className="text-right">
                                                        {VerifyFavorites(character, setFavoriteCharactersList)}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{character.id}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </RootLayout>
    )
}