import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import StateTypes from '../functions/stateTypes'

const CitySelector = (props) => {
    const cityList = props.data.map(city => {
        if (city.nomCommune) return <option value={city.nomCommune}>{city.nomCommune}</option>
    })
    return (
        <select name='city' id='city'>
            {cityList}
        </select>
    )
}

CitySelector.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        codePostal: PropTypes.string,
        nomCommune: PropTypes.string,
        codeCommune : PropTypes.string,
        libelleAcheminement: PropTypes.string
    }))
}


const FormDelivery = (props) => {
    const [city, setCity] = useState('') // API grâce zipCode
    const [cityList,setCityList] = useState([])
    const [zipCode, setZipCode] = useState(0) // ASK
    const [address, setAddress] = useState('') // ASK - API
    const [number, setNumber] = useState(0)
    const [error, setError] = useState(false)
    

    // Create : const [city, setCity] = useState()
    // Read : city
    // Update : setCity
    // Verifier useEffect Type zipCode bug **** VOIR ****
    const handleZipChange = (e)=> {
        if (!isNaN(e.target.value)){ // Si la valeur n'est pas un nombre
            if (e.target.value.length === 5){ // si notre valeur est égal à 5
                const url = `https://apicarto.ign.fr/api/codes-postaux/communes/${e.target.value}`
                fetch(url)
                .then(response=> {
                    if(response.status === 200){
                        response.json()
                        .then(res => {
                            if(res.length > 0){
                                setCityList(res) // affiche la commune
                            }
                            else {
                                setCityList(false) // notre erreur
                            }
                        })
                    }
                    else {
                        setError(`Aucune ville trouvé au code postal : ${e.target.value}`)
                        setCityList(false)
                    }
                })
                .catch(err => {
                    setError(`Erreur lors de l'appel API, veuillez réessayer plus tard, cordialement`)
                    console.error(err)
                })
            }
            else if (e.target.value.length > 5){
                return
            }
            return setZipCode(e.target.value)
        }
    }
    
    /*const [primaryAddress, setPrimaryAdress] = useState({
        city: '',
        zipCode: 0,
        number: 0,
        address: ''
    })*/

    return (
        <div>
            <h1>Quelle est votre commune ? s'il vous plait</h1>
            {error && <p>{error}</p>}
            <label for='zipcode'>Code Postal : </label>
            <input
                type='number'
                name='zipcode'
                value={zipCode}
                onChange={handleZipChange} // onChange détecte quand la valeur change dans l'input
            />
            {cityList
                ? <CitySelector data={cityList} />
                : null
            }
        </div>
    )

}

export default FormDelivery