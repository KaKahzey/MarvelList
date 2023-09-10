import "/app/./globals.css";
import { MD5 } from "crypto-js";
import { useEffect, useState } from "react";
import axios from "axios";
import DisplayLists from "./displayLists";

export default function List() {
    const publicKey = "ab747fcc473fcea3c8744938c677c105"
    const privateKey = "9e946d369033a9ea1cb14a7498520d431b7e6964"
    const timestamp = new Date().getTime()
    const hash = MD5(`${timestamp}${privateKey}${publicKey}`).toString()
    let [charactersList, setCharactersList] = useState([])
    let [favoriteCharactersList, setFavoriteCharactersList] = useState([])

    useEffect(() => {
        async function getAllCharacters() {
            let storedCharactersList = JSON.parse(localStorage.getItem("charactersList"))
            if (storedCharactersList) {
                setCharactersList(storedCharactersList)
                setFavoriteCharactersList(JSON.parse(localStorage.getItem("favoriteCharactersList")))
            } else {
                let counterOffset = 0
                let charactersListCopy = []
                const baseUrl = "https://gateway.marvel.com/v1/public/characters?offset="
                let url = `${baseUrl}${counterOffset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`

                try {
                    while (counterOffset < 100) {
                        const response = await axios.get(url)
                        const newGuys = response.data.data.results
                        charactersListCopy = [...charactersListCopy, ...newGuys]
                        counterOffset += 20
                        url = `${baseUrl}${counterOffset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
                    }
                    setCharactersList(charactersListCopy)
                    localStorage.setItem("charactersList", JSON.stringify(charactersListCopy))
                }
                catch (error) {
                    console.error("That's a fail", error)
                }
            }
        }
        if (!charactersList.length) {
            getAllCharacters()
        }
    }, [])

    if (!charactersList.length) {
        return(
            <div className="flex min-h-screen flex-col items-center p-24 loading">
                <img src="/videos/marvelLoading.gif" alt="nick fury loading gif" />
            </div>
        )
    }

    return <DisplayLists list={charactersList} />
}

export function VerifyFavorites(character, setFavoriteCharactersList) {
    let list = JSON.parse(localStorage.getItem("favoriteCharactersList")) || []
  
    let toggleFavorite = () => {
        if (list.find((c) => c.id === character.id)) {
            list = list.filter((c) => c.id !== character.id)
        } 
        else {
            list.push(character)
        }
        localStorage.setItem("favoriteCharactersList", JSON.stringify(list))
        setFavoriteCharactersList(list)
    }
  
    return (
        <div onClick={toggleFavorite}>
            {list.find((c) => c.id === character.id) ? (<img src="/images/fullStar.png" alt="full star" />) : (<img src="/images/emptyStar.png" alt="empty star" />)}
        </div>
    )
  }



