import RootLayout from "@/app/layout";
import "/app/./globals.css";
import { MD5 } from "crypto-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./search";
import { Focus } from "./focus";
import Link from "next/link";

export default function List() {
    const publicKey = "ab747fcc473fcea3c8744938c677c105"
    const privateKey = "9e946d369033a9ea1cb14a7498520d431b7e6964"
    const timestamp = new Date().getTime()
    const hash = MD5(`${timestamp}${privateKey}${publicKey}`).toString()
    const storedCharactersList = JSON.parse(localStorage.getItem("charactersList")) || []
    let [charactersList, setCharactersList] = useState(storedCharactersList)
    //Search bar
    const [searchInput, setInput] = useState("")
    
        async function getAllCharacters() {
            let counterOffset = 0
            let charactersListCopy = []
            const baseUrl = "https://gateway.marvel.com/v1/public/characters?offset="
            let url = `${baseUrl}${counterOffset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
            try {
                while(counterOffset < 100){
                    const response = await axios.get(url)
                    // const data = await response.json()
                    // allCharacters.push(...data.data.results)
                    const newGuys = response.data.data.results
                    charactersListCopy = [...charactersListCopy, ...newGuys]
                    counterOffset += 20
                    url = `${baseUrl}${counterOffset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
                }
                
                setCharactersList(charactersListCopy)
                localStorage.setItem("charactersList", JSON.stringify(charactersListCopy))
            } 
            catch(error) {
                console.error("That's a fail", error)
            } 
        }
    
    useEffect(() => {
        if(charactersList.length === 0){
            getAllCharacters()
        }
    }, [])
    
    return (
        <RootLayout>
            <div id="list" className="">
                <div id="field" className="text-center mx-auto p-5">
                    <Search setInput={setInput} />
                </div>
                <div className="grid grid-cols-4 ">
                    {charactersList.map((character) => {
                        if(character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && character.name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return(
                                <div key={character.id} className="p-6 ">
                                        <Link href="/posts/focus">
                                            <div onClick={() => Focus( character )}>
                                                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name}  className="listImages" />
                                            </div>
                                        </Link>
                                    <div className="pt-4 items-center">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{character.name}</td>
                                                <td rowSpan="2" className="star">
                                                    <div className="text-right">
                                                        <img src="/images/emptyStar.png" />
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

export function Favorites() {
    
}