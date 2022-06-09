import Weather from './Weather'

const Country = ({ country }) => {
    const languages = () => {
        const langs = []
        for (const l in country.languages) {
            langs.push(<li key={l}>{country.languages[l]}</li>)
        }
        return langs
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages</h2>
            <ul>
                { languages() }
            </ul>
						<img src={country.flags.png} alt={country.name.common + 'flag'}/>
						<Weather city={country.capital} />
        </div>
    )
}

export default Country