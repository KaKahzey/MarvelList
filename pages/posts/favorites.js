import "/app/./globals.css";
import { useEffect, useState } from "react";
import DisplayLists from "./displayLists";

export default function Favorites() {
    let [favoriteCharactersList, setFavoriteCharactersList] = useState([])
    useEffect(() =>{
        async function getFavoriteCharacters() {
            let storedFavoriteCharactersList = JSON.parse(localStorage.getItem("favoriteCharactersList"))
            if (storedFavoriteCharactersList) {
                setFavoriteCharactersList(storedFavoriteCharactersList)
            } 
            else {
                return (
                    <h1>no favorites added</h1>
                )
            }
        }
        if (!favoriteCharactersList.length) {
            getFavoriteCharacters()
        }
    }, [])
    return <DisplayLists list={favoriteCharactersList} />
}