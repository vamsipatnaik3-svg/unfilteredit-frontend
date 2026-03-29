// import { useState } from "react"

// export default function MessageInput({ sendMessage, onTyping, isPrivate }) {

//   const [message,setMessage] = useState("")
//   const [image,setImage] = useState(null)
//   const [preview,setPreview] = useState(null)

//   /* UPLOAD IMAGE */

//   const uploadImage = async(file)=>{

//     const formData = new FormData()
//     formData.append("image",file)

//     const res = await fetch("http://localhost:3000/upload",{
//       method:"POST",
//       body:formData
//     })

//     const data = await res.json()

//     return data.url
//   }

//   /* SEND MESSAGE */

//   const handleSend = async()=>{

//     if(!message && !image) return

//     let imageUrl = null

//     if(image){
//       imageUrl = await uploadImage(image)
//     }

//     sendMessage(message,imageUrl)

//     setMessage("")
//     setImage(null)
//     setPreview(null)

//   }

//   /* ENTER KEY */

//   const handleKeyDown=(e)=>{

//     onTyping()

//     if(e.key==="Enter"){
//       handleSend()
//     }

//   }

//   /* IMAGE SELECT */

//   const handleImageSelect=(e)=>{

//     const file = e.target.files[0]

//     if(!file) return

//     setImage(file)

//     const url = URL.createObjectURL(file)

//     setPreview(url)

//   }

//   return(

//     <div className="border-t p-2">

//       {/* IMAGE PREVIEW */}

//       {preview && (

//         <div className="mb-2 relative w-fit">

//           <img
//             src={preview}
//             className="max-h-32 rounded border"
//           />

//           <button
//             onClick={()=>{
//               setImage(null)
//               setPreview(null)
//             }}
//             className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
//           >
//             X
//           </button>

//         </div>

//       )}

//       <div className="flex items-center gap-2">

//         {/* EMOJI */}

//         <span className="text-xl">😊</span>

//         {/* IMAGE BUTTON (PRIVATE ONLY) */}

//         {isPrivate && (

//           <label className="cursor-pointer text-xl">

//             📷

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageSelect}
//             />

//           </label>

//         )}

//         {/* MESSAGE INPUT */}

//         <input
//           className="flex-1 border rounded px-2 py-1"
//           placeholder="Type message..."
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />

//         {/* SEND BUTTON */}

//         <button
//           onClick={handleSend}
//           className="bg-green-500 text-white px-4 py-1 rounded"
//         >
//           Send
//         </button>

//       </div>

//     </div>

//   )

// }

import API_URL from "../config"
import { useState } from "react"
import EmojiPicker from "emoji-picker-react"

export default function MessageInput({ sendMessage, onTyping, isPrivate }) {

  const [message,setMessage] = useState("")
  const [image,setImage] = useState(null)
  const [preview,setPreview] = useState(null)
  const [showEmoji,setShowEmoji] = useState(false)

  /* UPLOAD IMAGE */

  const uploadImage = async(file)=>{

    const formData = new FormData()
    formData.append("image",file)

    const res = await fetch(`${API_URL}/upload`,{
      method:"POST",
      body:formData
    })

    const data = await res.json()

    return data.url
  }

  /* SEND MESSAGE */

  const handleSend = async()=>{

    if(!message && !image) return

    let imageUrl = null

    if(image){
      imageUrl = await uploadImage(image)
    }

    sendMessage(message,imageUrl)

    setMessage("")
    setImage(null)
    setPreview(null)
    setShowEmoji(false)

  }

  /* ENTER KEY */

  const handleKeyDown=(e)=>{

    onTyping()

    if(e.key==="Enter"){
      handleSend()
    }

  }

  /* IMAGE SELECT */

  const handleImageSelect=(e)=>{

    const file = e.target.files[0]

    if(!file) return

    setImage(file)

    const url = URL.createObjectURL(file)

    setPreview(url)

  }

  /* EMOJI SELECT */

  const onEmojiClick=(emojiData)=>{

    setMessage(prev => prev + emojiData.emoji)

  }

  return(

    <div className="border-t p-2 relative">

      {/* IMAGE PREVIEW */}

      {preview && (

        <div className="mb-2 relative w-fit">

          <img
            src={preview}
            className="max-h-32 rounded border"
          />

          <button
            onClick={()=>{
              setImage(null)
              setPreview(null)
            }}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
          >
            X
          </button>

        </div>

      )}

      <div className="flex items-center gap-2">

        {/* EMOJI BUTTON */}

        <button
          onClick={()=>setShowEmoji(!showEmoji)}
          className="text-xl"
        >
          😊
        </button>

        {/* IMAGE BUTTON (PRIVATE ONLY) */}

        {isPrivate && (

          <label className="cursor-pointer text-xl">

            📷

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

          </label>

        )}

        {/* MESSAGE INPUT */}

        <input
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type message..."
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* SEND BUTTON */}

        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>

      </div>

      {/* EMOJI PICKER */}

      {showEmoji && (

        <div className="absolute bottom-14 left-0 z-50">

          <EmojiPicker onEmojiClick={onEmojiClick} />

        </div>

      )}

    </div>

  )

}