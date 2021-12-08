import {Spinner} from './styles'

export const SpinnerDiv = () => (
    <div style={{position: 'relative'}}>
        <Spinner spin='5'/>
        <Spinner spin='15'/>
        <Spinner spin='25'/>
    </div>
)