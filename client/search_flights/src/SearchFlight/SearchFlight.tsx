import React, {useState} from "react";
import ReusableForm from "../systemDesign/ReusableForm/ReusableForm";
import {searchAirportGateway} from "./gateways/searchAirportGateway";
import {Airport} from "./types";
import './styles.css';
import {cityOfOriginGateway} from "./gateways/cityOfOriginGateway";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";
import {searchFlightGateway} from "./gateways/searchFlightGateway";
import CheckBoxesFoundAirports from "./CheckBoxFoundAirports";
import LoadingPage from "../systemDesign/LoadingPage/LoadingPage";
import FlightTable from "./FoundFlightTable/FoundFlightTable";

interface CreateFlightAreaProps {
    selectedAirportLimit?: number;
}

const todayInString = new Date().toISOString().split('T')[0];

const SearchFlight: React.FC<CreateFlightAreaProps> = ({selectedAirportLimit = 10}) => {
    const [formData, setFormData] = useState({
        cityOfOrigin: '', cityOfOriginError: '',
        originalDestinyAirport: '', originalDestinyAirportError: '',
        price: '', priceError: '',
        departureDate: todayInString, departureDateError: ''
    })
    const [foundCityOfOrigin, setFoundCityOfOrigin] = useState('');
    const [lastSelectedDestiny, setLastSelectedDestiny] = useState('');
    const [airports, setAirports] = useState<Airport[]>([])
    const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]); // TODO: adicionar isso como properidade de aerporto
    const [isLoading, setIsLoading] = useState(false);
    const [gatewayError, setGatewayError] = useState('');

    const isSelectingOrigin = foundCityOfOrigin.length === 0;
    const isSelectingDestiny = airports.length === 0 && !isSelectingOrigin;
    const isSelectingAirports = airports.length > 0;
    const isAirportLimitReached = selectedAirports.length >= selectedAirportLimit;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSelectingOrigin) {
            try {
                const response = await cityOfOriginGateway(formData.cityOfOrigin);
                setFoundCityOfOrigin(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setFormData({...formData, cityOfOriginError: error.message});
                }
            }
        } else {
            try {
                setLastSelectedDestiny(formData.originalDestinyAirport)
                const response = await searchAirportGateway(formData.originalDestinyAirport);
                setAirports(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setFormData({...formData, originalDestinyAirportError: error.message});
                }
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value, [id + 'Error']: ''});
    }

    const handleSelectingAirport = (airport: Airport) => {
        if (selectedAirports.includes(airport)) {
            setSelectedAirports(selectedAirports.filter((selectedAirport) =>
                selectedAirport.code !== airport.code));
        } else {
            setSelectedAirports([...selectedAirports, airport]);
        }
    }

    const selectedAirportsMessage = () => {
        if (isAirportLimitReached) {
            return `Você atingiu o limite de ${selectedAirportLimit} aeroporto(s)`;
        }

        if (selectedAirports.length === 0) {
            return 'Nenhum aeroporto selecionado';
        }
        if (selectedAirports.length === 1) {
            return '1 aeroporto selecionado';
        }

        return `${selectedAirports.length} aeroportos selecionados`;
    }

    const selectedAirportsList = selectedAirports.map((airport) => (
        <>
            <li key={airport.code}>
                <span>{airport.name}</span>
                <button
                    name={'Remover'}
                    onClick={() => handleSelectingAirport(airport)}
                >
                    X
                </button>
            </li>
        </>
    ));

    const getHeaderTitle = () => {
        if (isSelectingOrigin) {
            return 'Selecione a origem';
        }
        if (isSelectingDestiny) {
            return 'Selecione o destino';
        }
        return `Selecione até ${selectedAirportLimit} aeroportos`;
    }

    const currentFormFields = () => {
        const cityOfOriginFields = {
            id: 'cityOfOrigin',
            label: 'Cidade de origem',
            name: 'Cidade de origem',
            type: 'text',
            placeholder: 'Insira a cidade de origem',
            value: formData.cityOfOrigin,
            error: formData.cityOfOriginError,
        }

        const originalDestinyAirport = {
            id: 'originalDestinyAirport',
            label: 'Aeroporto de destino',
            name: 'Aeroporto de destino',
            type: 'text',
            placeholder: 'Insira o nome do aeroporto de destino',
            value: formData.originalDestinyAirport,
            error: formData.originalDestinyAirportError
        }

        const maxPrice = {
            id: 'price',
            label: 'Preço máximo',
            name: 'Preço máximo',
            type: 'number',
            required: false,
            placeholder: 'Sem limite de preço',
            value: formData.price,
            error: formData.priceError
        }

        const departureDate = {
            id: 'departureDate',
            label: 'Data de partida',
            name: 'Data de partida',
            min: todayInString,
            type: 'date',
            required: false,
            placeholder: todayInString,
            value: formData.departureDate,
            error: formData.departureDateError
        }

        if (isSelectingOrigin) {
            return [cityOfOriginFields];
        }
        if (isSelectingDestiny) {
            return [cityOfOriginFields, originalDestinyAirport]
        }
        if (isSelectingAirports) {
            return [cityOfOriginFields, originalDestinyAirport, maxPrice, departureDate]
        }
        return [];
    }

    const selectSubmitButtonText = () => {
        if (isSelectingOrigin) {
            return 'Buscar cidade de origem';
        }
        if (isSelectingDestiny || isSelectingAirports) {
            return 'Buscar aeroporto de destino';
        }
        return 'Submit';
    }

    const hasSufficientDataForSearchingFlights = () => {
        return formData.cityOfOrigin.length > 0
            && selectedAirports.length > 0
            && formData.departureDate.length > 0;
    }

    const handleFindFlights = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const airportsCodes = selectedAirports.map((airport) => airport.code);
        setIsLoading(true)
        try {
            const response = await searchFlightGateway(
                foundCityOfOrigin,
                airportsCodes,
                String(formData.price),
                formData.departureDate
            )
            setIsLoading(false)
            if (response.data.length > 0) {
                return (<FlightTable flights={response.data}/>)
            }
            setGatewayError('Nenhum voo encontrado, por favor altere os filtros.');
        } catch (error: unknown) {
            setIsLoading(false)
        }
    }

    const isFormDisabled = () => {
        if (isSelectingAirports) {
            const currentOriginalDestinyAirport = formData.originalDestinyAirport;
            return currentOriginalDestinyAirport.length === 0 || currentOriginalDestinyAirport === lastSelectedDestiny;
        }
    }

    return (
        <div className={'flight-area-container'}>
            <header>
                <h1>{getHeaderTitle()}</h1>
            </header>
            {isLoading ? <LoadingPage/> : (
                <main
                    className={'create-flight-area'}
                >
                    <div className={'select-airports'}>
                        <ReusableForm
                            formTitle=""
                            fields={currentFormFields()}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            submitText={selectSubmitButtonText()}
                            disabled={isFormDisabled()}
                        />
                        {hasSufficientDataForSearchingFlights() &&
                            <ReusableButton
                                callback={handleFindFlights}
                                label={'Buscar voos'}
                                description={'Buscar voos'}
                            />
                        }
                        {isSelectingAirports && <p>{selectedAirportsMessage()}</p>}
                        {isSelectingAirports &&
                            <ul className={'selected-airports-list'}>
                                {selectedAirportsList}
                            </ul>
                        }
                    </div>
                    <section>
                        {gatewayError && <p>{gatewayError}</p>}
                    </section>
                    {isSelectingAirports &&
                        <CheckBoxesFoundAirports
                            airports={airports}
                            handleSelectingAirport={handleSelectingAirport}
                            selectedAirports={selectedAirports}
                            isAirportLimitReached={selectedAirports.length >= selectedAirportLimit}
                        />
                    })
                </main>)}
        </div>
    );
}

export default SearchFlight;
