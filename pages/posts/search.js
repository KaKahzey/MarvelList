import '/app/./globals.css'
export default function Search({setInput}) {

    return (
        <div className="text-center ">
                <input type="text"  className="border-solid border-2 border-red-950 rounded-full text-center " onChange={(element) => {
                    setInput(element.target.value)
                }}></input>
        </div>
    )
}