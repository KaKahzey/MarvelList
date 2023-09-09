import RootLayout from "@/app/layout";
import "/app/./globals.css";
import { Focus } from "./focus";
import Link from "next/link";
import { VerifyFavorites } from './list';
import { useState } from "react";
import Search from "./search";
;
export default function Favorites() {
    const [favoriteCharactersList, setFavoriteCharactersList] = useState(JSON.parse(localStorage.getItem("favoriteCharactersList")) || [])
    let [searchInput, setInput] = useState("")
    return (
        <RootLayout>
            <div id="field" className="text-center mx-auto p-5">
                <Search setInput={setInput} />
            </div>
            <div className="grid grid-cols-4 favorites">
                    {favoriteCharactersList.map((character) => {
                        if(character.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return(
                                <div key={character.id} className="p-6 ">
                                        <Link href="/posts/focus">
                                            <div onClick={() => Focus( character )}>
                                                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name}  className="listImages" />
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
        </RootLayout>
    )
}