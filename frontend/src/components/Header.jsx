import axios from 'axios'
function Header() {
  function getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getHere)
    }
    else{
      console.log('geolocation is not supported')
    }
  }
  async function getHere(location){
    const resp = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?at=${location.coords.latitude},${location.coords.longitude}&q=quan com&in=countryCode:VNM&apiKey=${import.meta.env.VITE_APIKEY}`)
    console.log(resp.data)
  }
  
  return (
    <header>
      <h1 onClick={getLocation}>Keeper</h1>
    </header>
  );
}

export default Header;
