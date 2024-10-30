"use client"
import Image from "next/image";
import { useDebugValue, useState } from "react";


export default function Home() {

  const [pictureContents, setPictureContents] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchPictures() {
    const API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5"
    const response = await fetch(API_URL);
    const testVar = "hello;";
    const data = await response.json();
    setPictureContents(data);
    // console.log(data)
    setLoading(false);
  }

  const Header = () => {
    return (
      <header>
        <h1>My Cool Midterm Prep</h1>
        <button 
          disabled={loading}
          className='border-2 border p-2' 
          onClick={fetchPictures}
        >
          Fetch
        </button>
      </header>
    )
  }

  const PictureDisplay = () => {
    if (loading) {
      return <section>Loading...</section>
    }
    
    if (pictureContents) {
      const pictureList = [];
      // debuggers;
      pictureContents.forEach((picture, i) => {
        //keys are explanation, title, url
        pictureList.push(<article key={i}>
            <img src={picture.url} alt={picture.explanation} />
            <h2>{picture.title}</h2>
            <p>{picture.explanation}</p>
            <hr />
          </article>)
      })
        return <section>{pictureList}</section>
    }

    return <section>No pictures have been fetched</section>

  }


  return (
    <div className="m-8"> This should work if everything is going okay!
      <Header />
      <PictureDisplay />
    </div>
  );
}
