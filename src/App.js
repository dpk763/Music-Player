import React, { useEffect,useRef, useState } from 'react'
import './App.css'
function App() {
  
  const musicData=[ {
    songName:'O Maahi',
    artistName:'Arijit Singh',
    albumName:'Dunki Drop',
    imgSrc:'/assets/images/omahi.jpg',
    musicSrc:'/assets/audio/O_mahi.mp3'
  },
  {
    songName:'Phir Bhi Tumko Chaahunga',
    artistName:'Arijit Singh',
    albumName:'Half Girlfriend',
    imgSrc:'/assets/images/phirbhi.jpg',
    musicSrc:'/assets/audio/Phir_Bhi_Tumko_Chaahunga.mp3'
  },
  {
    songName:'Tum Hi Ho',
    artistName:'Arijit Singh',
    albumName:'Aashiqui 2',
    imgSrc:'/assets/images/tumhiho.jpg',
    musicSrc:'/assets/audio/Tum_Hi_Ho.mp3'
  },
  {
    songName:'Ram Siya Ram',
    artistName:'Sachet Tandon',
    albumName:'Ram Siya Ram',
    imgSrc:'/assets/images/ramsiya.jpg',
    musicSrc:'/assets/audio/Ram_Siya_Ram.mp3'
  },
]
  const [count,setCount]=useState(0);
  const [playbtn,setPlaybtn]=useState('play');
  const audioRef =useRef(null);
  const [songDuration, setSongDuration] = useState(0); //Store Song length
  const [currentTime, setCurrentTime] = useState(0); // Store current time
  const [shuffle,setShuffle]=useState(false);
  const play_pause =()=>{
    if(playbtn==='pause'){
      audioRef.current.pause();
      setPlaybtn('play');
      
    }
    else{
      setPlaybtn('pause');
      audioRef.current.play();
      
    }
  }

 
  const changeSong = (e)=>{
    
    if(shuffle){
    if(e===1){
      setCount(Math.floor(Math.random()*musicData.length));
    }else{
      setCount(Math.floor(Math.random()*musicData.length));
    }
  }else{
    if(e===1){
      setCount(count===0?musicData.length-1:count-1);
    }else{
      setCount(count===musicData.length-1?0:count+1);
     
    }
    
  }
  
  setPlaybtn('play');
  setTimeout(() => {
   
    audioRef.current.play(); // Autoplay the new song
    setPlaybtn('pause');
  }, 200); // Small delay to ensure the audio element is ready
}


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes<10?"0":""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    setSongDuration(audioRef.current.duration);
   };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleRangeChange  =(event)=>{
    const newTime = (event.target.value); // Map range input value to song duration
    audioRef.current.currentTime = newTime; // Update the current time in the audio
    setCurrentTime(newTime); // Update the currentTime state
  }


  const listplay = (index)=>{
   
    setPlaybtn('play');
    setCount(index);
    setTimeout(() => {
      audioRef.current.play(); // Autoplay the new song
      setPlaybtn('pause');
    }, 100); // Small delay to ensure the audio element is ready
    
  }
  
  const handleTrackEnd = () => {
    changeSong(1); // Move to the next song
    

  };

  const shufflehandle = ()=>{

    if(shuffle){
      setShuffle(false);
    }else{
      setShuffle(true);

    }
    
  }



    // Function to be run when the spacebar is pressed
    const handleSpacebarPress = (event) => {
      if (event.code === 'Space') {
        play_pause();
      }
    };
  
    useEffect(() => {
      // Add event listener for 'keydown'
      window.addEventListener('keydown', handleSpacebarPress);
  
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('keydown', handleSpacebarPress);
      };
    });

    // Change title dynamically
  document.title=musicData[count].songName.slice(0,15);
 
  return (
    <>
    
      <div className="container">
        <div className="music_container">
        <div className="music_box">
          <div className="info">
            <h2>{musicData[count].songName.slice(0,15)}...</h2>
            <p>{musicData[count].artistName} - {musicData[count].albumName}</p>
          </div>

          <div className="img">
            <img src={musicData[count].imgSrc} alt="" />
          </div>

          <div className="slider">
            <input type="range" name="" id="" min={0} max={songDuration} onChange={handleRangeChange} value={currentTime}/>
            <audio ref={audioRef} src={musicData[count].musicSrc} onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={handleTimeUpdate} onEnded={handleTrackEnd}></audio>
          </div>
          <div className="time">
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(songDuration)}</p>
          </div>
          <div className="controls">
            <i className={`bi bi-shuffle ${shuffle?'dark':'buttons'}`} onClick={shufflehandle}></i>
            <i className="buttons bi bi-arrow-left-circle-fill" onClick={e=>changeSong(1)}></i>
            <i className={`bi bi-${playbtn}-circle-fill play`} onClick={play_pause}></i>
            <i className="buttons bi bi-arrow-right-circle-fill" onClick={e=>changeSong(0)}></i>
            <a href={musicData[count].musicSrc} download>
            <i className="buttons bi bi-download"></i>
            </a>
          </div>
        </div>
        </div>
        <div className="list_container">
            <div className="item_box">
             {musicData.map((item,index)=>{
                return  <div className="item" key={index}>
                <i className={`bi bi-${count === index ? 'pause' : 'play'}-circle-fill`} onClick={e=>listplay(index)}></i>
                <h4>{item.songName.slice(0,15)}</h4>
                <img src={item.imgSrc} height={50} width={50} alt="" />
                </div>
             })}
            </div>
        </div>
      </div>
    </>
  )
}

export default App
